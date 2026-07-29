import { ImageResponse } from 'next/og'

// Tarjeta social 1200×630 generada en el servidor.
// Antes se declaraba `logo-sendaia.png` como 1200×630 cuando el archivo real es
// 1536×1024 (ratio 1.5 vs 1.9): WhatsApp y LinkedIn lo recortaban o estiraban.
// Esta imagen sí tiene la proporción correcta y dice qué hace SendaIA, en vez de
// ser solo el logo — es la primera impresión cada vez que alguien comparte la web.
export const runtime = 'edge'
export const alt = 'SendaIA — Automatización con IA para PYMEs en Granada'
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
          justifyContent: 'center',
          background: '#060608',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Filo dorado superior, como la web */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #d4af37 0%, #f0d98a 50%, #d4af37 100%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#d4af37',
            marginBottom: 28,
          }}
        >
          Automatización con IA · Granada
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 76,
            fontWeight: 800,
            color: '#f5f5f0',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
        >
          <span>Recupera horas</span>
          {/* El espacio va DENTRO del span dorado: Satori (el renderizador de
              ImageResponse) colapsa el espacio suelto entre dos spans y salía
              pegado ("conAgentes"). */}
          <span style={{ display: 'flex' }}>
            cada semana con
            <span style={{ color: '#d4af37' }}>&nbsp;Agentes de IA</span>
          </span>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: 'rgba(245,245,240,0.62)', marginTop: 34 }}>
          Sistemas que trabajan. Tú disfrutas.
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            fontSize: 27,
            color: '#f5f5f0',
            fontWeight: 700,
          }}
        >
          sendaia.es
          <span style={{ color: 'rgba(245,245,240,0.34)', margin: '0 16px' }}>·</span>
          <span style={{ color: 'rgba(245,245,240,0.55)', fontWeight: 400 }}>
            Diagnóstico gratuito
          </span>
        </div>
      </div>
    ),
    size,
  )
}
