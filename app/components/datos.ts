// Contenido compartido entre la home y las páginas interiores (06-oct-2026).
// Una sola fuente: si cambia un texto o un vídeo, cambia en todas partes.
// Nada de lo que hay aquí es inventado: sale de la web anterior, de los vídeos
// ya publicados y de los casos ya publicados (en anónimo).

import type { Metadata } from 'next'

export const SITE = 'https://sendaia.es'

/** Metadatos de una página interior: título, descripción, canónica y tarjeta social. */
export function meta(ruta: string, titulo: string, descripcion: string): Metadata {
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: `${SITE}${ruta}` },
    openGraph: { type: 'website', locale: 'es_ES', url: `${SITE}${ruta}`, siteName: 'SendaIA', title: titulo, description: descripcion },
    twitter: { card: 'summary_large_image', title: titulo, description: descripcion },
  }
}

export const PASOS = [
  { n: '01', titulo: 'Analizamos', texto: 'Miramos cómo trabajáis hoy y dónde se va el tiempo.' },
  { n: '02', titulo: 'Diseñamos', texto: 'Definimos el sistema alrededor de tu negocio, no al revés.' },
  { n: '03', titulo: 'Conectamos', texto: 'Lo unimos a las herramientas que ya usáis cada día.' },
  { n: '04', titulo: 'Ponemos en producción', texto: 'Empieza a trabajar. Lo vigilamos y lo ajustamos.' },
]

// Vídeos reales ya publicados en el canal de SendaIA (los mismos de las páginas de sector).
export const DEMOS_NEGOCIO = [
  {
    clave: 'clinica',
    id: 'FwcY5vLDPmw',
    negocio: 'Clínica',
    titulo: 'Agente de voz atendiendo y gestionando citas en una clínica',
    texto: 'Atiende la llamada, entiende lo que necesita el paciente y deja la cita registrada.',
    sector: '/sectores/clinicas',
  },
  {
    clave: 'inmobiliaria',
    id: 'w2PAe8R_3IY',
    negocio: 'Inmobiliaria',
    titulo: 'Agente de voz captando un contacto y agendando una visita',
    texto: 'Del primer contacto a la visita: conversación, información del inmueble y cita.',
    sector: '/sectores/inmobiliarias',
  },
  {
    clave: 'restaurante',
    id: 'iPZKD1bkFvE',
    negocio: 'Restaurante / Bar',
    titulo: 'Agente de voz atendiendo una reserva de principio a fin',
    texto: 'Consulta, reserva y confirmación sin que nadie tenga que soltar lo que está haciendo.',
    sector: '/sectores/restaurantes',
  },
]

// Vídeos de demostración grabados (no son demos que se puedan manejar).
export const VIDEOS_DEMO = [
  { clave: 'documental', src: '/videos/video-1.mp4', poster: '/images/demo-1-poster.jpg', titulo: 'Agente documental', texto: 'Extrae datos de facturas y PDFs en tiempo real.' },
  { clave: 'email', src: '/videos/video-2.mp4', poster: '/images/demo-2-poster.jpg', titulo: 'Agente de email', texto: 'Clasifica y responde emails con IA.' },
  { clave: 'whatsapp', src: '/videos/video-3.mp4', poster: '/images/demo-3-poster.jpg', titulo: 'Agente de WhatsApp', texto: 'Atiende y agenda por WhatsApp sin intervención humana.' },
]

export const SECTORES_RESUMEN = [
  { slug: 'clinicas', titulo: 'Clínicas y salud', texto: 'Recepción, citas, documentación clínica y recordatorios sin saturar al equipo.' },
  { slug: 'asesorias', titulo: 'Asesorías y despachos', texto: 'Back-office automatizado: facturas, declaraciones y seguimiento de clientes.' },
  { slug: 'inmobiliarias', titulo: 'Inmobiliarias', texto: 'Captación de leads, respuesta inmediata y agendado de visitas 24/7.' },
  { slug: 'ecommerce', titulo: 'E-commerce', texto: 'Pedidos, incidencias y soporte posventa sin contratar más personal.' },
  { slug: 'restaurantes', titulo: 'Restaurantes y hostelería', texto: 'Reservas, consultas y gestión de proveedores automatizados.' },
  { slug: 'pymes', titulo: 'Cualquier PYME', texto: 'Si tienes procesos repetitivos, tenemos un agente que los elimina.' },
]

