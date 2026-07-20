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
