import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages, system } = await request.json()

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 200,
        messages: [
          { role: 'system', content: system },
          ...messages,
        ],
      }),
    })

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content || 'No pude procesar tu mensaje.'
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ content: 'Error de conexión. Llámanos al 858 215 026.' }, { status: 500 })
  }
}
