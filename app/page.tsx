"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence, useScroll, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Brain,
  FileText,
  Mail,
  Phone,
  PhoneCall,
  RefreshCw,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react'

// ─────────────── DATOS ───────────────

const SERVICIOS = [
  {
    icon: PhoneCall,
    title: 'Agente de Voz y WhatsApp 24/7',
    desc: 'Nunca más una llamada sin contestar. El agente atiende, filtra y agenda visitas automáticamente.',
    roi: '-80% llamadas perdidas',
    color: '#D4AF37',
  },
  {
    icon: FileText,
    title: 'Automatización de Facturación',
    desc: 'Extrae, registra y procesa facturas y albaranes sin que tu equipo toque un teclado.',
    roi: '-5h/semana en back-office',
    color: '#E7C86A',
  },
  {
    icon: Mail,
    title: 'Agente de Email con IA',
    desc: 'Clasifica, prioriza y redacta borradores. Tu bandeja de entrada deja de ser un caos.',
    roi: '30% tiempo recuperado',
    color: '#C9A227',
  },
  {
    icon: RefreshCw,
    title: 'Reactivación de Clientes',
    desc: 'Detecta clientes dormidos y lanza secuencias personalizadas de seguimiento automático.',
    roi: '+25% ventas recurrentes',
    color: '#F0D060',
  },
  {
    icon: Bot,
    title: 'Agente Documental (PDFs)',
    desc: 'Lee contratos, informes y formularios. Extrae los datos que necesitas en segundos.',
    roi: '-90% tiempo extracción datos',
    color: '#B8960C',
  },
  {
    icon: Brain,
    title: 'Soluciones a Medida',
    desc: 'Si tu proceso no encaja en un molde estándar, lo diseñamos contigo desde cero.',
    roi: 'Presupuesto personalizado',
    color: '#E2B83A',
  },
]

const PILARES = [
  {
    titulo: 'Implementación en días',
    detalle: 'No meses. No pilotos eternos. En producción desde la primera semana.',
    icon: Zap,
  },
  {
    titulo: 'Sin equipo técnico',
    detalle: 'Tu equipo no necesita saber nada de tecnología. Nosotros lo montamos todo.',
    icon: Brain,
  },
  {
    titulo: 'Sistemas a medida',
    detalle: 'No revendemos software. Diseñamos el sistema que encaja con tu operativa real.',
    icon: RefreshCw,
  },
  {
    titulo: 'Resultados medibles',
    detalle: 'Menos tareas manuales, más control. Lo ves desde el primer día.',
    icon: FileText,
  },
]

const DEMOS = [
  {
    title: 'Agente Documental',
    desc: 'Extrae datos de facturas y PDFs en tiempo real.',
    src: '/videos/video-1.mp4',
  },
  {
    title: 'Agente Email',
    desc: 'Clasifica y responde emails con IA.',
    src: '/videos/video-2.mp4',
  },
  {
    title: 'Agente WhatsApp',
    desc: 'Atiende y agenda por WhatsApp sin intervención humana.',
    src: '/videos/video-3.mp4',
  },
]

const SECTORES = [
  {
    title: 'Clínicas y Salud',
    desc: 'Recepción, citas, documentación clínica y recordatorios sin saturar al equipo.',
    img: '/images/agente-voz-ia-clinica-medica.jpg',
  },
  {
    title: 'Asesorías y Despachos',
    desc: 'Back-office automatizado: facturas, declaraciones y seguimiento de clientes.',
    img: '/images/backoffice-automatizado-facturas-crm.jpg',
  },
  {
    title: 'Inmobiliarias',
    desc: 'Captación de leads, respuesta inmediata y agendado de visitas 24/7.',
    img: '/images/agente-voz-ia-clinica-medica.jpg',
  },
  {
    title: 'E-commerce',
    desc: 'Pedidos, incidencias y soporte posventa sin contratar más personal.',
    img: '/images/backoffice-automatizado-facturas-crm.jpg',
  },
  {
    title: 'Restaurantes y Hostelería',
    desc: 'Reservas, consultas y gestión de proveedores automatizados.',
    img: '/images/equipo-reunion.jpg',
  },
  {
    title: 'Cualquier PYME',
    desc: 'Si tienes procesos repetitivos, tenemos un agente que los elimina.',
    img: '/images/dashboard.png',
  },
]

