import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import AssistantDock from './components/AssistantDock'
import ContactForm from './components/ContactForm'
import WhatsAppButton from './WhatsAppButton'
import SistemaScroll from './components/SistemaScroll'
import HeroFondo from './components/HeroFondo'
import { BotonAria, BotonVoz, BotonWhatsApp, DemoVideo, HomeEfectos, IrAAgentes } from './components/HomeClient'

// HOME — escaparate (rediseño 05-oct-2026).
// Enseñar antes que explicar: primero los tres agentes que ya funcionan (voz,
// WhatsApp y Aria), después las demos por negocio, el sistema que hay detrás, un
// caso real y el diagnóstico. El resto del contenido de la home anterior
// (calculadora, servicios, opiniones, desarrollo web…) NO se ha borrado: está en
// `app/_legacy/HomeLegacy.tsx` a la espera de su página propia.

// Vídeos reales ya publicados en el canal de SendaIA (los mismos de las páginas de sector).
const DEMOS_NEGOCIO = [
  {
    clave: 'clinica',
    id: 'FwcY5vLDPmw',
    negocio: 'Clínica',
    titulo: 'Agente de voz atendiendo y gestionando citas en una clínica',
    texto: 'Atiende la llamada, entiende lo que necesita el paciente y deja la cita registrada.',
    sector: '/sectores/clinicas',
  },
  {
    clave: 'inmobiliaria',
    id: 'w2PAe8R_3IY',
    negocio: 'Inmobiliaria',
    titulo: 'Agente de voz captando un contacto y agendando una visita',
    texto: 'Del primer contacto a la visita: conversación, información del inmueble y cita.',
    sector: '/sectores/inmobiliarias',
  },
  {
    clave: 'restaurante',
    id: 'iPZKD1bkFvE',
    negocio: 'Restaurante / Bar',
    titulo: 'Agente de voz atendiendo una reserva de principio a fin',
    texto: 'Consulta, reserva y confirmación sin que nadie tenga que soltar lo que está haciendo.',
    sector: '/sectores/restaurantes',
  },
]

const PASOS = [
  { n: '01', titulo: 'Analizamos', texto: 'Miramos cómo trabajáis hoy y dónde se va el tiempo.' },
  { n: '02', titulo: 'Diseñamos', texto: 'Definimos el sistema alrededor de tu negocio, no al revés.' },
  { n: '03', titulo: 'Conectamos', texto: 'Lo unimos a las herramientas que ya usáis cada día.' },
  { n: '04', titulo: 'Ponemos en producción', texto: 'Empieza a trabajar. Lo vigilamos y lo ajustamos.' },
]

