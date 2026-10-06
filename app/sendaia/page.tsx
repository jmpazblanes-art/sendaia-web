import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PaginaInterior, Hero, Titular, CtaDiagnostico } from '../components/Pagina'
import Opiniones from '../components/Opiniones'
import { PASOS, PILARES, meta } from '../components/datos'

export const metadata = meta(
  '/sendaia',
  'SendaIA: sistemas con IA para empresas reales, desde Granada',
  'SendaIA diseña e implementa sistemas con IA para empresas reales: automatiza procesos, conecta herramientas, atiende clientes y elimina trabajo manual. Así trabajamos.',
)

const IDEAS = [
  { titulo: 'Orden', texto: 'Cada llamada, mensaje, factura y documento acaba en su sitio, sin que nadie tenga que acordarse de colocarlo.' },
  { titulo: 'Control', texto: 'Sabes qué pasa en tu negocio en cada momento: qué entró, qué se hizo y qué no cuadra.' },
  { titulo: 'Tiempo recuperado', texto: 'Tu equipo deja de hacer a mano lo que puede hacer un sistema y vuelve a lo que solo puede hacer una persona.' },
]

export default function SobreSendaia() {
  return (
    <PaginaInterior seccion="sendaia" migas={[{ nombre: 'SendaIA', ruta: '/sendaia' }]}>
      <Hero
        eyebrow="SendaIA"
        titulo="Sistemas con IA"
        acento="para negocios reales."
        lead="Diseñamos e implementamos sistemas que automatizan procesos, conectan herramientas, atienden a tus clientes y eliminan trabajo manual. Desde Granada, para empresas que no tienen un equipo técnico."
      >
        <a href="#contacto" data-cta="sendaia_diagnostico" className="btn btn-cobre">Solicitar diagnóstico</a>
        <Link href="/casos-reales" data-cta="sendaia_casos" className="btn btn-linea">Ver casos reales</Link>
      </Hero>

      <section className="pared py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="aparece max-w-4xl">
            <p className="eyebrow">Lo que creemos</p>
            <p className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-azul sm:text-6xl">
              La diferencia no es trabajar más. Es tener sistemas.
            </p>
          </div>
          <div className="mt-14 grid gap-10 border-t border-azul/15 pt-10 md:grid-cols-3 md:gap-12">
            {IDEAS.map((i) => (
              <div key={i.titulo} className="aparece">
                <h3 className="font-display text-3xl font-semibold text-cobre-texto">{i.titulo}</h3>
                <p className="mt-3 text-lg leading-relaxed">{i.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pared bg-piedra py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="Cómo trabajamos" titulo="Cuatro pasos. Sin sorpresas." />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PASOS.map((p) => (
              <li key={p.n} className="aparece border-t-2 border-azul pt-6">
                <span className="font-display text-5xl font-semibold text-cobre-texto">{p.n}</span>
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

      <section className="py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="Lo que nos diferencia" titulo="Cómo es trabajar con nosotros" />
          <ul className="mt-12 grid gap-x-12 gap-y-2 md:grid-cols-2">
            {PILARES.map((p) => (
              <li key={p.titulo} className="aparece border-t border-azul/15 py-6">
                <h3 className="font-display text-2xl font-semibold text-azul">{p.titulo}</h3>
                <p className="mt-2 text-lg leading-relaxed text-grafito-suave">{p.texto}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/calculadora" data-cta="sendaia_calculadora" className="btn btn-linea">Calculadora de automatización</Link>
            <Link href="/soluciones" data-cta="sendaia_soluciones" className="btn btn-linea">
              Otras soluciones <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Opiniones />
      <CtaDiagnostico />
    </PaginaInterior>
  )
}
