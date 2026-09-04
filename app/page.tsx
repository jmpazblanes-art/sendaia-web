"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence, useScroll, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { track } from '@/lib/website-events'
import MenuMovil from './MenuMovil'
import WhatsAppButton from './WhatsAppButton'
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  Calculator,
  Check,
  FileText,
  Globe,
  Mail,
  MessageSquarePlus,
  Phone,
  PhoneCall,
  Quote,
  RefreshCw,
  Send,
  ShoppingCart,
  Sparkles,
  Star,
  Stethoscope,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react'

// Registro de plugins GSAP (una sola vez). Seguro en SSR: GSAP no toca el DOM al registrar.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// ─────────────── DATOS ───────────────

// Demo de extracción de facturas, servida bajo dominio propio.
//
// El visitante ya no ve un dominio de despliegue de Vercel con el nombre de otro
// cliente: entra por sendaia.es/demo/facturas, y el redirect vive en
// `next.config.ts`. Se hizo así porque el subdominio demo-facturas.sendaia.es
// necesita un CNAME en Hostinger (ahí apuntan los nameservers del dominio) y esa
// vía estaba cerrada. Cuando ese CNAME exista, solo cambia el destino del
// redirect: este enlace NO hay que tocarlo.
const DEMO_FACTURAS_URL = '/demo/facturas'

const SERVICIOS = [
  {
    icon: PhoneCall,
    title: 'Agente de Voz y WhatsApp 24/7',
    desc: 'Nunca más una llamada sin contestar. El agente atiende, filtra y agenda visitas automáticamente.',
    roi: 'Ninguna llamada sin atender',
    color: '#D4AF37',
  },
  {
    icon: FileText,
    title: 'Automatización de Facturación',
    desc: 'Extrae, registra y procesa facturas y albaranes sin que tu equipo toque un teclado.',
    roi: 'Back-office que se hace solo',
    color: '#E7C86A',
  },
  {
    icon: Mail,
    title: 'Agente de Email con IA',
    desc: 'Clasifica, prioriza y redacta borradores. Tu bandeja de entrada deja de ser un caos.',
    roi: 'Tu equipo, fuera del papeleo',
    color: '#C9A227',
  },
  {
    icon: RefreshCw,
    title: 'Reactivación de Clientes',
    desc: 'Detecta clientes dormidos y lanza secuencias personalizadas de seguimiento automático.',
    roi: 'Clientes que vuelven sin perseguirlos',
    color: '#F0D060',
  },
  {
    icon: Bot,
    title: 'Agente Documental (PDFs)',
    desc: 'Lee contratos, informes y formularios. Extrae los datos que necesitas en segundos.',
    roi: 'Del PDF a tu sistema, sin teclear',
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
// B-08: "Diseño y Desarrollo Web" estaba aquí dentro, como séptima tarjeta bajo un
// titular que dice "6 agentes" — y competía con la oferta principal en el mismo
// scroll. Sigue vendiéndose en su propia sección, más abajo, donde no interrumpe
// el embudo de automatización.

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
    poster: '/images/demo-1-poster.jpg',
  },
  {
    title: 'Agente Email',
    desc: 'Clasifica y responde emails con IA.',
    src: '/videos/video-2.mp4',
    poster: '/images/demo-2-poster.jpg',
  },
  {
    title: 'Agente WhatsApp',
    desc: 'Atiende y agenda por WhatsApp sin intervención humana.',
    src: '/videos/video-3.mp4',
    poster: '/images/demo-3-poster.jpg',
  },
]

const SECTORES = [
  {
    title: 'Clínicas y Salud',
    desc: 'Recepción, citas, documentación clínica y recordatorios sin saturar al equipo.',
    img: '/images/agente-voz-ia-clinica-medica.jpg',
    slug: 'clinicas',
  },
  {
    title: 'Asesorías y Despachos',
    desc: 'Back-office automatizado: facturas, declaraciones y seguimiento de clientes.',
    img: '/images/backoffice-automatizado-facturas-crm.jpg',
    slug: 'asesorias',
  },
  {
    title: 'Inmobiliarias',
    desc: 'Captación de leads, respuesta inmediata y agendado de visitas 24/7.',
    img: '/images/sector-inmobiliarias.jpg',
    video: '/images/Pyme.mp4',
    slug: 'inmobiliarias',
  },
  {
    title: 'E-commerce',
    desc: 'Pedidos, incidencias y soporte posventa sin contratar más personal.',
    img: '/images/sector-ecommerce.jpg',
    video: '/images/ecomerece.mp4',
    slug: 'ecommerce',
  },
  {
    title: 'Restaurantes y Hostelería',
    desc: 'Reservas, consultas y gestión de proveedores automatizados.',
    img: '/images/sector-restaurantes.jpg',
    slug: 'restaurantes',
  },
  {
    title: 'Cualquier PYME',
    desc: 'Si tienes procesos repetitivos, tenemos un agente que los elimina.',
    img: '/images/sector-pymes.jpg',
    video: '/images/Inmobiliaria.mp4',
    slug: 'pymes',
  },
]

