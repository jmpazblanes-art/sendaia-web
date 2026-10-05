"use client"

// Dock de asistentes de la web: Aria (chat) y el agente de voz (Retell).
// Extraído TAL CUAL de la home anterior (05-oct-2026, rediseño): la lógica de
// llamada, chat, sesión y avisos no se ha tocado. Lo único añadido es que
// escucha dos eventos de ventana para que las tarjetas de la home puedan
// dispararlo: `sendaia:voz` (inicia/cuelga la llamada) y `sendaia:aria` (abre el chat).

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneCall, Send, Sparkles, X } from 'lucide-react'

// Avatar de Aria — orbe dorado vivo, reutilizable en launcher y cabecera
function AriaAvatar({ size = 44 }: { size?: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 30% 25%, #EBC4A6 0%, #D08F66 35%, #B8734A 70%, #8A5232 100%)',
        boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.6), 0 0 18px rgba(184,115,74,0.45)',
      }}
    >
      <span
        className="absolute rounded-full"
        style={{ inset: 3, border: '1px solid rgba(255,255,255,0.35)' }}
      />
      <Sparkles size={size * 0.42} strokeWidth={2.2} style={{ color: '#FAF8F5' }} />
    </span>
  )
}

function AssistantDock() {
  // ¿Está la sección de contacto en pantalla? Si lo está, el dock se aparta para
  // no taparle al visitante el formulario (ni el enlace a la privacidad).
  // Se aparta en DOS sitios: sobre el hero (tapaba "Agenda tu diagnóstico" y
  // "Ver cómo funciona") y sobre el formulario de contacto. En medio sí se ve.
  // Por scroll y no con IntersectionObserver: el dock se monta antes que el hero,
  // así que al correr el efecto los nodos aún no existen y el observer se quedaba
  // sin observar nada (dejaba el dock oculto en toda la página).
  const [contactoVisible, setContactoVisible] = useState(false)
  const [esDispositivoMovil, setEsDispositivoMovil] = useState(false)

  useEffect(() => {
    const comprobar = () => {
      const movil = typeof window !== "undefined" && (/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768)
      setEsDispositivoMovil(movil)
    }
    comprobar()
    window.addEventListener("resize", comprobar)
    return () => window.removeEventListener("resize", comprobar)
  }, [])

  useEffect(() => {
    const calcular = () => {
      const y = window.scrollY
      const alto = window.innerHeight
      const doc = document.documentElement.scrollHeight
      const enContacto = y + alto > doc - alto * 0.6
      setContactoVisible(enContacto)
    }
    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [])

  // ── Chat (Aria) ──
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hola, soy Aria 👋 la asistente IA de SendaIA. Cuéntame qué te gustaría automatizar y te oriento al momento.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  // Identifica la conversación sin pedirle el teléfono al visitante.
  const [sesionChat] = useState(() => {
    if (typeof window === 'undefined') return 'servidor'
    const g = sessionStorage.getItem('sendaia_chat_sesion')
    if (g) return g
    const n = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('sendaia_chat_sesion', n)
    return n
  })
  const [nudge, setNudge] = useState(true)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // ── Voz (Retell) ──
  const [vStatus, setVStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const retellClientRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [RetellWebClient, setRetellWebClient] = useState<any>(null)

  useEffect(() => {
    import('retell-client-js-sdk').then((mod) => setRetellWebClient(() => mod.RetellWebClient))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    const t1 = setTimeout(() => setNudge(false), 7000)
    const t2 = setTimeout(() => {
      if (!open && !tooltipDismissed) setTooltipVisible(true)
    }, 4500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [open, tooltipDismissed])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)
    try {
      // Aria habla con el MISMO cerebro que el agente de WhatsApp (03-ago-2026):
      // mismo prompt comercial, misma regla de no dar precios, y puede consultar
      // huecos reales y cerrar una cita en el calendario. Antes usaba /api/chat
      // (gpt-4o-mini con prompt propio), que no tenía memoria ni herramientas.
      const res = await fetch('https://whatsapp-sendaia.vercel.app/api/chat-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: text,
          sesion: sesionChat,
          // El saludo de bienvenida no lo dijo el visitante: fuera del historial.
          historial: messages.slice(1).map(m => ({ rol: m.role, contenido: m.content })),
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.respuesta || 'Lo siento, no pude procesar tu mensaje.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Escríbenos por WhatsApp al 627 25 69 96 o llámanos al 858 215 026.' }])
    }
    setLoading(false)
  }

  async function startCall() {
    if (!RetellWebClient) return
    setVStatus('connecting')
    try {
      const res = await fetch('/api/voice', { method: 'POST' })
      const data = await res.json()
      if (!data.access_token) throw new Error('No token')
      const client = new RetellWebClient()
      retellClientRef.current = client
      client.on('call_started', () => setVStatus('active'))
      client.on('call_ended', () => { setVStatus('idle'); retellClientRef.current = null })
      client.on('error', () => { setVStatus('error'); retellClientRef.current = null })
      await client.startCall({ accessToken: data.access_token })
    } catch {
      setVStatus('error')
      setTimeout(() => setVStatus('idle'), 3000)
    }
  }

  function endCall() {
    retellClientRef.current?.stopCall()
    setVStatus('idle')
    retellClientRef.current = null
  }

  const handleVoiceCall = () => {
    if (typeof window !== "undefined") {
      const esMovil = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
      if (esMovil) {
        window.location.href = "tel:+34858215026"
        return
      }
    }
    if (vActive) {
      endCall()
    } else {
      startCall()
    }
  }

  // Puente con las tarjetas de la home: disparan la MISMA llamada y el MISMO chat
  // que los botones del dock, sin duplicar la integración.
  const vozRef = useRef(handleVoiceCall)
  useEffect(() => { vozRef.current = handleVoiceCall })
  useEffect(() => {
    const alPedirVoz = () => vozRef.current()
    const alPedirAria = () => { setOpen(true); setNudge(false); setTooltipVisible(false) }
    window.addEventListener('sendaia:voz', alPedirVoz)
    window.addEventListener('sendaia:aria', alPedirAria)
    return () => {
      window.removeEventListener('sendaia:voz', alPedirVoz)
      window.removeEventListener('sendaia:aria', alPedirAria)
    }
  }, [])
  // Las tarjetas pintan el estado real de la llamada (conectando / en llamada).
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('sendaia:voz-estado', { detail: vStatus }))
  }, [vStatus])

  const vActive = vStatus === 'active'
  const vBusy = vStatus === 'connecting' || vStatus === 'active'
  const vLabel = { idle: 'Habla con nuestro agente', connecting: 'Conectando…', active: 'En llamada · Colgar', error: 'Reintentar' }[vStatus]

  return (
    <>
      {/* ── PANEL DE CHAT DE ARIA ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-3xl overflow-hidden flex flex-col"
            style={{ background: '#173A4A', color: '#FAF8F5', border: '1px solid rgba(184,115,74,0.35)', maxHeight: '70vh', boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(184,115,74,0.12)' }}
          >
            <div className="flex items-center gap-3 px-5 py-4" style={{ background: 'linear-gradient(135deg, rgba(184,115,74,0.18), rgba(184,115,74,0.04))', borderBottom: '1px solid rgba(184,115,74,0.2)' }}>
              <AriaAvatar size={40} />
              <div className="flex-1">
                <p className="font-bold text-sm leading-tight">Aria</p>
                <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--accent-light)' }}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Asistente IA · responde al instante
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-white/50 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'assistant' && <AriaAvatar size={26} />}
                  <div
                    className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[80%]"
                    style={m.role === 'user'
                      ? { background: 'var(--accent)', color: '#FAF8F5', borderBottomRightRadius: 4 }
                      : { background: 'rgba(255,255,255,0.07)', color: '#f5f5f0', borderBottomLeftRadius: 4 }
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <AriaAvatar size={26} />
                  <div className="rounded-2xl px-4 py-3 flex gap-1" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    {[0, 1, 2].map(d => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: 'var(--accent-light)' }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Escribe a Aria…"
                className="flex-1 rounded-xl px-4 py-2.5 text-base sm:text-sm outline-none focus:ring-1 transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', color: '#f5f5f0', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="flex items-center justify-center rounded-xl w-11 text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: 'var(--accent)' }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DOCK DE ASISTENTES ── */}
      {/* Los flotantes tapaban el formulario en móvil (el enlace a la política de
          privacidad y el aviso de las 24 h). Cuando la sección de contacto está en
          pantalla se apartan: ahí el visitante ya está convirtiendo, no hace falta
          ofrecerle otras tres puertas. */}
      <div
        className={`fixed right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
          contactoVisible ? 'pointer-events-none opacity-0 translate-y-4' : 'opacity-100'
        }`}
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))', color: '#FAF8F5' }}
      >

        {/* Micro-bocadillo gancho de Aria */}
        <AnimatePresence>
          {tooltipVisible && !open && !tooltipDismissed && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-1 flex items-start gap-3 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md max-w-[270px] sm:max-w-xs cursor-pointer"
              style={{
                background: 'rgba(18,46,59,0.98)',
                border: '1px solid rgba(184,115,74,0.4)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 25px rgba(184,115,74,0.15)',
              }}
              onClick={() => {
                setOpen(true)
                setTooltipVisible(false)
                setTooltipDismissed(true)
              }}
            >
              <div className="flex-1">
                <p className="text-xs leading-relaxed" style={{ color: '#f5f5f0' }}>
                  👋 <span className="font-semibold text-white">¿Qué proceso te roba más tiempo?</span> Cuéntamelo aquí y te digo cómo automatizarlo.
                </p>
                <span className="mt-1.5 inline-block text-[11px] font-semibold" style={{ color: 'var(--accent-light)' }}>
                  Abrir chat con Aria →
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setTooltipVisible(false)
                  setTooltipDismissed(true)
                }}
                className="text-white/40 hover:text-white transition-colors p-0.5 rounded-full"
                aria-label="Cerrar aviso"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agente de voz */}
        <motion.button
          onClick={handleVoiceCall}
          disabled={!esDispositivoMovil && vStatus === 'connecting'}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-2.5 sm:gap-3 rounded-full py-2 pl-4 sm:pl-5 pr-2 backdrop-blur-md disabled:opacity-70 cursor-pointer"
          style={{
            background: vActive ? 'rgba(239,68,68,0.15)' : 'rgba(23,58,74,0.96)',
            border: `1px solid ${vActive ? 'rgba(239,68,68,0.5)' : 'rgba(184,115,74,0.35)'}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
          title="Llamar al agente de voz IA"
        >
          <span className="flex flex-col text-right leading-tight">
            <span className="text-[12px] sm:text-[13px] font-bold" style={{ color: vActive ? '#fca5a5' : '#f5f5f0' }}>
              {vActive ? 'En llamada' : 'Agente de voz'}
            </span>
            <span className="text-[10px] sm:text-[11px]" style={{ color: vActive ? 'rgba(252,165,165,0.8)' : 'var(--accent-light)' }}>
              {vStatus === 'connecting' ? 'Conectando…' : vActive ? 'Pulsa para colgar' : 'Llámanos · IA 24/7'}
            </span>
          </span>
          <span
            className="relative flex h-11 w-11 items-center justify-center rounded-full shrink-0"
            style={{ background: vActive ? '#ef4444' : 'linear-gradient(135deg, #B8734A, #C98A62)', color: '#FAF8F5' }}
          >
            {vBusy && !esDispositivoMovil && (
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ background: vActive ? '#ef4444' : '#B8734A' }}
              />
            )}
            {vActive ? (
              <span className="relative z-10 flex items-end gap-[3px] h-4">
                {[0, 1, 2, 3].map(b => (
                  <span key={b} className="eq-bar" style={{ animationDelay: `${b * 0.15}s` }} />
                ))}
              </span>
            ) : (
              <PhoneCall size={20} className="relative z-10" />
            )}
          </span>
        </motion.button>

        {/* Aria — chat IA */}
        <motion.button
          onClick={() => { setOpen(o => !o); setNudge(false) }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-3 rounded-full py-2 pl-5 pr-2 backdrop-blur-md"
          style={{
            background: 'rgba(23,58,74,0.96)',
            border: '1px solid rgba(184,115,74,0.45)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 30px rgba(184,115,74,0.15)',
          }}
          aria-label="Abrir chat con Aria"
        >
          <span className="hidden sm:flex flex-col text-right leading-tight">
            <span className="text-[13px] font-bold">{open ? 'Cerrar chat' : 'Aria'}</span>
            <span className="text-[11px] flex items-center justify-end gap-1.5" style={{ color: 'var(--accent-light)' }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Asistente IA · en línea
            </span>
          </span>
          <span className="relative">
            {nudge && !open && (
              <motion.span
                className="absolute -inset-1 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ background: '#B8734A' }}
              />
            )}
            {open ? (
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #B8734A, #C98A62)', color: '#FAF8F5' }}>
                <X size={20} />
              </span>
            ) : (
              <motion.span
                className="relative z-10 block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <AriaAvatar size={44} />
              </motion.span>
            )}
          </span>
        </motion.button>
      </div>
    </>
  )
}

export default AssistantDock
export { AriaAvatar }
