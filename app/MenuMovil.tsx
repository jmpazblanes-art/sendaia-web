'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { track } from '@/lib/website-events'

/**
 * Menú para móvil (petición de Ana, 03-ago-2026): en escritorio la navegación se
 * ve en la barra de arriba, pero en móvil esa barra se oculta y no había forma
 * de saltar de sección. Panel lateral desde la izquierda.
 *
 * 05-oct-2026 (rediseño): recibe los enlaces de la cabecera en vez de llevar su
 * propia lista, y navega con enlaces normales (antes hacía scroll a mano, que
 * solo valía dentro de la home).
 */
export default function MenuMovil({ enlaces, contacto = '/#contacto' }: { enlaces: { href: string; label: string }[]; contacto?: string }) {
  const [abierto, setAbierto] = useState(false)

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

  const alIr = (label: string) => {
    track('cta_click', { cta: `menu_movil_${label.toLowerCase()}` })
    setAbierto(false)
  }

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        aria-label="Abrir el menú"
        aria-expanded={abierto}
        className="flex h-11 w-11 items-center justify-center rounded-full border md:hidden"
        style={{ borderColor: 'rgba(250,248,245,0.25)', color: '#FAF8F5' }}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Se pinta en <body> y no dentro de la cabecera: ahí quedaba por debajo del
          dock de asistentes y del botón de WhatsApp, que se montaban encima del menú. */}
      {abierto && createPortal(
        <div className="fixed inset-0 z-[70] md:hidden">
          <div
            onClick={() => setAbierto(false)}
            className="absolute inset-0"
            style={{ background: 'rgba(16,43,55,0.7)' }}
          />

          <div
            role="dialog"
            aria-label="Menú"
            className="absolute inset-y-0 left-0 flex w-[84%] max-w-xs flex-col"
            // La altura va aquí y no con h-full: el contenedor es `fixed inset-0`
            // pero `h-full` sobre él dejaba el panel en 78px (solo la cabecera) y
            // los enlaces caían fuera, encima del hero e ilegibles.
            style={{ background: '#FAF8F5', color: '#2A2A2A', height: '100dvh' }}
          >
            <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'rgba(23,58,74,0.12)' }}>
              <span className="eyebrow">Menú</span>
              <button
                onClick={() => setAbierto(false)}
                aria-label="Cerrar el menú"
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ background: 'rgba(23,58,74,0.07)', color: '#173A4A' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col px-3 py-4">
              {enlaces.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => alIr(s.label)}
                  className="rounded-xl px-4 py-4 text-xl font-semibold active:bg-black/5"
                  style={{ color: '#173A4A', fontFamily: 'var(--font-display)' }}
                >
                  {s.label}
                </Link>
              ))}
            </nav>

            <div className="border-t px-5 py-5" style={{ borderColor: 'rgba(23,58,74,0.12)' }}>
              <Link href={contacto} onClick={() => alIr('diagnostico')} className="btn btn-cobre w-full">
                Solicitar diagnóstico <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
