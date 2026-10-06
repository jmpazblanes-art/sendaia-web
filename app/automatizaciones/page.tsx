import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PaginaInterior, Hero, Titular, CtaDiagnostico } from '../components/Pagina'
import { VideoBajoDemanda } from '../components/HomeClient'
import { FOTOS, VIDEOS_DEMO, meta } from '../components/datos'

export const metadata = meta(
  '/automatizaciones',
  'Automatización administrativa y empresarial: facturas, documentos, email y CRM',
  'Automatización de facturas, documentos, email, CRM y seguimiento de clientes. Organizadas por la necesidad de tu negocio: qué problema resuelven, qué hace el sistema y qué cambia.',
)

// Cada bloque va de la necesidad de la empresa, no de la tecnología.
// Los textos salen de lo ya publicado; solo el bloque de facturación y el de ERP
// llevan cifras, y son las del caso real publicado (en anónimo).
type Bloque = {
  id: string
  titulo: string
  problema: string
  sistema: string
  resultado: string
  video?: number
  enlace?: { href: string; texto: string }
}

const BLOQUES: Bloque[] = [
  {
    id: 'administracion',
    titulo: 'Administración',
    problema: 'El día se va en tareas repetitivas: facturas, correos, albaranes, llamadas y seguimiento.',
    sistema: 'Un sistema que hace esas tareas por tu equipo, conectado a las herramientas que ya usáis.',
    resultado: 'Un back-office que se hace solo.',
  },
  {
    id: 'facturacion',
    titulo: 'Facturación',
    problema: 'Cada factura se imputa a mano a su sitio, y los descuadres aparecen meses después.',
    sistema: 'Extrae, registra y procesa facturas y albaranes sin que tu equipo toque un teclado: entran por correo, la IA lee cada línea y la asigna a su sitio.',
    resultado: 'En un caso real, 932 facturas de proveedor procesadas en tres meses (1.848 líneas de gasto, repartidas entre 388 obras).',
    enlace: { href: '/demos/facturas', texto: 'Probar la demo de facturas' },
  },
  {
    id: 'email',
    titulo: 'Emails',
    problema: 'La bandeja de entrada es un caos y lo importante se pierde entre lo que no lo es.',
    sistema: 'Un agente de email que clasifica, prioriza y redacta borradores para que tu equipo solo revise y envíe.',
    resultado: 'Tu equipo, fuera del papeleo.',
    video: 1,
  },
  {
    id: 'documentos',
    titulo: 'PDFs y documentos',
    problema: 'Contratos, informes y formularios que alguien tiene que leer y teclear a mano.',
    sistema: 'Un agente documental que lee los PDFs y extrae los datos que necesitas, en segundos.',
    resultado: 'Del PDF a tu sistema, sin teclear. En un caso real, un informe pericial pasó de horas a minutos.',
    video: 0,
  },
  {
    id: 'crm',
    titulo: 'CRM',
    problema: 'Los contactos y las conversaciones están repartidos entre el correo, el teléfono y las hojas sueltas.',
    sistema: 'Cada formulario, llamada y WhatsApp entra en tu CRM con su origen, y los agentes reconocen a quien escribe si ya está en tu ficha.',
    resultado: 'Todo en un solo sitio, sin teclear.',
  },
  {
    id: 'reactivacion',
    titulo: 'Reactivación de clientes',
    problema: 'Hay clientes que compraron y dejaron de hablar con vosotros, y nadie tiene tiempo de perseguirlos.',
    sistema: 'Detecta a los clientes dormidos y lanza secuencias personalizadas de seguimiento automático.',
    resultado: 'Clientes que vuelven sin perseguirlos.',
  },
  {
    id: 'seguimientos',
    titulo: 'Seguimientos',
    problema: 'Las citas y las oportunidades se pierden por falta de seguimiento, no por falta de interés.',
    sistema: 'Los agentes responden al momento, hacen el seguimiento y dejan las citas cerradas en el calendario.',
    resultado: 'Nadie se queda sin respuesta.',
    video: 2,
  },
  {
    id: 'integraciones',
    titulo: 'Integraciones',
    problema: 'Herramientas que no se hablan entre sí, y alguien que hace de puente a mano.',
    sistema: 'Conectamos WhatsApp, email, CRM, Google Drive o lo que uséis cada día, para que la información viaje sola.',
    resultado: 'Un solo sistema, en lugar de varias herramientas sueltas.',
  },
  {
    id: 'erp',
    titulo: 'ERP y sistemas internos',
    problema: 'Obras, horas y gastos en hojas de Excel dispersas, y nadie sabe el margen real hasta que es tarde.',
    sistema: 'Un sistema de gestión a medida, con un panel que compara el coste real con el estimado y avisa cuando algo no cuadra.',
    resultado: 'El margen de cada proyecto, visible al instante.',
    enlace: { href: '/casos-reales#climatizacion', texto: 'Ver el caso completo' },
  },
  {
    id: 'a-medida',
    titulo: 'Automatizaciones a medida',
    problema: 'Tu proceso no encaja en un molde estándar.',
    sistema: 'Lo diseñamos contigo desde cero, alrededor de cómo trabaja tu negocio de verdad.',
    resultado: 'Presupuesto personalizado, tras conocer tu caso.',
  },
]

