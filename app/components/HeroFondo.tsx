"use client"

import { useEffect, useRef } from 'react'

// Fondo del hero (05-oct-2026). El azul plano quedaba soso. En vez de una foto
// (las que hay en el proyecto son generadas, con hologramas), el fondo es la
// propia marca: luz en degradado y la molécula del logo en grande, dibujada a
// línea, que se desplaza y gira despacio al hacer scroll.
// Solo decoración: no recibe clics ni lo leen los lectores de pantalla.

const SAT = [[-86, -85, 23], [91, -70, 21], [-139, 34, 28], [112, 51, 23], [-34, 128, 28]] as const

function Molecula({ trazo, relleno }: { trazo: string; relleno?: string }) {
  return (
    <g fill={relleno ?? 'none'} stroke={trazo} strokeWidth={1.4} vectorEffect="non-scaling-stroke">
      {SAT.map(([x, y], i) => (
        <line key={`l${i}`} x1={0} y1={0} x2={x} y2={y} vectorEffect="non-scaling-stroke" />
      ))}
      <circle r={48} vectorEffect="non-scaling-stroke" />
      {SAT.map(([x, y, r], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r={r} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  )
}

export default function HeroFondo() {
  const grande = useRef<SVGGElement>(null)
  const chica = useRef<SVGGElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let pendiente = 0
    const mover = () => {
      pendiente = 0
      const y = window.scrollY
      if (y > window.innerHeight * 1.3) return
      grande.current?.setAttribute('transform', `translate(0 ${y * 0.18}) rotate(${-10 + y * 0.03})`)
      chica.current?.setAttribute('transform', `translate(0 ${y * -0.1}) rotate(${24 - y * 0.05})`)
    }
    const alMover = () => {
      if (!pendiente) pendiente = requestAnimationFrame(mover)
    }
    mover()
    window.addEventListener('scroll', alMover, { passive: true })
    return () => {
      window.removeEventListener('scroll', alMover)
      if (pendiente) cancelAnimationFrame(pendiente)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Luz: un foco claro arriba a la derecha, un toque cobre y el pie más hondo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 65% at 80% 22%, rgba(46,104,128,0.75) 0%, rgba(23,58,74,0) 70%),' +
            'radial-gradient(38% 42% at 96% 78%, rgba(184,115,74,0.22) 0%, rgba(184,115,74,0) 70%),' +
            'radial-gradient(45% 55% at 0% 100%, rgba(16,43,55,0.9) 0%, rgba(16,43,55,0) 70%)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(1090 400) scale(3.4)">
          <g ref={grande} transform="rotate(-10)">
            <Molecula trazo="rgba(250,248,245,0.16)" relleno="rgba(250,248,245,0.025)" />
          </g>
        </g>
        <g transform="translate(150 820) scale(1.7)">
          <g ref={chica} transform="rotate(24)">
            <Molecula trazo="rgba(221,168,131,0.3)" />
          </g>
        </g>
      </svg>
    </div>
  )
}