const PASOS = [
  {
    n: '01',
    title: 'Diagnóstico gratuito (30 min)',
    desc: 'Analizamos tu operativa y detectamos qué tareas se pueden automatizar hoy mismo.',
  },
  {
    n: '02',
    title: 'Configuración express del agente',
    desc: 'Montamos el agente adaptado a tus procesos, herramientas y canales en uso.',
  },
  {
    n: '03',
    title: 'Integración con tus canales',
    desc: 'Conectamos con WhatsApp, email, CRM, Google Drive o lo que uses cada día.',
  },
  {
    n: '04',
    title: 'En producción — día 7',
    desc: 'Tu agente ya trabaja. Nosotros monitorizamos y ajustamos. Tú recuperas tiempo.',
  },
]

const HERO_PARTICLES = [
  { left: '12%', top: '22%', size: 3, duration: 4.2, delay: 0 },
  { left: '88%', top: '18%', size: 2, duration: 5.1, delay: 0.7 },
  { left: '7%', top: '68%', size: 4, duration: 3.6, delay: 1.1 },
  { left: '78%', top: '72%', size: 2, duration: 4.8, delay: 0.4 },
  { left: '48%', top: '12%', size: 3, duration: 5.5, delay: 0.9 },
  { left: '62%', top: '88%', size: 2, duration: 4.0, delay: 1.5 },
  { left: '33%', top: '52%', size: 3, duration: 5.2, delay: 0.2 },
  { left: '92%', top: '45%', size: 2, duration: 3.9, delay: 1.3 },
  { left: '22%', top: '82%', size: 2, duration: 4.6, delay: 0.6 },
  { left: '70%', top: '35%', size: 3, duration: 4.3, delay: 1.8 },
]

const METRICAS = [
  { value: 15, suffix: 'h/sem', prefix: '+', label: 'Horas recuperadas de media' },
  { value: 80, suffix: '%', prefix: '−', label: 'Reducción llamadas perdidas' },
  { value: 7, suffix: ' días', prefix: '', label: 'Tiempo hasta producción' },
  { value: 25, suffix: '%', prefix: '+', label: 'Más ventas recurrentes' },
]

const TICKER_ITEMS = [
  '−80% llamadas perdidas',
  '+25% ventas recurrentes',
  '−5h/semana back-office',
  '−90% tiempo extracción datos',
  'En producción en 7 días',
  '30% tiempo recuperado',
  'Sin código. Sin interrumpir tu negocio',
  'Agentes IA 24/7',
]

// ─────────────── UTILS ───────────────

function useCounter(to: number, isInView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start: number | null = null
    const duration = 2200
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(to)
    }
    requestAnimationFrame(step)
  }, [isInView, to])
  return count
}

function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCounter(value, inView)
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('es-ES')}{suffix}
    </span>
  )
}

function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─────────────── PAGE ───────────────

// ─────────────── EFECTOS GLOBALES ───────────────