// Casos ya publicados en la web anterior, en anónimo y sin cifras nuevas.
// «Cómo funciona» está derivado de lo que ya decían «sistema» y «resultado».
export const CASOS = [
  {
    id: 'climatizacion',
    sector: 'Climatización / Instalaciones',
    contexto: 'Instaladora de climatización · 83 trabajadores · Granada · en marcha desde mayo de 2026',
    titulo: 'De hojas de Excel sueltas a un sistema que cuadra solo',
    problema:
      'Llevaban obras, horas y facturas de proveedor en Excels dispersos. Cada factura se imputaba a mano a su obra; los descuadres aparecían meses después y nadie sabía el margen real de cada proyecto hasta que era tarde.',
    sistema:
      'Un sistema de gestión a medida: las facturas de proveedor entran por correo, la IA extrae cada línea y la liga a su obra automáticamente. Horas sincronizadas desde el sistema de campo. Panel por obra con coste real frente al estimado.',
    pasos: [
      'Las facturas de proveedor llegan por correo.',
      'La IA lee cada línea de la factura.',
      'Cada línea se asigna a su obra, sin que nadie la teclee.',
      'Las horas llegan sincronizadas desde el sistema de campo.',
      'El panel por obra muestra el coste real frente al estimado y avisa cuando algo no cuadra.',
    ],
    destacado: '932 facturas',
    resultado:
      'En sus primeros tres meses el sistema procesó 932 facturas de proveedor (1.848 líneas de gasto) repartidas entre 388 obras, con el margen de cada una visible al instante y avisos cuando algo no cuadra.',
    cta: 'Solicitar diagnóstico',
  },
  {
    id: 'peritacion',
    sector: 'Peritación / Seguros',
    contexto: 'Perito de seguros · trabaja para 5 compañías · 165 informes suyos analizados por el sistema',
    titulo: 'Del informe de 3 horas al informe listo en minutos',
    problema:
      'Redactaba cada informe a mano en Word: copiar datos del expediente, pegar fotos, rellenar tablas de valoración. Horas por informe, y un error de copiar-pegar podía colarse hasta la compañía.',
    sistema:
      'Una app donde todo el peritaje vive dentro: datos, fotos y valoración. Un botón genera el informe Word completo, con los datos volcados en su sitio y las fotos colocadas, listo para enviar a la aseguradora.',
    pasos: [
      'Todo el peritaje vive en un solo sitio: datos, fotos y valoración.',
      'Un botón genera el informe Word completo.',
      'Los datos se vuelcan en su sitio y las fotos quedan colocadas.',
      'El informe sale listo para enviar a la aseguradora.',
    ],
    destacado: 'de horas a minutos',
    resultado:
      'El tiempo por informe pasó de horas a minutos, sin errores de transcripción, y el perito dedica su tiempo a peritar, no a maquetar Word.',
    cta: 'Solicitar diagnóstico',
  },
  {
    id: 'clinica',
    sector: 'Clínica / Servicios con cita',
    contexto: 'Agente en funcionamiento · pruébalo tú mismo llamando al 858 215 026',
    titulo: 'Un agente de voz que no deja ni una llamada sin atender',
    problema:
      'Una clínica pierde llamadas fuera de horario y en horas punta: recepción no da abasto, y cada llamada sin coger es una cita —y un ingreso— que se va a la competencia.',
    sistema:
      'Un agente de voz con IA que atiende 24/7, entiende al paciente, consulta la disponibilidad real y agenda la cita en el momento. Habla natural, no suena a robot, y pasa a una persona si hace falta.',
    pasos: [
      'El paciente llama a cualquier hora.',
      'El agente entiende lo que necesita.',
      'Consulta la disponibilidad real.',
      'Agenda la cita en el momento.',
      'Si hace falta, pasa la llamada a una persona.',
    ],
    destacado: 'llama y compruébalo',
    resultado:
      'Está funcionando y puedes comprobarlo ahora mismo: llama y pide una cita. Contesta, te entiende y la agenda. Es la mejor prueba que te podemos dar.',
    cta: 'Probar el agente de voz',
  },
]

export const PILARES = [
  { titulo: 'Sistemas en producción', texto: 'No nos quedamos en una prueba: lo diseñamos, lo conectamos y lo ponemos a trabajar en tu negocio.' },
  { titulo: 'Sin equipo técnico', texto: 'Tu equipo no necesita saber nada de tecnología. Nosotros lo montamos todo.' },
  { titulo: 'Sistemas a medida', texto: 'No revendemos software. Diseñamos el sistema que encaja con tu operativa real.' },
  { titulo: 'Resultados medibles', texto: 'Menos tareas manuales, más control. Lo ves desde el primer día.' },
]

// Fotos de ChatGPT (06-oct-2026), guardadas en WebP a su tamaño real (≈760 px de ancho):
// por eso se usan a media columna y NUNCA a ancho completo, donde saldrían borrosas.
// Son imágenes generadas: las personas no existen, así que no se presentan como clientes
// ni como equipo y llevan «Imagen ilustrativa» debajo (ver Hero en Pagina.tsx).
export type Foto = { src: string; ancho: number; alto: number; alt: string }
const foto = (n: string, ancho: number, alto: number, alt: string): Foto => ({ src: `/images/fotos/${n}.webp`, ancho, alto, alt })
export const FOTOS = {
  oficina: foto('oficina-granada', 855, 299, 'Una persona trabaja con el panel de SendaIA en el portátil, en un despacho con vistas a Granada'),
  voz: foto('atencion-telefonica', 674, 299, 'Una persona atiende una llamada con auriculares en una oficina luminosa'),
  facturas: foto('gestion-facturas', 768, 241, 'Una persona revisa una factura en papel con el portátil abierto al fondo'),
  clinica: foto('recepcion-clinica', 761, 241, 'Recepción de una clínica: la recepcionista atiende sonriendo a una paciente'),
  inmobiliaria: foto('reunion-inmobiliaria', 768, 237, 'Una agente inmobiliaria enseña fotografías de viviendas a una pareja'),
  restaurante: foto('restaurante-pedidos', 761, 237, 'Un camarero toma nota en una tableta en el comedor de un restaurante'),
  whatsapp: foto('whatsapp-sendaia', 768, 226, 'Un teléfono móvil con una conversación de WhatsApp con SendaIA'),
  analitica: foto('analitica-negocio', 761, 226, 'Un portátil con un panel de gráficos de actividad del negocio'),
}
export const FOTO_SECTOR: Record<string, Foto> = {
  clinicas: FOTOS.clinica,
  asesorias: FOTOS.facturas,
  inmobiliarias: FOTOS.inmobiliaria,
  restaurantes: FOTOS.restaurante,
  ecommerce: FOTOS.whatsapp,
  pymes: FOTOS.analitica,
}
