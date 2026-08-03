'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Send } from 'lucide-react'
import { track } from '@/lib/website-events'

const API = 'https://whatsapp-sendaia.vercel.app/api/chat-web'

const SALUDO =
  'Hola, soy el asistente de SendaIA. Cuéntame a qué te dedicas y qué te está comiendo el tiempo, y te digo en qué te podemos ayudar.'

interface Turno {
  rol: 'user' | 'assistant'
  contenido: string
}

/**
 * Chat con el agente de SendaIA, dentro de la propia web.
 *
 * Habla con el MISMO cerebro que el agente de WhatsApp (`/api/chat-web` del
 * servicio del agente): mismo prompt comercial, misma regla de no dar precios,
 * y puede ofrecer huecos reales y cerrar una cita.
 *
 * Antes este botón sacaba al visitante a WhatsApp Web. Ahora se puede hablar
 * sin salir de sendaia.es y sin tener que dar el número (Pachi, 03-ago-2026).
 */
export default function ChatAgente({
  abierto,
  onCerrar,
}: {
  abierto: boolean
  onCerrar: () => void
}) {
  const [turnos, setTurnos] = useState<Turno[]>([{ rol: 'assistant', contenido: SALUDO }])
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const finRef = useRef<HTMLDivElement>(null)
  const entradaRef = useRef<HTMLInputElement>(null)

  // Id de sesión estable mientras dure la pestaña: sirve para que el agente
  // agrupe la conversación sin pedirle el teléfono al visitante.
  const [sesion] = useState(() => {
    if (typeof window === 'undefined') return 'servidor'
    const guardada = sessionStorage.getItem('sendaia_chat_sesion')
    if (guardada) return guardada
    const nueva = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('sendaia_chat_sesion', nueva)
    return nueva
  })

  useEffect(() => {
    if (abierto) {
      finRef.current?.scrollIntoView({ behavior: 'smooth' })
      // El foco al abrir: en móvil sube el teclado y se puede escribir ya.
      setTimeout(() => entradaRef.current?.focus(), 350)
    }
  }, [abierto, turnos])

  // Con el chat abierto no se scrollea la página de detrás (sólo en móvil).
  useEffect(() => {
    if (!abierto) return
    const estrecho = window.matchMedia('(max-width: 640px)').matches
    if (!estrecho) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  const enviar = async () => {
    const mensaje = texto.trim()
    if (!mensaje || enviando) return

    setTexto('')
    setTurnos((t) => [...t, { rol: 'user', contenido: mensaje }])
    setEnviando(true)
    track('cta_click', { cta: 'chat_agente_mensaje' })

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // El saludo inicial no se manda: no es algo que haya dicho el visitante.
        body: JSON.stringify({ mensaje, sesion, historial: turnos.slice(1) }),
      })
      const data = (await res.json()) as { respuesta?: string; error?: string }
      setTurnos((t) => [
        ...t,
        {
          rol: 'assistant',
          contenido:
            data.respuesta ??
            'Perdona, ahora mismo no puedo contestarte. Escríbenos por WhatsApp y te atendemos.',
        },
      ])
    } catch {
      setTurnos((t) => [
        ...t,
        {
          rol: 'assistant',
          contenido:
            'Se me ha caído la conexión. Prueba otra vez o escríbenos por WhatsApp al 627 25 69 96.',
        },
      ])
    } finally {
      setEnviando(false)
    }
  }

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-start p-0 sm:bottom-6 sm:left-6 sm:inset-auto sm:p-0">
      {/* Fondo sólo en móvil: en escritorio el chat es una ventanita flotante */}
      <div
        onClick={onCerrar}
        className="absolute inset-0 sm:hidden"
        style={{ background: 'rgba(5,5,16,0.6)', backdropFilter: 'blur(3px)' }}
      />

      <div
        role="dialog"
        aria-label="Chat con el asistente de SendaIA"
        className="relative flex w-full flex-col overflow-hidden border sm:w-[380px] sm:rounded-2xl"
        style={{
          background: '#0b0b16',
          borderColor: 'rgba(212,175,55,0.3)',
          height: 'min(78dvh, 620px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: '#25D366' }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ background: '#25D366' }}
              />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Asistente de SendaIA</p>
              <p className="text-[11px]" style={{ color: 'rgba(245,245,245,0.5)' }}>
                Contesta al momento
              </p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            aria-label="Cerrar el chat"
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <X className="h-4 w-4" style={{ color: 'rgba(245,245,245,0.8)' }} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {turnos.map((t, i) => (
            <div key={i} className={`flex ${t.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6"
                style={
                  t.rol === 'user'
                    ? { background: 'var(--accent)', color: '#0b0b16', fontWeight: 500 }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(245,245,245,0.92)' }
                }
              >
                {t.contenido}
              </div>
            </div>
          ))}
          {enviando && (
            <div className="flex justify-start">
              <div
                className="rounded-2xl px-3.5 py-3"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{
                        background: 'rgba(245,245,245,0.5)',
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={finRef} />
        </div>

        <div
          className="flex items-center gap-2 border-t px-3 py-3"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <input
            ref={entradaRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') enviar()
            }}
            placeholder="Escribe tu mensaje…"
            maxLength={2000}
            className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#f5f5f5',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
          <button
            onClick={enviar}
            disabled={enviando || !texto.trim()}
            aria-label="Enviar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-40"
            style={{ background: 'var(--accent)' }}
          >
            <Send className="h-4 w-4" style={{ color: '#0b0b16' }} />
          </button>
        </div>
      </div>
    </div>
  )
}
