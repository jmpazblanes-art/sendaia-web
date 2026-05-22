
import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="es" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
