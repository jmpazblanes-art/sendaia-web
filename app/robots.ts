import type { MetadataRoute } from 'next'

const SITE_URL = 'https://sendaia.es'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El tracking y las rutas internas no aportan nada a Google.
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
