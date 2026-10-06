import { Globe } from 'lucide-react'
import { PaginaInterior, Hero, CtaDiagnostico } from '../components/Pagina'
import { meta } from '../components/datos'

export const metadata = meta(
  '/soluciones',
  'Diseño y desarrollo web con IA integrada',
  'Webs rápidas, cuidadas y con chat y voz con IA integrados, a medida y listas en días. Una solución complementaria a los sistemas de SendaIA.',
)

const PUNTOS = ['Diseño a medida', 'Chat y voz con IA', 'Animaciones cuidadas', 'Lista en días']

export default function Soluciones() {
  return (
    <PaginaInterior seccion="soluciones">
      <Hero
        eyebrow="Soluciones complementarias"
        titulo="¿Te gusta esta web?"
        acento="La hicimos nosotros."
        lead="Además de los sistemas con IA, diseñamos y programamos webs rápidas, cuidadas y con IA integrada, como esta que estás viendo."
      >
        <a href="#contacto" data-cta="soluciones_diagnostico" className="btn btn-cobre">Quiero una web así</a>
      </Hero>

      <section className="pared py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="aparece">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-azul text-cobre-claro">
              <Globe className="h-7 w-7" aria-hidden />
            </span>
            <p className="eyebrow mt-8">Diseño y desarrollo web</p>
            <p className="mt-4 font-display text-3xl font-semibold leading-snug text-azul sm:text-4xl">
              Sin plantillas genéricas: tu web, a tu medida, con el agente de voz y el chat de tu negocio dentro.
            </p>
            <ul className="mt-10 flex flex-wrap gap-3">
              {PUNTOS.map((p) => (
                <li key={p} className="rounded-full border border-azul/20 px-5 py-2 text-azul">{p}</li>
              ))}
            </ul>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-grafito-suave">
              Es un complemento, no nuestro centro: lo que hacemos principalmente son sistemas que automatizan tu negocio. Cuando tu web
              también tiene que atender, agendar y registrar, la diseñamos junto con esos sistemas.
            </p>
          </div>
        </div>
      </section>

      <CtaDiagnostico titulo="Cuéntanos qué web necesitas." texto="Te decimos qué tiene sentido hacer y cómo encajaría con el resto de tu negocio." />
    </PaginaInterior>
  )
}
