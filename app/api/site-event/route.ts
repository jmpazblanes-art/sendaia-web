import { NextResponse } from 'next/server'

// Proxy de eventos de la web → webhook del CRM. Mismo patrón que /api/contact:
// el navegador postea aquí y el server reenvía al CRM, así no exponemos la URL
// del CRM en el cliente ni tenemos problemas de CORS.

const CRM_SITE_EVENT_URL =
  process.env.CRM_SITE_EVENT_URL ||
  'https://sendaia-crm.vercel.app/api/webhooks/site-event'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // El webhook del CRM exige token desde el 28-jul-2026 (antes aceptaba cualquier
    // POST anónimo). Va en cabecera y sólo desde este handler de SERVIDOR, así que
    // el secreto no llega nunca al navegador.
    const res = await fetch(CRM_SITE_EVENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CRM_WEBHOOK_SECRET
          ? { 'x-webhook-token': process.env.CRM_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(body),
    })

    // El tracking nunca debe molestar al usuario: si el CRM falla, respondemos ok igual.
    return NextResponse.json({ success: res.ok })
  } catch {
    return NextResponse.json({ success: false })
  }
}
