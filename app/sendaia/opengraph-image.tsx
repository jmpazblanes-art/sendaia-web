import { tarjeta, TARJETA } from '../components/og'

export const runtime = 'edge'
export const alt = 'Sistemas con IA' + ' ' + 'para negocios reales.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'SendaIA', titulo: 'Sistemas con IA', acento: 'para negocios reales.' })
}
