import type { Metadata } from 'next'
import { LegalLayout, H2 } from '../legal/LegalLayout'
import { TITULAR } from '../legal/datos'

export const metadata: Metadata = {
  title: 'Aviso legal — SendaIA',
  description: 'Información legal del titular del sitio web sendaia.es conforme a la LSSI-CE.',
  robots: { index: true, follow: true },
}

export default function AvisoLegalPage() {
  return (
    <LegalLayout titulo="Aviso legal">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
        de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición del usuario los
        datos identificativos del titular de este sitio web.
      </p>

      <H2>Titular del sitio</H2>
      <ul className="space-y-1">
        <li><strong>Titular:</strong> {TITULAR.nombre}</li>
        <li><strong>Nombre comercial:</strong> {TITULAR.marca}</li>
        <li><strong>NIF:</strong> {TITULAR.nif}</li>
        <li><strong>Domicilio:</strong> {TITULAR.domicilio}</li>
        <li><strong>Correo electrónico:</strong> {TITULAR.email}</li>
        <li><strong>Teléfono:</strong> {TITULAR.telefono}</li>
        <li><strong>Sitio web:</strong> {TITULAR.dominio}</li>
      </ul>

      <H2>Objeto</H2>
      <p>
        Este sitio web tiene por objeto informar sobre los servicios de automatización de procesos
        administrativos y agentes de inteligencia artificial que presta {TITULAR.marca}, así como
        permitir el contacto con personas interesadas en dichos servicios.
      </p>

      <H2>Condiciones de uso</H2>
      <p>
        El acceso a este sitio web es gratuito y atribuye la condición de usuario. El usuario se
        compromete a hacer un uso adecuado de los contenidos y a no emplearlos para incurrir en
        actividades ilícitas, lesivas de derechos de terceros o que puedan dañar, inutilizar o
        sobrecargar el sitio web o impedir su normal utilización.
      </p>

      <H2>Propiedad intelectual e industrial</H2>
      <p>
        Los contenidos de este sitio —textos, imágenes, marcas, logotipos, diseño y código— son
        titularidad de {TITULAR.nombre} o se utilizan con la autorización de sus titulares, y están
        protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
        reproducción, distribución o comunicación pública sin autorización expresa.
      </p>

      <H2>Exclusión de responsabilidad</H2>
      <p>
        El titular no se hace responsable de los daños que pudieran derivarse de interferencias,
        omisiones, interrupciones, virus informáticos o desconexiones en el funcionamiento operativo
        del sistema, motivadas por causas ajenas a su control. Las demostraciones y ejemplos mostrados
        en este sitio tienen carácter ilustrativo y no constituyen una oferta contractual.
      </p>

      <H2>Enlaces a terceros</H2>
      <p>
        Este sitio puede contener enlaces a páginas de terceros. El titular no asume responsabilidad
        alguna sobre los contenidos, políticas o prácticas de dichos sitios.
      </p>

      <H2>Legislación aplicable</H2>
      <p>
        La relación entre el titular y el usuario se rige por la legislación española. Para la
        resolución de cualquier controversia, las partes se someten a los juzgados y tribunales del
        domicilio del usuario cuando este tenga la condición de consumidor.
      </p>
    </LegalLayout>
  )
}
