import { tarjeta, TARJETA } from '../components/og'

export const runtime = 'edge'
export const alt = '¿Te gusta esta web?' + ' ' + 'La hicimos nosotros.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'Soluciones complementarias', titulo: '¿Te gusta esta web?', acento: 'La hicimos nosotros.' })
}
