"use client"

import { useEffect, useRef, useState } from 'react'

// Esquema del sistema que se dibuja con el scroll (05-oct-2026).
// Sustituye al robot de fondo de la home anterior: aquí lo que se mueve es el
// propio sistema. Según se baja, la línea avanza desde el cliente, se encienden
// los canales, llega a SendaIA (la molécula del logo) y de ahí a cada herramienta.
// Sin librerías: un valor de 0 a 1 calculado con la posición del bloque.
// Con «reducir movimiento» activado se muestra entero desde el principio.

const CANALES = ['Voz', 'WhatsApp', 'ARIA']
const CONECTA = ['Email', 'Documentos', 'Facturas', 'CRM', 'Calendario', 'ERP', 'Otros sistemas']

// Molécula del logo: mismas posiciones y radios que en Logo.tsx.
const C = [382, 133, 48] as const
const SAT = [[296, 48, 23], [473, 63, 21], [243, 167, 28], [494, 184, 23], [348, 261, 28]] as const

const tramo = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))

export default function SistemaScroll() {
  const caja = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setP(1)
      return
    }
    let pendiente = 0
    const medir = () => {
      pendiente = 0
      const el = caja.current
      if (!el) return
      const alto = window.innerHeight
      const r = el.getBoundingClientRect()
      // Empieza cuando el esquema asoma por abajo y termina antes de que llegue
      // arriba: en móvil, si no, las últimas piezas se encendían ya casi fuera de vista.
      const v = tramo(alto * 0.92 - r.top, 0, alto * 0.5 + r.height * 0.12)
      // Solo avanza: una vez dibujado no se desdibuja al subir.
      setP((antes) => (v > antes ? v : antes))
    }
    const alMover = () => {
      if (!pendiente) pendiente = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', alMover, { passive: true })
    window.addEventListener('resize', alMover)
    return () => {
      window.removeEventListener('scroll', alMover)
      window.removeEventListener('resize', alMover)
      if (pendiente) cancelAnimationFrame(pendiente)
    }
  }, [])

  const encendido = (desde: number) => p >= desde
  const nodo = (on: boolean): React.CSSProperties => ({
    opacity: on ? 1 : 0.28,
    transform: on ? 'none' : 'translateY(6px)',
    transition: 'opacity 0.45s ease, transform 0.45s ease, background-color 0.45s ease, border-color 0.45s ease, color 0.45s ease',
  })
  const linea = (a: number, b: number) => (
    <span className="relative block h-9 w-px bg-roto/15" aria-hidden>
      <span
        className="absolute inset-0 origin-top bg-cobre"
        style={{ transform: `scaleY(${tramo(p, a, b)})` }}
      />
    </span>
  )
  const enSenda = encendido(0.5)

  return (
    <div
      ref={caja}
      role="img"
      aria-label="Esquema: el cliente contacta por voz, WhatsApp o Aria; SendaIA lo conecta con email, documentos, facturas, CRM, calendario, ERP y otros sistemas."
    >
      <div className="mx-auto flex max-w-md flex-col items-center text-center" aria-hidden>
        <span
          className="rounded-full border px-6 py-2.5 text-sm font-bold uppercase tracking-[0.14em]"
          style={{ ...nodo(encendido(0.02)), borderColor: encendido(0.02) ? 'var(--cobre)' : 'rgba(250,248,245,0.25)' }}
        >
          Cliente
        </span>

        {linea(0.06, 0.2)}

        <div className="grid w-full grid-cols-3 gap-2.5">
          {CANALES.map((c, i) => (
            <span
              key={c}
              className="rounded-2xl bg-roto/[0.07] px-2 py-4 text-sm font-semibold"
              style={nodo(encendido(0.2 + i * 0.05))}
            >
              {c}
            </span>
          ))}
        </div>

        {linea(0.34, 0.5)}

        <span
          className="flex w-full items-center justify-center gap-4 rounded-2xl border px-6 py-5"
          style={{
            ...nodo(enSenda),
            background: enSenda ? 'var(--cobre-boton)' : 'transparent',
            borderColor: enSenda ? 'var(--cobre-boton)' : 'rgba(250,248,245,0.25)',
          }}
        >
          <svg viewBox="205 15 320 285" className="h-11 w-auto" fill="currentColor">
            <g stroke="currentColor" strokeWidth={7} strokeLinecap="round">
              {SAT.map(([x, y], i) => (
                <line
                  key={x}
                  x1={C[0]}
                  y1={C[1]}
                  x2={C[0] + (x - C[0]) * tramo(p, 0.5 + i * 0.02, 0.6 + i * 0.02)}
                  y2={C[1] + (y - C[1]) * tramo(p, 0.5 + i * 0.02, 0.6 + i * 0.02)}
                />
              ))}
            </g>
            <circle cx={C[0]} cy={C[1]} r={C[2]} />
            {SAT.map(([x, y, r], i) => (
              <circle
                key={x}
                cx={x}
                cy={y}
                r={r * tramo(p, 0.56 + i * 0.02, 0.64 + i * 0.02)}
              />
            ))}
          </svg>
          <span className="font-display text-2xl font-semibold tracking-wide">SendaIA</span>
        </span>

        {linea(0.6, 0.72)}

        <div className="flex flex-wrap justify-center gap-2">
          {CONECTA.map((c, i) => {
            const on = encendido(0.72 + i * 0.035)
            return (
              <span
                key={c}
                className="rounded-full border px-4 py-2 text-sm"
                style={{ ...nodo(on), borderColor: on ? 'rgba(221,168,131,0.7)' : 'rgba(250,248,245,0.2)' }}
              >
                {c}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
