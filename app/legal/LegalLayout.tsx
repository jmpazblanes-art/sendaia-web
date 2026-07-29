import Link from 'next/link'
import Image from 'next/image'
import { ULTIMA_ACTUALIZACION } from './datos'

// Marco común de las páginas legales. Mismo negro carbón + dorado que el resto
// del sitio, sin animaciones: aquí lo que se busca es leer y encontrar rápido.
export function LegalLayout({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <main style={{ background: '#060608', color: '#f5f5f5', minHeight: '100vh' }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ borderColor: 'rgba(212,175,55,0.2)', background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(16px)' }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="SendaIA" width={160} height={48} priority className="h-10 w-auto object-contain" />
          </Link>
          <Link href="/#contacto" className="text-sm font-semibold" style={{ color: 'var(--accent-light)' }}>
            Volver a la web
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <h1 className="text-3xl font-black sm:text-4xl">{titulo}</h1>
        <p className="mt-3 text-sm" style={{ color: 'rgba(245,245,245,0.5)' }}>
          Última actualización: {ULTIMA_ACTUALIZACION}
        </p>
        <div className="legal-body mt-10 space-y-6 text-sm leading-7" style={{ color: 'rgba(245,245,245,0.8)' }}>
          {children}
        </div>
      </article>
    </main>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pt-4 text-lg font-bold" style={{ color: '#f5f5f5' }}>
      {children}
    </h2>
  )
}
