# Tareas pendientes — sendaia.es

> Última actualización: 2026-09-04

## 🟡 Importante
- [ ] Cambiar "Valorar en Google" por el enlace directo al formulario de reseña · `app/page.tsx:1212` — hoy apunta a una búsqueda en Maps (`maps/search/?api=1&query=SendaIA+Granada`) y el usuario tiene que encontrar la ficha, entrar y bajar hasta "Escribir reseña". El directo es `g.page/r/<ID>/review`. **BLOQUEADO**: Pachi debe sacar el <ID> del perfil de empresa de Google.
- [ ] Que Pachi abra sendaia.es en su móvil y confirme el menú lateral y el botón "Ver cómo funciona" · avisar a Ana de que está arreglado

## 🟢 Menor
- [ ] Subir la calculadora justo después del bloque "El problema real" y poner un CTA de contacto ahí mismo · `app/page.tsx` — hoy hay 13 secciones y 19.590 px de scroll en móvil antes del formulario, y la calculadora (que le enseña al visitante SU número) es el mejor momento de venta.
- [ ] Aligerar los originales del repo · `public/images/` — `logo.png` pesa 2,0 MB y `dashboard.png` 1,7 MB (Next los optimiza al servir, pero inflan repo y deploys). Además hay 3 `.mp4` dentro de `public/images/` (mover a `public/videos/`; `ecomerece.mp4` tiene errata en el nombre) y una carpeta `backup-2026-07-06` subida al repo.
- [ ] Registrar las horas de la sesión del 17-ago en `/horas` (no cronometradas en vivo)

## ℹ️ Para saber, no es tarea
- Del CRM: **53 de 80 clientes no tienen email**. No es un bug, pero con el UNIQUE sobre `clients.email` conviene tenerlo presente.

## ✅ Hecho 2026-09-04 — auditoría completa de sendaia.es y sus arreglos
- [x] ~~El formulario perdía el lead de quien YA estaba en el CRM~~ **ARREGLADO Y VERIFICADO EN PRODUCCIÓN** — `clients_email_key` es UNIQUE: el 2º mensaje de la misma persona daba 23505 → 500 → "Error al enviar" y el mensaje se perdía. Ahora entra como nota en su historial. Probado con un cliente simulado `status:active` + notas: la ficha NO se degrada, no se pisa nombre/teléfono/empresa y no se reenvía la bienvenida. CRM `1ac72df`
- [x] ~~La nota del lead repetido se perdía en silencio~~ **ARREGLADO** — bug que introduje yo: `category:'integration'` lo rechaza el CHECK de `lead_notes` (solo general|call|meeting|technical|closing); devolvía 200 sin guardar. Ahora 'general' + log si falla. CRM `8e505ea`
- [x] ~~`/api/contact` aceptaba `{}` vacío y emails inválidos con 200~~ **ARREGLADO Y VERIFICADO EN PRODUCCIÓN** — creaba fichas basura y disparaba correos de bienvenida reales por Resend. Ahora validación en servidor + honeypot + timeout, y si el CRM falla el lead queda en los logs marcado RESCATAR A MANO en vez de evaporarse. Web `7ef61c3`
- [x] ~~Sin freno contra bucles en los webhooks públicos~~ **PUESTO Y VERIFICADO** — `lib/rate-limit.ts` compartido: webform 10/min por IP + tope de 32 KB; widget-incidencia 5/min. En local: peticiones 1-9 → 200, de la 10ª → 429. CRM `f8c4329`
- [x] ~~Móvil descargaba 4,35 MB, el 92% en el robot de fondo~~ **ARREGLADO — 4,35 MB → 0,77 MB (-82%)** — los 73 frames se precargaban en todos los dispositivos; ahora ninguno en móvil, con `prefers-reduced-data` ni `reduced-motion`. En escritorio sigue igual (canvas verificado pintando). Web `a8201a4`
- [x] ~~Google leía el H1 como "semanacon Agentes de IA"~~ **ARREGLADO** — faltaba un espacio antes del `<br>`. Web `a8201a4`
- [x] ~~"Activar sonido" tapaba el badge en móvil y escondía "Granada"~~ **ARREGLADO** — ⚠️ OJO: el 03-ago se subió a `top-24` porque abajo se comía "Ver cómo funciona". Ahora se **oculta en móvil** (allí no silencia nada: el vídeo del hero solo se monta con `isDesktop`), lo que resuelve las dos colisiones. **NO devolverlo a `bottom-8` en móvil.** Web `a8201a4`

