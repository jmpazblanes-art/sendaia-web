import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PaginaInterior, Hero, CtaDiagnostico } from '../../components/Pagina'
import { meta } from '../../components/datos'

export const metadata = meta(
  '/demos/facturas',
  'Demo de automatización de facturas: sube una factura y mira cómo se lee',
  'Prueba una automatización real de facturas: sube una factura y el sistema extrae los datos en segundos. Lo mismo puede ocurrir con cada factura que recibe tu empresa.',
)

// La demo es la aplicación que ya existía (la misma a la que lleva /demo/facturas).
// Aquí se muestra incrustada dentro de la web, con el mensaje comercial debajo.
// Si el navegador no la deja incrustar, el botón la abre en pantalla completa.
const DEMO = 'https://demo-pedidos-legumbre-espino.vercel.app/'

export default function DemoFacturas() {
  return (
    <PaginaInterior seccion="demo-facturas" migas={[{ nombre: 'Demos', ruta: '/demos' }, { nombre: 'Demo de facturas', ruta: '/demos/facturas' }]}>
      <Hero
        eyebrow="Demo · Facturación"
        titulo="Prueba una automatización real."
        acento="Sube una factura."
        lead="Sube una factura y mira cómo el sistema la lee y saca los datos. Es la misma automatización que puede funcionar con cada factura que llega a tu empresa."
      >
        <a href={DEMO} target="_blank" rel="noopener" data-cta="demo_facturas_pantalla_completa" className="btn btn-linea">
          Abrir en pantalla completa
        </a>
      </Hero>

      <section className="py-14 text-grafito sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="aparece overflow-hidden rounded-[1.5rem] border border-azul/20 bg-white shadow-[0_30px_80px_rgba(23,58,74,0.12)]">
            <iframe
              src={DEMO}
              title="Demo de automatización de facturas"
              className="block h-[78vh] min-h-[560px] w-full"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
          <p className="mt-4 text-sm text-grafito-suave">
            Es una demo: no hace falta registrarse y no es tu contabilidad. Usa una factura de ejemplo si prefieres no subir una tuya.
          </p>

          <div className="aparece mt-16 grid items-center gap-8 border-t border-azul/15 pt-12 lg:grid-cols-[1.4fr_auto]">
            <div>
              <p className="eyebrow">Después de probarlo</p>
              <p className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-snug text-azul sm:text-4xl">
                Esto que acabas de hacer en segundos puede ocurrir automáticamente con cada factura que recibe tu empresa.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="#contacto" data-cta="demo_facturas_quiero" className="btn btn-cobre">Quiero esto en mi empresa</a>
              <Link href="/automatizaciones#facturacion" data-cta="demo_facturas_mas" className="btn btn-linea">
                Cómo funciona <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaDiagnostico titulo="¿Cuántas facturas llegan a tu empresa cada mes?" texto="Cuéntanos cómo las gestionáis hoy. Analizamos el proceso y te decimos qué tiene sentido automatizar y qué no." />
    </PaginaInterior>
  )
}
