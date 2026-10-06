import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { ULTIMA_ACTUALIZACION } from './datos'

// Marco común de las páginas legales (rediseño 06-oct-2026). Cabecera azul corta
// y el texto sobre blanco roto, sin adornos: aquí lo que se busca es leer y
// encontrar rápido. Usa la misma cabecera y el mismo pie que el resto de la web.
export function LegalLayout({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <main className="lienzo">
      <SiteHeader />
      <section className="sobre-azul pared-azul relative bg-azul text-roto">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-32 sm:px-8 sm:pt-40">
          <p className="eyebrow">Información legal</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">{titulo}</h1>
          <p className="mt-4 text-sm text-roto/70">Última actualización: {ULTIMA_ACTUALIZACION}</p>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-5 pb-24 pt-12 text-grafito sm:px-8">
        <div className="legal-body space-y-6 text-[0.95rem] leading-7">{children}</div>
      </article>
      <SiteFooter />
    </main>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 font-display text-2xl font-semibold text-azul">{children}</h2>
}
