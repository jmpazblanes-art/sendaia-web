import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { SECTORES_PAGINAS, getSector } from '../contenido'

// genera las 6 rutas estáticas en build
export function generateStaticParams() {
  return SECTORES_PAGINAS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSector(slug)
  if (!s) return { title: 'Sector no encontrado — SendaIA' }
  return {
    title: `${s.nombre} · Automatización con IA — SendaIA`,
    description: s.intro,
    openGraph: {
      title: `${s.nombre} · Automatización con IA — SendaIA`,
      description: s.intro,
      images: ['/logo-sendaia.png'],
    },
  }
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSector(slug)
  if (!s) notFound()

  return (
    <main style={{ background: '#060608', color: '#f5f5f5', minHeight: '100vh' }}>
      {/* NAVBAR simple */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="SendaIA" width={160} height={48} priority className="h-10 w-auto object-contain" />
          </Link>
          <Link href="/#contacto" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: 'var(--accent)' }}>
            Diagnóstico gratuito
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <Link href="/#sectores" className="inline-block mb-6 text-sm transition-colors hover:text-white" style={{ color: 'var(--accent-light)' }}>
            ← Todos los sectores
          </Link>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>{s.eyebrow}</p>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">
            {s.h1}<br />
            <span className="gradient-text">{s.h1Accent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: 'rgba(245,245,245,0.65)' }}>
            {s.intro}
          </p>
          <Link href="/#contacto" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-all hover:opacity-90" style={{ background: 'var(--accent)' }}>
            Pide tu diagnóstico gratuito <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* DOLORES */}
      <section className="px-6 py-16" style={{ background: 'rgba(13,13,26,0.6)' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-black sm:text-3xl">Lo que te está costando ahora</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {s.dolores.map((d) => (
              <div key={d.titulo} className="rounded-2xl p-6 h-full" style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.15)' }}>
                <h3 className="mb-3 font-bold text-lg" style={{ color: '#C0563B' }}>{d.titulo}</h3>
                <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>La solución SendaIA</p>
          <h2 className="mb-5 text-2xl font-black sm:text-4xl">
            <span className="gradient-text">{s.solucionTitulo}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7" style={{ color: 'rgba(245,245,245,0.7)' }}>{s.solucion}</p>
        </div>

        {/* AGENTES */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
          {s.agentes.map((a) => (
            <div key={a.nombre} className="rounded-2xl p-6 h-full" style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(212,175,55,0.12)' }}>
                <Check className="h-5 w-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="mb-2 font-bold gradient-text">{a.nombre}</h3>
              <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.6)' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CIERRE + CTA */}
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-3xl rounded-3xl p-10 text-center sm:p-14" style={{ background: 'var(--card)', border: '1px solid rgba(212,175,55,0.35)', boxShadow: '0 0 60px rgba(212,175,55,0.1)' }}>
          <p className="mb-6 text-xl font-bold leading-8 sm:text-2xl">{s.cierre}</p>
          <Link href="/#contacto" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-black transition-all hover:opacity-90" style={{ background: 'var(--accent)' }}>
            Agenda tu diagnóstico gratuito <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER mínimo */}
      <footer className="border-t px-6 py-10" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between">
          <Link href="/"><Image src="/images/logo.png" alt="SendaIA" width={140} height={40} className="h-9 w-auto object-contain" /></Link>
          <p className="text-sm" style={{ color: 'rgba(245,245,245,0.5)' }}>Automatización con IA para PYMEs · <a href="tel:+34858215026" className="hover:text-white">858 215 026</a></p>
        </div>
      </footer>
    </main>
  )
}
