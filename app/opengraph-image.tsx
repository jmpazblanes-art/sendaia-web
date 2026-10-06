import { ImageResponse } from 'next/og'
import { C, SAT, SENDA, IA } from './components/Logo'

// Tarjeta social 1200×630 generada en el servidor (rediseño 06-oct-2026).
// Mismos colores y mismo logo que la web: azul profundo, blanco roto y cobre.
// El logo se pinta con los mismos contornos que el SVG de la cabecera, así que
// no depende de ninguna fuente instalada.
export const runtime = 'edge'
export const alt = 'SendaIA — Sistemas con IA para empresas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#173A4A',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Filo cobre superior */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#B8734A', display: 'flex' }} />

        {/* Logo: molécula + nombre */}
        <div style={{ display: 'flex', position: 'absolute', top: 64, right: 80 }}>
          <svg width="250" height="173" viewBox="20 15 660 455" xmlns="http://www.w3.org/2000/svg">
            {SAT.map(([x, y]) => (
              <line key={`l${x}`} x1={C[0]} y1={C[1]} x2={x} y2={y} stroke="#B8734A" strokeWidth={5.5} strokeLinecap="round" />
            ))}
            <circle cx={C[0]} cy={C[1]} r={C[2]} fill="#B8734A" />
            {SAT.map(([x, y, r]) => (
              <circle key={`c${x}`} cx={x} cy={y} r={r} fill="#B8734A" />
            ))}
            <path d={SENDA} fill="#FAF8F5" />
            <path d={IA} fill="#B8734A" />
          </svg>
        </div>

        <div style={{ display: 'flex', fontSize: 22, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#DDA883', marginTop: 150 }}>
          SendaIA · Sistemas con IA para empresas
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 54, fontWeight: 800, color: '#FAF8F5', lineHeight: 1.12, letterSpacing: '-0.01em', marginTop: 26, maxWidth: 1000 }}>
          <span>Tu empresa no necesita más herramientas.</span>
          <span style={{ color: '#DDA883' }}>Necesita sistemas que trabajen.</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', fontSize: 27, color: '#FAF8F5', fontWeight: 700 }}>
          sendaia.es
          <span style={{ color: 'rgba(250,248,245,0.4)', margin: '0 16px' }}>·</span>
          <span style={{ color: 'rgba(250,248,245,0.65)', fontWeight: 400 }}>Nosotros ponemos los sistemas. Tú disfrutas.</span>
        </div>
      </div>
    ),
    size,
  )
}
