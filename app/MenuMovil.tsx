'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { Menu, X, ArrowRight } from 'lucide-react'
import { track } from '@/lib/website-events'

const SECCIONES = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#sectores', label: 'Sectores' },
  { href: '#casos', label: 'Casos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' },
]

/**
 * Menú de secciones para móvil (petición de Ana, 03-ago-2026): en el Mac las
 * secciones se ven en la barra de arriba, pero en móvil esa barra se oculta
 * (`hidden md:flex`) y no había forma de saltar de sección — sólo bajar
 * scrolleando toda la página.
 *
 * Panel lateral desde la izquierda, como pidió. Sólo se monta en móvil: en
 * pantallas grandes sigue mandando el menú de siempre.
 */
export default function MenuMovil() {
  const [abierto, setAbierto] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const fondo = useRef<HTMLDivElement>(null)

  // Con el panel abierto no se scrollea la página de detrás.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  // Cerrar con Escape (teclado bluetooth, o si se prueba en escritorio).
  useEffect(() => {
    if (!abierto) return
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false)
    }
    window.addEventListener('keydown', alPulsar)
    return () => window.removeEventListener('keydown', alPulsar)
  }, [abierto])

  // Entrada animada con GSAP, como el resto de la web.
  useEffect(() => {
    if (!abierto || !panel.current || !fondo.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(fondo.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      gsap.fromTo(
        panel.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.38, ease: 'power3.out' },
      )
      gsap.fromTo(
        '[data-menu-item]',
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, stagger: 0.05, delay: 0.12, ease: 'power2.out' },
      )
    })
    return () => ctx.revert()
  }, [abierto])

  const irA = (href: string, label: string) => {
    track('cta_click', { cta: `menu_movil_${label.toLowerCase()}` })
    setAbierto(false)
    // Se espera al cierre para que el scroll no compita con la animación.
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 220)
  }

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        aria-label="Abrir el menú de secciones"
        aria-expanded={abierto}
        className="flex h-11 w-11 items-center justify-center rounded-full border md:hidden"
        style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
      >
        <Menu className="h-5 w-5" style={{ color: 'var(--accent-light)' }} />
      </button>

      {abierto && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            ref={fondo}
            onClick={() => setAbierto(false)}
            className="absolute inset-0"
            style={{ background: 'rgba(5,5,16,0.75)', backdropFilter: 'blur(4px)' }}
          />

          <div
            ref={panel}
            role="dialog"
            aria-label="Secciones"
            className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col border-r"
            // La altura va aquí y no con h-full: el contenedor es `fixed inset-0`
            // pero `h-full` sobre él dejaba el panel en 78px (solo la cabecera) y
            // los enlaces caían fuera, encima del hero e ilegibles.
            style={{
              background: '#0b0b16',
              borderColor: 'rgba(212,175,55,0.25)',
              height: '100dvh',
            }}
          >
            <div
              className="flex items-center justify-between border-b px-5 py-4"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--accent-light)' }}
              >
                Secciones
              </span>
              <button
                onClick={() => setAbierto(false)}
                aria-label="Cerrar el menú"
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <X className="h-4 w-4" style={{ color: 'rgba(245,245,245,0.8)' }} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
              {SECCIONES.map((s) => (
                <button
                  key={s.href}
                  data-menu-item
                  onClick={() => irA(s.href, s.label)}
                  className="rounded-xl px-4 py-3.5 text-left text-lg font-semibold transition-colors active:bg-white/10"
                  style={{ color: 'rgba(245,245,245,0.9)' }}
                >
                  {s.label}
                </button>
              ))}
            </nav>

            <div className="border-t px-5 py-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <Link
                href="#contacto"
                onClick={() => irA('#contacto', 'diagnostico')}
                className="flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white"
                style={{ background: 'var(--accent)' }}
              >
                Diagnóstico gratuito <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
