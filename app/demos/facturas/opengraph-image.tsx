import { tarjeta, TARJETA } from '../../components/og'

export const runtime = 'edge'
export const alt = 'Prueba una automatización real.' + ' ' + 'Sube una factura.' + ' — SendaIA'
export const size = TARJETA
export const contentType = 'image/png'

export default function Image() {
  return tarjeta({ eyebrow: 'Demo · Facturación', titulo: 'Prueba una automatización real.', acento: 'Sube una factura.' })
}
