
import type { Metadata } from 'next'
import { Fraunces, Manrope, Caveat } from 'next/font/google'
import './globals.css'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Fuente manuscrita para el eslogan «Tú disfrutas.» (a juego con el logo)
const script = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

const SITE_URL = 'https://sendaia.es'
const TITLE = 'SendaIA — Automatización con IA para empresas'
const DESCRIPTION =
  'Automatiza tu gestión administrativa con Agentes de IA: facturas, emails, llamadas y seguimiento. Sin requisitos técnicos.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · SendaIA',
  },
  description: DESCRIPTION,
  keywords: [
    'automatización IA',
    'agentes de IA',
    'inteligencia artificial empresas',
    'automatizar facturas',
    'agente de voz',
    'SendaIA',
    'Granada',
    'PYMEs',
  ],
  authors: [{ name: 'SendaIA' }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: 'SendaIA',
    title: TITLE,
    description: DESCRIPTION,
    // La imagen la genera `app/opengraph-image.tsx` con las medidas correctas
    // (1200×630). Antes se declaraba aquí logo-sendaia.png con ese tamaño, pero
    // el archivo real es 1536×1024 y las plataformas lo recortaban.
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Datos estructurados: le dicen a Google QUÉ es SendaIA y DÓNDE (Granada).
  // Clave para SEO local y para que ChatGPT/Perplexity puedan citarla.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'SendaIA',
        url: SITE_URL,
        logo: `${SITE_URL}/logo-sendaia.png`,
        description: DESCRIPTION,
        email: 'info@sendaia.es',
        telephone: '+34858215026',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Granada',
          addressRegion: 'Granada',
          addressCountry: 'ES',
        },
        sameAs: [
          'https://www.instagram.com/sendaia.es',
          'https://www.facebook.com/sendaia.es',
          'https://www.linkedin.com/company/sendaia',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'SendaIA',
        image: `${SITE_URL}/logo-sendaia.png`,
        url: SITE_URL,
        telephone: '+34858215026',
        email: 'info@sendaia.es',
        priceRange: '€€',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Granada',
          addressRegion: 'Granada',
          addressCountry: 'ES',
        },
        areaServed: [
          { '@type': 'City', name: 'Granada' },
          { '@type': 'Country', name: 'España' },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'SendaIA',
        inLanguage: 'es-ES',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  }

  return (
    <html lang="es" className={`dark ${display.variable} ${sans.variable} ${script.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
