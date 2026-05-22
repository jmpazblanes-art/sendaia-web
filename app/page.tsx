"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Brain,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  RefreshCw,
  Volume2,
  VolumeX,
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
    <main className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

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
            href="https://demo.sendaia.es/agentes-ia-demo"
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
            <span className="gradient-text">15 horas semanales</span>
            <br />con Agentes de IA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8"
            style={{ color: 'rgba(245,245,245,0.75)' }}
          >
            Implementado en 7 días. Sin código. Sin interrumpir tu negocio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="https://demo.sendaia.es/agentes-ia-demo"
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

        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-10 rounded-full p-3 transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          {muted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        </button>
      </section>

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
                  whileHover={{ scale: 1.03, y: -4 }}
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
                  whileHover={{ y: -4 }}
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
            <h2 className="text-3xl font-black sm:text-5xl">De cero a automatizado<br />
              <span className="gradient-text">en 7 días</span>
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

      {/* ── CTA FINAL ── */}
      <section id="contacto" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0">
                <Image
                  src="/images/equipo-reunion.jpg"
                  alt="Equipo SendaIA"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(5,5,16,0.93) 0%, rgba(212,175,55,0.6) 100%)' }}
                />
              </div>

              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Empieza hoy</p>
                <h2 className="text-3xl font-black sm:text-5xl mb-6">
                  ¿Listo para recuperar tu tiempo?
                </h2>
                <p className="mx-auto max-w-xl text-lg mb-4" style={{ color: 'rgba(245,245,245,0.75)' }}>
                  30 minutos de diagnóstico. Analizamos tu operativa real y te decimos qué procesos se pueden automatizar ahora mismo.
                </p>
                <p className="mx-auto max-w-xl text-sm mb-10 font-semibold" style={{ color: 'var(--accent-light)' }}>
                  Sin compromiso. Sin tecnicismos. Sin promesas mágicas.
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <a
                    href="https://demo.sendaia.es/agentes-ia-demo"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 40px rgba(212,175,55,0.5)' }}
                  >
                    Quiero el diagnóstico gratuito <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:+34858215026"
                    className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                  >
                    <Phone className="h-4 w-4" /> 858 215 026
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

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
