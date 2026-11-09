import { NextResponse } from 'next/server'

// Crea la llamada web con Carolina (botón «Habla con nuestro agente»).
// Pachi, 09/11/2026: antes no había ningún filtro. Ahora:
//  1. Se pregunta al CRM si esta conexión puede llamar (3 al día por conexión, 40 en total).
//  2. A Carolina se le dice que la llamada viene de la web (canal = web): como no tenemos
//     el número, pide un móvil o un correo antes de dar detalles.
const CRM_VOZ_WEB_URL =
  process.env.CRM_VOZ_WEB_URL || 'https://crm.sendaia.es/api/webhooks/voz-web'

function ipDe(request: Request): string {
  // En Vercel, x-forwarded-for lo pone la plataforma; el primero es el visitante.
  const xff = request.headers.get('x-forwarded-for') || ''
  const ip = xff.split(',')[0].trim() || request.headers.get('x-real-ip') || ''
  // IPv6: un móvil cambia de dirección dentro de su /64; se cuenta por el /64 para que
  // no se esquive el límite cambiando de dirección.
  if (ip.includes(':')) {
    const partes = ip.split('%')[0].split('::')
    const izq = partes[0] ? partes[0].split(':') : []
    const der = partes.length > 1 && partes[1] ? partes[1].split(':') : []
    const llena = partes.length > 1 ? [...izq, ...Array(Math.max(0, 8 - izq.length - der.length)).fill('0'), ...der] : izq
    return llena.slice(0, 4).map((g) => (g || '0').toLowerCase()).join(':') + '::/64'
  }
  return ip
}

async function puedeLlamar(ip: string): Promise<boolean> {
  if (!ip || !process.env.CRM_WEBHOOK_SECRET) return true
  try {
    const res = await fetch(CRM_VOZ_WEB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-webhook-token': process.env.CRM_WEBHOOK_SECRET },
      body: JSON.stringify({ ip }),
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) {
      console.error('voz-web: el CRM respondió', res.status)
      return true // si el CRM falla, no se le cierra la puerta a un cliente
    }
    const d = await res.json()
    return d.permitida !== false
  } catch (e) {
    console.error('voz-web: sin respuesta del CRM', e)
    return true
  }
}

export async function POST(request: Request) {
  try {
    if (!(await puedeLlamar(ipDe(request)))) {
      return NextResponse.json({ error: 'limite' }, { status: 429 })
    }

    const res = await fetch('https://api.retellai.com/v3/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: process.env.RETELL_AGENT_ID,
        retell_llm_dynamic_variables: { canal: 'web' },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Retell error:', err)
      return NextResponse.json({ error: 'No se pudo iniciar la llamada' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({
      access_token: data.access_token,
      call_id: data.call_id,
      transport: data.transport,
      ice_servers: data.ice_servers,
    })
  } catch {
    return NextResponse.json({ error: 'Error de conexión' }, { status: 500 })
  }
}
