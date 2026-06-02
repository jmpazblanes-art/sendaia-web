
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

export const metadata: Metadata = {
  title: 'SendaIA — Automatización con IA para empresas',
  description: 'Automatiza tu gestión administrativa con Agentes de IA en menos de 7 días y sin requisitos técnicos.',
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