function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0
    const mouse = { x: -9999, y: -9999 }

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    function build() {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(120, Math.max(46, Math.floor((w * h) / 13000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.8,
      }))
    }

    const LINK = 165
    const MOUSE_LINK = 230

    function frame() {
      ctx!.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d = Math.hypot(dx, dy)
        if (d < 150 && d > 0.1) {
          n.x += (dx / d) * 0.45
          n.y += (dy / d) * 0.45
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK) {
            const o = (1 - dist / LINK) * 0.7
            ctx!.strokeStyle = `rgba(212,175,55,${o})`
            ctx!.lineWidth = 0.8
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < MOUSE_LINK) {
          const o = (1 - dm / MOUSE_LINK) * 0.85
          ctx!.strokeStyle = `rgba(245,224,138,${o})`
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.stroke()
        }
      }

      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < MOUSE_LINK
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2)
        ctx!.fillStyle = near ? 'rgba(245,224,138,1)' : 'rgba(231,200,106,0.85)'
        if (near) {
          ctx!.shadowColor = 'rgba(245,224,138,0.9)'
          ctx!.shadowBlur = 8
        } else {
          ctx!.shadowBlur = 0
        }
        ctx!.fill()
      }
      ctx!.shadowBlur = 0

      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onResize = () => { build() }
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduce) raf = requestAnimationFrame(frame)
    }

    build()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    if (reduce) frame()
    else raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1, opacity: 1 }}
    />
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-0.5 origin-left"
      style={{ scaleX, background: 'linear-gradient(to right, #D4AF37, #E7C86A, #F5E08A)' }}
    />
  )
}

