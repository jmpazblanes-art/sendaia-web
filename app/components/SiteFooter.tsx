import Link from 'next/link'
import { Phone } from 'lucide-react'
import Logo from './Logo'
import { NAVEGACION } from './SiteHeader'

const SECTORES = [
  { href: '/sectores/clinicas', label: 'Clínicas' },
  { href: '/sectores/inmobiliarias', label: 'Inmobiliarias' },
  { href: '/sectores/restaurantes', label: 'Restaurantes' },
  { href: '/sectores/asesorias', label: 'Asesorías' },
  { href: '/sectores/ecommerce', label: 'E-commerce' },
  { href: '/sectores/pymes', label: 'PYMEs' },
]

export default function SiteFooter() {
  return (
    <footer className="pared-azul bg-azul-hondo text-roto">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-16 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-roto/60">
              Sistemas con IA para empresas reales. Granada, España.
            </p>
            <a href="tel:+34858215026" data-cta="pie_telefono" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
              <Phone className="h-4 w-4 text-cobre-claro" aria-hidden /> 858 215 026
            </a>
            <a href="mailto:info@sendaia.es" className="mt-2 block text-sm text-roto/75 hover:text-roto">
              info@sendaia.es
            </a>
          </div>

          <nav aria-label="Web">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-roto/45">Web</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAVEGACION.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-roto/75 hover:text-roto">{n.label}</Link>
                </li>
              ))}
              <li>
                {/* <a> y no <Link>: es una redirección externa que solo existe en producción. */}
                <a href="/demo/facturas" data-cta="pie_demo_facturas" className="text-roto/75 hover:text-roto">Demo de facturas</a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Sectores">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-roto/45">Sectores</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SECTORES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-roto/75 hover:text-roto">{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-roto/45">Síguenos</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="https://www.instagram.com/sendaia.es" target="_blank" rel="noreferrer" className="text-roto/75 hover:text-roto">Instagram</a></li>
              <li><a href="https://www.facebook.com/sendaia.es" target="_blank" rel="noreferrer" className="text-roto/75 hover:text-roto">Facebook</a></li>
              <li><a href="https://www.linkedin.com/company/sendaia" target="_blank" rel="noreferrer" className="text-roto/75 hover:text-roto">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Enlaces legales exigibles (LSSI-CE / RGPD) + razón social y NIF: además de
            obligatorio, es señal de solvencia para quien va a dejar sus datos. */}
        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-roto/10 pt-6 text-xs text-roto/60">
          <Link href="/aviso-legal" className="hover:text-roto">Aviso legal</Link>
          <Link href="/privacidad" className="hover:text-roto">Política de privacidad</Link>
          <Link href="/cookies" className="hover:text-roto">Política de cookies</Link>
        </div>
        <p className="mt-4 text-xs text-roto/40">
          © 2026 SendaIA · Ana Isabel Quesada Martínez · NIF 44267995X · Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
