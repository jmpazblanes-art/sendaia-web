"use client"

// Opiniones y valoraciones (reubicado desde la home anterior, 06-oct-2026).
// Misma lógica: valoración pública en Google y formulario directo, que entra por
// /api/contact como «RESEÑA CLIENTE». Sin testimonios inventados.

import { useState } from 'react'
import { MessageSquarePlus, Star, X } from 'lucide-react'
import { track } from '@/lib/website-events'

function ModalResena({ abierto, onClose }: { abierto: boolean; onClose: () => void }) {
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [estrellas, setEstrellas] = useState(5)
  const [hoverEstrellas, setHoverEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEstado('enviando')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre,
          message: `[RESEÑA CLIENTE - ${estrellas} ESTRELLAS] Empresa/Cargo: ${empresa} | Opinión: ${comentario}`,
          origen: { tipo: 'reseña_cliente', estrellas, empresa, landing: window.location.pathname },
        }),
      })
      if (res.ok) {
        track('form_submit', { form: 'resena_cliente', estrellas })
        setEstado('ok')
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }
  }

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl p-7 sm:p-9 shadow-2xl"
        style={{ background: '#173A4A', border: '1px solid rgba(184,115,74,0.35)' }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {estado === 'ok' ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white" style={{ background: 'var(--accent)' }}>
              ✓
            </div>
            <h3 className="mb-2 text-2xl font-black text-white">¡Muchas gracias!</h3>
            <p className="text-sm leading-6" style={{ color: 'rgba(245,245,245,0.7)' }}>
              Tu valoración ha sido enviada al equipo. Nos ayuda muchísimo a seguir mejorando nuestras automatizaciones y dar el mejor servicio.
            </p>
            <button
              onClick={() => { setEstado('idle'); onClose() }}
              className="mt-6 rounded-full px-6 py-2.5 text-xs font-bold text-white transition-all hover:scale-105"
              style={{ background: 'var(--accent)' }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-light)' }}>Tu experiencia</p>
              <h3 className="text-2xl font-black text-white">Déjanos tu opinión</h3>
              <p className="text-xs" style={{ color: 'rgba(245,245,245,0.55)' }}>
                ¿Has implementado automatizaciones o recibido un diagnóstico con SendaIA? Cuéntanos tu experiencia real.
              </p>
            </div>

            {/* Selector de estrellas interactivo */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(245,245,245,0.7)' }}>
                Puntuación
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEstrellas(star)}
                    onMouseEnter={() => setHoverEstrellas(star)}
                    onMouseLeave={() => setHoverEstrellas(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`${star} estrellas`}
                  >
                    <Star
                      className="h-6 w-6 transition-colors"
                      fill={(hoverEstrellas || estrellas) >= star ? '#B8734A' : 'none'}
                      stroke={(hoverEstrellas || estrellas) >= star ? '#B8734A' : 'rgba(255,255,255,0.3)'}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold" style={{ color: 'var(--accent-light)' }}>
                  {estrellas} de 5 estrellas
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'rgba(245,245,245,0.7)' }}>Tu nombre *</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre y apellidos"
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'rgba(245,245,245,0.7)' }}>Empresa / Sector *</label>
              <input
                type="text"
                required
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Ej. Clínica Dental / Asesoría / Inmobiliaria"
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'rgba(245,245,245,0.7)' }}>Tu valoración o comentario *</label>
              <textarea
                required
                rows={3}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="¿Qué proceso automatizaste? ¿Qué resultado o impacto ha tenido en el día a día?"
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            {estado === 'error' && (
              <p className="text-xs text-red-400">Hubo un error al enviar. Por favor, inténtalo de nuevo.</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 rounded-full py-3 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                style={{ border: '1px solid var(--border)' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={estado === 'enviando'}
                className="w-1/2 rounded-full py-3 text-xs font-bold text-white transition-all hover:scale-105"
                style={{ background: 'var(--accent)' }}
              >
                {estado === 'enviando' ? 'Enviando...' : 'Enviar reseña'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Opiniones() {
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <section id="opiniones" className="sobre-azul bg-azul text-roto py-20 sm:py-28 relative">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: 'rgba(184,115,74,0.12)', border: '1px solid rgba(184,115,74,0.3)' }}>
            <Star className="h-3.5 w-3.5 fill-[#B8734A] text-[#B8734A]" />
            <span className="text-xs font-semibold" style={{ color: 'var(--accent-light)' }}>
              Opiniones y Reseñas
            </span>
          </div>

          <h2 className="text-3xl font-black sm:text-5xl mb-4">
            ¿Has trabajado con nosotros?<br />
            <span className="gradient-text">Déjanos tu valoración</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 mb-10" style={{ color: 'rgba(245,245,245,0.65)' }}>
            Trabajamos con total transparencia: sin testimonios inventados ni promesas mágicas.
            Si has implementado una automatización en tu negocio o has realizado un diagnóstico con nosotros, tu opinión ayuda a otras empresas a dar el paso.
          </p>

          {/* Tarjetas de opciones para valorar */}
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto text-left">
            {/* Opción 1: Google Reviews */}
            <div
              className="flex flex-col justify-between rounded-3xl p-7 transition-all hover:border-amber-400/40"
              style={{ background: 'var(--card)', border: '1px solid rgba(184,115,74,0.22)' }}
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl mb-4" style={{ background: 'rgba(184,115,74,0.15)', border: '1px solid rgba(184,115,74,0.3)' }}>
                  <Star className="h-5 w-5 fill-[#B8734A] text-[#B8734A]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Reseña en Google</h3>
                <p className="text-xs leading-5 mb-6" style={{ color: 'rgba(245,245,245,0.6)' }}>
                  Tu valoración pública en Google ayuda a otros profesionales y negocios a conocer cómo trabajamos de forma verificada.
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=SendaIA+Granada"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cta_click', { cta: 'google_review_hub' })}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-5 text-xs font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(184,115,74,0.25)' }}
              >
                <Star className="h-4 w-4 fill-white" /> Valorar en Google →
              </a>
            </div>

            {/* Opción 2: Formulario directo */}
            <div
              className="flex flex-col justify-between rounded-3xl p-7 transition-all hover:border-white/20"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)' }}>
                  <MessageSquarePlus className="h-5 w-5 text-white/80" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Opinión directa</h3>
                <p className="text-xs leading-5 mb-6" style={{ color: 'rgba(245,245,245,0.6)' }}>
                  Envíanos tus comentarios, puntuación y experiencia para ayudarnos a seguir perfeccionando nuestras soluciones.
                </p>
              </div>

              <button
                onClick={() => setModalAbierto(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-5 text-xs font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: '1px solid rgba(184,115,74,0.4)', background: 'rgba(184,115,74,0.06)' }}
              >
                <MessageSquarePlus className="h-4 w-4 text-[#B8734A]" /> Escribir opinión →
              </button>
            </div>
          </div>

          <p className="mt-8 text-xs font-medium" style={{ color: 'rgba(245,245,245,0.4)' }}>
            🔒 Tratamiento confidencial y transparente conforme al RGPD.
          </p>
        </div>
      </div>

      <ModalResena abierto={modalAbierto} onClose={() => setModalAbierto(false)} />
    </section>
  )
}