export default function Home() {
  return (
    <main className="lienzo">
      <HomeEfectos />
      <SiteHeader />

      {/* ── 1 · HERO ── */}
      <section className="sobre-azul relative overflow-hidden bg-azul text-roto">
        <HeroFondo />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28">
          <div>
            <p className="eyebrow">SendaIA · Sistemas con IA para empresas</p>
            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
              Tu empresa no necesita más herramientas.{' '}
              <span className="text-cobre-claro">Necesita sistemas que trabajen.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-roto/80 sm:text-xl">
              Agentes de voz, WhatsApp y automatizaciones conectados a tu negocio para eliminar trabajo manual y
              recuperar tiempo.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <IrAAgentes />
              <a href="#caso" data-cta="hero_casos" className="btn btn-linea">
                Ver casos reales
              </a>
            </div>
            <p className="mt-10 text-sm text-roto/60">Nosotros ponemos los sistemas. Tú disfrutas.</p>
          </div>

          {/* Representación sobria del sistema trabajando: qué entra y qué deja hecho. */}
          <div aria-hidden className="hidden lg:block">
            <div className="rounded-3xl border border-roto/15 bg-azul-hondo/80 p-7 shadow-[0_30px_80px_rgba(8,24,32,0.45)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-roto/50">El sistema, trabajando</p>
              <ul className="mt-6 space-y-4">
                {[
                  { I: PhoneCall, entra: 'Entra una llamada', hace: 'Atendida · cita registrada' },
                  { I: MessageCircle, entra: 'Llega un WhatsApp', hace: 'Respondido · datos recogidos' },
                  { I: FileText, entra: 'Llega una factura', hace: 'Leída · asignada a su sitio' },
                  { I: Mail, entra: 'Entra un correo', hace: 'Clasificado · borrador listo' },
                ].map(({ I, entra, hace }) => (
                  <li key={entra} className="flex items-center gap-4 rounded-2xl bg-roto/[0.05] px-4 py-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-roto/10 text-cobre-claro">
                      <I className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.95rem] font-semibold">{entra}</span>
                      <span className="block text-sm text-roto/60">{hace}</span>
                    </span>
                    <Check className="h-4 w-4 shrink-0 text-cobre-claro" />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-roto/55">
                Sin que nadie de tu equipo tenga que acordarse de hacerlo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · AGENTES (protagonistas) ── */}
      <section id="agentes" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="aparece max-w-3xl">
            <p className="eyebrow">Ya funcionan</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">
              Conoce a los agentes de SendaIA
            </h2>
            <p className="mt-5 text-xl text-grafito-suave">No te contamos lo que pueden hacer. Te dejamos verlo.</p>
          </div>

          {/* Voz: el protagonista, a todo el ancho */}
          <div className="aparece sobre-azul mt-14 grid overflow-hidden rounded-[2rem] bg-azul text-roto lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <p className="eyebrow">Agente de voz</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-[2.6rem]">
                Habla con nuestro agente.
              </h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-roto/80">
                Atiende llamadas, entiende lo que necesita el cliente, consulta información, gestiona citas y registra
                la conversación.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BotonVoz origen="home_agentes" />
                <a href="tel:+34858215026" data-cta="voz_telefono" className="btn btn-linea">
                  <Phone className="h-4 w-4" aria-hidden /> 858 215 026
                </a>
              </div>
              <p className="mt-5 text-sm text-roto/55">
                Desde el ordenador hablas por el micrófono. Desde el móvil, te llama al agente por teléfono.
              </p>
            </div>
            <div aria-hidden className="relative hidden items-center justify-center bg-azul-hondo/60 p-12 lg:flex">
              <div className="flex h-36 items-center gap-[7px]">
                {[28, 54, 82, 46, 100, 68, 36, 88, 58, 30, 72, 96, 44, 64, 26].map((h, i) => (
                  <span
                    key={i}
                    className="block w-[7px] rounded-full"
                    style={{ height: `${h}%`, background: i % 4 === 2 ? 'var(--cobre)' : 'rgba(250,248,245,0.28)' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp y ARIA */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="aparece flex flex-col rounded-[2rem] bg-piedra p-8 sm:p-12">
              <p className="eyebrow">Agente de WhatsApp</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-azul sm:text-4xl">
                Escríbele como lo haría un cliente.
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-grafito-suave">
                Responde consultas, recoge información, realiza seguimientos y puede conectarse con los sistemas del
                negocio.
              </p>
              <div className="mt-auto pt-8">
                <BotonWhatsApp origen="home_agentes" />
              </div>
            </div>

            <div className="aparece flex flex-col rounded-[2rem] border border-azul/15 bg-white p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-azul text-cobre-claro">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <p className="eyebrow">Tu guía dentro de SendaIA</p>
              </div>
              <h3 className="mt-5 font-display text-4xl font-semibold tracking-[0.04em] text-azul sm:text-5xl">ARIA</h3>
              <p className="mt-5 text-lg leading-relaxed text-grafito-suave">
                Cuéntale qué tarea te está quitando tiempo y descubre cómo podría convertirse en un sistema.
              </p>
              <div className="mt-auto pt-8">
                <BotonAria origen="home_agentes" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · DEMOS POR NEGOCIO ── */}
      <section id="demos" className="scroll-mt-20 bg-piedra py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="aparece max-w-3xl">
            <p className="eyebrow">Demos</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">
              Un agente. Distintos negocios.
            </h2>
            <p className="mt-5 text-xl text-grafito-suave">
              El mismo agente, adaptado a cómo trabaja cada uno. Son grabaciones del agente funcionando.
            </p>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-7">
            {DEMOS_NEGOCIO.map((d) => (
              <article key={d.clave} className="aparece">
                <DemoVideo id={d.id} titulo={d.titulo} clave={d.clave} />
                <h3 className="mt-5 font-display text-2xl font-semibold text-azul">{d.negocio}</h3>
                <p className="mt-2 leading-relaxed text-grafito-suave">{d.texto}</p>
                <Link
                  href={d.sector}
                  data-cta={`demo_sector_${d.clave}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-cobre-boton hover:underline"
                >
                  Cómo lo aplicamos <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
          {/* Demo de facturas: la única que el visitante puede probar con un documento suyo. */}
          <div className="aparece mt-16 grid items-center gap-8 rounded-[2rem] bg-roto p-8 sm:p-12 lg:grid-cols-[1.4fr_auto]">
            <div>
              <p className="eyebrow">Prueba una automatización real</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-azul sm:text-4xl">
                Sube una factura.
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-grafito-suave">
                El sistema la lee y saca los datos en segundos. Lo mismo puede ocurrir automáticamente con cada
                factura que recibe tu empresa.
              </p>
            </div>
            <a href="/demo/facturas" target="_blank" rel="noopener" data-cta="demo_facturas" className="btn btn-cobre">
              <FileText className="h-4 w-4" aria-hidden /> Probar la demo de facturas
            </a>
          </div>
        </div>
      </section>

      {/* ── 4 · EL SISTEMA ── */}
      <section id="sistema" className="sobre-azul scroll-mt-20 bg-azul text-roto">
        <SistemaScroll>
          <p className="eyebrow">Automatización</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">
            Los agentes son solo la parte que ves.
          </h2>
          <p className="mt-5 text-xl text-roto/80">Detrás construimos el sistema que hace que todo funcione.</p>
          <p className="mt-8 max-w-md border-l-2 border-cobre pl-5 text-lg leading-relaxed text-roto/75">
            No conectamos herramientas porque sí. Diseñamos el sistema alrededor de tu negocio.
          </p>
        </SistemaScroll>
      </section>

      {/* ── 5 · CASO REAL ── */}
      <section id="caso" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="aparece max-w-3xl">
            <p className="eyebrow">Caso real</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">
              De hojas de Excel sueltas a un sistema que cuadra solo
            </h2>
            <p className="mt-5 text-lg text-grafito-suave">
              Instaladora de climatización · 83 trabajadores · Granada · en marcha desde mayo de 2026
            </p>
          </div>

          <div className="mt-14 grid gap-10 border-t border-azul/15 pt-10 lg:grid-cols-3 lg:gap-12">
            <div className="aparece">
              <p className="eyebrow">Problema</p>
              <p className="mt-4 text-lg leading-relaxed text-grafito">
                Llevaban obras, horas y facturas de proveedor en Excels dispersos. Cada factura se imputaba a mano a su
                obra; los descuadres aparecían meses después y nadie sabía el margen real de cada proyecto hasta que
                era tarde.
              </p>
            </div>
            <div className="aparece">
              <p className="eyebrow">Sistema SendaIA</p>
              <p className="mt-4 text-lg leading-relaxed text-grafito">
                Un sistema de gestión a medida: las facturas de proveedor entran por correo, la IA extrae cada línea y
                la liga a su obra automáticamente. Horas sincronizadas desde el sistema de campo. Panel por obra con
                coste real frente al estimado.
              </p>
            </div>
            <div className="aparece">
              <p className="eyebrow">Resultado</p>
              <p className="mt-4 font-display text-5xl font-semibold text-azul">932 facturas</p>
              <p className="mt-4 text-lg leading-relaxed text-grafito">
                En sus primeros tres meses el sistema procesó 932 facturas de proveedor (1.848 líneas de gasto)
                repartidas entre 388 obras, con el margen de cada una visible al instante y avisos cuando algo no
                cuadra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 · CÓMO TRABAJAMOS ── */}
      <section id="proceso" className="scroll-mt-20 bg-piedra py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="aparece max-w-3xl">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">Cuatro pasos. Sin sorpresas.</h2>
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PASOS.map((p) => (
              <li key={p.n} className="aparece border-t-2 border-azul pt-6">
                <span className="font-display text-5xl font-semibold text-cobre">{p.n}</span>
                <h3 className="mt-4 text-xl font-bold uppercase tracking-[0.06em] text-azul">{p.titulo}</h3>
                <p className="mt-3 leading-relaxed text-grafito-suave">{p.texto}</p>
              </li>
            ))}
          </ol>
          <p className="aparece mt-14 max-w-3xl font-display text-2xl leading-snug text-azul sm:text-3xl">
            No tienes que saber de IA. Tienes que conocer tu negocio. Del sistema nos encargamos nosotros.
          </p>
        </div>
      </section>

      {/* ── 7 · CTA FINAL ── */}
      <section id="contacto" className="sobre-azul scroll-mt-20 bg-azul py-20 text-roto sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">
              ¿Qué tarea sigue haciendo una persona que podría hacer un sistema?
            </h2>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-roto/80">
              Cuéntanosla. Analizamos el proceso y te decimos qué tiene sentido automatizar y qué no.
            </p>
            <ul className="mt-9 space-y-4 text-roto/80">
              <li className="flex items-start gap-3">
                <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-cobre-claro" aria-hidden />
                <span>Un diagnóstico de 30 minutos, sin coste.</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cobre-claro" aria-hidden />
                <span>
                  O llámanos:{' '}
                  <a href="tel:+34858215026" data-cta="contacto_telefono" className="font-bold underline underline-offset-4">
                    858 215 026
                  </a>
                </span>
              </li>
            </ul>
            <p className="mt-12 font-display text-2xl text-cobre-claro">Nosotros ponemos los sistemas. Tú disfrutas.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <AssistantDock />
      <WhatsAppButton />
      <SiteFooter />
    </main>
  )
}
