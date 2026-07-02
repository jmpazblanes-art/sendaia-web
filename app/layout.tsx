
import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
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
    images: [
      {
        url: '/logo-sendaia.png',
        width: 1200,
        height: 630,
        alt: 'SendaIA — Automatización con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/logo-sendaia.png'],
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
  return (
    <html lang="es" className={`dark ${display.variable} ${sans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
