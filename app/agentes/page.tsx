import Link from 'next/link'
import { ArrowRight, Check, MessageCircle, PhoneCall, Sparkles } from 'lucide-react'
import { PaginaInterior, Hero, Titular, CtaDiagnostico } from '../components/Pagina'
import { BotonAria, BotonVoz, BotonWhatsApp, DemoVideo, VideoBajoDemanda } from '../components/HomeClient'
import { DEMOS_NEGOCIO, FOTOS, VIDEOS_DEMO, meta } from '../components/datos'

export const metadata = meta(
  '/agentes',
  'Agentes de IA: agente de voz, agente de WhatsApp y Aria',
  'Agente de voz, agente de WhatsApp y Aria, el agente de esta web: atienden, recogen información, agendan y hacen seguimiento. Pruébalos ahora mismo, sin registrarte.',
)

type Agente = {
  id: string
  eyebrow: string
  titulo: string
  lead: string
  usos: string[]
  pasos: string[]
  conecta: string[]
}

const VOZ: Agente = {
  id: 'voz',
  eyebrow: 'Agente de voz',
  titulo: 'Habla con nuestro agente.',
  lead: 'Atiende llamadas, entiende lo que necesita el cliente, consulta información, gestiona citas y registra la conversación.',
  usos: [
    'Una clínica que pierde llamadas fuera de horario y en las horas punta.',
    'Una inmobiliaria que capta contactos, resuelve la cartera de inmuebles y agenda visitas.',
    'Un restaurante que atiende una reserva de principio a fin.',
  ],
  pasos: [
    'Contesta cada llamada, a cualquier hora.',
    'Entiende lo que necesita la persona, hablando con naturalidad.',
    'Consulta la disponibilidad real y agenda la cita en el momento.',
    'Registra la conversación y, si hace falta, pasa la llamada a una persona.',
  ],
  conecta: ['Agenda y calendario', 'Registro de conversaciones', 'Línea telefónica'],
}

const WHATSAPP: Agente = {
  id: 'whatsapp',
  eyebrow: 'Agente de WhatsApp',
  titulo: 'Escríbele como lo haría un cliente.',
  lead: 'Responde consultas, recoge información, realiza seguimientos y puede conectarse con los sistemas del negocio.',
  usos: [
    'Consultas que llegan fuera de horario y que nadie contestaba hasta el día siguiente.',
    'Contactos nuevos que hay que cualificar antes de que un comercial los llame.',
    'Citas que se piden por mensaje y se cierran sin intervención humana.',
  ],
  pasos: [
    'El cliente escribe como siempre, desde su WhatsApp.',
    'Recibe respuesta al momento, con el tono de tu negocio.',
    'El agente recoge los datos y cualifica el contacto.',
    'Ofrece huecos reales y cierra la cita en el calendario.',
    'Si detecta una oportunidad caliente, avisa al equipo.',
  ],
  conecta: ['WhatsApp Business', 'CRM', 'Calendario'],
}