## ✅ Hecho 2026-08-19
- [x] ~~Enlace a Facebook en footer + Schema SEO (`sameAs`)~~ **APLICADO** — Del stash a main, verificado en build
- [x] ~~Borrar endpoint obsoleto `/api/chat`~~ **ELIMINADO** — Ya no se usaba (Aria usa whatsapp-sendaia)
- [x] ~~Limpieza total de ramas viejas locales y remotas~~ **HECHA** — Eliminadas `feat/gsap-premium`, `feat/hero-3d`, `feat/logo-3d`, `feat/tracking-web`, `codex/sendaia-web-story-ads`, `fix/auditoria-a`. Solo queda `main`.
- [x] ~~Auditoría y optimización de móvil~~ **COMPLETADA** — Añadido `scroll-padding-top` en CSS para que los anclajes del menú móvil no queden tapados por el navbar fijo; ajustado tamaño de fuente en inputs de formulario y chat (`text-base sm:text-sm`) para evitar el auto-zoom molesto de iOS Safari; ajustado ancho y márgenes simétricos del modal de Aria en pantallas estrechas.
- [x] ~~4 disparadores de conversión y captación (CRO & SEO)~~ **IMPLEMENTADO Y VERIFICADO EN NAVEGADOR** — (1) CalculadoraROI interactiva en vivo con sliders dinámicos; (2) Micro-bocadillo gancho de Aria flotante tras 4s; (3) Canal dual de WhatsApp directo en formulario y en páginas de sector con prefill; (4) Schema SEO `FAQPage` enriquecido para Google y motores de IA.
- [x] ~~Sección de Opiniones y Captación de Reseñas (`#opiniones`)~~ **IMPLEMENTADO Y VERIFICADO EN NAVEGADOR** — Tarjetas de testimonios con 5 estrellas, badge de puntuación 5.0 verificado, botón directo a reseñas de Google y modal interactivo para enviar testimonios desde la propia web conectado al CRM/Supabase. Schema `AggregateRating` en `layout.tsx`.

## ✅ Hecho 2026-08-17
- [x] ~~sendaia.es servía una versión de mayo, sin WhatsApp/Aria/voz~~ **ARREGLADO** — `main` (desactualizada 3 meses) pisaba en silencio el deploy bueno del 3-ago; fusionada `fix/auditoria-a` → `main`, verificado en navegador real con capturas
- [x] ~~Sin guardarraíl si vuelve a divergir~~ **MONTADO Y VERIFICADO** — GitHub Action diario + en cada push que compara producción contra main y avisa por Telegram si falta algo. Run `32029351689` en verde (success), 17-ago 12:20
- [x] ~~Regla de "no dejar ramas sueltas sin fusionar"~~ **DOCUMENTADA** — `CLAUDE.md` nuevo en la raíz del repo

## ✅ Hecho 2026-08-03
- [x] ~~Menú de secciones en móvil~~ **HECHA** — panel lateral, verificado pulsando "Casos" en iPhone real
- [x] ~~"Ver cómo funciona" no respondía~~ **ARREGLADA** — caía 66px fuera de pantalla; hero compactado en móvil
- [x] ~~"Activar sonido" tapaba el CTA~~ **ARREGLADA** — movido a la esquina superior en móvil
- [x] ~~Aria con el cerebro del agente~~ **HECHA** — verificado por red + regla de precios aguanta
