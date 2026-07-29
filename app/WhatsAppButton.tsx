'use client'

import { useEffect, useState } from 'react'
import { track } from '@/lib/website-events'

// Botón flotante de WhatsApp. Enlace directo (wa.me) al AGENTE de SendaIA
// (Cloud API + Hermes) — contesta 24/7 y avisa a Pachi por Telegram si detecta
// un lead caliente. Antes iba al móvil personal de Pachi (34630310451).
const WHATSAPP_NUMBER = '34627256996' // Número del agente SendaIA
const PREFILL = 'Hola, me gustaría saber más sobre la automatización con IA de SendaIA.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`

  // Se aparta cuando la sección de contacto está en pantalla: en móvil se montaba
  // encima del texto legal del footer y del aviso de respuesta en 24 h.
  // Por scroll y no con IntersectionObserver: este botón se monta antes que el
  // hero, así que al correr el efecto los nodos aún no existen y el observer se
  // quedaba sin observar nada (lo dejaba oculto para siempre).
  const [oculto, setOculto] = useState(true)
  useEffect(() => {
    const calcular = () => {
      const y = window.scrollY
      const alto = window.innerHeight
      const doc = document.documentElement.scrollHeight
      const enHero = y < alto * 0.5
      const enContacto = y + alto > doc - alto * 1.15
      setOculto(enHero || enContacto)
    }
    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => track('cta_click', { cta: 'whatsapp' })}
      style={{
        position: 'fixed',
        left: '20px',
        // Se sube sobre la zona segura del iPhone: pegado a 20px se montaba encima
        // del texto legal del footer ("Todos los derechos reservados") en móvil.
        bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
        zIndex: 50,
        width: '56px',
        height: '56px',
        borderRadius: '9999px',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
        transition: 'transform 0.2s ease, opacity 0.3s ease',
        opacity: oculto ? 0 : 1,
        pointerEvents: oculto ? 'none' : 'auto',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}
