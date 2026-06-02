import { NextResponse } from 'next/server'

const CRM_WEBHOOK = 'https://sendaia-crm.vercel.app/api/webhooks/webform'

// Herramienta que permite a Aria registrar el lead directamente en el CRM
const tools = [
  {
    type: 'function',
    function: {
      name: 'registrar_lead',
      description:
        'Registra el contacto del usuario en el CRM de SendaIA para que el equipo le contacte y le agende el diagnóstico gratuito. Úsala SOLO cuando el usuario haya facilitado su nombre y al menos un email o un teléfono, y haya mostrado interés. No la uses para simples consultas informativas.',
      parameters: {
        type: 'object',
        properties: {
          nombre: { type: 'string', description: 'Nombre y apellidos del contacto' },
          email: { type: 'string', description: 'Email del contacto' },
          telefono: { type: 'string', description: 'Teléfono del contacto' },
          empresa: { type: 'string', description: 'Nombre de la empresa o negocio, si lo menciona' },
          interes: { type: 'string', description: 'Resumen breve de qué quiere automatizar o de su caso' },
        },
        required: ['nombre'],
      },
    },
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callOpenAI(messages: any[]) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 600,
      temperature: 0.6,
      messages,
      tools,
      tool_choice: 'auto',
    }),
  })
  return res.json()
}

export async function POST(request: Request) {
  try {
    const { messages, system } = await request.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convo: any[] = [{ role: 'system', content: system }, ...messages]

    let data = await callOpenAI(convo)
    let msg = data.choices?.[0]?.message

    // Si Aria decide registrar el lead, ejecutamos la herramienta y la dejamos confirmar
    if (msg?.tool_calls?.length) {
      convo.push(msg)
      for (const tc of msg.tool_calls) {
        let result = 'Herramienta no disponible.'
        if (tc.function?.name === 'registrar_lead') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let args: any = {}
          try { args = JSON.parse(tc.function.arguments || '{}') } catch {}
          try {
            const r = await fetch(CRM_WEBHOOK, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: args.nombre,
                email: args.email || null,
                phone: args.telefono || null,
                company: args.empresa || null,
                message: `[Lead captado por Aria en la web] ${args.interes || ''}`.trim(),
              }),
            })
            result = r.ok
              ? 'Lead registrado correctamente en el CRM. El equipo de SendaIA contactará en menos de 24 horas. Confírmaselo al usuario de forma cálida.'
              : 'No se pudo registrar automáticamente. Discúlpate brevemente y ofrece el teléfono 858 215 026 o el email info@sendaia.es.'
          } catch {
            result = 'No se pudo registrar automáticamente. Discúlpate brevemente y ofrece el teléfono 858 215 026.'
          }
        }
        convo.push({ role: 'tool', tool_call_id: tc.id, content: result })
      }
      data = await callOpenAI(convo)
      msg = data.choices?.[0]?.message
    }

    const content = msg?.content || 'No pude procesar tu mensaje.'
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ content: 'Error de conexión. Llámanos al 858 215 026.' }, { status: 500 })
  }
}
