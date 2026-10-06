import Link from 'next/link'
import { ArrowRight, FileText, MessageCircle, PhoneCall, Sparkles } from 'lucide-react'
import { PaginaInterior, Hero, Titular, CtaDiagnostico } from '../components/Pagina'
import { BotonAria, BotonVoz, BotonWhatsApp, DemoVideo, VideoBajoDemanda } from '../components/HomeClient'
import { DEMOS_NEGOCIO, SECTORES_RESUMEN, VIDEOS_DEMO, meta } from '../components/datos'

export const metadata = meta(
  '/demos',
  'Demos de agentes de IA: voz, WhatsApp, Aria y facturas',
  'Prueba un agente de voz, un agente de WhatsApp, Aria y la demo de facturas, y mira cómo trabajan en una clínica, una inmobiliaria y un restaurante.',
)

export default function Demos() {
  return (
    <PaginaInterior seccion="demos">
      <Hero
        eyebrow="Demos"
        titulo="No imagines lo que podemos hacer."
        acento="Pruébalo."
        lead="Esto no son capturas ni promesas: son los agentes y la automatización que usan nuestros clientes, abiertos para que los manejes tú."
      >
        <a href="#agentes" data-cta="demos_ir_agentes" className="btn btn-cobre">Probar los agentes</a>
        <Link href="/demos/facturas" data-cta="demos_ir_facturas" className="btn btn-linea">Subir una factura</Link>
      </Hero>

      {/* ── LOS TRES AGENTES, EN VIVO ── */}
      <section id="agentes" className="scroll-mt-20 py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="En directo" titulo="Habla con ellos" lead="Los tres funcionan ahora mismo." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="aparece flex flex-col rounded-[2rem] border border-azul/15 bg-white p-8">
              <PhoneCall className="h-7 w-7 text-cobre" aria-hidden />
              <h3 className="mt-5 font-display text-2xl font-semibold text-azul">Agente de voz</h3>
              <p className="mt-3 leading-relaxed text-grafito-suave">Háblale como lo haría un cliente. Atiende, entiende y agenda.</p>
              <div className="mt-auto pt-7"><BotonVoz origen="demos" /></div>
            </article>
            <article className="aparece flex flex-col rounded-[2rem] border border-azul/15 bg-white p-8">
              <MessageCircle className="h-7 w-7 text-cobre" aria-hidden />
              <h3 className="mt-5 font-display text-2xl font-semibold text-azul">Agente de WhatsApp</h3>
              <p className="mt-3 leading-relaxed text-grafito-suave">Escríbele y mira cómo contesta, recoge los datos y propone una cita.</p>
              <div className="mt-auto pt-7"><BotonWhatsApp origen="demos" /></div>
            </article>
            <article className="aparece flex flex-col rounded-[2rem] border border-azul/15 bg-white p-8">
              <Sparkles className="h-7 w-7 text-cobre" aria-hidden />
              <h3 className="mt-5 font-display text-2xl font-semibold text-azul">ARIA</h3>
              <p className="mt-3 leading-relaxed text-grafito-suave">Cuéntale qué tarea te quita tiempo y descubre cómo se convertiría en un sistema.</p>
              <div className="mt-auto pt-7"><BotonAria origen="demos" /></div>
            </article>
          </div>
        </div>
      </section>

      {/* ── FACTURAS ── */}
      <section id="facturas" className="sobre-azul scroll-mt-20 bg-azul py-20 text-roto sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_auto] lg:gap-16">
          <div className="aparece">
            <p className="eyebrow">Una automatización real</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">Sube una factura.</h2>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-roto/80">
              El sistema la lee y saca los datos en segundos. Lo mismo puede ocurrir automáticamente con cada factura que recibe tu empresa.
            </p>
          </div>
          <div className="aparece">
            <Link href="/demos/facturas" data-cta="demos_facturas" className="btn btn-cobre">
              <FileText className="h-4 w-4" aria-hidden /> Subir una factura
            </Link>
          </div>
        </div>
      </section>

      {/* ── POR NEGOCIO ── */}
      <section className="bg-piedra py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="Por negocio" titulo="Un agente. Distintos negocios." lead="Grabaciones del agente funcionando en cada caso." />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-7">
            {DEMOS_NEGOCIO.map((d) => (
              <article key={d.clave} className="aparece">
                <DemoVideo id={d.id} titulo={d.titulo} clave={`demos_${d.clave}`} />
                <h3 className="mt-5 font-display text-2xl font-semibold text-azul">{d.negocio}</h3>
                <p className="mt-2 leading-relaxed text-grafito-suave">{d.texto}</p>
                <Link href={d.sector} data-cta={`demos_sector_${d.clave}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-cobre-boton hover:underline">
                  Cómo lo aplicamos <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÁS VÍDEOS ── */}
      <section className="py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="Más vídeos" titulo="Lo que hay detrás" lead="Tres automatizaciones grabadas funcionando." />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-7">
            {VIDEOS_DEMO.map((v) => (
              <article key={v.clave} className="aparece">
                <VideoBajoDemanda {...v} clave={`demos_${v.clave}`} />
                <h3 className="mt-5 font-display text-2xl font-semibold text-azul">{v.titulo}</h3>
                <p className="mt-2 leading-relaxed text-grafito-suave">{v.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR SECTOR ── */}
      <section id="sectores" className="bg-piedra scroll-mt-20 py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="Por sector" titulo="Cómo lo aplicamos en tu sector" />
          <ul className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {SECTORES_RESUMEN.map((s) => (
              <li key={s.slug} className="aparece border-t border-azul/15">
                <Link href={`/sectores/${s.slug}`} data-cta={`demos_sector_${s.slug}`} className="group flex items-start justify-between gap-4 py-6">
                  <span>
                    <span className="block font-display text-2xl font-semibold text-azul">{s.titulo}</span>
                    <span className="mt-1 block leading-relaxed text-grafito-suave">{s.texto}</span>
                  </span>
                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-cobre transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaDiagnostico />
    </PaginaInterior>
  )
}
