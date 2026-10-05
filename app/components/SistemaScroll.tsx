"use client"

import { useEffect, useRef, useState } from 'react'

// Escenario del sistema, dirigido por el scroll (05-oct-2026).
// Hereda el papel del robot de la home anterior, pero lo que se mueve es el
// propio sistema: la sección se queda FIJA a pantalla completa y, según se baja,
// la red se dibuja desde el cliente hasta las herramientas del negocio, la
// molécula del logo crece en el centro y por cada línea ya trazada viajan pulsos.
// Sin librerías ni imágenes: un SVG y un valor `p` de 0 a 1.
// Con «reducir movimiento» se muestra entero, sin tramo fijo ni pulsos.

const PASOS = [
  { desde: 0, n: '01', texto: 'Un cliente te contacta.' },
  { desde: 0.18, n: '02', texto: 'Le atiende un agente, por el canal que elija.' },
  { desde: 0.42, n: '03', texto: 'SendaIA entiende qué necesita y lo ordena.' },
  { desde: 0.66, n: '04', texto: 'Queda hecho en las herramientas que ya usas.' },
]

const CANALES = ['Voz', 'WhatsApp', 'ARIA']
const CONECTA = ['Email', 'Documentos', 'Facturas', 'CRM', 'Calendario', 'ERP', 'Otros sistemas']

// Satélites de la molécula del logo, como desplazamiento respecto al centro
// (mismas proporciones que en Logo.tsx: centro r=48).
const SAT = [[-86, -85, 23], [91, -70, 21], [-139, 34, 28], [112, 51, 23], [-34, 128, 28]] as const

type Punto = { x: number; y: number }
type Plano = {
  ancho: number
  alto: number
  cliente: Punto
  canales: Punto[]
  centro: Punto
  escala: number
  salidas: Punto[]
  cajaCanal: [number, number]
  cajaSalida: number
  letra: number
}

// Dos composiciones: apaisada (escritorio) y vertical (móvil), para que el texto
// del esquema no se quede diminuto al encoger.
const APAISADO: Plano = {
  ancho: 1000,
  alto: 760,
  cliente: { x: 500, y: 52 },
  canales: [{ x: 230, y: 205 }, { x: 500, y: 205 }, { x: 770, y: 205 }],
  centro: { x: 500, y: 415 },
  escala: 0.92,
  salidas: [
    { x: 95, y: 640 }, { x: 250, y: 705 }, { x: 395, y: 640 }, { x: 500, y: 712 },
    { x: 605, y: 640 }, { x: 750, y: 705 }, { x: 890, y: 640 },
  ],
  cajaCanal: [210, 70],
  cajaSalida: 46,
  letra: 22,
}
const VERTICAL: Plano = {
  ancho: 600,
  alto: 900,
  cliente: { x: 300, y: 48 },
  canales: [{ x: 105, y: 190 }, { x: 300, y: 190 }, { x: 495, y: 190 }],
  centro: { x: 300, y: 420 },
  escala: 0.86,
  salidas: [
    { x: 105, y: 660 }, { x: 300, y: 660 }, { x: 495, y: 660 },
    { x: 105, y: 750 }, { x: 300, y: 750 }, { x: 495, y: 750 }, { x: 300, y: 840 },
  ],
  cajaCanal: [176, 76],
  cajaSalida: 60,
  letra: 27,
}

const tramo = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))
// Curva suave entre dos puntos, saliendo y llegando en vertical.
const curva = (a: Punto, b: Punto) => {
  const m = (a.y + b.y) / 2
  return `M${a.x},${a.y} C${a.x},${m} ${b.x},${m} ${b.x},${b.y}`
}

