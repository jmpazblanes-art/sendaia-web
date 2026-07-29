import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    // Un solo host canónico (sendaia.es): www y el dominio .vercel.app de prod
    // duplicaban la web entera con 200 y Search Console elegía él la canónica
    // ("Duplicada"). Solo en builds de producción para no romper las previews.
    if (process.env.VERCEL_ENV !== 'production') return []
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sendaia.es' }],
        destination: 'https://sendaia.es/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?<sub>.*)\\.vercel\\.app' }],
        destination: 'https://sendaia.es/:path*',
        permanent: true,
      },
      // A-02: la demo de facturas se enlaza desde sendaia.es/demo/facturas en vez de
      // exponer el dominio de despliegue de Vercel. No requiere tocar DNS —el
      // subdominio demo-facturas.sendaia.es necesitaría un CNAME en Hostinger, que
      // es donde apuntan los nameservers—. Temporal (307): cuando exista el CNAME,
      // el destino pasa a ser demo-facturas.sendaia.es sin romper el enlace.
      {
        source: '/demo/facturas',
        destination: 'https://demo-pedidos-legumbre-espino.vercel.app/',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
