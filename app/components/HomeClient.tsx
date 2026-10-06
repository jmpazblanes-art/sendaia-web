"use client"

import { useEffect, useState } from 'react'
import { ArrowRight, MessageCircle, PhoneCall, Play, Sparkles } from 'lucide-react'
import { track } from '@/lib/website-events'
import { WHATSAPP_NUMBER, PREFILL } from '../WhatsAppButton'

// Piezas interactivas de la home nueva. Ninguna integra nada por su cuenta:
// la voz y Aria se piden al dock (AssistantDock) con un evento de ventana, y
// WhatsApp usa el mismo número y el mismo texto que el botón flotante.

/** page_view de la home + aparición suave de los bloques marcados con `.aparece`. */
export function HomeEfectos({ seccion = 'home', extra }: { seccion?: string; extra?: Record<string, unknown> }) {
  // El slug u otros datos van en `extra`; se serializa para que el efecto solo se repita si cambian.
  const extraTxt = JSON.stringify(extra ?? {})
  useEffect(() => {
    track('page_view', { seccion, ...JSON.parse(extraTxt) })
    const nodos = document.querySelectorAll<HTMLElement>('.aparece')
    if (!('IntersectionObserver' in window)) {
      nodos.forEach((n) => n.classList.add('visto'))
      return
    }
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add('visto')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    nodos.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [seccion, extraTxt])

  // Clics en cualquier CTA marcado con data-cta (enlaces del servidor incluidos).
  useEffect(() => {
    const alPulsar = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cta]')
      if (el?.dataset.cta) track('cta_click', { cta: el.dataset.cta })
    }
    document.addEventListener('click', alPulsar)
    return () => document.removeEventListener('click', alPulsar)
  }, [])

  return null
}

type EstadoVoz = 'idle' | 'connecting' | 'active' | 'error'

/** Lanza la llamada REAL del dock. Pinta el estado que el dock le va contando. */
export function BotonVoz({ origen }: { origen: string }) {
  const [estado, setEstado] = useState<EstadoVoz>('idle')
  useEffect(() => {
    const alCambiar = (e: Event) => setEstado((e as CustomEvent<EstadoVoz>).detail)
    window.addEventListener('sendaia:voz-estado', alCambiar)
    return () => window.removeEventListener('sendaia:voz-estado', alCambiar)
  }, [])

  const texto = {
    idle: 'Probar agente de voz',
    connecting: 'Conectando…',
    active: 'En llamada · Colgar',
    error: 'No se pudo conectar · Reintentar',
  }[estado]

  return (
    <button
      type="button"
      className="btn btn-cobre"
      disabled={estado === 'connecting'}
      aria-live="polite"
      onClick={() => {
        track('cta_click', { cta: 'voz_probar', origen })
        window.dispatchEvent(new Event('sendaia:voz'))
      }}
    >
      <PhoneCall className="h-4 w-4" aria-hidden />
      {texto}
    </button>
  )
}

/** Abre el chat REAL de Aria que vive en el dock. */
export function BotonAria({ origen, clase = 'btn btn-cobre' }: { origen: string; clase?: string }) {
  return (
    <button
      type="button"
      className={clase}
      onClick={() => {
        track('cta_click', { cta: 'aria_hablar', origen })
        window.dispatchEvent(new Event('sendaia:aria'))
      }}
    >
      <Sparkles className="h-4 w-4" aria-hidden />
      Hablar con ARIA
    </button>
  )
}

/** Mismo número y mismo texto que el botón flotante de WhatsApp. */
export function BotonWhatsApp({ origen }: { origen: string }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${PREFILL} (Vengo de la web, sección: ${origen})`)}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-cobre"
      onClick={() => track('cta_click', { cta: 'whatsapp_abrir', origen })}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      Abrir WhatsApp
    </a>
  )
}

/** Desplaza a la sección de agentes (CTA principal del hero). */
export function IrAAgentes() {
  return (
    <a href="#agentes" data-cta="hero_probar_agentes" className="btn btn-cobre">
      Probar nuestros agentes <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  )
}

/** Vídeo de YouTube bajo demanda: solo la miniatura hasta que se pulsa. */
export function DemoVideo({ id, titulo, clave }: { id: string; titulo: string; clave: string }) {
  const [reproduce, setReproduce] = useState(false)
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: '16 / 9', background: '#102B37' }}
    >
      {reproduce ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            track('cta_click', { cta: 'demo_video', demo: clave })
            setReproduce(true)
          }}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Ver demo: ${titulo}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(16,43,55,0.78), rgba(16,43,55,0.12) 60%)' }} />
          <span className="absolute bottom-4 left-4 flex items-center gap-3 text-left">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'var(--cobre-boton)', color: 'var(--roto)' }}
            >
              <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" aria-hidden />
            </span>
            <span className="text-sm font-bold" style={{ color: 'var(--roto)' }}>Ver demo</span>
          </span>
        </button>
      )}
    </div>
  )
}

/** Vídeo grabado (mp4) bajo demanda: solo el póster hasta que se pulsa; no descarga nada antes. */
export function VideoBajoDemanda({ src, poster, titulo, clave }: { src: string; poster: string; titulo: string; clave: string }) {
  const [reproduce, setReproduce] = useState(false)
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16 / 9', background: '#102B37' }}>
      {reproduce ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video className="absolute inset-0 h-full w-full" src={src} poster={poster} controls autoPlay playsInline preload="auto" />
      ) : (
        <button
          type="button"
          onClick={() => {
            track('cta_click', { cta: 'demo_video', demo: clave })
            setReproduce(true)
          }}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Ver vídeo: ${titulo}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(16,43,55,0.78), rgba(16,43,55,0.12) 60%)' }} />
          <span className="absolute bottom-4 left-4 flex items-center gap-3 text-left">
            <span className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105" style={{ background: 'var(--cobre-boton)', color: 'var(--roto)' }}>
              <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" aria-hidden />
            </span>
            <span className="text-sm font-bold" style={{ color: 'var(--roto)' }}>Ver vídeo</span>
          </span>
        </button>
      )}
    </div>
  )
}