function CursorSpotlight() {
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const background = useMotionTemplate`radial-gradient(700px circle at ${springX}px ${springY}px, rgba(212,175,55,0.055) 0%, transparent 65%)`

  useEffect(() => {
    const update = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', update)
    return () => window.removeEventListener('mousemove', update)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ background }}
    />
  )
}

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{ borderColor: 'rgba(212,175,55,0.18)', background: 'rgba(212,175,55,0.04)' }}
    >
      <div className="ticker-track flex gap-14 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent-light)' }}>
            <span style={{ color: 'var(--accent)', opacity: 0.7 }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function MetricasStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="py-16" style={{ background: 'rgba(5,5,16,0.7)' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {METRICAS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2"
            >
              <div className="text-4xl sm:text-5xl font-black gradient-text tabular-nums">
                <Counter value={m.value} suffix={m.suffix} prefix={m.prefix} />
              </div>
              <p className="text-sm font-medium" style={{ color: 'rgba(245,245,245,0.5)' }}>{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────── FORMULARIO ───────────────

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-3xl p-10 text-center" style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.3)' }}>
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-light)' }}>¡Recibido!</h3>
        <p className="text-sm" style={{ color: 'rgba(245,245,245,0.65)' }}>
          Nos ponemos en contacto contigo en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-10 space-y-5" style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.2)' }}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent-light)' }}>Diagnóstico gratuito</p>
        <h3 className="text-2xl font-black">Cuéntanos tu caso</h3>
      </div>
      {[
        { id: 'name', label: 'Nombre *', type: 'text', placeholder: 'Tu nombre', required: true },
        { id: 'email', label: 'Email *', type: 'email', placeholder: 'tu@empresa.com', required: true },
        { id: 'phone', label: 'Teléfono', type: 'tel', placeholder: '600 000 000', required: false },
      ].map(f => (
        <div key={f.id}>
          <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(245,245,245,0.55)' }}>{f.label}</label>
          <input
            type={f.type}
            required={f.required}
            placeholder={f.placeholder}
            value={form[f.id as keyof typeof form]}
            onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f5f5f0' }}
          />
        </div>
      ))}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(245,245,245,0.55)' }}>¿Qué procesos quieres automatizar?</label>
        <textarea
          rows={3}
          placeholder="Ej: facturas manuales, emails sin leer, llamadas sin atender..."
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f5f5f0' }}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full py-4 text-sm font-bold text-black transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: 'var(--accent)' }}
      >
        {status === 'loading' ? 'Enviando...' : 'Quiero el diagnóstico gratuito →'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-center text-red-400">Error al enviar. Llámanos al 858 215 026.</p>
      )}
    </form>
  )
}

// ─────────────── CHATBOT ───────────────

const CHAT_SYSTEM = `Eres Aria, la asesora virtual de SendaIA. No eres un bot de FAQ: eres una consultora que de verdad AYUDA y resuelve dudas en la propia conversación. SendaIA diseña e implementa sistemas de automatización con inteligencia artificial para PYMEs españolas (con base en Granada).

## Tu objetivo
Que la persona salga del chat habiendo entendido EXACTAMENTE cómo la IA puede ayudar a su caso concreto, qué solución encaja y cómo funcionaría. Aporta valor real antes de pedir nada. NUNCA respondas "ponte en contacto con nosotros" o "solicita información" como salida fácil: eso es justo lo que NO debes hacer. Responde tú.

## Cómo conversar
1. Si te cuentan su negocio o su problema, primero entiéndelo: haz 1 pregunta breve si te falta info clave (sector, qué tarea les quita tiempo, volumen aproximado).
2. Recomienda la solución concreta que encaja y explica en 2-3 pasos sencillos cómo funcionaría en SU caso. Sé específica, usa su sector.
3. Cierra con el siguiente paso natural: el diagnóstico gratuito de 30 min (donde se afina todo y se da el presupuesto). Ofrece recoger aquí mismo su nombre + email o teléfono para que el equipo le contacte.

## Captura de contacto (IMPORTANTE)
Tienes una herramienta llamada "registrar_lead". En cuanto el usuario te dé su nombre y un email o teléfono mostrando interés, LLÁMALA para registrarlo en el CRM (no digas que lo harás "manualmente" ni le mandes solo al formulario: regístralo tú). Si te falta el nombre o el contacto, pídelo de forma natural antes de registrar. Tras registrarlo, confírmalo con calidez y dile que el equipo le contactará en menos de 24 h. Si la herramienta falla, discúlpate y ofrece el teléfono 858 215 026 o el formulario de la web.

## Qué hace SendaIA (recomienda lo que encaje)
- Agente de voz IA que atiende llamadas 24/7, filtra y agenda citas (Retell + Zadarma). Ideal para clínicas, inmobiliarias, despachos que pierden llamadas.
- Agente de WhatsApp/web que responde, cualifica leads y agenda sin intervención humana.
- Automatización documental / facturas: lee PDFs y extrae datos (nº, fecha, importe, IVA) a Excel/Sheets o contabilidad.
- Agente de email: clasifica, prioriza y redacta borradores.
- Reactivación de clientes dormidos con secuencias automáticas.
- CRM y automatizaciones a medida (n8n). Integra Google Sheets, Calendar, Drive, WhatsApp Business, APIs.

## Precios — IMPORTANTE
NUNCA des cifras, rangos ni "desde X€". El presupuesto siempre es personalizado y lo da el equipo tras conocer el caso, porque depende del alcance real. Si te preguntan el precio, explícalo con naturalidad y sin incomodar: cada proyecto se presupuesta a medida en el diagnóstico gratuito (sin compromiso), el presupuesto se cierra antes de empezar, no hay costes ocultos ni permanencia que ate. Lo que sí puedes decir: que se trabaja con un setup inicial + un mantenimiento mensual opcional, y que la auditoría inicial es sin compromiso. Reconduce siempre al diagnóstico para darle un número ajustado a su caso. No inventes precios bajo ningún concepto.

## Proceso
Diagnóstico gratuito (30 min) → configuración → integración con tus canales → en producción en ~7 días.

## Tono y estilo
"Autoridad tranquila": cercana, clara, sin humo ni tecnicismos. Nada de promesas mágicas ni de "revolucionar tu negocio". Español de España. Respuestas útiles de 3 a 6 frases (usa alguna lista corta si ayuda). Si no sabes un dato exacto, dilo con honestidad y reconduce al diagnóstico, sin inventar.

## Datos de contacto
Teléfono / agente de voz: 858 215 026 · Email: info@sendaia.es · Instagram: instagram.com/sendaia.es · LinkedIn: linkedin.com/company/sendaia · Granada, España.`

// Avatar de Aria — orbe dorado vivo, reutilizable en launcher y cabecera
function AriaAvatar({ size = 44 }: { size?: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 30% 25%, #FBE7A6 0%, #E7C86A 35%, #D4AF37 70%, #A8830F 100%)',
        boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.6), 0 0 18px rgba(212,175,55,0.45)',
      }}
    >
      <span
        className="absolute rounded-full"
        style={{ inset: 3, border: '1px solid rgba(255,255,255,0.35)' }}
      />
      <Sparkles size={size * 0.42} strokeWidth={2.2} style={{ color: '#3a2c05' }} />
    </span>
  )
}

