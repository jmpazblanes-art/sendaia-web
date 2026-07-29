import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalLayout, H2 } from '../legal/LegalLayout'
import { TITULAR } from '../legal/datos'

export const metadata: Metadata = {
  title: 'Política de cookies — SendaIA',
  description: 'Uso de cookies y almacenamiento local en sendaia.es.',
  robots: { index: true, follow: true },
}

export default function CookiesPage() {
  return (
    <LegalLayout titulo="Política de cookies">
      <p>
        Esta página explica qué información se almacena en tu navegador cuando visitas{' '}
        {TITULAR.dominio}.
      </p>

      <H2>Este sitio no usa cookies publicitarias ni de terceros</H2>
      <p>
        No utilizamos Google Analytics, píxeles de Meta, ni ninguna herramienta de seguimiento
        publicitario o de perfilado. Tampoco compartimos tu navegación con redes sociales ni
        plataformas de anuncios.
      </p>

      <H2>Qué almacenamos y por qué</H2>
      <p>
        Utilizamos exclusivamente <strong>almacenamiento de sesión</strong> (<code>sessionStorage</code>)
        del propio navegador, con una única finalidad técnica y estadística:
      </p>
      <ul className="space-y-2">
        <li>
          <strong>Identificador temporal de sesión.</strong> Un código aleatorio que permite agrupar
          las páginas vistas de una misma visita para saber qué contenidos resultan útiles. No
          contiene datos personales, no permite identificarte y{' '}
          <strong>se borra automáticamente al cerrar la pestaña</strong>.
        </li>
      </ul>
      <p>
        Al tratarse de almacenamiento estrictamente necesario para el funcionamiento y la medición
        propia del sitio, y no implicar seguimiento entre sitios ni cesión a terceros, no se requiere
        consentimiento previo conforme al artículo 22.2 de la LSSI-CE.
      </p>

      <H2>Cómo eliminarlo</H2>
      <p>
        Puedes borrar este almacenamiento en cualquier momento cerrando la pestaña, o desde las
        opciones de privacidad de tu navegador. También puedes navegar en modo incógnito. Bloquearlo
        no afecta al funcionamiento del sitio.
      </p>

      <H2>Cambios en esta política</H2>
      <p>
        Si en el futuro se incorporan herramientas de analítica o publicidad de terceros, esta política
        se actualizará y se solicitará tu consentimiento previo mediante un aviso de cookies antes de
        activarlas.
      </p>
      <p>
        Para cualquier duda sobre el tratamiento de tus datos, consulta la{' '}
        <Link href="/privacidad" style={{ color: 'var(--accent-light)' }}>política de privacidad</Link>{' '}
        o escríbenos a{' '}
        <a href={`mailto:${TITULAR.email}`} style={{ color: 'var(--accent-light)' }}>{TITULAR.email}</a>.
      </p>
    </LegalLayout>
  )
}
