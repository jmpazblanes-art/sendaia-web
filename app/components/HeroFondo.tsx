"use client"

import { useEffect, useRef } from 'react'

// Fondo del hero: pared con grietas de cobre (05-oct-2026, idea de Pachi).
// Una pared azul con textura de yeso y grietas que se rellenan de cobre. Las
// grietas principales se abren al cargar; las ramas finas siguen abriéndose
// según se hace scroll. Todo es SVG generado aquí: sin imágenes que descargar.
// Solo decoración: no recibe clics ni lo leen los lectores de pantalla.

type Grieta = { d: string; ancho: number; prof: number; orden: number }

// Azar con semilla fija: la pared sale igual en el servidor y en el navegador.
function azarCon(semilla: number) {
  let a = semilla
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generar(): Grieta[] {
  const azar = azarCon(20261005)
  const salida: Grieta[] = []
  let orden = 0
  const abrir = (x: number, y: number, ang: number, largo: number, ancho: number, prof: number) => {
    let d = `M${x.toFixed(1)},${y.toFixed(1)}`
    let hecho = 0
    const mio = orden++
    const ramas: [number, number, number][] = []
    while (hecho < largo) {
      const paso = 14 + azar() * 30
      // Una grieta avanza a tirones: casi recta y, de vez en cuando, un quiebro.
      ang += (azar() - 0.5) * (azar() < 0.22 ? 1.5 : 0.5)
      x += Math.cos(ang) * paso
      y += Math.sin(ang) * paso
      d += ` L${x.toFixed(1)},${y.toFixed(1)}`
      hecho += paso
      if (prof < 3 && azar() < 0.2 - prof * 0.03) {
        ramas.push([x, y, ang + (azar() < 0.5 ? -1 : 1) * (0.5 + azar() * 0.7)])
      }
    }
    salida.push({ d, ancho, prof, orden: mio })
    for (const [rx, ry, ra] of ramas) abrir(rx, ry, ra, largo * (0.3 + azar() * 0.25), ancho * 0.58, prof + 1)
  }
  // Lienzo de 1440×900. Tres grietas que entran desde los bordes.
  abrir(1440, 60, 2.62, 820, 3.4, 0)
  abrir(0, 850, -0.55, 470, 2.8, 0)
  abrir(1440, 690, 3.45, 330, 2.4, 0)
  return salida
}

const GRIETAS = generar()

export default function HeroFondo() {
  const lienzo = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const finas = lienzo.current?.querySelectorAll<SVGPathElement>('[data-fina]')
    if (!finas?.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finas.forEach((p) => p.setAttribute('stroke-dashoffset', '0'))
      return
    }
    let pendiente = 0
    const abrir = () => {
      pendiente = 0
      // De un 12 % abiertas al llegar, a enteras tras medio alto de pantalla de scroll.
      const g = Math.min(1, 0.12 + window.scrollY / (window.innerHeight * 0.5))
      finas.forEach((p) => p.setAttribute('stroke-dashoffset', String(1 - g)))
    }
    const alMover = () => {
      if (!pendiente) pendiente = requestAnimationFrame(abrir)
    }
    abrir()
    window.addEventListener('scroll', alMover, { passive: true })
    return () => {
      window.removeEventListener('scroll', alMover)
      if (pendiente) cancelAnimationFrame(pendiente)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        ref={lienzo}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Yeso: manchas grandes (desigual) + grano fino */}
          <filter id="pared-manchas" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves={3} seed={7} />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.9 0 0 0 -0.32" />
          </filter>
          <filter id="pared-grano" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={3} stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 -0.12" />
          </filter>
          <radialGradient id="pared-luz" cx="78%" cy="20%" r="75%">
            <stop offset="0" stopColor="#2A6278" stopOpacity="0.85" />
            <stop offset="1" stopColor="#173A4A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pared-pie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.55" stopColor="#102B37" stopOpacity="0" />
            <stop offset="1" stopColor="#102B37" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#pared-luz)" />
        <rect width="1440" height="900" filter="url(#pared-manchas)" opacity="0.1" />
        <rect width="1440" height="900" filter="url(#pared-grano)" opacity="0.5" />

        {/* Cada grieta: la sombra del hueco, y encima el cobre que la rellena */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {GRIETAS.map((g, i) => {
            const fina = g.prof >= 2
            const comun = {
              d: g.d,
              pathLength: 1,
              strokeDasharray: 1,
              strokeDashoffset: 1,
              ...(fina
                ? { 'data-fina': '' }
                : { className: 'grieta-abre', style: { animationDelay: `${0.25 + g.orden * 0.07 + g.prof * 0.5}s` } }),
            }
            return (
              <g key={i}>
                <path {...comun} stroke="#0B2029" strokeWidth={g.ancho + 2.2} opacity={0.75} transform="translate(1.2 1.6)" />
                <path {...comun} stroke="#B8734A" strokeWidth={g.ancho} />
                <path {...comun} stroke="#EBC4A6" strokeWidth={Math.max(0.5, g.ancho * 0.28)} opacity={0.75} />
              </g>
            )
          })}
        </g>

        <rect width="1440" height="900" fill="url(#pared-pie)" />
      </svg>
    </div>
  )
}
