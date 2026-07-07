// Contenido de las páginas dedicadas por sector. Una sola fuente de verdad:
// la plantilla [slug]/page.tsx lee de aquí. Tono "Autoridad Tranquila": claro,
// directo, sin humo, hablando a PYMEs reales.

export type Sector = {
  slug: string
  nombre: string
  eyebrow: string
  h1: string
  h1Accent: string
  intro: string
  dolores: { titulo: string; texto: string }[]
  solucionTitulo: string
  solucion: string
  agentes: { nombre: string; desc: string }[]
  cierre: string
  videoYoutube?: string // ID de YouTube de una demo real del sector (opcional)
}

export const SECTORES_PAGINAS: Sector[] = [
  {
    slug: 'clinicas',
    nombre: 'Clínicas y Salud',
    eyebrow: 'Sector · Clínicas y Salud',
    h1: 'Que ninguna llamada de un paciente',
    h1Accent: 'se quede sin atender',
    intro: 'Recepción saturada, llamadas que se pierden fuera de horario, recordatorios de cita que nadie tiene tiempo de mandar. Un agente de IA se ocupa de todo eso — sin sustituir a tu equipo, quitándole lo repetitivo.',
    dolores: [
      { titulo: 'Llamadas perdidas = citas perdidas', texto: 'Cada llamada que no se coge fuera de horario o en hora punta es un paciente que llama a la clínica de al lado.' },
      { titulo: 'Recepción desbordada', texto: 'El equipo atiende el teléfono, la puerta y la agenda a la vez. Lo urgente tapa lo importante.' },
      { titulo: 'Recordatorios que no se mandan', texto: 'Las ausencias a cita cuestan dinero, y mandar recordatorios uno a uno no es viable a mano.' },
    ],
    solucionTitulo: 'Un agente de voz que atiende 24/7 y agenda solo',
    solucion: 'El agente coge el teléfono a cualquier hora, entiende al paciente, consulta la disponibilidad real de tu agenda y cierra la cita en el momento. Manda recordatorios automáticos y pasa a una persona cuando hace falta. Habla natural, no suena a robot.',
    agentes: [
      { nombre: 'Agente de voz', desc: 'Atiende llamadas, informa y agenda citas 24/7.' },
      { nombre: 'Recordatorios automáticos', desc: 'Confirmaciones y avisos de cita sin intervención.' },
      { nombre: 'Documentación clínica', desc: 'Prepara y ordena la documentación sin saturar al equipo.' },
    ],
    cierre: 'Tu recepción deja de perder llamadas y tu equipo recupera horas para lo que importa: el paciente.',
  },
  {
    slug: 'asesorias',
    nombre: 'Asesorías y Despachos',
    eyebrow: 'Sector · Asesorías y Despachos',
    h1: 'El back-office que se lleva solo,',
    h1Accent: 'sin intervención humana',
    intro: 'Facturas, declaraciones, seguimiento de clientes, correos que se acumulan. Los agentes de IA absorben el trabajo mecánico del despacho para que tu equipo dedique el tiempo al criterio, no al tecleo.',
    dolores: [
      { titulo: 'Introducir facturas a mano', texto: 'Cada factura de cliente o proveedor se teclea a mano. Horas al mes en pura transcripción.' },
      { titulo: 'Correos sin responder', texto: 'La bandeja se llena de consultas repetitivas que alguien tiene que contestar una a una.' },
      { titulo: 'Seguimiento que se cae', texto: 'Recordar plazos y hacer seguimiento a cada cliente depende de que a nadie se le olvide.' },
    ],
    solucionTitulo: 'La IA lee, extrae y clasifica; tu equipo decide',
    solucion: 'Las facturas entran por correo y la IA extrae cada dato y lo deja listo. Un agente responde las consultas frecuentes al momento y escala las complejas. El seguimiento de plazos y clientes deja de depender de la memoria de nadie.',
    agentes: [
      { nombre: 'Extractor de facturas', desc: 'Lee el PDF, extrae los datos y los clasifica solo.' },
      { nombre: 'Agente de email', desc: 'Responde consultas frecuentes y escala lo complejo.' },
      { nombre: 'Seguimiento de clientes', desc: 'Recordatorios de plazos y avisos automáticos.' },
    ],
    cierre: 'El despacho procesa el triple de volumen sin contratar más gente, y sin el margen de error del copia-pega.',
  },
  {
    slug: 'inmobiliarias',
    nombre: 'Inmobiliarias',
    eyebrow: 'Sector · Inmobiliarias',
    h1: 'Responde a cada lead al instante,',
    h1Accent: 'aunque sean las 11 de la noche',
    intro: 'En el sector inmobiliario, el que responde primero se lleva la visita. Un agente de IA contesta cada consulta en segundos, cualifica al interesado y agenda la visita — a cualquier hora, sin que se enfríe el lead.',
    dolores: [
      { titulo: 'Leads que se enfrían', texto: 'Un interesado que no recibe respuesta en minutos ya está mirando otro piso en otra agencia.' },
      { titulo: 'Consultas fuera de horario', texto: 'La mayoría de la gente busca piso por la noche o el finde, cuando la oficina está cerrada.' },
      { titulo: 'Agendar visitas a mano', texto: 'Cuadrar disponibilidad del comercial con la del cliente por teléfono come tiempo y se cae.' },
    ],
    solucionTitulo: 'Respuesta inmediata y agenda de visitas 24/7',
    solucion: 'El agente responde por voz o WhatsApp en el momento, resuelve las dudas del inmueble, cualifica al interesado (presupuesto, zona, urgencia) y agenda la visita directamente en la agenda del comercial. Cero leads perdidos por no llegar a tiempo.',
    agentes: [
      { nombre: 'Agente de captación', desc: 'Responde y cualifica cada lead al instante, 24/7.' },
      { nombre: 'Agente de WhatsApp', desc: 'Atiende consultas del inmueble por el canal que usa el cliente.' },
      { nombre: 'Agenda de visitas', desc: 'Cuadra y confirma visitas sin llamadas de ida y vuelta.' },
    ],
    cierre: 'Ningún interesado se queda sin respuesta, y tu comercial llega a las visitas ya cualificadas.',
  },
  {
    slug: 'ecommerce',
    nombre: 'E-commerce',
    eyebrow: 'Sector · E-commerce',
    h1: 'Soporte posventa que escala',
    h1Accent: 'sin contratar más personal',
    intro: '"¿Dónde está mi pedido?", cambios, devoluciones, incidencias. El 80% de las consultas de una tienda online son repetitivas. Un agente de IA las resuelve al momento y deja a tu equipo solo lo que de verdad necesita una persona.',
    dolores: [
      { titulo: 'Las mismas preguntas mil veces', texto: 'Seguimiento de pedido, plazos, tallas… El equipo repite las mismas respuestas todo el día.' },
      { titulo: 'Picos que ahogan', texto: 'En campañas y rebajas el volumen de consultas se dispara y el soporte no da abasto.' },
      { titulo: 'Incidencias que tardan', texto: 'Una devolución o incidencia mal gestionada es una reseña negativa y un cliente perdido.' },
    ],
    solucionTitulo: 'Un agente que resuelve el 80% y escala el resto',
    solucion: 'El agente responde al instante sobre estado de pedidos, cambios y devoluciones, gestiona las incidencias sencillas de principio a fin y pasa a una persona solo lo que de verdad lo necesita. Aguanta cualquier pico sin contratar refuerzos.',
    agentes: [
      { nombre: 'Agente de soporte', desc: 'Resuelve pedidos, cambios y devoluciones al momento.' },
      { nombre: 'Agente de WhatsApp', desc: 'Atiende en el canal donde ya te escriben los clientes.' },
      { nombre: 'Gestión de incidencias', desc: 'Tramita lo sencillo y escala lo complejo con contexto.' },
    ],
    cierre: 'Tu soporte absorbe cualquier volumen sin crecer en plantilla, y el cliente recibe respuesta al instante.',
  },
  {
    slug: 'restaurantes',
    nombre: 'Restaurantes y Hostelería',
    eyebrow: 'Sector · Restaurantes y Hostelería',
    h1: 'Que nadie coja el teléfono',
    h1Accent: 'en plena hora punta',
    intro: 'En pleno servicio, coger el teléfono para una reserva significa dejar de atender la sala. Un agente de voz gestiona las reservas y las consultas por ti, para que tu equipo esté donde tiene que estar: con el cliente que ya está dentro.',
    dolores: [
      { titulo: 'El teléfono en pleno servicio', texto: 'Cada llamada en hora punta obliga a soltar una mesa. Y si no se coge, es una reserva perdida.' },
      { titulo: 'Reservas descuadradas', texto: 'Apuntar reservas a mano entre servicio y servicio termina en dobles reservas y errores.' },
      { titulo: 'Las mismas preguntas', texto: 'Horario, carta, alérgenos, si hay terraza… consultas que se repiten y comen tiempo.' },
    ],
    solucionTitulo: 'Un agente de voz que reserva y responde por ti',
    solucion: 'El agente coge todas las llamadas, gestiona la reserva contra tu disponibilidad real, responde las consultas habituales (horario, carta, alérgenos) y avisa de las reservas al equipo. Sin descuadres y sin soltar la sala.',
    agentes: [
      { nombre: 'Agente de reservas', desc: 'Coge el teléfono y gestiona reservas 24/7.' },
      { nombre: 'Consultas automáticas', desc: 'Horario, carta, alérgenos, ubicación al momento.' },
      { nombre: 'Gestión de proveedores', desc: 'Pedidos y seguimiento de proveedores automatizados.' },
    ],
    cierre: 'Tu equipo atiende la sala, no el teléfono, y no se pierde ni una reserva por estar ocupados.',
    videoYoutube: 'iPZKD1bkFvE',
  },
  {
    slug: 'pymes',
    nombre: 'Cualquier PYME',
    eyebrow: 'Sector · Cualquier PYME',
    h1: 'Si tienes un proceso repetitivo,',
    h1Accent: 'tenemos un agente que lo elimina',
    intro: 'No hace falta ser de un sector concreto. Si en tu negocio hay tareas que se repiten cada día —atender el teléfono, leer facturas, responder correos, hacer seguimiento— hay un agente de IA que las hace por ti. Sin código y sin interrumpir tu operativa.',
    dolores: [
      { titulo: 'Tu equipo hace trabajo de máquina', texto: 'Gente cualificada dedicando horas a tareas mecánicas que no aportan valor.' },
      { titulo: 'No escalas sin contratar', texto: 'Cada aumento de volumen significa más manos, más nóminas, más gestión.' },
      { titulo: 'El error humano cuesta', texto: 'Un dato mal copiado, un correo sin responder, un plazo olvidado. Se acumulan.' },
    ],
    solucionTitulo: 'Diseñamos el agente que encaja con TU operativa',
    solucion: 'No revendemos software genérico. Analizamos cómo trabajas, encontramos las tareas que roban tiempo y diseñamos el agente —de voz, de email, de WhatsApp o el que sea— que las absorbe. Se integra en lo que ya usas, sin obras.',
    agentes: [
      { nombre: 'Diagnóstico gratuito', desc: '30 minutos para ver qué se puede automatizar en tu negocio.' },
      { nombre: 'Agente a medida', desc: 'El que encaja con tu operativa real, no un genérico.' },
      { nombre: 'Integración sin obras', desc: 'Se conecta a lo que ya usas, sin cambiar tu forma de trabajar.' },
    ],
    cierre: 'Absorbes el triple de volumen sin ampliar plantilla, y tu equipo se dedica a lo que sí necesita cabeza.',
  },
]

export function getSector(slug: string): Sector | undefined {
  return SECTORES_PAGINAS.find((s) => s.slug === slug)
}
