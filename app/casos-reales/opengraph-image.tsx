import { tarjeta, TARJETA } from '../components/og'

export const runtime = 'edge'
export const alt = 'Proyectos que ya están en marcha.' + ' ' + 'Con lo que pasó, tal cual.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'Casos reales', titulo: 'Proyectos que ya están en marcha.', acento: 'Con lo que pasó, tal cual.' })
}