function AssistantDock() {
  // ── Chat (Aria) ──
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hola, soy Aria 👋 la asistente IA de SendaIA. Cuéntame qué te gustaría automatizar y te oriento al momento.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [nudge, setNudge] = useState(true)
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
    const t = setTimeout(() => setNudge(false), 7000)
    return () => clearTimeout(t)
  }, [])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }], system: CHAT_SYSTEM }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content || 'Lo siento, no pude procesar tu mensaje.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Llámanos al 858 215 026.' }])
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
            className="fixed bottom-28 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 rounded-3xl overflow-hidden flex flex-col"
            style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.35)', maxHeight: '70vh', boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(212,175,55,0.12)' }}
          >
            <div className="flex items-center gap-3 px-5 py-4" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.04))', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
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
                      ? { background: 'var(--accent)', color: '#000', borderBottomRightRadius: 4 }
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
                className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', color: '#f5f5f0', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="flex items-center justify-center rounded-xl w-11 text-black transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: 'var(--accent)' }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DOCK DE ASISTENTES ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Agente de voz */}
        <motion.button
          onClick={vActive ? endCall : startCall}
          disabled={vStatus === 'connecting'}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-3 rounded-full py-2 pl-5 pr-2 backdrop-blur-md disabled:opacity-70"
          style={{
            background: vActive ? 'rgba(239,68,68,0.15)' : 'rgba(16,16,18,0.75)',
            border: `1px solid ${vActive ? 'rgba(239,68,68,0.5)' : 'rgba(212,175,55,0.35)'}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
          title="Llamar al agente de voz IA"
        >
          <span className="hidden sm:flex flex-col text-right leading-tight">
            <span className="text-[13px] font-bold" style={{ color: vActive ? '#fca5a5' : '#f5f5f0' }}>
              {vActive ? 'En llamada' : 'Agente de voz'}
            </span>
            <span className="text-[11px]" style={{ color: vActive ? 'rgba(252,165,165,0.8)' : 'var(--accent-light)' }}>
              {vStatus === 'connecting' ? 'Conectando…' : vActive ? 'Pulsa para colgar' : 'Llámanos · IA 24/7'}
            </span>
          </span>
          <span
            className="relative flex h-11 w-11 items-center justify-center rounded-full"
            style={{ background: vActive ? '#ef4444' : 'linear-gradient(135deg, #D4AF37, #E7C86A)', color: vActive ? '#fff' : '#1a1405' }}
          >
            {vBusy && (
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ background: vActive ? '#ef4444' : '#D4AF37' }}
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
            background: 'rgba(16,16,18,0.75)',
            border: '1px solid rgba(212,175,55,0.45)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.15)',
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
                style={{ background: '#D4AF37' }}
              />
            )}
            {open ? (
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #D4AF37, #E7C86A)', color: '#1a1405' }}>
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

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [muted, setMuted] = useState(true)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    setMuted((m) => {
      if (heroVideoRef.current) heroVideoRef.current.muted = !m
      return !m
    })
  }

  return (
    <main className="min-h-screen" style={{ background: 'transparent', color: 'var(--foreground)' }}>
      <NeuralField />
      <div className="grain" />
      <ScrollProgress />
      <CursorSpotlight />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="SendaIA"
              width={160}
              height={48}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="hidden items-center gap-8 text-sm md:flex" style={{ color: 'rgba(245,245,245,0.65)' }}>
            <Link href="#servicios" className="transition-colors hover:text-white">Servicios</Link>
            <Link href="#sectores" className="transition-colors hover:text-white">Sectores</Link>
            <Link href="#proceso" className="transition-colors hover:text-white">Proceso</Link>
            <Link href="#contacto" className="transition-colors hover:text-white">Contacto</Link>
          </div>
          <a
            href="#contacto"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            Diagnóstico gratuito
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <video
          ref={heroVideoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(5,5,16,0.72) 0%, rgba(5,5,16,0.55) 50%, rgba(5,5,16,0.90) 100%)', zIndex: 1 }}
        />

        {HERO_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: 'var(--accent)',
              boxShadow: `0 0 ${p.size * 5}px var(--accent)`,
              zIndex: 2,
            }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--accent-light)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              Automatización con IA para PYMEs
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Recupera{' '}
            <span className="gradient-text-animated">horas cada semana</span>
            <br />con Agentes de IA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8"
            style={{ color: 'rgba(245,245,245,0.75)' }}
          >
            Sin código. Sin interrumpir tu negocio. A tu ritmo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#contacto"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: 'var(--accent)', boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
            >
              Agenda tu diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="#demos"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Ver cómo funciona ↓
            </Link>
          </motion.div>
        </div>

        <motion.button
          onClick={toggleMute}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-8 z-10 flex items-center gap-2 rounded-full px-4 py-2.5 transition-all hover:scale-105"
          style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', backdropFilter: 'blur(8px)' }}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          {muted
            ? <><VolumeX className="h-4 w-4" style={{ color: 'var(--accent-light)' }} /><span className="text-xs font-medium" style={{ color: 'var(--accent-light)' }}>Activar sonido</span></>
            : <><Volume2 className="h-4 w-4" style={{ color: 'var(--accent-light)' }} /><span className="text-xs font-medium" style={{ color: 'var(--accent-light)' }}>Silenciar</span></>
          }
        </motion.button>
      </section>

      <Ticker />

      {/* ── EL PROBLEMA ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>El problema real</p>
            <h2 className="text-3xl font-black sm:text-5xl">Las PYMEs pierden{' '}
              <span className="gradient-text">30.000€/año</span>
              <br />en tareas repetitivas
            </h2>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <Image
                  src="/images/caos.jpg"
                  alt="Caos administrativo en PYMEs"
                  width={640}
                  height={420}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end p-6" style={{ background: 'linear-gradient(to top, rgba(5,5,16,0.9) 0%, transparent 60%)' }}>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-1">Sin automatización</p>
                    <ul className="space-y-1 text-sm" style={{ color: 'rgba(245,245,245,0.8)' }}>
                      <li>❌ Llamadas sin atender cada día</li>
                      <li>❌ Emails sin leer acumulándose</li>
                      <li>❌ Facturas introducidas a mano</li>
                      <li>❌ Tu equipo haciendo trabajo de máquina</li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-3xl" style={{ border: '1px solid rgba(212,175,55,0.3)' }}>
                <Image
                  src="/images/dashboard.png"
                  alt="Dashboard SendaIA automatizado"
                  width={640}
                  height={420}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end p-6" style={{ background: 'linear-gradient(to top, rgba(5,5,16,0.9) 0%, transparent 60%)' }}>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--accent-light)' }}>Con SendaIA</p>
                    <ul className="space-y-1 text-sm" style={{ color: 'rgba(245,245,245,0.8)' }}>
                      <li>✅ Agentes trabajando 24/7</li>
                      <li>✅ Cero tareas repetitivas en tu equipo</li>
                      <li>✅ Datos procesados en segundos</li>
                      <li>✅ 15+ horas semanales recuperadas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <MetricasStrip />

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="py-20 sm:py-28" style={{ background: 'rgba(13,13,26,0.6)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Nuestros servicios</p>
            <h2 className="text-3xl font-black sm:text-5xl max-w-3xl">
              6 agentes que eliminan el trabajo<br />
              <span className="gradient-text">que más tiempo te roba</span>
            </h2>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -6, boxShadow: '0 0 40px rgba(212,175,55,0.18), 0 20px 50px rgba(0,0,0,0.4)', borderColor: 'rgba(212,175,55,0.4)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="rounded-2xl p-6 h-full flex flex-col"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${s.color}22`, color: s.color }}
                  >
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold">{s.title}</h3>
                  <p className="flex-1 text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{s.desc}</p>
                  <div
                    className="mt-5 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: `${s.color}18`, color: s.color }}
                  >
                    {s.roi}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ SENDAIA ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Por qué SendaIA</p>
            <h2 className="text-3xl font-black sm:text-5xl">
              La diferencia no es trabajar más.<br />
              <span className="gradient-text">Es tener sistemas.</span>
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((p, i) => (
              <FadeIn key={p.titulo} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 0 40px rgba(212,175,55,0.06)' }}
                >
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--accent)' }}
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 font-bold text-lg gradient-text">{p.titulo}</h3>
                  <p className="text-sm leading-6 flex-1" style={{ color: 'rgba(245,245,245,0.6)' }}>{p.detalle}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO EN VIVO ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8"
              style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.35)', boxShadow: '0 0 60px rgba(212,175,55,0.1)' }}
            >
              <div className="flex-1">
                <span
                  className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                  style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--accent-light)' }}
                >
                  Demo interactiva en vivo
                </span>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Sube una factura en PDF.<br />
                  <span className="gradient-text">La IA extrae los datos en segundos.</span>
                </h2>
                <p className="mt-4 text-sm leading-7" style={{ color: 'rgba(245,245,245,0.65)' }}>
                  Sin instalar nada. Sin formularios. Arrastra el PDF y ve cómo el sistema identifica número, fecha, importe, IVA y empresa — listo para tu contabilidad.
                </p>
                <a
                  href="https://demo-pedidos-legumbre-espino.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
                >
                  Probar demo ahora <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div
                className="w-full sm:w-72 shrink-0 rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <div className="p-4 text-xs font-mono space-y-2" style={{ background: '#0a0a0a' }}>
                  <p style={{ color: 'rgba(245,245,245,0.35)' }}>📄 factura_proveedor_mayo.pdf</p>
                  <div className="h-px" style={{ background: 'rgba(212,175,55,0.15)' }} />
                  <div className="space-y-1.5">
                    {[
                      ['Nº factura', 'F-2026-0483'],
                      ['Fecha', '15/05/2026'],
                      ['Empresa', 'Suministros García SL'],
                      ['Base imp.', '1.240,00 €'],
                      ['IVA 21%', '260,40 €'],
                      ['Total', '1.500,40 €'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span style={{ color: 'rgba(245,245,245,0.4)' }}>{k}</span>
                        <span className="font-semibold" style={{ color: 'var(--accent-light)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-px" style={{ background: 'rgba(212,175,55,0.15)' }} />
                  <p className="text-center text-xs" style={{ color: '#4ade80' }}>✓ Extraído automáticamente</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DEMOS EN VÍDEO ── */}
      <section id="demos" className="py-20 sm:py-28" style={{ background: 'rgba(13,13,26,0.6)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Demos en acción</p>
            <h2 className="text-3xl font-black sm:text-5xl max-w-2xl">
              Así se ve el sistema<br />trabajando por ti
            </h2>
          </FadeIn>

          <div className="flex gap-3 mb-8 flex-wrap">
            {DEMOS.map((d, i) => (
              <button
                key={d.title}
                onClick={() => setActiveTab(i)}
                className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                style={{
                  background: activeTab === i ? 'var(--accent)' : 'var(--card)',
                  color: activeTab === i ? '#fff' : 'rgba(245,245,245,0.6)',
                  border: activeTab === i ? '1px solid var(--accent)' : '1px solid var(--border)',
                }}
              >
                {d.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-3xl"
              style={{ border: '1px solid rgba(212,175,55,0.25)', boxShadow: '0 0 60px rgba(212,175,55,0.15)' }}
            >
              <div className="p-6 pb-0" style={{ background: 'var(--card)' }}>
                <p className="font-bold text-lg">{DEMOS[activeTab].title}</p>
                <p className="mt-1 text-sm" style={{ color: 'rgba(245,245,245,0.6)' }}>{DEMOS[activeTab].desc}</p>
              </div>
              <video
                key={DEMOS[activeTab].src}
                src={DEMOS[activeTab].src}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-video"
                style={{ background: '#000' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── SECTORES ── */}
      <section id="sectores" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Por sector</p>
            <h2 className="text-3xl font-black sm:text-5xl max-w-3xl">
              Tu sector ya tiene<br />
              <span className="gradient-text">su agente personalizado</span>
            </h2>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 0 35px rgba(212,175,55,0.14), 0 20px 40px rgba(0,0,0,0.35)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group overflow-hidden rounded-2xl"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,26,0.95) 0%, rgba(13,13,26,0.3) 100%)' }} />
                  </div>
                  <div className="p-5" style={{ background: 'var(--card)' }}>
                    <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{s.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section id="proceso" className="py-20 sm:py-28" style={{ background: 'rgba(13,13,26,0.6)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Cómo funciona</p>
            <h2 className="text-3xl font-black sm:text-5xl">Así funciona<br />
              <span className="gradient-text">el proceso</span>
            </h2>
          </FadeIn>

          <div className="relative grid gap-6 lg:grid-cols-4">
            <div
              className="absolute top-10 left-0 right-0 h-px hidden lg:block"
              style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), rgba(231,200,106,0.4), transparent)' }}
            />
            {PASOS.map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.12}>
                <div className="relative rounded-2xl p-6 h-full" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div
                    className="mb-5 flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    {p.n}
                  </div>
                  <h3 className="mb-3 font-bold text-lg">{p.title}</h3>
                  <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO + FORMULARIO ── */}
      <section id="contacto" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">

            <FadeIn>
              <div className="relative overflow-hidden rounded-3xl h-full min-h-[400px]">
                <Image src="/images/equipo-reunion.jpg" alt="Equipo SendaIA" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(212,175,55,0.55) 100%)' }} />
                <div className="relative z-10 p-10 flex flex-col justify-end h-full">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Empieza hoy</p>
                  <h2 className="text-3xl font-black sm:text-4xl mb-4">¿Listo para recuperar tu tiempo?</h2>
                  <p className="text-sm leading-7 mb-6" style={{ color: 'rgba(245,245,245,0.7)' }}>
                    30 minutos de diagnóstico. Analizamos tu operativa real y te decimos qué procesos se pueden automatizar ahora mismo.
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--accent-light)' }}>
                    Sin compromiso. Sin tecnicismos. Sin promesas mágicas.
                  </p>
                  <a href="tel:+34858215026" className="mt-6 inline-flex items-center gap-2 text-sm" style={{ color: 'rgba(245,245,245,0.55)' }}>
                    <Phone className="h-4 w-4" /> 858 215 026
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>

      <AssistantDock />

      {/* ── FOOTER ── */}
      <footer className="border-t py-12" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Image
                src="/images/logo.png"
                alt="SendaIA"
                width={140}
                height={42}
                className="h-9 w-auto object-contain"
              />
              <p className="mt-3 text-sm" style={{ color: 'rgba(245,245,245,0.45)' }}>
                Automatización administrativa con IA para PYMEs
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'rgba(245,245,245,0.55)' }}>
              <a href="tel:+34858215026" className="transition-colors hover:text-white flex items-center gap-2">
                <Phone className="h-4 w-4" /> 858 215 026
              </a>
              <a
                href="https://www.instagram.com/sendaia.es"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/sendaia"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--border)', color: 'rgba(245,245,245,0.3)', fontSize: '0.75rem' }}>
            © 2026 SendaIA · Todos los derechos reservados
          </div>
        </div>
      </footer>

    </main>
  )
}
