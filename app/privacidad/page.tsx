import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalLayout, H2 } from '../legal/LegalLayout'
import { TITULAR } from '../legal/datos'

export const metadata: Metadata = {
  title: 'Política de privacidad — SendaIA',
  description: 'Cómo trata SendaIA los datos personales recogidos a través de sendaia.es, conforme al RGPD y la LOPDGDD.',
  robots: { index: true, follow: true },
}

export default function PrivacidadPage() {
  return (
    <LegalLayout titulo="Política de privacidad">
      <p>
        Esta política explica cómo se tratan los datos personales que nos facilitas a través de
        {' '}{TITULAR.dominio}, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018
        de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <H2>Responsable del tratamiento</H2>
      <ul className="space-y-1">
        <li><strong>Responsable:</strong> {TITULAR.nombre} ({TITULAR.marca})</li>
        <li><strong>NIF:</strong> {TITULAR.nif}</li>
        <li><strong>Domicilio:</strong> {TITULAR.domicilio}</li>
        <li><strong>Contacto:</strong> {TITULAR.email}</li>
      </ul>

      <H2>Qué datos recogemos</H2>
      <p>
        A través del formulario de contacto recogemos los datos que tú nos facilitas:{' '}
        <strong>nombre, correo electrónico, teléfono</strong> (opcional) y la{' '}
        <strong>descripción del proceso que quieres automatizar</strong>. No recogemos datos de
        categorías especiales, y te pedimos que no incluyas información confidencial ni datos
        personales de terceros en el campo de texto libre.
      </p>
      <p>
        Si utilizas el asistente de chat o el agente de voz, se trata el contenido de la conversación
        y, en el caso del agente de voz, el audio necesario para mantenerla.
      </p>
      <p>
        Además, registramos de forma agregada la navegación por el sitio (página visitada, página de
        procedencia e identificador temporal de sesión) con el fin de conocer qué contenidos resultan
        útiles. Esta información no se usa para identificarte personalmente.
      </p>

      <H2>Datos bancarios de los clientes de nuestras aplicaciones</H2>
      <p>
        Algunas de las aplicaciones que desarrollamos y mantenemos para nuestros clientes —por
        ejemplo, herramientas de gestión para asesorías— incorporan una función de{' '}
        <strong>conciliación bancaria</strong>. Cuando el titular de una cuenta autoriza expresamente
        esa función, se accede a los <strong>movimientos y saldos de la cuenta en modo de solo
        lectura</strong>, con el único fin de casarlos con la contabilidad. En ningún caso se pueden
        ordenar pagos, transferencias ni ninguna otra operación sobre la cuenta.
      </p>
      <p>
        El acceso se realiza a través de un proveedor autorizado de servicios de información sobre
        cuentas conforme a la normativa de servicios de pago (PSD2), y{' '}
        <strong>requiere siempre el consentimiento del titular</strong>, otorgado ante su propia
        entidad bancaria y revocable en cualquier momento. SendaIA no almacena las credenciales de
        acceso a la banca electrónica: la autenticación se realiza siempre frente al banco.
      </p>
      <p>
        Base jurídica: el <em>consentimiento</em> del titular (art. 6.1.a RGPD) y la ejecución del
        contrato de prestación de servicios con la empresa cliente (art. 6.1.b RGPD).
      </p>

      <H2>Para qué usamos tus datos y con qué legitimación</H2>
      <ul className="space-y-2">
        <li>
          <strong>Atender tu solicitud y contactarte</strong> para preparar el diagnóstico o la
          propuesta que nos pides. Base jurídica: tu <em>consentimiento</em> al enviar el formulario y
          la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b RGPD).
        </li>
        <li>
          <strong>Mantener un histórico comercial</strong> de las conversaciones mantenidas. Base
          jurídica: interés legítimo en la gestión de la relación comercial (art. 6.1.f RGPD).
        </li>
        <li>
          <strong>Medir el uso del sitio</strong> de forma agregada para mejorarlo. Base jurídica:
          interés legítimo (art. 6.1.f RGPD).
        </li>
      </ul>
      <p>
        No tomamos decisiones automatizadas que produzcan efectos jurídicos sobre ti, ni elaboramos
        perfiles con tus datos.
      </p>

      <H2>Cuánto tiempo conservamos los datos</H2>
      <p>
        Conservamos tus datos mientras dure la relación comercial y, después, durante los plazos
        legalmente exigibles para atender posibles responsabilidades. Si no llega a existir relación
        comercial, se suprimen en el plazo máximo de un año desde el último contacto.
      </p>
      <p>
        Los <strong>movimientos bancarios</strong> obtenidos para la conciliación se conservan
        mientras la empresa cliente mantenga activa esa función y durante los plazos que exige la
        normativa contable y fiscal. Si el titular revoca la autorización ante su banco, el acceso
        cesa de inmediato.
      </p>

      <H2>Destinatarios y encargados del tratamiento</H2>
      <p>
        No cedemos tus datos a terceros con fines comerciales. Para poder prestar el servicio nos
        apoyamos en proveedores tecnológicos que actúan como encargados del tratamiento y con los que
        existe el correspondiente contrato:
      </p>
      <ul className="space-y-1">
        <li><strong>Vercel Inc.</strong> — alojamiento del sitio web.</li>
        <li><strong>Supabase</strong> — base de datos donde se almacenan las solicitudes de contacto.</li>
        <li><strong>Google (Gmail / Workspace)</strong> — correo electrónico.</li>
        <li><strong>Proveedores de IA conversacional</strong> — para el asistente de chat y el agente de voz.</li>
        <li>
          <strong>Enable Banking Oy</strong> (Finlandia) — proveedor autorizado de servicios de
          información sobre cuentas (PSD2), únicamente para la función de conciliación bancaria
          descrita más arriba y cuando el titular la ha autorizado.
        </li>
        <li><strong>Resend</strong> — envío de los correos que generan nuestras aplicaciones.</li>
      </ul>
      <p>
        Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En esos
        casos las transferencias se amparan en decisiones de adecuación o en cláusulas contractuales
        tipo aprobadas por la Comisión Europea.
      </p>

      <H2>Tus derechos</H2>
      <p>
        Puedes ejercer los derechos de <strong>acceso, rectificación, supresión, oposición,
        limitación del tratamiento y portabilidad</strong>, así como retirar tu consentimiento en
        cualquier momento, escribiendo a{' '}
        <a href={`mailto:${TITULAR.email}`} style={{ color: 'var(--accent-light)' }}>{TITULAR.email}</a>{' '}
        e indicando el derecho que deseas ejercer. La retirada del consentimiento no afecta a la
        licitud del tratamiento previo.
      </p>
      <p>
        Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación
        ante la <strong>Agencia Española de Protección de Datos</strong> (
        <a href="https://www.aepd.es" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-light)' }}>www.aepd.es</a>).
      </p>

      <H2>Seguridad</H2>
      <p>
        Aplicamos medidas técnicas y organizativas para proteger tus datos frente a accesos no
        autorizados, pérdida o alteración, incluyendo cifrado en tránsito y control de acceso a los
        sistemas donde se almacenan.
      </p>

      <H2>Cookies</H2>
      <p>
        El uso de cookies y tecnologías similares se detalla en la{' '}
        <Link href="/cookies" style={{ color: 'var(--accent-light)' }}>política de cookies</Link>.
      </p>
    </LegalLayout>
  )
}
