import { tarjeta, TARJETA } from '../components/og'

export const runtime = 'edge'
export const alt = 'Tres agentes que ya trabajan.' + ' ' + 'Pruébalos.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'Agentes de IA', titulo: 'Tres agentes que ya trabajan.', acento: 'Pruébalos.' })
}