// Casos de estudio (tipo anónimos, cifras honestas). Estructura Reto→Solución→Resultado.
const CASOS = [
  {
    sector: 'Climatización / Instalaciones',
    contexto: 'Instaladora de climatización · 83 trabajadores · Granada · en marcha desde mayo de 2026',
    title: 'De hojas de Excel sueltas a un ERP que cuadra solo',
    reto: 'Llevaban obras, horas y facturas de proveedor en Excels dispersos. Cada factura se imputaba a mano a su obra; los descuadres aparecían meses después y nadie sabía el margen real de cada proyecto hasta que era tarde.',
    solucion: 'ERP a medida: las facturas de proveedor entran por correo, la IA extrae cada línea y la liga a su obra automáticamente. Horas sincronizadas desde el sistema de campo. Panel por obra con coste real vs. estimado en vivo.',
    resultado: 'En sus primeros tres meses el sistema ha procesado 932 facturas de proveedor (1.848 líneas de gasto) repartidas entre 388 obras, con el margen de cada una visible al instante y alarmas cuando algo no cuadra.',
    highlight: '932 facturas',
  },
  {
    sector: 'Peritación / Seguros',
    contexto: 'Perito de seguros · trabaja para 5 compañías · 165 informes suyos analizados por el sistema',
    title: 'Del informe de 3 horas al informe listo en minutos',
    reto: 'Redactaba cada informe a mano en Word: copiar datos del expediente, pegar fotos, rellenar tablas de valoración. Horas por informe, y un error de copiar-pegar podía colarse hasta la compañía.',
    solucion: 'Una app donde todo el peritaje vive dentro: datos, fotos y valoración. Un botón genera el informe Word completo, con los datos volcados en su sitio y las fotos colocadas, listo para enviar a la aseguradora.',
    resultado: 'El tiempo por informe pasó de horas a minutos, sin errores de trascripción, y el perito dedica su tiempo a peritar, no a maquetar Word.',
    highlight: 'de horas a minutos',
  },
  {
    sector: 'Clínica / Servicios con cita',
    contexto: 'Agente en funcionamiento · pruébalo tú mismo llamando al 858 215 026',
    title: 'Un agente de voz que no deja ni una llamada sin atender',
    reto: 'Una clínica pierde llamadas fuera de horario y en horas punta: recepción no da abasto, y cada llamada sin coger es una cita —y un ingreso— que se va a la competencia.',
    solucion: 'Un agente de voz con IA que atiende 24/7, entiende al paciente, consulta la disponibilidad real y agenda la cita en el momento. Habla natural, no suena a robot, y pasa a una persona si hace falta.',
    resultado: 'Está funcionando y puedes comprobarlo ahora mismo: llama y pide una cita. Contesta, te entiende y la agenda. Es la mejor prueba que te podemos dar.',
    highlight: 'llama y compruébalo',
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

// ⚠️ Estas cifras NO son resultados medidos de clientes (29-jul-2026, decisión de
// José María: "de momento no tengo reales"). Se presentan como el OBJETIVO del
// sistema y con etiquetas que no afirman un histórico que no existe. En cuanto
// haya datos reales de Aircontec/PeritApp, sustituir y citar el caso.
const METRICAS = [
  { value: 15, suffix: 'h/sem', prefix: '+', label: 'Horas que buscamos recuperarte' },
  { value: 24, suffix: '/7', prefix: '', label: 'Atención sin horario' },
  { value: 7, suffix: ' días', prefix: '', label: 'Del sí a producción' },
  { value: 0, suffix: '€', prefix: '', label: 'Coste del diagnóstico' },
]

// Sin porcentajes inventados: se dice QUÉ hace el sistema, no cuánto mejora, hasta
// tener cifras reales de clientes que podamos citar con su caso.
const TICKER_ITEMS = [
  'Llamadas atendidas 24/7',
  'Facturas leídas solas',
  'Citas agendadas sin llamar',
  'Datos extraídos de PDF en segundos',
  'En producción en 7 días',
  'Sin código. Sin interrumpir tu negocio',
  'Agentes IA que trabajan solos',
  'Diagnóstico gratuito',
]

// ─────────────── UTILS ───────────────

// Contador animado con GSAP: cuenta de 0 al valor al entrar en viewport (ScrollTrigger).
function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const render = (n: number) => { el.textContent = `${prefix}${Math.floor(n).toLocaleString('es-ES')}${suffix}` }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(value)
      return
    }
    const obj = { v: 0 }
    gsap.to(obj, {
      v: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => render(obj.v),
      onComplete: () => render(value),
    })
  }, { scope: ref })
  // El HTML servido lleva YA el valor final: si el JS no carga, si el observer no
  // dispara o si el rastreador de Google lee el HTML en crudo, se ve la cifra real
  // y no un 0. La animación (arriba) sobrescribe este texto y cuenta desde 0.
  return <span ref={ref}>{`${prefix}${value.toLocaleString('es-ES')}${suffix}`}</span>
}

// Reveal al hacer scroll con GSAP ScrollTrigger. Mantiene la misma API que antes (delay, y, className).
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
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(el, {
      opacity: 0,
      y,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  }, { scope: ref })
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// ─────────────── PAGE ───────────────

// ─────────────── FONDO INTERACTIVO SCROLL ROBOT IA ───────────────

const TOTAL_ROBOT_FRAMES = 73

function RobotScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    // C-11 (04-sep-2026): estos 73 frames son 4,02 MB y se precargaban SIEMPRE.
    // Medido en producción: un móvil descargaba 4,35 MB en total, así que el 92%
    // de sus datos era este fondo decorativo. Es puro adorno (el div va con
    // aria-hidden y zIndex -1), de modo que en móvil, con ahorro de datos o con
    // reduced-motion no se descarga ni un frame: el canvas se queda vacío y el
    // degradado de debajo mantiene el fondo. En escritorio no cambia nada.
    const sinFondoPesado =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(prefers-reduced-data: reduce)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (sinFondoPesado) return

    const images: HTMLImageElement[] = []
    let loadedCount = 0

    const render = (progress: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const frameIndex = Math.min(
        TOTAL_ROBOT_FRAMES - 1,
        Math.max(0, Math.floor(progress * TOTAL_ROBOT_FRAMES))
      )
      const img = images[frameIndex]
      if (!img || !img.complete) return

      const cw = canvas.width
      const ch = canvas.height
      if (cw === 0 || ch === 0) return

      ctx.clearRect(0, 0, cw, ch)

      // Dibujar imagen cubriendo toda la pantalla manteniendo proporción (object-cover)
      const imgRatio = img.naturalWidth / img.naturalHeight
      const canvasRatio = cw / ch
      let dw = cw
      let dh = ch
      let dx = 0
      let dy = 0

      if (canvasRatio > imgRatio) {
        dh = cw / imgRatio
        dy = (ch - dh) / 2
      } else {
        dw = ch * imgRatio
        dx = (cw - dw) / 2
      }

      ctx.drawImage(img, dx, dy, dw, dh)
    }

    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      handleScroll()
    }

    for (let i = 1; i <= TOTAL_ROBOT_FRAMES; i++) {
      const img = new window.Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `/frames-robot/frame_${frameNum}.jpg`
      img.onload = () => {
        loadedCount++
        if (loadedCount === 1) {
          resize()
        }
      }
      images.push(img)
    }
    imagesRef.current = images

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll))
      render(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', resize)
    resize()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover"
        style={{ opacity: 0.65, filter: 'contrast(1.12) brightness(0.95)' }}
      />
      {/* Degradado suave para conservar legibilidad óptima */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/60 via-[#050510]/40 to-[#050510]/70" />
    </div>
  )
}

// Logo de SendaIA (la molécula: 1 esfera central + 5 satélites unidos por enlaces)
// reconstruido en 3D real, dorado con luz, girando suave y orientándose al ratón.
// pointer-events-none: nunca roba el cursor ni tapa nada. Guard reduced-motion.
function LogoMolecula3D({ size = 260 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false }) as WebGLRenderingContext | null
    if (!gl) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 }
    let spin = 0

    const compile = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s }
    const link = (vs: string, fs: string) => { const p = gl.createProgram()!; gl.attachShader(p, compile(gl.VERTEX_SHADER, vs)); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p); return p }

    // esfera UV
    const sphere = (seg: number) => {
      const pos: number[] = [], nor: number[] = []
      const P = (xx: number, yy: number) => { const u = xx / seg, v = yy / seg, th = u * Math.PI * 2, ph = v * Math.PI; return [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)] }
      for (let y = 0; y < seg; y++) for (let x = 0; x < seg; x++) {
        const a = P(x, y), b = P(x + 1, y), c = P(x + 1, y + 1), d = P(x, y + 1)
        ;[a, b, c, a, c, d].forEach(p => { pos.push(p[0], p[1], p[2]); nor.push(p[0], p[1], p[2]) })
      }
      return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3 }
    }
    // cilindro (enlace), eje Y de 0 a 1
    const cylinder = (seg: number) => {
      const pos: number[] = [], nor: number[] = []
      for (let i = 0; i < seg; i++) {
        const a0 = i / seg * Math.PI * 2, a1 = (i + 1) / seg * Math.PI * 2
        const x0 = Math.cos(a0), z0 = Math.sin(a0), x1 = Math.cos(a1), z1 = Math.sin(a1)
        const p = [[x0, 0, z0], [x1, 0, z1], [x1, 1, z1], [x0, 0, z0], [x1, 1, z1], [x0, 1, z0]]
        const n = [[x0, 0, z0], [x1, 0, z1], [x1, 0, z1], [x0, 0, z0], [x1, 0, z1], [x0, 0, z0]]
        for (let k = 0; k < 6; k++) { pos.push(p[k][0], p[k][1], p[k][2]); nor.push(n[k][0], n[k][1], n[k][2]) }
      }
      return { pos: new Float32Array(pos), nor: new Float32Array(nor), count: pos.length / 3 }
    }
    const mkBuf = (geo: { pos: Float32Array; nor: Float32Array; count: number }) => {
      const pb = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, pb); gl.bufferData(gl.ARRAY_BUFFER, geo.pos, gl.STATIC_DRAW)
      const nb = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, nb); gl.bufferData(gl.ARRAY_BUFFER, geo.nor, gl.STATIC_DRAW)
      return { pb, nb, count: geo.count }
    }
    const sphB = mkBuf(sphere(26)), cylB = mkBuf(cylinder(18))

    const vs = 'attribute vec3 pos; attribute vec3 nor; uniform mat4 mvp; uniform mat4 model; varying vec3 vN; varying vec3 vP; void main(){ vN=mat3(model)*nor; vP=(model*vec4(pos,1.0)).xyz; gl_Position=mvp*vec4(pos,1.0); }'
    const fs = 'precision highp float; varying vec3 vN; varying vec3 vP; uniform vec3 camPos; uniform float emissive;' +
      'void main(){ vec3 N=normalize(vN); vec3 L1=normalize(vec3(0.6,0.9,0.8)); vec3 L2=normalize(vec3(-0.7,-0.2,0.4)); vec3 V=normalize(camPos-vP);' +
      ' float d1=max(dot(N,L1),0.0); float d2=max(dot(N,L2),0.0)*0.25;' +
      ' vec3 H=normalize(L1+V); float spec=pow(max(dot(N,H),0.0),48.0); float fres=pow(1.0-max(dot(N,V),0.0),3.0);' +
      ' vec3 gold=vec3(0.945,0.784,0.290); vec3 goldLite=vec3(1.0,0.945,0.65); vec3 goldDark=vec3(0.42,0.32,0.10);' +
      ' vec3 base=mix(goldDark,gold,d1)+goldLite*d2; vec3 col=base*1.15+vec3(spec)*1.1+goldLite*fres*0.7;' +
      ' col+=gold*0.18; col=mix(col,goldLite,emissive*0.7); gl_FragColor=vec4(col,1.0); }'
    const prog = link(vs, fs)
    const aPos = gl.getAttribLocation(prog, 'pos'), aNor = gl.getAttribLocation(prog, 'nor')
    const uMVP = gl.getUniformLocation(prog, 'mvp'), uModel = gl.getUniformLocation(prog, 'model'), uCam = gl.getUniformLocation(prog, 'camPos'), uEmis = gl.getUniformLocation(prog, 'emissive')
    gl.enable(gl.DEPTH_TEST)

    const mul = (a: Float32Array, b: Float32Array) => { const o = new Float32Array(16); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k]; o[i * 4 + j] = s } return o }
    const persp = (f: number, ar: number, n: number, fa: number) => { const t = 1 / Math.tan(f / 2); return new Float32Array([t / ar, 0, 0, 0, 0, t, 0, 0, 0, 0, (fa + n) / (n - fa), -1, 0, 0, (2 * fa * n) / (n - fa), 0]) }
    const rotY = (a: number) => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]) }
    const rotX = (a: number) => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]) }
    const trans = (x: number, y: number, z: number) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1])
    const scale = (x: number, y: number, z: number) => new Float32Array([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1])
    const align = (dir: number[]) => {
      const up = [0, 1, 0]; let d = dir; const dl = Math.hypot(d[0], d[1], d[2]); d = [d[0] / dl, d[1] / dl, d[2] / dl]
      let ax = [up[1] * d[2] - up[2] * d[1], up[2] * d[0] - up[0] * d[2], up[0] * d[1] - up[1] * d[0]]
      const s = Math.hypot(ax[0], ax[1], ax[2]), c = up[0] * d[0] + up[1] * d[1] + up[2] * d[2]
      if (s < 1e-6) return c > 0 ? new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) : scale(1, -1, 1)
      ax = [ax[0] / s, ax[1] / s, ax[2] / s]
      const x = ax[0], y = ax[1], z = ax[2], t = 1 - c
      return new Float32Array([t * x * x + c, t * x * y + s * z, t * x * z - s * y, 0, t * x * y - s * z, t * y * y + c, t * y * z + s * x, 0, t * x * z + s * y, t * y * z - s * x, t * z * z + c, 0, 0, 0, 0, 1])
    }

    const CENTER = [0, 0, 0], SAT: number[][] = []
    const ang = [90, 150, 210, 315, 25], zoff = [0.35, -0.25, 0.2, -0.35, 0.3]
    for (let i = 0; i < 5; i++) { const a = ang[i] * Math.PI / 180; SAT.push([Math.cos(a) * 1.15, Math.sin(a) * 1.15, zoff[i]]) }

    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); target.x = (e.clientX - r.left) / r.width - 0.5; target.y = (e.clientY - r.top) / r.height - 0.5 }
    const onLeave = () => { target.x = 0; target.y = 0 }
    window.addEventListener('pointermove', onMove); canvas.addEventListener('pointerleave', onLeave)

    const resize = () => { canvas.width = Math.floor(size * dpr); canvas.height = Math.floor(size * dpr); canvas.style.width = size + 'px'; canvas.style.height = size + 'px'; gl.viewport(0, 0, canvas.width, canvas.height) }
    resize()

    const camPos = [0, 0, 5]
    const drawGeo = (buf: { pb: WebGLBuffer; nb: WebGLBuffer; count: number }, model: Float32Array, mvp: Float32Array, emis: number) => {
      gl.uniformMatrix4fv(uModel, false, model); gl.uniformMatrix4fv(uMVP, false, mvp); gl.uniform1f(uEmis, emis)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf.pb); gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf.nb); gl.enableVertexAttribArray(aNor); gl.vertexAttribPointer(aNor, 3, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLES, 0, buf.count)
    }
    const frame = () => {
      cur.x += (target.x - cur.x) * 0.06; cur.y += (target.y - cur.y) * 0.06
      if (!reduce) spin += 0.006
      const ar = canvas.width / canvas.height
      const proj = persp(0.9, ar, 0.1, 50), view = trans(0, 0, -5)
      const world = mul(rotX(-cur.y * 0.9 + 0.1), rotY(spin + cur.x * 1.2))
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.useProgram(prog); gl.uniform3fv(uCam, camPos)
      const vp = mul(proj, view)
      for (let i = 0; i < 5; i++) {
        const d = [SAT[i][0], SAT[i][1], SAT[i][2]], len = Math.hypot(d[0], d[1], d[2])
        const m = mul(world, mul(trans(0, 0, 0), mul(align(d), scale(0.055, len, 0.055))))
        drawGeo(cylB, m, mul(vp, m), 0)
      }
      const mc = mul(world, scale(0.42, 0.42, 0.42))
      drawGeo(sphB, mc, mul(vp, mc), 0.25)
      for (let j = 0; j < 5; j++) { const ms = mul(world, mul(trans(SAT[j][0], SAT[j][1], SAT[j][2]), scale(0.20, 0.20, 0.20))); drawGeo(sphB, ms, mul(vp, ms), 0.05) }
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce) raf = requestAnimationFrame(frame) }
    document.addEventListener('visibilitychange', onVis)
    if (reduce) frame(); else raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [size])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none" style={{ width: size, height: size }} />
}

