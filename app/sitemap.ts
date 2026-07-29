import type { MetadataRoute } from 'next'
import { SECTORES_PAGINAS } from './sectores/contenido'

const SITE_URL = 'https://sendaia.es'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Las 6 páginas de sector: cada una es una puerta de entrada indexable.
    ...SECTORES_PAGINAS.map((s) => ({
      url: `${SITE_URL}/sectores/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Páginas legales: indexables a propósito — que Google las vea es señal de
    // empresa real para quien busca antes de dejar sus datos.
    ...['aviso-legal', 'privacidad', 'cookies'].map((p) => ({
      url: `${SITE_URL}/${p}`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
