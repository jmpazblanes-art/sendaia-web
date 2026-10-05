import Link from 'next/link'
import Logo from './Logo'
import MenuMovil from '../MenuMovil'

// Navegación de la web. Mientras las páginas propias (/agentes, /demos…) no
// existan, cada entrada lleva a su sección de la home; al crearlas solo hay que
// cambiar el href aquí y el menú móvil lo hereda.
export const NAVEGACION = [
  { href: '/#agentes', label: 'Agentes' },
  { href: '/#sistema', label: 'Automatizaciones' },
  { href: '/#demos', label: 'Demos' },
  { href: '/#caso', label: 'Casos reales' },
  { href: '/#proceso', label: 'SendaIA' },
]

export default function SiteHeader() {
  return (
    <header
      className="sobre-azul fixed inset-x-0 top-0 z-50 border-b"
      style={{ background: '#173A4A', borderColor: 'rgba(250,248,245,0.1)' }}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <MenuMovil enlaces={NAVEGACION} />
          <Link href="/" aria-label="SendaIA — inicio" className="flex items-center">
            <Logo className="h-11 w-auto sm:h-12" />
          </Link>
        </div>
        <nav aria-label="Principal" className="hidden items-center gap-8 text-[0.92rem] font-medium md:flex">
          {NAVEGACION.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-roto/75 transition-colors hover:text-roto"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contacto" data-cta="diagnostico_cabecera" className="btn btn-cobre !min-h-[2.75rem] !px-4 !text-[0.85rem] sm:!px-5">
          <span className="sm:hidden">Diagnóstico</span>
          <span className="hidden sm:inline">Solicitar diagnóstico</span>
        </Link>
      </div>
    </header>
  )
}
