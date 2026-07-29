"use client"

import { useEffect } from 'react'
import { track } from '@/lib/website-events'

// Dispara un page_view en las páginas de sector, que son Server Components
// (llevan generateMetadata + generateStaticParams para SEO y no pueden ser
// "use client"). Este componente es lo único que se hidrata: no pinta nada.
// El slug viaja en meta para poder agrupar por sector sin parsear el path.
export function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    track('page_view', { seccion: 'sector', sector: slug })
  }, [slug])

  return null
}