export default function Automatizaciones() {
  return (
    <PaginaInterior seccion="automatizaciones" migas={[{ nombre: 'Automatizaciones', ruta: '/automatizaciones' }]}>
      <Hero
        foto={FOTOS.facturas}
        eyebrow="Automatizaciones"
        titulo="Los agentes son solo la parte que ves."
        acento="Detrás está el sistema."
        lead="No conectamos herramientas porque sí. Diseñamos el sistema alrededor de tu negocio. Aquí está organizado por lo que necesita tu empresa, no por tecnología."
      >
        <a href="#contacto" data-cta="automatizaciones_diagnostico" className="btn btn-cobre">Solicitar diagnóstico</a>
        <Link href="/calculadora" data-cta="automatizaciones_calculadora" className="btn btn-linea">Calcular cuánto trabajo manual tienes</Link>
      </Hero>

      <section className="pared py-20 text-grafito sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Titular eyebrow="Qué necesita tu empresa" titulo="Del problema al resultado" lead="Cada bloque dice qué problema resuelve, qué hace el sistema y qué cambia." />

          <nav aria-label="Bloques" className="aparece mt-8 flex flex-wrap gap-2.5">
            {BLOQUES.map((b) => (
              <a key={b.id} href={`#${b.id}`} className="rounded-full border border-azul/20 px-4 py-2 text-sm text-azul transition-colors hover:border-azul hover:bg-azul/5">
                {b.titulo}
              </a>
            ))}
          </nav>

          <div className="mt-14">
            {BLOQUES.map((b) => (
              <article key={b.id} id={b.id} className="aparece scroll-mt-24 border-t border-azul/15 py-10 sm:py-12">
                <h3 className="font-display text-3xl font-semibold text-azul sm:text-4xl">{b.titulo}</h3>
                <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-12">
                  <div>
                    <p className="eyebrow">Problema</p>
                    <p className="mt-3 text-lg leading-relaxed">{b.problema}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Qué hace el sistema</p>
                    <p className="mt-3 text-lg leading-relaxed">{b.sistema}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Resultado</p>
                    <p className="mt-3 text-lg font-semibold leading-relaxed text-azul">{b.resultado}</p>
                  </div>
                </div>
                {(b.video !== undefined || b.enlace) && (
                  <div className="mt-8 grid items-center gap-6 sm:grid-cols-[minmax(0,26rem)_1fr]">
                    {b.video !== undefined && (
                      <div>
                        <VideoBajoDemanda {...VIDEOS_DEMO[b.video]} />
                        <p className="mt-2 text-sm text-grafito-suave">Vídeo: {VIDEOS_DEMO[b.video].titulo.toLowerCase()}.</p>
                      </div>
                    )}
                    {b.enlace && (
                      <div>
                        <Link href={b.enlace.href} data-cta={`automatizaciones_${b.id}`} className="btn btn-linea">
                          {b.enlace.texto} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaDiagnostico />
    </PaginaInterior>
  )
}
