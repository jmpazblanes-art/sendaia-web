"use client"

// Formulario de diagnóstico. Extraído TAL CUAL de la home anterior (05-oct-2026):
// mismo envío a /api/contact, mismo consentimiento RGPD y mismo tracking.

import { useState } from 'react'
import Link from 'next/link'
import { track } from '@/lib/website-events'

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [acepta, setAcepta] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Origen del lead: sin esto llegabas a la llamada sin saber si vino de un
      // anuncio, de una página de sector o de una búsqueda. Solo procedencia,
      // ningún dato personal añadido.
      const params = new URLSearchParams(window.location.search)
      const origen = {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        landing: window.location.pathname,
        referrer: document.referrer || undefined,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, origen }),
      })
      if (res.ok) {
        // Tracking: el formulario se envió con éxito (sin datos personales en meta).
        track('form_submit', { form: 'contacto', has_phone: Boolean(form.phone) })
      }
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-3xl p-10 text-center" style={{ background: 'var(--card)', border: '1px solid rgba(184,115,74,0.3)' }}>
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-light)' }}>¡Recibido!</h3>
        <p className="text-sm" style={{ color: 'rgba(245,245,245,0.65)' }}>
          Nos ponemos en contacto contigo en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-10 space-y-5" style={{ background: 'var(--card)', border: '1px solid rgba(184,115,74,0.2)' }}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent-light)' }}>Diagnóstico gratuito</p>
        <h3 className="text-2xl font-black">Cuéntanos tu caso</h3>
      </div>
      {[
        { id: 'name', label: 'Nombre *', type: 'text', placeholder: 'Tu nombre', required: true },
        { id: 'email', label: 'Email *', type: 'email', placeholder: 'tu@empresa.com', required: true },
        { id: 'phone', label: 'Teléfono', type: 'tel', placeholder: '600 000 000', required: false },
      ].map(f => (
        <div key={f.id}>
          <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(245,245,245,0.75)' }}>{f.label}</label>
          <input
            type={f.type}
            required={f.required}
            placeholder={f.placeholder}
            value={form[f.id as keyof typeof form]}
            onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
            className="w-full rounded-xl px-4 py-3 text-base sm:text-sm outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f5f5f0' }}
          />
        </div>
      ))}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(245,245,245,0.75)' }}>¿Qué procesos quieres automatizar?</label>
        <textarea
          rows={3}
          placeholder="Ej: facturas manuales, emails sin leer, llamadas sin atender..."
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          className="w-full rounded-xl px-4 py-3 text-base sm:text-sm outline-none transition-all resize-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f5f5f0' }}
        />
      </div>
      {/* Consentimiento RGPD: obligatorio, SIN premarcar (art. 4.11 RGPD — el
          consentimiento tiene que ser una acción afirmativa del usuario). */}
      <label className="flex items-start gap-3 text-xs leading-5" style={{ color: 'rgba(245,245,245,0.6)' }}>
        <input
          type="checkbox"
          required
          checked={acepta}
          onChange={(e) => setAcepta(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#b8734a]"
        />
        <span>
          He leído y acepto la{' '}
          <Link href="/privacidad" target="_blank" className="underline" style={{ color: 'var(--accent-light)' }}>
            política de privacidad
          </Link>
          . Usaremos tus datos solo para responderte.
        </span>
      </label>
      <button
        type="submit"
        disabled={status === 'loading' || !acepta}
        className="w-full rounded-full py-4 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: 'var(--accent)' }}
      >
        {status === 'loading' ? 'Enviando...' : 'Quiero el diagnóstico gratuito →'}
      </button>

      <div className="flex items-center gap-3 pt-1">
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(245,245,245,0.7)' }}>o consúltanos directo</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>

      <a
        href="https://wa.me/34627256996?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20directa%20sobre%20automatizaci%C3%B3n%20con%20IA."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('cta_click', { cta: 'whatsapp_formulario' })}
        className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all hover:bg-white/5 border"
        style={{ borderColor: 'rgba(37,211,102,0.4)', color: '#25D366' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Escríbenos por WhatsApp
      </a>

      <p className="text-center text-xs" style={{ color: 'rgba(245,245,245,0.7)' }}>
        Te respondemos en menos de 24 h laborables.
      </p>
      {status === 'error' && (
        <p className="text-xs text-center text-red-400">Error al enviar. Llámanos al 858 215 026.</p>
      )}
    </form>
  )
}

export default ContactForm