// Link de menú con efecto 3D: al pasar el ratón, el texto se inclina en 3D hacia
// el cursor y se levanta un poco. CSS transforms puros (ligero, va fino en móvil).
// Envuelve un <Link>: no toca el href ni el scroll. Respeta reduced-motion y solo
// se activa en punteros con hover real (no en táctil).
function NavLink3D({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(400px) rotateX(${-py * 22}deg) rotateY(${px * 26}deg) translateZ(6px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative inline-block transition-[color,transform] duration-200 ease-out hover:text-white"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </Link>
  )
}

// Media de tarjeta de sector: imagen fija por defecto; si hay vídeo, al pasar el
// ratón (o al aparecer en móvil) se reproduce el corto encima con fundido. Imagen
// 16:9 object-cover (las nuevas no llevan texto). El vídeo va muted+loop+playsInline.
function SectorMedia({ img, video, title }: { img: string; video?: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const onEnter = () => {
    const v = videoRef.current
    if (v) { v.currentTime = 0; v.play().catch(() => {}) }
  }
  const onLeave = () => {
    const v = videoRef.current
    if (v) v.pause()
  }
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '16 / 9', background: '#0b0b16' }}
      onMouseEnter={video ? onEnter : undefined}
      onMouseLeave={video ? onLeave : undefined}
    >
      <Image
        src={img}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      {/* preload="none": estos vídeos solo se ven al pasar el ratón por encima, algo
          que en móvil no ocurre nunca. Con "metadata" el navegador iba a buscarlos
          igual (2,5 MB cada uno) para gente que jamás los vería. */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {/* velo inferior para que el texto de la tarjeta respire */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(13,13,26,0.6), transparent)' }} />
      {video && (
        <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm" style={{ background: 'rgba(212,175,55,0.85)', color: '#0b0b16' }}>
          ▶ Ver en acción
        </span>
      )}
    </div>
  )
}

// Embed de YouTube con lazy-load: muestra la miniatura + botón play y solo carga
// el iframe de YouTube al hacer clic (no ralentiza la web hasta que se quiere ver).
// Demos reales seleccionables. El primero es el que se muestra por defecto
// (el de mayor impacto: agente de voz + panel completo para clínicas de estética).
const DEMOS_REALES = [
  {
    id: 'FwcY5vLDPmw',
    tab: 'Clínicas de estética',
    titulo: 'un agente de voz para clínicas de estética',
    sub: 'No es una promesa. Es nuestro agente atendiendo llamadas y agendando citas de verdad, en el panel de la clínica.',
  },
  {
    id: 'iPZKD1bkFvE',
    tab: 'Restaurantes',
    titulo: 'un agente de voz para restaurantes',
    sub: 'No es una promesa. Es nuestro agente atendiendo una reserva de verdad, de principio a fin.',
  },
  {
    id: 'w2PAe8R_3IY',
    tab: 'Inmobiliarias',
    titulo: 'un agente de voz para inmobiliarias',
    sub: 'No es una promesa. Es nuestro agente captando leads, resolviendo la cartera de inmuebles y agendando visitas de verdad, en el panel de la inmobiliaria.',
  },
]

function DemoSelector() {
  const [activa, setActiva] = useState(0)
  const demo = DEMOS_REALES[activa]
  return (
    <>
      <FadeIn className="mb-8 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Demo real</p>
        <h2 className="text-3xl font-black sm:text-5xl">
          Míralo funcionando:<br />
          <span className="gradient-text">{demo.titulo}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7" style={{ color: 'rgba(245,245,245,0.65)' }}>
          {demo.sub}
        </p>
      </FadeIn>

      {/* Pestañas seleccionables */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        {DEMOS_REALES.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActiva(i)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
            style={activa === i
              ? { background: 'var(--accent)', color: '#0b0b16' }
              : { background: 'rgba(255,255,255,0.06)', color: 'rgba(245,245,245,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            {d.tab}
          </button>
        ))}
      </div>

      {/* El key fuerza a remontar el embed al cambiar de demo (resetea el play) */}
      <FadeIn key={demo.id}>
        <YouTubeEmbed id={demo.id} title={`Demo — ${demo.tab} — SendaIA`} />
      </FadeIn>
    </>
  )
}

function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false)
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16 / 9', background: '#000', border: '1px solid rgba(212,175,55,0.25)' }}>
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Reproducir: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.6), rgba(6,6,8,0.15))' }} />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: 'var(--accent)' }}>
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden><path d="M21 13L0 25.99V0L21 13Z" fill="#0b0b16" /></svg>
          </span>
        </button>
      )}
    </div>
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

