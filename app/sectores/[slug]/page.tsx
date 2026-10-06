import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { PaginaInterior, Hero, Titular, CtaDiagnostico } from '../../components/Pagina'
import { DemoVideo } from '../../components/HomeClient'
import { FOTO_SECTOR } from '../../components/datos'
import { SECTORES_PAGINAS, getSector } from '../contenido'

// Páginas de sector (rediseño 06-oct-2026). Misma información que antes, con la
// maquetación del resto de la web. Cada una sirve para SEO, campañas y enlaces
// comerciales: por eso conservan sus URLs, sus datos estructurados y su contenido.

// JSON-LD: se escapa `<` para que ningún texto pueda cerrar la etiqueta <script>.
const ldJson = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c')

// genera las 6 rutas estáticas en build
export function generateStaticParams() {
  return SECTORES_PAGINAS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSector(slug)
  if (!s) return { title: 'Sector no encontrado' }
  // Sin «— SendaIA» en el título: la plantilla del sitio ya añade «· SendaIA»
  // (antes salía duplicado: «… — SendaIA · SendaIA»).
  const titulo = `${s.nombre}: automatización con IA`
  return {
    title: titulo,
    description: s.intro,
    alternates: { canonical: `https://sendaia.es/sectores/${slug}` },
    openGraph: { type: 'website', locale: 'es_ES', siteName: 'SendaIA', title: titulo, description: s.intro, url: `https://sendaia.es/sectores/${slug}` },
    twitter: { card: 'summary_large_image', title: titulo, description: s.intro },
  }
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSector(slug)
  if (!s) notFound()
  const otros = SECTORES_PAGINAS.filter((o) => o.slug !== s.slug)
  const wa = (texto: string) => `https://wa.me/34627256996?text=${encodeURIComponent(texto)}`

  return (
    <PaginaInterior
      seccion="sector"
      extra={{ seccion: 'sector', sector: s.slug }}
      migas={[{ nombre: 'Demos', ruta: '/demos' }, { nombre: s.nombre, ruta: `/sectores/${s.slug}` }]}
    >
      {/* Datos estructurados por sector: le dicen a Google (y a ChatGPT/Perplexity) QUÉ servicio es,
          para quién y dónde. El Organization/LocalBusiness global vive en app/layout.tsx. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `Automatización con IA para ${s.nombre.toLowerCase()}`,
            description: s.intro,
            serviceType: 'Automatización de procesos con inteligencia artificial',
            url: `https://sendaia.es/sectores/${s.slug}`,
            provider: { '@id': 'https://sendaia.es/#organization' },
            areaServed: [
              { '@type': 'City', name: 'Granada' },
              { '@type': 'Country', name: 'España' },
            ],
            audience: { '@type': 'BusinessAudience', name: s.nombre },
          }),
        }}
      />

      <Hero foto={FOTO_SECTOR[s.slug]} eyebrow={s.eyebrow} titulo={s.h1} acento={s.h1Accent} lead={s.intro}>
        <a href="#contacto" data-cta={`sector_${s.slug}_diagnostico`} className="btn btn-cobre">
          Pide tu diagnóstico gratuito <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <a
          href={wa(`Hola, me interesa conocer soluciones de automatización con IA para ${s.nombre.toLowerCase()}.`)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={`sector_${s.slug}_whatsapp`}
          className="btn btn-linea"
        >
          Escribir por WhatsApp
        </a>
      </Hero>

      {/* Lo que te cuesta hoy */}
      <section className="pared py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="El problema" titulo="Lo que te está costando ahora" />
          <div className="mt-12 grid gap-10 border-t border-azul/15 pt-10 md:grid-cols-3 md:gap-12">
            {s.dolores.map((d) => (
              <div key={d.titulo} className="aparece">
                <h3 className="font-display text-2xl font-semibold text-azul">{d.titulo}</h3>
                <p className="mt-3 text-lg leading-relaxed text-grafito-suave">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cada dolor, con su propio pitch: problema → solución → cifra */}
      {s.ganchos && s.ganchos.length > 0 && (
        <section className="pared bg-piedra py-20 text-grafito sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Titular eyebrow="Cómo lo resolvemos" titulo="Tres formas de darle la vuelta al problema" />
            <ol className="mt-12">
              {s.ganchos.map((g, i) => (
                <li key={g.gancho} className="aparece grid gap-6 border-t border-azul/20 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                  <div className="flex items-start gap-5">
                    <span className="font-display text-4xl font-semibold leading-none text-cobre-texto">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-2xl font-semibold leading-snug text-azul sm:text-3xl">{g.gancho}</h3>
                  </div>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p><span className="font-bold text-azul">El problema. </span>{g.problema}</p>
                    <p><span className="font-bold text-azul">La solución. </span>{g.solucion}</p>
                    <p className="inline-block rounded-full border border-azul/25 px-4 py-1.5 text-base font-semibold text-azul">{g.cifra}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* La solución */}
      <section className="sobre-azul bg-azul py-20 text-roto sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="aparece">
            <p className="eyebrow">La solución SendaIA</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">{s.solucionTitulo}</h2>
            <p className="mt-6 text-lg leading-relaxed text-roto/85">{s.solucion}</p>
          </div>
          <ul className="aparece space-y-6 lg:pt-3">
            {s.agentes.map((a) => (
              <li key={a.nombre} className="flex items-start gap-4 border-t border-roto/15 pt-6">
                <Check className="mt-1 h-5 w-5 shrink-0 text-cobre-claro" aria-hidden />
                <div>
                  <h3 className="font-display text-2xl font-semibold">{a.nombre}</h3>
                  <p className="mt-1 leading-relaxed text-roto/80">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qué ganas + la objeción de siempre, ya contestada */}
      {(s.retorno || s.objecion) && (
        <section className="pared py-20 text-grafito sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
            {s.retorno && (
              <div className="aparece">
                <p className="eyebrow">Qué ganas tú</p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-snug text-azul sm:text-4xl">{s.retorno.titulo}</h2>
                <p className="mt-5 text-lg leading-relaxed">{s.retorno.texto}</p>
              </div>
            )}
            {s.objecion && (
              <div className="aparece">
                <p className="eyebrow">La duda de siempre</p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-snug text-azul sm:text-4xl">{s.objecion.pregunta}</h2>
                <p className="mt-5 text-lg leading-relaxed">{s.objecion.respuesta}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Demo real del sector, si la hay */}
      {s.videoYoutube && (
        <section className="bg-piedra py-20 text-grafito sm:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <Titular eyebrow="Demo real" titulo="Míralo funcionando" />
            <div className="aparece mt-10">
              <DemoVideo id={s.videoYoutube} titulo={`Demo de ${s.nombre} — SendaIA`} clave={`sector_${s.slug}`} />
            </div>
          </div>
        </section>
      )}

      {/* Otros sectores: enlazado interno */}
      <section className="py-16 text-grafito sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow">Otros sectores</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {otros.map((o) => (
              <li key={o.slug}>
                <Link href={`/sectores/${o.slug}`} data-cta={`sector_${s.slug}_a_${o.slug}`} className="inline-block rounded-full border border-azul/20 px-5 py-2 text-azul transition-colors hover:border-azul hover:bg-azul/5">
                  {o.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaDiagnostico titulo="Pide tu diagnóstico gratuito" texto={s.cierre} />
    </PaginaInterior>
  )
}
