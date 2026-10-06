import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PaginaInterior, Hero, CtaDiagnostico } from '../components/Pagina'
import { BotonVoz } from '../components/HomeClient'
import { CASOS, meta } from '../components/datos'

export const metadata = meta(
  '/casos-reales',
  'Casos reales de automatización con IA: facturas, informes y agente de voz',
  'Tres proyectos reales: una instaladora que pasó de hojas de Excel a un sistema que cuadra solo, un perito que redacta informes en minutos y una clínica con un agente de voz que atiende cada llamada.',
)

export default function CasosReales() {
  return (
    <PaginaInterior seccion="casos-reales" migas={[{ nombre: 'Casos reales', ruta: '/casos-reales' }]}>
      <Hero
        eyebrow="Casos reales"
        titulo="Proyectos que ya están en marcha."
        acento="Con lo que pasó, tal cual."
        lead="Sin testimonios inventados ni cifras redondas. Cada caso cuenta qué problema había, qué sistema se diseñó, cómo funciona y qué cambió. Los clientes aparecen sin nombre."
      >
        {CASOS.map((c) => (
          <a key={c.id} href={`#${c.id}`} data-cta={`casos_ir_${c.id}`} className="btn btn-linea">{c.sector}</a>
        ))}
      </Hero>

      {CASOS.map((c, i) => (
        <section key={c.id} id={c.id} className={`pared scroll-mt-20 py-20 text-grafito sm:py-28 ${i % 2 ? 'bg-piedra' : ''}`}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="aparece max-w-3xl">
              <p className="eyebrow">{c.sector}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">{c.titulo}</h2>
              <p className="mt-5 text-lg text-grafito-suave">{c.contexto}</p>
            </div>

            <div className="mt-12 grid gap-10 border-t border-azul/15 pt-10 lg:grid-cols-3 lg:gap-12">
              <div className="aparece">
                <p className="eyebrow">Problema</p>
                <p className="mt-4 text-lg leading-relaxed">{c.problema}</p>
              </div>
              <div className="aparece">
                <p className="eyebrow">Sistema diseñado</p>
                <p className="mt-4 text-lg leading-relaxed">{c.sistema}</p>
              </div>
              <div className="aparece">
                <p className="eyebrow">Resultado</p>
                <p className="mt-4 font-display text-4xl font-semibold text-azul">{c.destacado}</p>
                <p className="mt-4 text-lg leading-relaxed">{c.resultado}</p>
              </div>
            </div>

            <div className="aparece mt-12 border-t border-azul/15 pt-10">
              <p className="eyebrow">Cómo funciona</p>
              <ol className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {c.pasos.map((p, k) => (
                  <li key={p} className="flex items-start gap-4">
                    <span className="font-display text-3xl font-semibold leading-none text-cobre-texto">{String(k + 1).padStart(2, '0')}</span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="aparece mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              {c.id === 'clinica' ? <BotonVoz origen="casos_clinica" /> : (
                <a href="#contacto" data-cta={`casos_${c.id}_diagnostico`} className="btn btn-cobre">{c.cta}</a>
              )}
              {c.id === 'climatizacion' && (
                <Link href="/demos/facturas" data-cta="casos_climatizacion_demo" className="btn btn-linea">
                  Probar la demo de facturas <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
              {c.id === 'clinica' && (
                <a href="#contacto" data-cta="casos_clinica_diagnostico" className="btn btn-linea">Solicitar diagnóstico</a>
              )}
            </div>
          </div>
        </section>
      ))}

      <CtaDiagnostico titulo="¿Qué proceso de tu empresa se parece a uno de estos?" texto="Cuéntanoslo. Analizamos el proceso y te decimos qué tiene sentido automatizar y qué no." />
    </PaginaInterior>
  )
}