export default function SistemaScroll({ children }: { children: React.ReactNode }) {
  const pista = useRef<HTMLDivElement>(null)
  const escena = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const [quieto, setQuieto] = useState(false)
  const [vertical, setVertical] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const alCambiar = () => setVertical(mq.matches)
    alCambiar()
    mq.addEventListener('change', alCambiar)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setQuieto(true)
      setP(1)
      return () => mq.removeEventListener('change', alCambiar)
    }
    let pendiente = 0
    const medir = () => {
      pendiente = 0
      const el = pista.current
      if (!el) return
      const alto = window.innerHeight
      const r = el.getBoundingClientRect()
      // En móvil el texto va antes del tramo fijo: el dibujo empieza cuando la
      // escena llega arriba, no cuando entra la sección.
      const previo = mq.matches ? (escena.current?.offsetTop ?? 0) : 0
      const recorrido = r.height - alto - previo
      setP(recorrido > 0 ? tramo(72 - r.top - previo, 0, recorrido * 0.9) : 1)
    }
    const alMover = () => {
      if (!pendiente) pendiente = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', alMover, { passive: true })
    window.addEventListener('resize', alMover)
    return () => {
      mq.removeEventListener('change', alCambiar)
      window.removeEventListener('scroll', alMover)
      window.removeEventListener('resize', alMover)
      if (pendiente) cancelAnimationFrame(pendiente)
    }
  }, [])

  const P = vertical ? VERTICAL : APAISADO
  const paso = [...PASOS].reverse().find((x) => p >= x.desde) ?? PASOS[0]

  // ── Guion: en qué tramo del scroll ocurre cada cosa ──
  const tCliente = tramo(p, 0, 0.06)
  const tAlCanal = (i: number) => tramo(p, 0.08 + i * 0.04, 0.22 + i * 0.04)
  const tCanal = (i: number) => tramo(p, 0.2 + i * 0.04, 0.27 + i * 0.04)
  const tAlCentro = (i: number) => tramo(p, 0.3 + i * 0.03, 0.44 + i * 0.03)
  const tCentro = tramo(p, 0.42, 0.56)
  const tBrazo = (i: number) => tramo(p, 0.48 + i * 0.025, 0.6 + i * 0.025)
  const tASalida = (i: number) => tramo(p, 0.62 + i * 0.035, 0.76 + i * 0.035)
  const tSalida = (i: number) => tramo(p, 0.74 + i * 0.035, 0.8 + i * 0.035)

  const bajoCliente = { x: P.cliente.x, y: P.cliente.y + 26 }
  const sobreCentro = { x: P.centro.x, y: P.centro.y - 48 * P.escala - 10 }
  const bajoCentro = { x: P.centro.x, y: P.centro.y + 128 * P.escala + 34 }
  const lineas = [
    ...P.canales.map((c, i) => ({ id: `a${i}`, d: curva(bajoCliente, { x: c.x, y: c.y - P.cajaCanal[1] / 2 }), t: tAlCanal(i) })),
    ...P.canales.map((c, i) => ({ id: `b${i}`, d: curva({ x: c.x, y: c.y + P.cajaCanal[1] / 2 }, sobreCentro), t: tAlCentro(i) })),
    ...P.salidas.map((s, i) => ({ id: `c${i}`, d: curva(bajoCentro, { x: s.x, y: s.y - P.cajaSalida / 2 }), t: tASalida(i) })),
  ]
  const aparece = (t: number): React.CSSProperties => ({
    opacity: 0.16 + t * 0.84,
    transform: `scale(${0.9 + t * 0.1})`,
    transformBox: 'fill-box',
    transformOrigin: 'center',
  })
  const anchoSalida = (txt: string) => txt.length * P.letra * 0.56 + 40

  return (
    <div ref={pista} className={quieto ? '' : 'h-[340svh] lg:h-[330vh]'}>
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 ${
          quieto
            ? 'grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center'
            : 'h-full pt-16 lg:sticky lg:top-[4.5rem] lg:grid lg:h-[calc(100vh-4.5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10 lg:pt-0'
        }`}
      >
        <div className="pb-10 lg:pb-0">
          {children}

          {/* Qué está pasando ahora mismo y cuánto falta (solo escritorio; en móvil va sobre la escena) */}
          <div className="mt-12 hidden max-w-md lg:block">
            <p key={paso.n} className="paso-entra flex items-baseline gap-4">
              <span className="font-display text-5xl font-semibold text-cobre-claro">{paso.n}</span>
              <span className="text-xl font-semibold leading-snug text-roto">{paso.texto}</span>
            </p>
            <span className="mt-5 block h-[3px] w-full overflow-hidden rounded-full bg-roto/15" aria-hidden>
              <span className="block h-full origin-left bg-cobre" style={{ transform: `scaleX(${p})` }} />
            </span>
          </div>
        </div>

        <div
          ref={escena}
          className={quieto ? '' : 'sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col justify-center lg:static lg:h-auto'}
        >
          <div className="mb-4 lg:hidden">
            <p key={paso.n} className="paso-entra flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold text-cobre-claro">{paso.n}</span>
              <span className="text-base font-semibold leading-snug text-roto">{paso.texto}</span>
            </p>
            <span className="mt-3 block h-[3px] w-full overflow-hidden rounded-full bg-roto/15" aria-hidden>
              <span className="block h-full origin-left bg-cobre" style={{ transform: `scaleX(${p})` }} />
            </span>
          </div>

          <svg
            viewBox={`0 0 ${P.ancho} ${P.alto}`}
            className="mx-auto h-auto max-h-[calc(100svh-13rem)] w-full lg:max-h-[calc(100vh-8rem)]"
            role="img"
            aria-label="Esquema: el cliente contacta por voz, WhatsApp o Aria; SendaIA lo conecta con email, documentos, facturas, CRM, calendario, ERP y otros sistemas."
            fontFamily="var(--font-sans)"
          >
            {/* Trazado de fondo (tenue) + trazado cobre que avanza con el scroll */}
            {lineas.map((l) => (
              <g key={l.id} fill="none" strokeLinecap="round">
                <path d={l.d} stroke="rgba(250,248,245,0.1)" strokeWidth={2} />
                <path
                  id={`sx-${l.id}`}
                  d={l.d}
                  stroke="var(--cobre)"
                  strokeWidth={3}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - l.t}
                />
              </g>
            ))}

            {/* Pulsos que recorren cada línea ya trazada: el sistema, trabajando */}
            {!quieto &&
              lineas.map((l, i) => (
                <circle key={`p${l.id}`} r={5.5} fill="var(--cobre-claro)" opacity={l.t >= 1 ? 1 : 0}>
                  <animateMotion dur={`${2.2 + (i % 4) * 0.35}s`} begin={`${(i % 5) * 0.4}s`} repeatCount="indefinite">
                    <mpath href={`#sx-${l.id}`} />
                  </animateMotion>
                </circle>
              ))}

            {/* Cliente */}
            <g style={aparece(tCliente)}>
              <rect x={P.cliente.x - 95} y={P.cliente.y - 26} width={190} height={52} rx={26} fill="var(--azul)" stroke="var(--cobre)" strokeWidth={2} />
              <text x={P.cliente.x} y={P.cliente.y + P.letra * 0.33} textAnchor="middle" fontSize={P.letra * 0.86} fontWeight={800} letterSpacing={3} fill="var(--roto)">
                CLIENTE
              </text>
            </g>

            {/* Canales */}
            {P.canales.map((c, i) => (
              <g key={CANALES[i]} style={aparece(tCanal(i))}>
                <rect
                  x={c.x - P.cajaCanal[0] / 2}
                  y={c.y - P.cajaCanal[1] / 2}
                  width={P.cajaCanal[0]}
                  height={P.cajaCanal[1]}
                  rx={20}
                  fill="var(--azul-suave)"
                  stroke={tCanal(i) >= 1 ? 'var(--cobre)' : 'rgba(250,248,245,0.14)'}
                  strokeWidth={2}
                />
                <text x={c.x} y={c.y + P.letra * 0.35} textAnchor="middle" fontSize={P.letra} fontWeight={700} fill="var(--roto)">
                  {CANALES[i]}
                </text>
              </g>
            ))}

            {/* SendaIA: la molécula del logo, que crece y gira con el scroll */}
            <g transform={`translate(${P.centro.x} ${P.centro.y}) scale(${P.escala})`}>
              {tCentro >= 1 && !quieto && (
                <circle r={48} fill="none" stroke="var(--cobre-claro)" strokeWidth={2} className="latido" />
              )}
              <g transform={`rotate(${-18 + p * 18})`}>
                <g stroke="var(--cobre)" strokeWidth={7} strokeLinecap="round">
                  {SAT.map(([x, y], i) => (
                    <line key={i} x1={0} y1={0} x2={x * tBrazo(i)} y2={y * tBrazo(i)} />
                  ))}
                </g>
                {SAT.map(([x, y, r], i) => (
                  <circle key={i} cx={x * tBrazo(i)} cy={y * tBrazo(i)} r={r * tBrazo(i)} fill="var(--cobre)" />
                ))}
              </g>
              <circle r={18 + 30 * tCentro} fill="var(--cobre)" opacity={0.3 + 0.7 * tCentro} />
            </g>
            <text
              x={P.centro.x}
              y={P.centro.y + 128 * P.escala + 22}
              textAnchor="middle"
              fontSize={P.letra * 1.25}
              fontWeight={600}
              fontFamily="var(--font-display)"
              fill="var(--roto)"
              opacity={0.2 + 0.8 * tCentro}
            >
              SendaIA
            </text>

            {/* Herramientas del negocio */}
            {P.salidas.map((s, i) => {
              const w = anchoSalida(CONECTA[i])
              return (
                <g key={CONECTA[i]} style={aparece(tSalida(i))}>
                  <rect
                    x={s.x - w / 2}
                    y={s.y - P.cajaSalida / 2}
                    width={w}
                    height={P.cajaSalida}
                    rx={P.cajaSalida / 2}
                    fill="var(--azul)"
                    stroke={tSalida(i) >= 1 ? 'var(--cobre-claro)' : 'rgba(250,248,245,0.18)'}
                    strokeWidth={2}
                  />
                  <text x={s.x} y={s.y + P.letra * 0.3} textAnchor="middle" fontSize={P.letra * 0.86} fontWeight={600} fill="var(--roto)">
                    {CONECTA[i]}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}
