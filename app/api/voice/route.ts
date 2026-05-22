import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const res = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: process.env.RETELL_AGENT_ID,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Retell error:', err)
      return NextResponse.json({ error: 'No se pudo iniciar la llamada' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ access_token: data.access_token })
  } catch {
    return NextResponse.json({ error: 'Error de conexión' }, { status: 500 })
  }
}
