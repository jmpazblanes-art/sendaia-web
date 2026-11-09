import { NextResponse } from 'next/server'
import { isIP } from 'node:net'

// Crea la llamada web con Carolina (botón «Habla con nuestro agente»).
// Pachi, 09/11/2026: antes no había ningún filtro. Ahora:
//  1. Se pregunta al CRM si esta conexión puede llamar (3 al día por conexión, 40 en total).
//  2. A Carolina se le dice que la llamada viene de la web (canal = web): como no tenemos
//     el número, pide un móvil o un correo antes de dar detalles.
const CRM_VOZ_WEB_URL =
  process.env.CRM_VOZ_WEB_URL || 'https://crm.sendaia.es/api/webhooks/voz-web'

// Clave del visitante para el límite. IPv4 tal cual; IPv4 dentro de IPv6 (::ffff:1.2.3.4)
// se pasa a IPv4; IPv6 se cuenta por su /64 (un móvil cambia de dirección dentro de él).
function ipDe(request: Request): string {
  // Solo cabeceras que pone Vercel (el visitante no las puede falsear): x-vercel-forwarded-for
  // y x-real-ip. NUNCA el primer valor de x-forwarded-for, que el cliente puede rellenar.
  const vercel = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-real-ip') || ''
  let ip = vercel.split(',')[0].trim().split('%')[0]
  const mapeada = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i)
  if (mapeada) ip = mapeada[1]
  const tipo = isIP(ip)
  if (tipo === 4) return ip
  if (tipo !== 6) return ''
  const [izq, der = ''] = ip.split('::')
  const a = izq ? izq.split(':') : []
  const b = ip.includes('::') && der ? der.split(':') : []
  const llena = ip.includes('::') ? [...a, ...Array(8 - a.length - b.length).fill('0'), ...b] : a
  return llena.slice(0, 4).map((g) => (g || '0').toLowerCase().replace(/^0+(?=.)/, '')).join(':') + '::/64'
}

// Falla en CERRADO (revisión Codex 09/11): si no se puede comprobar el límite, no se crea
// la llamada (un bot podría gastar el saldo de Retell). El visitante ve el teléfono para llamar.
async function puedeLlamar(ip: string): Promise<'ok' | 'limite' | 'fallo'> {
  if (!ip || !process.env.CRM_WEBHOOK_SECRET) {
    console.error('voz-web: sin IP o sin CRM_WEBHOOK_SECRET; no se crea la llamada')
    return 'fallo'
  }
  try {
    const res = await fetch(CRM_VOZ_WEB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-webhook-token': process.env.CRM_WEBHOOK_SECRET },
      body: JSON.stringify({ ip }),
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) {
      console.error('voz-web: el CRM respondió', res.status)
      return 'fallo'
    }
    const d = await res.json()
    return d.permitida === true ? 'ok' : d.permitida === false ? 'limite' : 'fallo'
  } catch (e) {
    console.error('voz-web: sin respuesta del CRM', e)
    return 'fallo'
  }
}

export async function POST(request: Request) {
  try {
    const permiso = await puedeLlamar(ipDe(request))
    if (permiso === 'limite') return NextResponse.json({ error: 'limite' }, { status: 429 })
    // El widget enseña «No se pudo conectar · llama al 858 215 026».
    if (permiso === 'fallo') return NextResponse.json({ error: 'No se pudo iniciar la llamada' }, { status: 503 })

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