function Lista({ items, marca }: { items: string[]; marca?: boolean }) {
  return (
    <ul className="mt-5 space-y-3.5">
      {items.map((t, i) => (
        <li key={t} className="flex items-start gap-3 leading-relaxed">
          {marca ? (
            <Check className="mt-1 h-4 w-4 shrink-0 text-cobre" aria-hidden />
          ) : (
            <span className="mt-0.5 font-display text-lg font-semibold text-cobre-texto">{String(i + 1).padStart(2, '0')}</span>
          )}
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

function Detalle({ a }: { a: Agente }) {
  return (
    <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
      <div className="aparece">
        <p className="eyebrow">Casos de uso</p>
        <Lista items={a.usos} marca />
      </div>
      <div className="aparece">
        <p className="eyebrow">Cómo funciona</p>
        <Lista items={a.pasos} />
      </div>
      <div className="aparece">
        <p className="eyebrow">Se conecta con</p>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {a.conecta.map((c) => (
            <li key={c} className="rounded-full border border-current/25 px-4 py-2 text-sm">{c}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Agentes() {
  return (
    <PaginaInterior seccion="agentes" migas={[{ nombre: 'Agentes', ruta: '/agentes' }]}>
      <Hero
        foto={FOTOS.voz}
        eyebrow="Agentes de IA"
        titulo="Tres agentes que ya trabajan."
        acento="Pruébalos."
        lead="No te contamos lo que pueden hacer. Te dejamos verlo: el agente de voz, el de WhatsApp y Aria son los mismos que usan nuestros clientes."
      >
        <a href="#voz" className="btn btn-cobre" data-cta="agentes_ir_voz">Agente de voz</a>
        <a href="#whatsapp" className="btn btn-linea" data-cta="agentes_ir_whatsapp">Agente de WhatsApp</a>
        <a href="#aria" className="btn btn-linea" data-cta="agentes_ir_aria">Aria</a>
      </Hero>

      {/* ── VOZ ── */}
      <section id="voz" className="scroll-mt-20 py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="aparece">
              <p className="eyebrow">{VOZ.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">{VOZ.titulo}</h2>
              <p className="mt-5 max-w-xl text-xl leading-relaxed text-grafito-suave">{VOZ.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BotonVoz origen="agentes_voz" />
                <a href="tel:+34858215026" data-cta="agentes_voz_telefono" className="btn btn-linea">
                  <PhoneCall className="h-4 w-4" aria-hidden /> 858 215 026
                </a>
              </div>
              <p className="mt-4 text-sm text-grafito-suave">Desde el ordenador hablas por el micrófono. Desde el móvil, te llama al agente por teléfono.</p>
            </div>
            <div className="aparece">
              <DemoVideo id={DEMOS_NEGOCIO[0].id} titulo={DEMOS_NEGOCIO[0].titulo} clave="agentes_clinica" />
              <p className="mt-3 text-sm text-grafito-suave">Demo real: el agente atendiendo y agendando citas en una clínica.</p>
            </div>
          </div>
          <div className="mt-16 border-t border-azul/15 pt-12">
            <Detalle a={VOZ} />
          </div>
        </div>
      </section>

      {/* ── WHATSAPP ── */}
      <section id="whatsapp" className="scroll-mt-20 bg-piedra py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="aparece">
              <p className="eyebrow">{WHATSAPP.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">{WHATSAPP.titulo}</h2>
              <p className="mt-5 max-w-xl text-xl leading-relaxed text-grafito-suave">{WHATSAPP.lead}</p>
              <div className="mt-8"><BotonWhatsApp origen="agentes_whatsapp" /></div>
              <p className="mt-4 text-sm text-grafito-suave">Se abre tu WhatsApp con el mensaje ya escrito; solo tienes que enviarlo.</p>
            </div>
            <div className="aparece">
              <VideoBajoDemanda {...VIDEOS_DEMO[2]} />
              <p className="mt-3 text-sm text-grafito-suave">Vídeo: el agente atendiendo y agendando por WhatsApp.</p>
            </div>
          </div>
          <div className="mt-16 border-t border-azul/15 pt-12">
            <Detalle a={WHATSAPP} />
          </div>
        </div>
      </section>

      {/* ── ARIA ── */}
      <section id="aria" className="sobre-azul scroll-mt-20 bg-azul py-20 text-roto sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="aparece">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-roto/10 text-cobre-claro">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <p className="eyebrow">Tu guía dentro de SendaIA</p>
            </div>
            <h2 className="mt-5 font-display text-5xl font-semibold tracking-[0.04em] sm:text-6xl">ARIA</h2>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-roto/80">
              Cuéntale qué tarea te está quitando tiempo y descubre cómo podría convertirse en un sistema.
            </p>
            <div className="mt-8"><BotonAria origen="agentes_aria" /></div>
          </div>
          <div className="aparece">
            <p className="eyebrow">El concepto, aplicado</p>
            <p className="mt-4 text-lg leading-relaxed text-roto/85">
              Aria es el agente de WhatsApp puesto en una web: contesta al momento, entiende qué necesita quien escribe y puede
              dejar la cita cerrada en el calendario. Es un ejemplo de lo que tu propia web podría tener.
            </p>
            <ul className="mt-6 space-y-3 text-roto/85">
              {['Responde sin que nadie del equipo tenga que estar conectado.', 'Orienta a cada visitante según lo que cuenta.', 'Recoge los datos de contacto y los pasa al equipo.'].map((t) => (
                <li key={t} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-cobre-claro" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── POR SECTOR ── */}
      <section className="py-20 text-grafito sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="Cada negocio, su agente" titulo="El mismo agente, adaptado a tu sector" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demos#sectores" data-cta="agentes_sectores" className="btn btn-linea">
              Ver los sectores <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/demos" data-cta="agentes_demos" className="btn btn-linea">
              <MessageCircle className="h-4 w-4" aria-hidden /> Todas las demos
            </Link>
          </div>
        </div>
      </section>

      <CtaDiagnostico />
    </PaginaInterior>
  )
}
