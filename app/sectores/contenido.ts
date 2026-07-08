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
  retorno?: { titulo: string; texto: string } // cálculo honesto de retorno (ejemplo, no caso real)
  // Ganchos de venta: cada uno ataca UN dolor distinto del sector con su propio
  // pitch (problema → solución → cifra). 2-3 por sector.
  ganchos?: { gancho: string; problema: string; solucion: string; cifra: string }[]
  agentes: { nombre: string; desc: string }[]
  objecion?: { pregunta: string; respuesta: string } // la objeción típica del sector, ya rebatida
  cierre: string
  videoYoutube?: string // ID de YouTube de una demo real del sector (opcional)
}

export const SECTORES_PAGINAS: Sector[] = [
  {
    slug: 'clinicas',
    nombre: 'Clínicas y Salud',
    eyebrow: 'Sector · Clínicas de Estética y Salud',
    h1: 'Los pacientes que ya pagaste',
    h1Accent: 'y se están enfriando en tu CRM',
    intro: 'Te gastas un dineral en Instagram para llenar la agenda. Pero de cada 10 personas que dejan sus datos, tu equipo llama a 3 bien y a las otras 7 tarde o nunca. Y tienes cientos de contactos parados en el CRM que preguntaron y jamás volviste a llamar. No es un problema de marketing: esa gente ya está pagada.',
    dolores: [
      { titulo: 'El lead caro que se enfría', texto: 'Un lead contactado en menos de 5 minutos convierte hasta un 25%. Al día siguiente, menos del 5%. Responder tarde destruye el dinero que ya gastaste en el anuncio.' },
      { titulo: 'La base de datos muerta', texto: 'Meses de campañas dejan miles de contactos que pidieron info y nunca agendaron. Están pagados y olvidados porque la recepción no da abasto para volver a llamarlos.' },
      { titulo: 'Huecos que no se rellenan', texto: 'Entre un 12% y un 19% de las citas se quedan en no-show. Cada hueco que no se rellena en menos de una hora es dinero perdido para siempre.' },
    ],
    solucionTitulo: 'Una recepcionista digital que no deja escapar ni un lead',
    solucion: 'Llama al lead en menos de 60 segundos, a cualquier hora —aunque sea domingo por la noche—, le resuelve las dudas y le agenda la valoración directamente en tu agenda. Y lo más rentable: reactiva tu base de datos muerta, llamando y escribiendo por WhatsApp con audio (voz natural) a esos contactos antiguos para traerte de vuelta a los que están listos. Tú lo ves todo en un panel.',
    retorno: { titulo: 'Échale la cuenta tú mismo', texto: 'Si tienes 2.000 contactos parados y recuperamos solo un 3%, son 60 valoraciones nuevas sin gastar un euro más en publicidad. Con tu ticket medio, el sistema se paga con dos o tres tratamientos al mes. El resto es tu margen. (Ejemplo con cifras conservadoras del sector — pon tus números.)' },
    ganchos: [
      { gancho: 'Reactiva tu base de datos muerta', problema: 'Tienes miles de contactos de campañas pasadas que pidieron info y nunca agendaron. Están pagados y olvidados en el CRM porque nadie da abasto para volver a llamarlos.', solucion: 'El agente llama y escribe por WhatsApp con audio a esos contactos antiguos, les ofrece una promo de reactivación y te agenda la valoración. Sin gastar un euro más en anuncios.', cifra: 'Reactivar el 3% de 2.000 contactos = 60 valoraciones nuevas sobre gente que ya pagaste.' },
      { gancho: 'Responde al lead antes de que se enfríe', problema: 'De cada 10 leads de Instagram, tu equipo llama bien a 3 y a los otros 7 tarde o nunca. Un lead contactado en menos de 5 minutos convierte hasta un 25%; al día siguiente, menos del 5%.', solucion: 'El agente llama al lead en menos de 60 segundos, a cualquier hora, resuelve sus dudas y le agenda la valoración en tu agenda antes de que mire otra clínica.', cifra: 'Responder en menos de 5 minutos multiplica por 5 la conversión frente a hacerlo al día siguiente.' },
      { gancho: 'Rellena los huecos de las cancelaciones', problema: 'Entre un 12% y un 19% de las citas se quedan en no-show. Cada hueco que no se rellena en menos de una hora es facturación perdida para siempre.', solucion: 'El agente manda recordatorios automáticos para reducir las ausencias, y cuando hay una cancelación, avisa a los pacientes en lista de espera para llenar el hueco.', cifra: 'Cada no-show recuperado a tu ticket medio es dinero que hoy se cae de la agenda.' },
    ],
    agentes: [
      { nombre: 'Respuesta en 60 segundos', desc: 'Llama y cualifica cada lead nuevo al instante, 24/7.' },
      { nombre: 'Reactivación de BD muerta', desc: 'Despierta por voz y WhatsApp a los contactos antiguos que nunca agendaron.' },
      { nombre: 'Agenda y recordatorios', desc: 'Cierra la valoración y reduce no-shows con avisos automáticos.' },
    ],
    objecion: {
      pregunta: '"Mis pacientes quieren trato humano. Un robot los va a espantar."',
      respuesta: 'El agente no sustituye a tu doctora ni a tu coordinadora: hace lo que ellas no llegan a hacer, el primer contacto instantáneo y el seguimiento pesado. ¿Qué da más sensación de abandono: que le contesten amable en 30 segundos un domingo por la noche, o que nadie le devuelva la llamada en dos días? El trato humano de verdad lo das tú en la valoración. Y las llamadas de reactivación las escuchas tú antes de activarlas: si no suenan naturales, no se lanzan.',
    },
    cierre: 'Recuperas agenda sobre una base que ya estaba pagada, y tu equipo se dedica al paciente, no a perseguir el teléfono.',
    videoYoutube: 'FwcY5vLDPmw',
  },
  {
    slug: 'asesorias',
    nombre: 'Asesorías y Despachos',
    eyebrow: 'Sector · Asesorías y Despachos',
    h1: 'Deja de teclear facturas.',
    h1Accent: 'Recupera 10 horas cada semana',
    intro: 'El cuello de botella de tu despacho no es pensar, es teclear. Tu equipo se pasa el trimestre metiendo facturas a mano y contestando por décima vez las mismas preguntas de siempre. Ese trabajo devora la plantilla en campaña y no se factura mejor por hacerlo una persona.',
    dolores: [
      { titulo: 'Meter facturas a mano', texto: 'Cada factura de cliente o proveedor se teclea al software contable a mano. Horas al mes en pura transcripción que no aportan criterio.' },
      { titulo: 'Las mismas cuatro preguntas', texto: '"¿Cuánto pago este trimestre?", "¿me mandas el 303?", "¿cuándo vence?". La bandeja se llena de consultas repetitivas que alguien contesta una a una.' },
      { titulo: 'Vais ahogados en campaña', texto: 'En trimestre, Renta y cierre echáis horas extra y aun así el cliente se queja de que no le coges el teléfono.' },
    ],
    solucionTitulo: 'La IA lee y prepara; tú validas y firmas',
    solucion: 'Un ayudante digital lee las facturas que llegan por correo y las deja propuestas para contabilizar, sin teclear. Y un asistente por WhatsApp contesta al momento las consultas de siempre —vencimientos, cuánto toca pagar, mándame tal modelo— y solo os pasa lo que de verdad necesita un profesional. El criterio y la firma siguen siendo tuyos.',
    retorno: { titulo: 'Capacidad de facturación recuperada', texto: 'Recuperas 10-15 horas por persona a la semana. Una hora de trabajo cualificado en un despacho se factura a unos 50 €, así que hablamos de cientos de euros al mes por persona en horas que ahora se van en tecleo. Con esa capacidad, coges más clientes sin contratar o dejas de pagar horas extra en campaña.' },
    ganchos: [
      { gancho: 'Que las facturas se contabilicen solas', problema: 'Tu equipo se pasa el mes metiendo facturas de clientes y proveedores al software contable a mano. Horas de pura transcripción que no aportan criterio ni se facturan mejor por hacerlas una persona.', solucion: 'La IA lee las facturas que llegan por correo, extrae cada dato y las deja propuestas para contabilizar. Tu equipo valida y firma; el tecleo desaparece.', cifra: 'Hasta un 70% del trabajo contable repetitivo se automatiza. 10-15 horas/semana por persona.' },
      { gancho: 'Contesta las consultas de siempre al momento', problema: '"¿Cuánto pago este trimestre?", "¿me mandas el 303?", "¿cuándo vence?". La bandeja se llena de las mismas preguntas que alguien contesta una a una, y en campaña no dais abasto.', solucion: 'Un asistente por WhatsApp responde al instante las consultas frecuentes de tus clientes —vencimientos, importes, envío de modelos— y solo os pasa lo que de verdad necesita un profesional.', cifra: 'El cliente tiene respuesta a las 22:00 de un domingo, que es cuando se acuerda del IVA.' },
      { gancho: 'Sobrevive a la campaña sin horas extra', problema: 'En trimestre, Renta y cierre echáis horas extra y aun así el cliente se queja de que no le coges el teléfono. El pico ahoga a un equipo que ya es pequeño.', solucion: 'Con el tecleo y las consultas absorbidas por la IA, el equipo llega a la campaña con margen: dedica el tiempo al criterio y a los casos que valen, no a apagar fuegos.', cifra: 'Con la capacidad liberada, coges más clientes (150-280 €/mes cada pyme) sin contratar.' },
    ],
    agentes: [
      { nombre: 'Extractor de facturas', desc: 'Lee el PDF, extrae los datos y los deja listos para contabilizar.' },
      { nombre: 'Asistente por WhatsApp', desc: 'Responde consultas frecuentes al momento y escala lo complejo.' },
      { nombre: 'Seguimiento de plazos', desc: 'Vencimientos y avisos a clientes sin depender de la memoria de nadie.' },
    ],
    objecion: {
      pregunta: '"Mis clientes confían en mí porque hay una persona detrás. Un robot me la va a liar con Hacienda o el RGPD."',
      respuesta: 'No sustituye a nadie ni firma nada: prepara el trabajo, la factura queda propuesta y tú validas. El criterio profesional y la firma siguen siendo tuyos. Se monta cumpliendo RGPD, con el dato bajo tu control. Y el dato del mercado: 7 de cada 10 asesores en España ya usan IA para ganar eficiencia. La pregunta no es si tus clientes lo aceptan, es si el despacho de al lado lo monta antes que tú.',
    },
    cierre: 'El despacho procesa más volumen sin contratar más gente, y sin el margen de error del copia-pega.',
  },
  {
    slug: 'inmobiliarias',
    nombre: 'Inmobiliarias',
    eyebrow: 'Sector · Inmobiliarias',
    h1: 'El que responde primero',
    h1Accent: 'se lleva la visita. Sé tú, siempre',
    intro: 'idealista manda el mismo lead a 5 o 6 agencias a la vez. Gana el que contesta primero. Pero tú no puedes coger el teléfono a las 23:00 de un sábado — y ahí es justo cuando la gente busca piso. Cada lead que no contestas a tiempo es dinero que ya pagaste al portal y regalas a la agencia de al lado.',
    dolores: [
      { titulo: 'El mismo lead, seis agencias', texto: 'El portal reparte tu contacto a la competencia. Si respondes a las dos horas, ese comprador ya está viendo el piso con otro.' },
      { titulo: 'Los leads entran de noche', texto: 'La gente busca piso por la noche y el finde, cuando la oficina está cerrada. El tiempo medio de respuesta del sector es de casi 23 horas.' },
      { titulo: 'Se pierde 1 de cada 3', texto: 'Entre el 20% y el 40% de los leads se pierden solo por lentitud de respuesta. Responder en menos de 5 minutos multiplica por 21 la probabilidad de cualificarlo.' },
    ],
    solucionTitulo: 'Contesta cada lead en menos de un minuto, a cualquier hora',
    solucion: 'El agente responde por WhatsApp o llamada en el momento, saluda, pregunta lo justo para saber si el interesado es serio (presupuesto, zona, urgencia) y le ofrece directamente hueco en tu agenda para la visita. Al lunes te encuentras las visitas ya puestas, no una lista de gente a la que llamar. Y reactiva los leads fríos que dabas por perdidos.',
    retorno: { titulo: 'No necesitas más leads, necesitas no perderlos', texto: 'Una comisión media por operación en España ronda los 7.600 € (al 4% sobre una vivienda media). Rescatar una sola operación al mes que hoy se te escapa por no contestar a tiempo ya paga el servicio muchas veces. No pagas por más tráfico: dejas de tirar el que ya compras.' },
    ganchos: [
      { gancho: 'Sé el primero en contestar, siempre', problema: 'idealista manda el mismo lead a 5 o 6 agencias a la vez. Gana el que contesta primero, pero tú no puedes coger el teléfono a las 23:00 de un sábado, que es cuando la gente busca piso.', solucion: 'El agente responde cada lead en menos de un minuto por WhatsApp o llamada, a cualquier hora, y le da el primer contacto antes que la competencia.', cifra: 'El 78% de los compradores cierra con la primera agencia que le responde.' },
      { gancho: 'Llega el lunes con las visitas ya puestas', problema: 'Cualificar cada interesado y cuadrar la visita con la agenda del comercial por teléfono come tiempo y se cae. Muchos leads mueren en ese ida y vuelta.', solucion: 'El agente pregunta lo justo para saber si el interesado es serio (presupuesto, zona, urgencia) y le ofrece hueco directo en tu agenda. Tú te encuentras las visitas agendadas, no una lista de llamadas pendientes.', cifra: 'Responder en menos de 5 minutos multiplica por 21 la probabilidad de cualificar el lead.' },
      { gancho: 'Rescata los leads que diste por perdidos', problema: 'Tienes una base de contactos "fríos" que en su día no cerraron y nadie ha vuelto a tocar. Inventario comercial que ya pagaste y está muerto.', solucion: 'El agente vuelve a contactar por WhatsApp esa base fría con el inmueble o la novedad que encaja, y despierta a los que siguen en el mercado.', cifra: 'Se pierde entre el 20% y el 40% de los leads solo por lentitud de respuesta. Recuperar parte es margen puro.' },
    ],
    agentes: [
      { nombre: 'Respuesta en 1 minuto', desc: 'Contesta y cualifica cada lead al instante, 24/7, por voz o WhatsApp.' },
      { nombre: 'Agenda de visitas', desc: 'Cuadra y confirma visitas sin llamadas de ida y vuelta.' },
      { nombre: 'Reactivación de leads fríos', desc: 'Vuelve a tocar por WhatsApp la base de contactos que dabas por perdidos.' },
    ],
    objecion: {
      pregunta: '"La gente compra una casa hablando con una persona, no con un robot."',
      respuesta: 'Totalmente de acuerdo: la operación la cierras tú. El asistente no vende la casa, hace lo que tú no puedes a las 23:00: coge el lead antes que la competencia, ve si es serio y te deja la visita agendada. El trato personal empieza en la visita, y a esa visita llegas tú. El 78% de los compradores cierra con la primera agencia que le responde: la pregunta no es si el bot espanta clientes, es cuántos estás regalando ahora por no ser el primero.',
    },
    cierre: 'Ningún interesado se queda sin respuesta, y tu comercial llega a las visitas ya cualificadas.',
  },
  {
    slug: 'ecommerce',
    nombre: 'E-commerce',
    eyebrow: 'Sector · E-commerce',
    h1: 'Absorbe el pico de rebajas',
    h1Accent: 'sin contratar refuerzos',
    intro: 'En Black Friday y rebajas te llegan cuatro veces más consultas, y entre el 25% y el 40% son la misma pregunta: "¿dónde está mi pedido?". Si dimensionas el equipo para el pico, te sobra gente diez meses al año; si lo dimensionas para la media, colapsas justo cuando más ventas hay en juego.',
    dolores: [
      { titulo: '"¿Dónde está mi pedido?"', texto: 'El seguimiento de pedidos, cambios y devoluciones son las mismas cuatro preguntas todo el día. Tu equipo se atasca ahí y el cliente que iba a repetir no recibe respuesta a tiempo.' },
      { titulo: 'El pico que revienta el soporte', texto: 'El 4º trimestre es el de mayor facturación del año, y es justo cuando el soporte no da abasto. No puedes contratar y despedir al ritmo de la demanda.' },
      { titulo: 'Una incidencia mal llevada = reseña negativa', texto: 'Una devolución que tarda es un cliente perdido y una estrella menos. Y el 75% de los carritos se abandonan por dudas que nadie resuelve en el momento.' },
    ],
    solucionTitulo: 'Resuelve el 80% al instante y escala el resto con contexto',
    solucion: 'Un agente atiende las consultas de siempre —estado del pedido, devoluciones, cambios, tallas— en tu web y en WhatsApp, al instante y 24/7. Se conecta a tu tienda y a tu transportista, así que responde con datos reales, no con plantillas. Lo que no puede resolver, lo pasa a tu equipo con el contexto ya resumido. Los reembolsos y casos delicados los decides tú.',
    retorno: { titulo: 'El pico sin refuerzos temporales', texto: 'Una consulta atendida por una persona cuesta varios euros; automatizada, menos de dos. Un ecommerce con 1.000 consultas al mes que automatiza la mitad se ahorra el equivalente a una jornada de agente al mes, sin tocar plantilla ni pagar horas extra de campaña.' },
    ganchos: [
      { gancho: 'Acaba con el "¿dónde está mi pedido?"', problema: 'Entre el 25% y el 40% de tus tickets de soporte son la misma pregunta: dónde está el pedido. Tu equipo se atasca ahí y el cliente que iba a repetir no recibe respuesta a tiempo.', solucion: 'El agente se conecta a tu tienda y a tu transportista, así que da el estado real del envío al instante, en la web y en WhatsApp, 24/7. Datos reales, no plantillas.', cifra: 'La IA resuelve entre el 40% y el 70% de las consultas rutinarias, con un coste por ticket de menos de la mitad.' },
      { gancho: 'Absorbe el pico de rebajas sin contratar', problema: 'En Black Friday y rebajas —el trimestre de mayor facturación del año— te llegan cuatro veces más consultas y el soporte revienta. No puedes contratar y despedir al ritmo de la demanda.', solucion: 'El agente aguanta cualquier volumen sin refuerzos: atiende el pico entero al instante y escala a tu equipo solo lo que de verdad necesita una persona, ya resumido.', cifra: 'Automatizar la mitad de 1.000 consultas/mes ahorra el equivalente a una jornada de agente, sin plantilla extra.' },
      { gancho: 'Rescata carritos con dudas resueltas al momento', problema: 'El 75% de los carritos se abandonan, muchos por una duda de envío, talla o pago que nadie resuelve en el momento de comprar.', solucion: 'El agente responde esas dudas en el chat justo cuando el cliente está a punto de pagar, y le quita el freno que le hacía abandonar.', cifra: 'Cada carrito recuperado por resolver una duda a tiempo es una venta que ya estaba a un clic.' },
    ],
    agentes: [
      { nombre: 'Agente de soporte', desc: 'Resuelve pedidos, cambios y devoluciones con datos reales de tu tienda.' },
      { nombre: 'Agente de WhatsApp', desc: 'Atiende en el canal donde ya te escriben los clientes.' },
      { nombre: 'Escalado con contexto', desc: 'Tramita lo sencillo y pasa lo complejo a tu equipo, ya resumido.' },
    ],
    objecion: {
      pregunta: '"Ya tuve un chatbot y el cliente lo odiaba. Me da miedo que dé una respuesta mala y me hunda una reseña."',
      respuesta: 'Esto no es el chatbot de árbol de botones que odias. Se conecta a tu tienda y a tu transportista, así que da el estado real del pedido, no frases genéricas. Y tú pones los límites: reembolsos o casos delicados no los cierra solo, los deriva a tu equipo con todo el contexto. Empezamos con las 3-4 consultas más repetidas. Si en 30 días no baja tu carga de tickets, lo apagas.',
    },
    cierre: 'Tu soporte absorbe cualquier volumen sin crecer en plantilla, y el cliente recibe respuesta al instante.',
  },
  {
    slug: 'restaurantes',
    nombre: 'Restaurantes y Hostelería',
    eyebrow: 'Sector · Restaurantes y Hostelería',
    h1: 'La reserva que se pierde',
    h1Accent: 'porque nadie coge el teléfono',
    intro: 'En hora punta suena el teléfono y no hay quien lo coja: estáis en plena sala. Esa llamada era una mesa de cuatro un sábado, y se ha ido al de enfrente. Y ni te enteras de cuántas pierdes, porque nunca llegaron a hablar contigo.',
    dolores: [
      { titulo: 'El teléfono en pleno servicio', texto: 'Cada llamada en hora punta obliga a soltar una mesa. Y si no se coge, salta al buzón y esa reserva se va a otro sitio.' },
      { titulo: 'No sabes cuántas pierdes', texto: 'Las reservas que no llegan a hablar contigo no dejan rastro. Es dinero que se cae sin que te enteres.' },
      { titulo: 'La nota de Google', texto: 'El 90% de la gente mira las opiniones antes de elegir dónde comer. Subir una estrella se traduce en un 5-9% más de ingresos, y pesa más justo en los locales independientes.' },
    ],
    solucionTitulo: 'Un agente de voz que coge TODAS las llamadas',
    solucion: 'Contesta con voz natural, toma la reserva, la mete en tu libro y te la confirma. 24 horas, incluso cuando el local está cerrado o a tope. Responde también las consultas de siempre (horario, carta, alérgenos, terraza) y después manda un mensaje pidiendo la reseña de Google a quien ha comido bien.',
    retorno: { titulo: 'Sin prometerte humo', texto: 'No te vamos a decir que la IA te sube la facturación un 20% — en tu sector eso es mentira y lo sabes. Lo medible es esto: con un ticket medio de unos 21 € por persona, recuperar 2-3 mesas a la semana que hoy se pierden por teléfono no atendido ya paga el sistema. Y te enseñamos el dato real: cuántas llamadas cogió el agente y cuántas reseñas nuevas tienes.' },
    ganchos: [
      { gancho: 'No pierdas la reserva por no coger el teléfono', problema: 'En hora punta suena el teléfono y no hay quien lo coja: estáis en plena sala. Esa mesa de cuatro un sábado salta al buzón y se va al de enfrente. Ni te enteras de cuántas pierdes.', solucion: 'El agente de voz coge TODAS las llamadas con voz natural, toma la reserva, la mete en tu libro y te la confirma. 24 horas, también cuando el local está cerrado o a tope.', cifra: 'Con ticket medio de ~21 €/persona, recuperar 2-3 mesas a la semana ya paga el sistema.' },
      { gancho: 'Sube tu nota de Google', problema: 'El 90% de la gente mira las opiniones antes de elegir dónde comer. Si tu nota es floja o tienes pocas reseñas, el que busca "restaurante cerca" pasa de largo.', solucion: 'Después del servicio, el agente manda un mensaje pidiendo la reseña de Google a quien ha comido bien. Más reseñas y mejor nota = subes en el mapa.', cifra: 'Subir una estrella en Google se traduce en un 5-9% más de ingresos (estudio de Harvard), y pesa más en locales independientes.' },
      { gancho: 'Reduce las mesas que no aparecen', problema: 'Las reservas que no se presentan (no-show) te dejan la mesa vacía en plena noche fuerte. En temporada alta las ausencias suponen entre el 5% y el 20% de la facturación.', solucion: 'El agente manda confirmaciones automáticas de la reserva y recordatorios el mismo día, para que el cliente confirme o libere la mesa a tiempo.', cifra: 'Cada mesa que se libera a tiempo se puede volver a vender esa misma noche.' },
    ],
    agentes: [
      { nombre: 'Agente de reservas', desc: 'Coge todas las llamadas y gestiona reservas 24/7.' },
      { nombre: 'Consultas automáticas', desc: 'Horario, carta, alérgenos, ubicación al momento.' },
      { nombre: 'Más reseñas de Google', desc: 'Pide la opinión a quien comió bien, para subir en el mapa.' },
    ],
    objecion: {
      pregunta: '"Mis clientes quieren hablar con una persona, y a mí los números apenas me dan para otra cuota."',
      respuesta: 'Compáralo con lo que tienes hoy: en hora punta esa llamada no la coge nadie, el cliente ya habla con un buzón y se va. La pregunta no es "máquina o camarero", es "máquina o reserva perdida". Y sobre la cuota: no te pido fe, te pido que mires el dato — a fin de mes te enseño cuántas llamadas que se iban a perder cogió el agente. Si no te salen las cuentas con tu ticket medio, lo dejamos.',
    },
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
    retorno: { titulo: 'Empezamos por lo que más te duele', texto: 'En el diagnóstico gratuito de 30 minutos vemos tu operativa real y ponemos número a lo que se va en tareas mecánicas. No pagas por tecnología: pagas por horas recuperadas y trabajo que deja de caerse. Si no vemos un retorno claro, te lo decimos.' },
    ganchos: [
      { gancho: 'Que no se pierda ninguna llamada ni mensaje', problema: 'Cada llamada que no coges y cada WhatsApp que tardas en contestar es un cliente que se va a otro. Y tu equipo no puede estar pendiente del teléfono y trabajando a la vez.', solucion: 'Un agente de voz o WhatsApp atiende, informa, cualifica y agenda 24/7, por el canal que use tu cliente. Nadie se queda sin respuesta.', cifra: 'Atención inmediata a cualquier hora, sin sumar una persona a la nómina.' },
      { gancho: 'Quítale a tu equipo el papeleo', problema: 'Gente cualificada dedicando horas a leer facturas, copiar datos, rellenar formularios y mover documentos de un lado a otro. Trabajo de máquina que agota a tu plantilla.', solucion: 'La IA lee documentos, extrae los datos y los deja donde tienen que ir —tu Excel, tu contabilidad, tu CRM— sin que nadie teclee. Tu equipo valida, no transcribe.', cifra: 'Hasta un 90% menos de tiempo en extraer datos de documentos.' },
      { gancho: 'Que el seguimiento no dependa de la memoria', problema: 'Plazos, recordatorios, clientes a los que hay que volver a llamar. Si depende de que a alguien no se le olvide, se cae, y se cae dinero con ello.', solucion: 'El sistema hace el seguimiento solo: avisa de plazos, recuerda a los clientes y reactiva a los que llevan tiempo sin comprar. Sin post-its ni "se me pasó".', cifra: 'Cero clientes perdidos por un seguimiento que nadie llegó a hacer.' },
    ],
    agentes: [
      { nombre: 'Diagnóstico gratuito', desc: '30 minutos para ver qué se puede automatizar en tu negocio.' },
      { nombre: 'Agente a medida', desc: 'El que encaja con tu operativa real, no un genérico.' },
      { nombre: 'Integración sin obras', desc: 'Se conecta a lo que ya usas, sin cambiar tu forma de trabajar.' },
    ],
    objecion: {
      pregunta: '"Mi negocio es muy particular, no creo que un agente encaje en lo que hago."',
      respuesta: 'Justo por eso no revendemos plantillas. No te adaptamos a un software: diseñamos el agente alrededor de tu forma de trabajar. Si tienes una tarea que se repite cada día, se puede automatizar. Y si en el diagnóstico vemos que no compensa, te lo decimos claro — preferimos no venderte a venderte humo.',
    },
    cierre: 'Absorbes más volumen sin ampliar plantilla, y tu equipo se dedica a lo que sí necesita cabeza.',
  },
]

export function getSector(slug: string): Sector | undefined {
  return SECTORES_PAGINAS.find((s) => s.slug === slug)
}
