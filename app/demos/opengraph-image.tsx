import { tarjeta, TARJETA } from '../components/og'

export const runtime = 'edge'
export const alt = 'No imagines lo que podemos hacer.' + ' ' + 'Pruébalo.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'Demos', titulo: 'No imagines lo que podemos hacer.', acento: 'Pruébalo.' })
}
