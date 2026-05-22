import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  FileText,
  MessageCircle,
  PhoneCall,
  Workflow,
} from 'lucide-react'

const agents = [
  {
    title: 'Agente Documental',
    description:
      'Procesa facturas, albaranes, contratos y formularios. Extrae datos clave y los deja listos para tu sistema sin teclear a mano.',
    bullets: ['PDFs y OCR', 'Extracción de datos', 'Registro automático'],
    icon: FileText,
  },
  {
    title: 'Agente Email',
    description:
      'Clasifica bandejas de entrada, prioriza lo importante y redacta borradores de respuesta para que tu equipo llegue antes.',
    bullets: ['Triado automático', 'Borradores', 'Priorización'],
    icon: MessageCircle,
  },
  {
    title: 'Agente WhatsApp',
    description:
      'Responde leads, filtra consultas y agenda citas por WhatsApp con un flujo claro, rápido y sin fricción.',
    bullets: ['Leads entrantes', 'Agenda citas', 'Seguimiento'],
    icon: Bot,
  },
  {
    title: 'Agente Chat',
    description:
      'Atiende web chat y consultas repetitivas 24/7, resuelve dudas frecuentes y escala solo lo que merece intervención humana.',
    bullets: ['Soporte 24/7', 'FAQs', 'Escalado humano'],
    icon: Workflow,
  },
  {
    title: 'Soluciones a Medida',
    description:
      'Cuando el proceso no encaja en un molde estándar, diseñamos una solución a medida para tu operativa real.',
    bullets: ['Flujos propios', 'Integraciones', 'Adaptación total'],
    icon: Brain,
  },
]

const videos = [
  {
    title: 'Agente Documental',
    description: 'Extracción y gestión de documentos en un flujo real.',
    src: 'https://storage.googleapis.com/msgsndr/chJchENc142nwYGDemwE/media/68935f4cd69f994c63d4ef76.mp4',
  },
  {
    title: 'Agente Email',
    description: 'Clasificación y respuesta asistida desde la bandeja de entrada.',
    src: 'https://storage.googleapis.com/msgsndr/chJchENc142nwYGDemwE/media/6893611b65ff155953f0ccc8.mp4',
  },
  {
    title: 'Agente WhatsApp',
    description: 'Atención de leads y seguimiento en el canal donde ya escriben tus clientes.',
    src: 'https://storage.googleapis.com/msgsndr/chJchENc142nwYGDemwE/media/689361355b9f876a3891846f.mp4',
  },
]

const steps = [
  {
    n: '01',
    title: 'Detectamos el flujo',
    copy: 'Vemos cómo trabajas hoy, qué se repite y dónde se va el tiempo.',
  },
  {
    n: '02',
    title: 'Conectamos tus canales',
    copy: 'Dejamos enlazados documentos, email, WhatsApp y chat con lo que ya usas.',
  },
  {
    n: '03',
    title: 'Lanzamos y afinamos',
    copy: 'Ponemos el sistema en marcha, revisamos resultados y lo ajustamos contigo.',
  },
]

const sectors = [
  {
    title: 'Clínicas',
    copy: 'Recepción administrativa, documentación, recordatorios y filtro de consultas sin saturar al equipo.',
  },
  {
    title: 'E-commerce',
    copy: 'Pedidos, incidencias y consultas recurrentes organizadas por un agente que no se cansa.',
  },
  {
    title: 'Inmobiliarias',
    copy: 'Captación de leads, respuesta rápida, filtrado y agendado de visitas sin perder oportunidades.',
  },
]

function VideoBlock({ title, description, src }: { title: string; description: string; src: string }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E7C86A]">Vídeo demo</p>
        <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
      </div>
      <div className="bg-black/50">
        <video
          className="aspect-video w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
      </div>
    </article>
  )
}

function AgentCard({ title, description, bullets, icon: Icon }: (typeof agents)[number]) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition-transform hover:-translate-y-1 hover:border-[#D4AF37]/25">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#E7C86A]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {bullets.map((bullet) => (
          <span key={bullet} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/75">
            {bullet}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-sendaia.png" alt="SendaIA" width={146} height={44} priority className="h-9 w-auto object-contain" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="#agentes" className="transition-colors hover:text-white">
              Agentes
            </Link>
            <Link href="#videos" className="transition-colors hover:text-white">
              Vídeos
            </Link>
            <Link href="#paso-a-paso" className="transition-colors hover:text-white">
              Paso a Paso
            </Link>
            <Link href="#sectores" className="transition-colors hover:text-white">
              Sectores
            </Link>
          </nav>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-18">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#E7C86A]">
              Automatización administrativa con IA
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Automatiza tu gestión administrativa con Agentes de IA
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              Implementamos tu primer sistema operativo en menos de 7 días, sin requisitos técnicos para tu equipo.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-white/45">
              Sin precios en la captación. Sin inventar métricas. Sin complejidad innecesaria.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#agentes"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#e0bd52]"
              >
                Ver agentes
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://demo.sendaia.es/mi-asistente"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Agendar demo
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Implantación</p>
                <p className="mt-2 text-sm text-white/80">Menos de 7 días</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Equipo</p>
                <p className="mt-2 text-sm text-white/80">Sin requisitos técnicos</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Enfoque</p>
                <p className="mt-2 text-sm text-white/80">Administración, no humo</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#D4AF37]/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/35">Sistema SendaIA</p>
                  <p className="mt-1 text-lg font-semibold">Ruta clara, sin fricción</p>
                </div>
                <div className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold text-[#E7C86A]">
                  Demo comercial
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  'Captación con casos de uso y sin precios',
                  'Diagnóstico del flujo administrativo real',
                  'Propuesta y presupuesto cerrados',
                  'Implementación y seguimiento',
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-xs font-black text-[#E7C86A]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white/80">{item}</p>
                    </div>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#D4AF37]" />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/8 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#E7C86A]">Promesa de la página</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Mostrar qué hace cada agente, cómo se implanta y en qué sectores encaja mejor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="agentes" className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E7C86A]">Agentes de IA</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Cinco formas de quitar trabajo manual a tu equipo.</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Los agentes se muestran como un sistema práctico, no como promesas abstractas.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agents.map((agent) => (
              <AgentCard key={agent.title} {...agent} />
            ))}
          </div>
        </section>

        <section id="videos" className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E7C86A]">Vídeos</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Así se ve el sistema en acción.</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Los vídeos se reproducen con sonido desactivado por defecto para que la web cargue limpio y no moleste al entrar.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoBlock key={video.title} {...video} />
            ))}
          </div>
        </section>

        <section id="paso-a-paso" className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E7C86A]">Paso a paso</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Tres pasos para ponerlo a funcionar.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E7C86A]">{step.n}</p>
                <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="sectores" className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E7C86A]">Casos por sector</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Clínicas, e-commerce e inmobiliarias.</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              La misma lógica, adaptada a cada operativa.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {sectors.map((sector) => (
              <article key={sector.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-bold">{sector.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{sector.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/8 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E7C86A]">Empieza hoy</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black sm:text-5xl">Si encaja con tu negocio, lo montamos contigo.</h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="https://demo.sendaia.es/mi-asistente"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#e0bd52]"
              >
                Agendar demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+34630310451"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <PhoneCall className="h-4 w-4" /> 630310451
              </a>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <div>
            <p>© 2026 SendaIA. Todos los derechos reservados.</p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-white/65">
              <a href="tel:+34630310451" className="hover:text-white transition-colors">
                630310451
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="text-white/30">SendaIA · Automatización administrativa con IA</div>
        </footer>
      </div>
    </main>
  )
}
