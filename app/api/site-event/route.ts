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

    const res = await fetch(CRM_SITE_EVENT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    // El tracking nunca debe molestar al usuario: si el CRM falla, respondemos ok igual.
    return NextResponse.json({ success: res.ok })
  } catch {
    return NextResponse.json({ success: false })
  }
}
