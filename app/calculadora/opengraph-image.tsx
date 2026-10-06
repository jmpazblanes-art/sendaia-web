import { tarjeta, TARJETA } from '../components/og'

export const runtime = 'edge'
export const alt = 'Calcula cuánto trabajo manual' + ' ' + 'tiene tu empresa.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'Calculadora de automatización', titulo: 'Calcula cuánto trabajo manual', acento: 'tiene tu empresa.' })
}
