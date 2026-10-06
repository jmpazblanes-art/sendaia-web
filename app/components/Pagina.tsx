import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import AssistantDock from './AssistantDock'
import ContactForm from './ContactForm'
import HeroFondo from './HeroFondo'
import WhatsAppButton from '../WhatsAppButton'
import { HomeEfectos } from './HomeClient'

// Armazón común de las páginas interiores (06-oct-2026): cabecera, voz y Aria,
// WhatsApp flotante y pie. Cada página pone solo su contenido.
export function PaginaInterior({ seccion, children }: { seccion: string; children: React.ReactNode }) {
  return (
    <main className="lienzo">
      <HomeEfectos seccion={seccion} />
      <SiteHeader contacto="#contacto" />
      {children}
      <AssistantDock />
      <WhatsAppButton />
      <SiteFooter />
    </main>
  )
}

/** Cabecera azul de página interior. */
export function Hero({ eyebrow, titulo, acento, lead, children }: { eyebrow: string; titulo: string; acento?: string; lead: string; children?: React.ReactNode }) {
  return (
    <section className="sobre-azul pared-azul relative overflow-hidden bg-azul text-roto">
      <HeroFondo />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-[2.3rem] font-semibold leading-[1.06] sm:text-6xl">
          {titulo}
          {acento && <> <span className="text-cobre-claro">{acento}</span></>}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-roto/80 sm:text-xl">{lead}</p>
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">{children}</div>}
      </div>
    </section>
  )
}

/** Título de sección: eyebrow + h2 + subtítulo opcional. */
export function Titular({ eyebrow, titulo, lead }: { eyebrow: string; titulo: string; lead?: string }) {
  return (
    <div className="aparece max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">{titulo}</h2>
      {lead && <p className="mt-5 text-xl opacity-80">{lead}</p>}
    </div>
  )
}

/** Cierre de página: diagnóstico con el formulario real. Lleva el id «contacto». */
export function CtaDiagnostico({ titulo = '¿Qué tarea sigue haciendo una persona que podría hacer un sistema?', texto = 'Cuéntanosla. Analizamos el proceso y te decimos qué tiene sentido automatizar y qué no.' }: { titulo?: string; texto?: string }) {
  return (
    <section id="contacto" className="sobre-azul scroll-mt-20 bg-azul py-20 text-roto sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Diagnóstico</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">{titulo}</h2>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-roto/80">{texto}</p>
          <p className="mt-9 text-roto/80">
            O llámanos:{' '}
            <a href="tel:+34858215026" data-cta="contacto_telefono" className="font-bold underline underline-offset-4">858 215 026</a>
          </p>
          <p className="mt-10 font-display text-2xl text-cobre-claro">Nosotros ponemos los sistemas. Tú disfrutas.</p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
