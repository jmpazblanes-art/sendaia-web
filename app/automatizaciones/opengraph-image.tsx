import { tarjeta, TARJETA } from '../components/og'

export const runtime = 'edge'
export const alt = 'Los agentes son solo la parte que ves.' + ' ' + 'Detrás está el sistema.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'Automatizaciones', titulo: 'Los agentes son solo la parte que ves.', acento: 'Detrás está el sistema.' })
}