function CalculadoraROI() {
  const [horas, setHoras] = useState(15)
  const [costeHora, setCosteHora] = useState(20)
  const [personas, setPersonas] = useState(2)

  // Cálculos dinámicos
  const horasTotalesMes = Math.round(horas * personas * 4.3)
  const horasAhorradasMes = Math.round(horasTotalesMes * 0.75)
  const ahorroEurosMes = Math.round(horasAhorradasMes * costeHora)
  const ahorroEurosAnual = ahorroEurosMes * 12

  return (
    <section id="calculadora" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="mb-12 text-center">
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            Calculadora de Impacto
          </span>
          <h2 className="text-3xl font-black sm:text-5xl">
            Calcula cuánto tiempo y dinero<br />
            <span className="gradient-text">estás perdiendo sin automatizar</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7" style={{ color: 'rgba(245,245,245,0.65)' }}>
            Mueve los controles según la operativa de tu empresa y descubre cuántas horas podría recuperar tu equipo este mes.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl p-7 sm:p-12"
            style={{
              background: 'var(--card)',
              border: '1px solid rgba(212,175,55,0.35)',
              boxShadow: '0 0 60px rgba(212,175,55,0.12)',
            }}
          >
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold" style={{ color: 'rgba(245,245,245,0.9)' }}>
                      Horas/semana en tareas repetitivas
                    </label>
                    <span className="rounded-full px-3 py-1 text-xs font-bold font-mono" style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--accent-light)' }}>
                      {horas} h / semana
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={horas}
                    onChange={(e) => setHoras(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  />
                  <span className="text-[11px]" style={{ color: 'rgba(245,245,245,0.45)' }}>
                    Facturas, emails, albaranes, llamadas y seguimiento
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold" style={{ color: 'rgba(245,245,245,0.9)' }}>
                      Personas en el equipo
                    </label>
                    <span className="rounded-full px-3 py-1 text-xs font-bold font-mono" style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--accent-light)' }}>
                      {personas} {personas === 1 ? 'persona' : 'personas'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={personas}
                    onChange={(e) => setPersonas(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  />
                  <span className="text-[11px]" style={{ color: 'rgba(245,245,245,0.45)' }}>
                    Personal que dedica parte de su jornada a gestión
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold" style={{ color: 'rgba(245,245,245,0.9)' }}>
                      Coste medio por hora
                    </label>
                    <span className="rounded-full px-3 py-1 text-xs font-bold font-mono" style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--accent-light)' }}>
                      {costeHora} € / hora
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="50"
                    step="1"
                    value={costeHora}
                    onChange={(e) => setCosteHora(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  />
                  <span className="text-[11px]" style={{ color: 'rgba(245,245,245,0.45)' }}>
                    Coste empresa promedio por hora trabajada
                  </span>
                </div>
              </div>

              {/* Resultados */}
              <div
                className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(13,13,26,0.6) 100%)', border: '1px solid rgba(212,175,55,0.25)' }}
              >
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--accent-light)' }}>Tiempo que podrías recuperar</p>
                    <p className="text-4xl sm:text-5xl font-black gradient-text mt-1">
                      +{horasAhorradasMes} <span className="text-xl sm:text-2xl font-bold text-white">horas / mes</span>
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(245,245,245,0.55)' }}>
                      Equivale a liberar ~{Math.round(horasAhorradasMes / 8)} días laborables completos al mes.
                    </p>
                  </div>

                  <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--accent-light)' }}>Ahorro económico anual estimado</p>
                    <p className="text-3xl sm:text-4xl font-black gradient-text mt-1">
                      ~{ahorroEurosAnual.toLocaleString('es-ES')} <span className="text-lg font-bold text-white">€ / año</span>
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(245,245,245,0.55)' }}>
                      Basado en una reducción del 75% del tiempo en procesos repetitivos.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <a
                    href="#contacto"
                    onClick={() => track('cta_click', { cta: 'calculadora_roi', horas: horasAhorradasMes })}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-lg"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 25px rgba(212,175,55,0.35)' }}
                  >
                    Recuperar estas {horasAhorradasMes} h/mes →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────── CENTRO DE RESEÑAS Y OPINIONES ───────────────

function ModalResena({ abierto, onClose }: { abierto: boolean; onClose: () => void }) {
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [estrellas, setEstrellas] = useState(5)
  const [hoverEstrellas, setHoverEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEstado('enviando')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre,
          message: `[RESEÑA CLIENTE - ${estrellas} ESTRELLAS] Empresa/Cargo: ${empresa} | Opinión: ${comentario}`,
          origen: { tipo: 'reseña_cliente', estrellas, empresa, landing: window.location.pathname },
        }),
      })
      if (res.ok) {
        track('form_submit', { form: 'resena_cliente', estrellas })
        setEstado('ok')
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }
  }

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl p-7 sm:p-9 shadow-2xl"
        style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.35)' }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {estado === 'ok' ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-black" style={{ background: 'var(--accent)' }}>
              ✓
            </div>
            <h3 className="mb-2 text-2xl font-black text-white">¡Muchas gracias!</h3>
            <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.7)' }}>
              Tu valoración ha sido enviada al equipo. Nos ayuda muchísimo a seguir mejorando nuestras automatizaciones y dar el mejor servicio.
            </p>
            <button
              onClick={() => { setEstado('idle'); onClose() }}
              className="mt-6 rounded-full px-6 py-2.5 text-xs font-bold text-black transition-all hover:scale-105"
              style={{ background: 'var(--accent)' }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Tu experiencia</p>
              <h3 className="text-2xl font-black text-white">Déjanos tu opinión</h3>
              <p className="text-xs" style={{ color: 'rgba(245,245,245,0.55)' }}>
                ¿Has implementado automatizaciones o recibido un diagnóstico con SendaIA? Cuéntanos tu experiencia real.
              </p>
            </div>

            {/* Selector de estrellas interactivo */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(245,245,245,0.7)' }}>
                Puntuación
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEstrellas(star)}
                    onMouseEnter={() => setHoverEstrellas(star)}
                    onMouseLeave={() => setHoverEstrellas(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`${star} estrellas`}
                  >
                    <Star
                      className="h-6 w-6 transition-colors"
                      fill={(hoverEstrellas || estrellas) >= star ? '#D4AF37' : 'none'}
                      stroke={(hoverEstrellas || estrellas) >= star ? '#D4AF37' : 'rgba(255,255,255,0.3)'}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold" style={{ color: 'var(--accent-light)' }}>
                  {estrellas} de 5 estrellas
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'rgba(245,245,245,0.7)' }}>Tu nombre *</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre y apellidos"
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'rgba(245,245,245,0.7)' }}>Empresa / Sector *</label>
              <input
                type="text"
                required
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Ej. Clínica Dental / Asesoría / Inmobiliaria"
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'rgba(245,245,245,0.7)' }}>Tu valoración o comentario *</label>
              <textarea
                required
                rows={3}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="¿Qué proceso automatizaste? ¿Qué resultado o impacto ha tenido en el día a día?"
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            {estado === 'error' && (
              <p className="text-xs text-red-400">Hubo un error al enviar. Por favor, inténtalo de nuevo.</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 rounded-full py-3 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                style={{ border: '1px solid var(--border)' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={estado === 'enviando'}
                className="w-1/2 rounded-full py-3 text-xs font-bold text-black transition-all hover:scale-105"
                style={{ background: 'var(--accent)' }}
              >
                {estado === 'enviando' ? 'Enviando...' : 'Enviar reseña'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function TestimoniosSection() {
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <section id="opiniones" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}>
            <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-xs font-semibold" style={{ color: 'var(--accent-light)' }}>
              Opiniones y Reseñas
            </span>
          </div>

          <h2 className="text-3xl font-black sm:text-5xl mb-4">
            ¿Has trabajado con nosotros?<br />
            <span className="gradient-text">Déjanos tu valoración</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 mb-10" style={{ color: 'rgba(245,245,245,0.65)' }}>
            Trabajamos con total transparencia: sin testimonios inventados ni promesas mágicas.
            Si has implementado una automatización en tu negocio o has realizado un diagnóstico con nosotros, tu opinión ayuda a otras empresas a dar el paso.
          </p>

          {/* Tarjetas de opciones para valorar */}
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto text-left">
            {/* Opción 1: Google Reviews */}
            <div
              className="flex flex-col justify-between rounded-3xl p-7 transition-all hover:border-amber-400/40"
              style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.22)' }}
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl mb-4" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                  <Star className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Reseña en Google</h3>
                <p className="text-xs leading-5 mb-6" style={{ color: 'rgba(245,245,245,0.6)' }}>
                  Tu valoración pública en Google ayuda a otros profesionales y negocios a conocer cómo trabajamos de forma verificada.
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=SendaIA+Granada"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cta_click', { cta: 'google_review_hub' })}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-5 text-xs font-bold text-black transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(212,175,55,0.25)' }}
              >
                <Star className="h-4 w-4 fill-black" /> Valorar en Google →
              </a>
            </div>

            {/* Opción 2: Formulario directo */}
            <div
              className="flex flex-col justify-between rounded-3xl p-7 transition-all hover:border-white/20"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)' }}>
                  <MessageSquarePlus className="h-5 w-5 text-white/80" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Opinión directa</h3>
                <p className="text-xs leading-5 mb-6" style={{ color: 'rgba(245,245,245,0.6)' }}>
                  Envíanos tus comentarios, puntuación y experiencia para ayudarnos a seguir perfeccionando nuestras soluciones.
                </p>
              </div>

              <button
                onClick={() => setModalAbierto(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-5 text-xs font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.06)' }}
              >
                <MessageSquarePlus className="h-4 w-4 text-[#D4AF37]" /> Escribir opinión →
              </button>
            </div>
          </div>

          <p className="mt-8 text-xs font-medium" style={{ color: 'rgba(245,245,245,0.4)' }}>
            🔒 Tratamiento confidencial y transparente conforme al RGPD.
          </p>
        </FadeIn>
      </div>

      <ModalResena abierto={modalAbierto} onClose={() => setModalAbierto(false)} />
    </section>
  )
}

// ─────────────── FORMULARIO ───────────────

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [acepta, setAcepta] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Origen del lead: sin esto llegabas a la llamada sin saber si vino de un
      // anuncio, de una página de sector o de una búsqueda. Solo procedencia,
      // ningún dato personal añadido.
      const params = new URLSearchParams(window.location.search)
      const origen = {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        landing: window.location.pathname,
        referrer: document.referrer || undefined,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, origen }),
      })
      if (res.ok) {
        // Tracking: el formulario se envió con éxito (sin datos personales en meta).
        track('form_submit', { form: 'contacto', has_phone: Boolean(form.phone) })
      }
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
            className="w-full rounded-xl px-4 py-3 text-base sm:text-sm outline-none transition-all"
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
          className="w-full rounded-xl px-4 py-3 text-base sm:text-sm outline-none transition-all resize-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f5f5f0' }}
        />
      </div>
      {/* Consentimiento RGPD: obligatorio, SIN premarcar (art. 4.11 RGPD — el
          consentimiento tiene que ser una acción afirmativa del usuario). */}
      <label className="flex items-start gap-3 text-xs leading-5" style={{ color: 'rgba(245,245,245,0.6)' }}>
        <input
          type="checkbox"
          required
          checked={acepta}
          onChange={(e) => setAcepta(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#d4af37]"
        />
        <span>
          He leído y acepto la{' '}
          <Link href="/privacidad" target="_blank" className="underline" style={{ color: 'var(--accent-light)' }}>
            política de privacidad
          </Link>
          . Usaremos tus datos solo para responderte.
        </span>
      </label>
      <button
        type="submit"
        disabled={status === 'loading' || !acepta}
        className="w-full rounded-full py-4 text-sm font-bold text-black transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: 'var(--accent)' }}
      >
        {status === 'loading' ? 'Enviando...' : 'Quiero el diagnóstico gratuito →'}
      </button>

      <div className="flex items-center gap-3 pt-1">
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(245,245,245,0.4)' }}>o consúltanos directo</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>

      <a
        href="https://wa.me/34627256996?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20directa%20sobre%20automatizaci%C3%B3n%20con%20IA."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('cta_click', { cta: 'whatsapp_formulario' })}
        className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all hover:bg-white/5 border"
        style={{ borderColor: 'rgba(37,211,102,0.4)', color: '#25D366' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Escríbenos por WhatsApp
      </a>

      <p className="text-center text-xs" style={{ color: 'rgba(245,245,245,0.45)' }}>
        Te respondemos en menos de 24 h laborables.
      </p>
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
Teléfono / agente de voz: 858 215 026 · Email: info@sendaia.es · Instagram: instagram.com/sendaia.es · Facebook: facebook.com/sendaia.es (ahí están los vídeos de ejemplo de lo que hacemos) · LinkedIn: linkedin.com/company/sendaia · Granada, España.`

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
  // ¿Está la sección de contacto en pantalla? Si lo está, el dock se aparta para
  // no taparle al visitante el formulario (ni el enlace a la privacidad).
  // Se aparta en DOS sitios: sobre el hero (tapaba "Agenda tu diagnóstico" y
  // "Ver cómo funciona") y sobre el formulario de contacto. En medio sí se ve.
  // Por scroll y no con IntersectionObserver: el dock se monta antes que el hero,
  // así que al correr el efecto los nodos aún no existen y el observer se quedaba
  // sin observar nada (dejaba el dock oculto en toda la página).
  const [contactoVisible, setContactoVisible] = useState(true)
  useEffect(() => {
    const calcular = () => {
      const y = window.scrollY
      const alto = window.innerHeight
      const doc = document.documentElement.scrollHeight
      const enHero = y < alto * 0.5
      const enContacto = y + alto > doc - alto * 1.15
      setContactoVisible(enHero || enContacto)
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
                className="flex-1 rounded-xl px-4 py-2.5 text-base sm:text-sm outline-none focus:ring-1 transition-all"
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
      {/* Los flotantes tapaban el formulario en móvil (el enlace a la política de
          privacidad y el aviso de las 24 h). Cuando la sección de contacto está en
          pantalla se apartan: ahí el visitante ya está convirtiendo, no hace falta
          ofrecerle otras tres puertas. */}
      <div
        className={`fixed right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
          contactoVisible ? 'pointer-events-none opacity-0 translate-y-4' : 'opacity-100'
        }`}
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
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
                background: 'rgba(12,12,18,0.94)',
                border: '1px solid rgba(212,175,55,0.4)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.15)',
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
  // El vídeo del hero (5 MB) solo se monta en pantallas grandes. Arranca en false
  // para que el HTML servido nunca lo incluya: en móvil no llega a descargarse.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(mq.matches && !window.matchMedia('(prefers-reduced-data: reduce)').matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  const mainRef = useRef<HTMLElement>(null)

  const toggleMute = () => {
    setMuted((m) => {
      if (heroVideoRef.current) heroVideoRef.current.muted = !m
      return !m
    })
  }

  // Tracking: registrar la visita a la home una sola vez.
  useEffect(() => {
    track('page_view')
  }, [])

  // ─────────────── ORQUESTACIÓN GSAP ───────────────
  useGSAP(() => {
    const cleanups: Array<() => void> = []

    // Navbar → pill al hacer scroll (se aplica siempre, también con reduced-motion)
    const navTl = gsap.timeline({
      scrollTrigger: { trigger: document.documentElement, start: '64px top', toggleActions: 'play none none reverse' },
    })
    navTl
      .to('[data-nav]', { backgroundColor: 'rgba(5,5,16,0)', borderColor: 'rgba(255,255,255,0)', duration: 0.4, ease: 'power2.out' }, 0)
      .to('[data-nav-inner]', {
        maxWidth: '60rem',
        marginTop: '0.6rem',
        borderRadius: '9999px',
        paddingTop: '0.55rem',
        paddingBottom: '0.55rem',
        backgroundColor: 'rgba(12,12,20,0.92)',
        borderColor: 'rgba(212,175,55,0.3)',
        boxShadow: '0 16px 44px rgba(0,0,0,0.5)',
        duration: 0.4,
        ease: 'power2.out',
      }, 0)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return () => cleanups.forEach((fn) => fn())

    // Hero: entrada (badge → sub → CTAs) + SplitText por líneas en el titular.
    // autoSplit + onSplit = robusto ante carga de la fuente Fraunces y cambios de tamaño.
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('[data-hero-badge]', { y: 18, autoAlpha: 0, duration: 0.6 })
      .from('[data-hero-sub]', { y: 18, autoAlpha: 0, duration: 0.6 }, 0.7)
      .from('[data-hero-cta]', { y: 18, autoAlpha: 0, duration: 0.6 }, 0.95)

    const split = SplitText.create('[data-hero-title]', {
      type: 'lines',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        y: 44, autoAlpha: 0, filter: 'blur(10px)', duration: 0.9, stagger: 0.14, ease: 'power3.out', delay: 0.25,
      }),
    })
    cleanups.push(() => split.revert())

    // Hero: parallax del vídeo de fondo
    gsap.set('[data-hero-video]', { scale: 1.18, transformOrigin: 'center center' })
    gsap.to('[data-hero-video]', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '[data-hero-section]', start: 'top top', end: 'bottom top', scrub: true },
    })

    // Proceso: la línea conectora se dibuja al hacer scroll
    gsap.from('[data-proceso-line]', {
      scaleX: 0,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: { trigger: '[data-proceso]', start: 'top 75%', end: 'bottom 65%', scrub: true },
    })

    // Tilt 3D en tarjetas de Servicios (solo punteros con hover real)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const cards = gsap.utils.toArray<HTMLElement>('[data-tilt]')
      cards.forEach((card) => {
        const onEnter = () => gsap.to(card, {
          y: -8, scale: 1.03,
          boxShadow: '0 0 40px rgba(212,175,55,0.18), 0 24px 60px rgba(0,0,0,0.45)',
          borderColor: 'rgba(212,175,55,0.4)',
          duration: 0.35, ease: 'power2.out',
        })
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          gsap.to(card, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 800, transformOrigin: 'center', duration: 0.4, ease: 'power2.out' })
        }
        const onLeave = () => gsap.to(card, {
          y: 0, scale: 1, rotateX: 0, rotateY: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          borderColor: 'rgba(255,255,255,0.08)',
          duration: 0.5, ease: 'power3.out',
        })
        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter)
          card.removeEventListener('mousemove', onMove)
          card.removeEventListener('mouseleave', onLeave)
        })
      })
    }

    return () => cleanups.forEach((fn) => fn())
  }, { scope: mainRef })

  return (
    <main ref={mainRef} className="min-h-screen" style={{ background: 'transparent', color: 'var(--foreground)' }}>
      <RobotScrollBackground />
      <div className="grain" />
      <ScrollProgress />
      <CursorSpotlight />

      {/* ── NAVBAR ── */}
      <nav data-nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(16px)' }}>
        <div data-nav-inner className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6 border border-transparent">
          {/* Menú de secciones: en móvil la barra de enlaces se oculta, así que
              sin esto no había forma de saltar de sección (lo vio Ana, 03-ago). */}
          <MenuMovil />
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="SendaIA"
              width={160}
              height={48}
              priority
              className="h-8 w-auto object-contain sm:h-10"
            />
          </Link>
          <div className="hidden items-center gap-7 text-sm md:flex" style={{ color: 'rgba(245,245,245,0.65)' }}>
            <NavLink3D href="#servicios">Servicios</NavLink3D>
            <NavLink3D href="#calculadora">Calculadora</NavLink3D>
            <NavLink3D href="#sectores">Sectores</NavLink3D>
            <NavLink3D href="#casos">Casos</NavLink3D>
            <NavLink3D href="#proceso">Proceso</NavLink3D>
            <NavLink3D href="#opiniones">Opiniones</NavLink3D>
            <NavLink3D href="#contacto">Contacto</NavLink3D>
          </div>
          <a
            href="#contacto"
            className="whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold text-white transition-all hover:opacity-90 sm:px-5 sm:text-sm"
            style={{ background: 'var(--accent)' }}
          >
            {/* En móvil el texto completo empujaba al logo y al menú fuera de sitio */}
            <span className="sm:hidden">Diagnóstico</span>
            <span className="hidden sm:inline">Diagnóstico gratuito</span>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section data-hero-section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        {/* C-10: el hero cargaba 5 MB de vídeo también en móvil, sin poster, así que
            en 4G la primera pantalla salía negra justo donde se decide si seguir
            leyendo. Ahora: poster de 40 KB que se ve al instante, y el vídeo solo se
            descarga en pantallas grandes (`isDesktop`) — en móvil se queda la imagen. */}
        <img
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0 }}
        />
        {isDesktop && (
          <video
            ref={heroVideoRef}
            data-hero-video
            src="/videos/hero.mp4"
            poster="/images/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ zIndex: 0 }}
          />
        )}
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
          <div data-hero-badge>
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-widest sm:mb-6 sm:text-xs"
              style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--accent-light)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              Automatización con IA para PYMEs · Granada
            </span>
          </div>

          {/* En móvil el título iba a 5xl y, con el eslogan y el subtítulo, empujaba
              los botones fuera de la pantalla (medido en iPhone 13: el CTA caía en
              y=730 con una ventana de 664px, así que no se podía ni tocar). */}
          <h1
            data-hero-title
            className="text-[2.6rem] font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Recupera{' '}
            <span className="gradient-text-animated">horas cada semana</span>{' '}
            <br />con Agentes de IA
          </h1>

          {/* Eslogan de marca: «Sistemas que trabajan. Tú disfrutas.» */}
          <p data-hero-slogan className="mt-3 flex flex-col items-center justify-center gap-0 sm:mt-5 sm:flex-row sm:gap-3">
            <span
              className="text-base font-semibold uppercase tracking-widest sm:text-2xl"
              style={{ color: 'rgba(245,245,245,0.9)' }}
            >
              Sistemas que trabajan.
            </span>
            <span
              className="font-script text-3xl leading-none sm:text-5xl"
              style={{ color: 'var(--accent-light)' }}
            >
              Tú disfrutas.
            </span>
          </p>

          <p
            data-hero-sub
            className="mx-auto mt-4 max-w-2xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8"
            style={{ color: 'rgba(245,245,245,0.75)' }}
          >
            Sin código. Sin interrumpir tu negocio. A tu ritmo.
          </p>

          <div
            data-hero-cta
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <a
              href="#contacto"
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
          </div>
        </div>

        <motion.button
          onClick={toggleMute}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          // En móvil NO se muestra: el vídeo del hero solo se monta con `isDesktop`,
          // así que ahí este botón no silencia nada — y encima tapaba el badge
          // «...PARA PYMES · GRANADA» (medido el 04-sep-2026 en iPhone 13). Antes
          // se había subido a `top-24` porque abajo se comía "Ver cómo funciona";
          // ocultarlo resuelve las dos colisiones a la vez.
          className="absolute right-4 top-24 z-10 hidden items-center gap-2 rounded-full px-3 py-2 transition-all hover:scale-105 sm:bottom-8 sm:right-8 sm:top-auto sm:flex sm:px-4 sm:py-2.5"
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
            {/* Antes: "Las PYMEs pierden 30.000€/año" — un dato de sector sin fuente,
                en una web que promete "sin promesas mágicas". Se sustituye por un
                cálculo propio con el supuesto a la vista: el lector puede rehacerlo. */}
            <h2 className="text-3xl font-black sm:text-5xl">
              Dos horas al día de administración<br />
              son <span className="gradient-text">más de 400 horas al año</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7" style={{ color: 'rgba(245,245,245,0.6)' }}>
              Echa la cuenta con tus propios números: 2 h al día × 5 días × 44 semanas.
              Ese tiempo lo paga tu equipo haciendo trabajo de máquina, y no aparece en
              ninguna factura.
            </p>
            {/* Dato de sector CON FUENTE citada: no es un resultado nuestro, es el coste
                que tiene el problema en el mercado. Con fuente pasa de eslogan a hecho. */}
            <p className="mx-auto mt-4 max-w-2xl text-xs leading-6" style={{ color: 'rgba(245,245,245,0.42)' }}>
              Solo en facturas: procesar una a mano cuesta de media 12,88 $ frente a los
              2,78 $ de un proceso automatizado, y se tarda 17,4 días en tramitarla frente
              a 3,1.{' '}
              <a
                href="https://www.medius.com/resources/guides-reports/ardent-partners-accounts-payable-metrics-that-matter/"
                target="_blank"
                rel="noreferrer"
                className="underline"
                style={{ color: 'rgba(245,245,245,0.55)' }}
              >
                Ardent Partners, AP Metrics that Matter
              </a>
              .
            </p>
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
                    {/* Iconos Lucide en vez de emoji: el brand kit los prohíbe en producto
                        y cada sistema operativo los dibuja distinto (en Windows rompen la
                        alineación). Gris apagado para la columna del problema. */}
                    <ul className="space-y-1 text-sm" style={{ color: 'rgba(245,245,245,0.8)' }}>
                      {['Llamadas sin atender cada día', 'Emails sin leer acumulándose', 'Facturas introducidas a mano', 'Tu equipo haciendo trabajo de máquina'].map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <X className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'rgba(245,245,245,0.45)' }} aria-hidden="true" />
                          <span>{t}</span>
                        </li>
                      ))}
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
                      {['Agentes trabajando 24/7', 'Cero tareas repetitivas en tu equipo', 'Datos procesados en segundos', 'Tu semana, de vuelta'].map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                          <span>{t}</span>
                        </li>
                      ))}
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
                <div
                  data-tilt
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
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULADORA ROI ── */}
      <CalculadoraROI />

      {/* ── ¿TE GUSTA ESTA WEB? LA HICIMOS NOSOTROS ── */}
      <section id="web" className="py-20 sm:py-28" style={{ background: 'rgba(13,13,26,0.6)' }}>
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.10) 0%, rgba(13,13,26,0.4) 60%)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
            >
              <div
                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--accent)' }}
              >
                <Globe className="h-7 w-7" />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>
                Diseño y desarrollo web
              </p>
              <h2 className="text-3xl font-black sm:text-5xl">
                ¿Te gusta esta web?
                <br />
                <span className="gradient-text">La hicimos nosotros.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8" style={{ color: 'rgba(245,245,245,0.75)' }}>
                Diseñamos y programamos webs rápidas, cuidadas y con IA integrada — como esta que estás viendo.
                Sin plantillas genéricas: tu web, a tu medida, lista en días.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm" style={{ color: 'rgba(245,245,245,0.7)' }}>
                <span className="rounded-full px-4 py-1.5" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>Diseño a medida</span>
                <span className="rounded-full px-4 py-1.5" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>Chat y voz con IA</span>
                <span className="rounded-full px-4 py-1.5" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>Animaciones premium</span>
                <span className="rounded-full px-4 py-1.5" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>Lista en días</span>
              </div>

              <a
                href="#contacto"
                className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'var(--accent)', boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
              >
                Quiero una web así <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── POR QUÉ SENDAIA ── */}
      <section className="py-20 sm:py-28 relative" style={{ background: '#06070A' }}>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-8 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Por qué SendaIA</p>
            <h2 className="text-3xl font-black sm:text-5xl">
              La diferencia no es trabajar más.<br />
              <span className="gradient-text">Es tener sistemas.</span>
            </h2>
          </FadeIn>

          <div className="mb-14 flex flex-col items-center">
            <LogoMolecula3D size={260} />
            <span
              className="mt-[-12px] text-4xl sm:text-5xl font-black tracking-tight"
              style={{
                lineHeight: 1,
                background: 'linear-gradient(180deg, #FFF0B8 0%, #F5E08A 40%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                filter: 'drop-shadow(0 2px 24px rgba(212,175,55,0.45))',
              }}
            >
              SendaIA
            </span>
          </div>

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
                  href={DEMO_FACTURAS_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('cta_click', { cta: 'demo_facturas' })}
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
              {/* C-10: este vídeo (9,1 MB) se descargaba y reproducía solo al cargar la
                  página, aunque el visitante estuviera arriba del todo y no llegara nunca
                  hasta aquí. Ahora muestra su poster (20 KB) y solo baja el vídeo cuando
                  el usuario le da al play, que es cuando de verdad lo quiere ver. */}
              <video
                key={DEMOS[activeTab].src}
                src={DEMOS[activeTab].src}
                poster={DEMOS[activeTab].poster}
                muted
                loop
                playsInline
                controls
                preload="none"
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
                <Link href={`/sectores/${s.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 0 35px rgba(212,175,55,0.14), 0 20px 40px rgba(0,0,0,0.35)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="group overflow-hidden rounded-2xl h-full"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    <SectorMedia img={s.img} video={(s as { video?: string }).video} title={s.title} />
                    <div className="p-5" style={{ background: 'var(--card)' }}>
                      <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                      <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{s.desc}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:gap-2" style={{ color: 'var(--accent-light)' }}>
                        Ver cómo <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASOS DE ESTUDIO ── */}
      <section id="casos" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Casos de estudio</p>
            <h2 className="text-3xl font-black sm:text-5xl">
              Lo que pasa cuando<br />
              <span className="gradient-text">el sistema trabaja por ti</span>
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-6">
            {CASOS.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.08}>
                <div
                  className="relative overflow-hidden rounded-2xl p-7 sm:p-9"
                  style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.18)' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>{c.sector}</p>
                  <h3 className="mb-2 text-xl sm:text-2xl font-bold">{c.title}</h3>
                  {/* Ancla del caso: sin tamaño de empresa ni fecha, un caso anónimo
                      es indistinguible de uno inventado. Anonimizar sí, ser genérico no. */}
                  <p className="mb-6 text-xs" style={{ color: 'rgba(245,245,245,0.42)' }}>{c.contexto}</p>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: '#C0563B' }}>El reto</p>
                      <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{c.reto}</p>
                    </div>
                    <div>
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-light)' }}>La solución</p>
                      <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{c.solucion}</p>
                    </div>
                    <div>
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: '#4B9E7F' }}>El resultado</p>
                      <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.85)' }}>{c.resultado}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO REAL (selector de demos: clínicas + restaurantes) ── */}
      <section id="demo-real" className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <DemoSelector />
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

          <div data-proceso className="relative grid gap-6 lg:grid-cols-4">
            <div
              data-proceso-line
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

      {/* ── OPINIONES Y RESEÑAS ── */}
      <TestimoniosSection />

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
      <WhatsAppButton />

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
              <p className="mt-1 text-sm" style={{ color: 'rgba(245,245,245,0.45)' }}>
                Granada, España · info@sendaia.es
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
                href="https://www.facebook.com/sendaia.es"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Facebook
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
          {/* Enlaces legales exigibles (LSSI-CE / RGPD) + razón social y NIF: además de
              obligatorio, es señal de solvencia para quien va a dejar sus datos. */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t pt-6 text-xs" style={{ borderColor: 'var(--border)', color: 'rgba(245,245,245,0.5)' }}>
            <Link href="/aviso-legal" className="transition-colors hover:text-white">Aviso legal</Link>
            <Link href="/privacidad" className="transition-colors hover:text-white">Política de privacidad</Link>
            <Link href="/cookies" className="transition-colors hover:text-white">Política de cookies</Link>
          </div>
          <div className="mt-4 pb-2" style={{ color: 'rgba(245,245,245,0.3)', fontSize: '0.75rem' }}>
            © 2026 SendaIA · Ana Isabel Quesada Martínez · NIF 44267995X · Todos los derechos reservados
          </div>
        </div>
      </footer>

    </main>
  )
}
