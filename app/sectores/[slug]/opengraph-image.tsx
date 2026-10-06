import { tarjeta, TARJETA } from '../../components/og'
import { getSector } from '../contenido'

export const runtime = 'edge'
export const alt = 'Automatización con IA por sector — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSector(slug)
  return tarjeta({
    eyebrow: s ? s.eyebrow : 'Sectores',
    titulo: s ? s.h1 : 'Automatización con IA',
    acento: s?.h1Accent,
  })
}
