import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages, system } = await request.json()

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://sendaia.es',
        'X-Title': 'SendaIA Chatbot',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-haiku-4-5',
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
