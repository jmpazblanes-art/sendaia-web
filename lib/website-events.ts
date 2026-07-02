// Tracking ligero de la web pública SendaIA → CRM (tabla site_events).
// page_view / form_submit / cta_click. Fire-and-forget: nunca bloquea la UI
// ni rompe nada si el CRM no responde.

type EventType = 'page_view' | 'form_submit' | 'cta_click'

// session_id estable por pestaña (sessionStorage) para poder agrupar eventos
// de una misma visita sin cookies ni datos personales.
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const KEY = 'sendaia_sid'
    let sid = sessionStorage.getItem(KEY)
    if (!sid) {
      sid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem(KEY, sid)
    }
    return sid
  } catch {
    return ''
  }
}

export function track(event_type: EventType, meta: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  try {
    const payload = {
      event_type,
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      session_id: getSessionId(),
      meta,
    }
    const body = JSON.stringify(payload)

    // sendBeacon sobrevive a la navegación (ideal para clicks que cambian de página);
    // fetch keepalive como fallback.
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/site-event', new Blob([body], { type: 'application/json' }))
    } else {
      fetch('/api/site-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // El tracking jamás debe lanzar.
  }
}
