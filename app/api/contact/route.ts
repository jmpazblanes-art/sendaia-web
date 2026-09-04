import { NextResponse } from 'next/server'

// El formulario de contacto es la puerta de entrada comercial de la web: lo que
// entra por aquí NO se puede perder. El 04-sep-2026 se midió en producción que sí
// se perdía — si el email ya existía en el CRM, el webhook devolvía 400 por el
// UNIQUE de `clients.email`, esto lo traducía a un 500 genérico y el visitante veía
// "Error al enviar" sin que quedara rastro de quién había escrito.
//
// El arreglo de fondo está en el CRM (rescata el duplicado y lo guarda como nota).
// Esto de aquí es la red debajo: aunque el CRM falle por lo que sea, el mensaje
// queda al menos registrado en los logs del servidor para poder recuperarlo.

const CRM_WEBFORM_URL =
  process.env.CRM_WEBFORM_URL ||
  'https://sendaia-crm.vercel.app/api/webhooks/webform'

// Validación mínima en servidor: sin esto el endpoint aceptaba `{}` vacío y
// emails inválidos con un 200, creaba fichas basura en el CRM y encima disparaba
// un correo de bienvenida por cada una (comprobado el 04-sep: 2 correos reales).
//
// OJO: por aquí entran DOS formularios de la home. El de diagnóstico manda
// name+email+phone+message, pero el de RESEÑA DE CLIENTE manda solo name+message
// (no le pide el email a nadie). Por eso el email se valida solo si viene: exigirlo
// siempre rompería las reseñas, que hoy funcionan.
function validar(body: Record<string, unknown>): string | null {
  const nombre = String(body.name ?? body.nombre ?? '').trim()
  const email = String(body.email ?? '').trim()
  const mensaje = String(body.message ?? body.mensaje ?? '').trim()

  if (nombre.length < 2) return 'Falta el nombre'
  if (email === '' && mensaje === '') return 'Hace falta un email o un mensaje'
  if (email !== '' && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) {
    return 'Email no válido'
  }
  return null
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Petición no válida' }, { status: 400 })
  }

  // Honeypot: un campo que una persona nunca ve ni rellena. Si viene con algo es
  // un bot. Se responde 200 para no darle pistas, pero no se reenvía nada al CRM.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true })
  }

  const fallo = validar(body)
  if (fallo) {
    return NextResponse.json({ error: fallo }, { status: 400 })
  }

  try {
    const res = await fetch(CRM_WEBFORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) {
      // El lead NO se tira a la basura: queda en los logs de Vercel para rescatarlo
      // a mano. Antes de esto, un fallo del CRM equivalía a un lead borrado.
      const detalle = await res.text().catch(() => '')
      console.error(
        '[contact] CRM rechazó el lead — RESCATAR A MANO:',
        JSON.stringify({ estado: res.status, detalle: detalle.slice(0, 300), lead: body })
      )
      return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(
      '[contact] No se pudo contactar con el CRM — RESCATAR A MANO:',
      JSON.stringify({ error: String(err), lead: body })
    )
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
