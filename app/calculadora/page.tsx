import { PaginaInterior, Hero, CtaDiagnostico } from '../components/Pagina'
import Calculadora from '../components/Calculadora'
import { meta } from '../components/datos'

export const metadata = meta(
  '/calculadora',
  'Calculadora de automatización: cuánto trabajo manual tiene tu empresa',
  'Calcula cuántas horas al mes y cuánto dinero al año podría recuperar tu empresa automatizando facturas, correos, llamadas y seguimiento. Estimación orientativa.',
)

export default function PaginaCalculadora() {
  return (
    <PaginaInterior seccion="calculadora">
      <Hero
        eyebrow="Calculadora de automatización"
        titulo="Calcula cuánto trabajo manual"
        acento="tiene tu empresa."
        lead="Mueve los controles según cómo trabaja tu equipo y mira cuántas horas podría recuperar este mes. Es una estimación: el diagnóstico concreta el número real."
      />
      <section className="py-16 text-grafito sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="aparece rounded-[2rem] border border-azul/15 bg-white p-6 sm:p-12">
            <Calculadora />
          </div>
        </div>
      </section>
      <CtaDiagnostico titulo="¿Quieres saber cuánto es en tu caso?" texto="Cuéntanos qué tareas ocupan más a tu equipo. Analizamos el proceso y te decimos qué tiene sentido automatizar y qué no." />
    </PaginaInterior>
  )
}
