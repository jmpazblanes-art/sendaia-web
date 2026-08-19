# Tareas pendientes — sendaia.es

> Última actualización: 2026-08-19

## 🟡 Importante
- [ ] Que Pachi abra sendaia.es en su móvil y confirme el menú lateral y el botón "Ver cómo funciona" · avisar a Ana de que está arreglado

## 🟢 Menor
- [ ] Registrar las horas de la sesión del 17-ago en `/horas` (no cronometradas en vivo)

## ✅ Hecho hoy (2026-08-19)
- [x] ~~Enlace a Facebook en footer + Schema SEO (`sameAs`)~~ **APLICADO** — Del stash a main, verificado en build
- [x] ~~Borrar endpoint obsoleto `/api/chat`~~ **ELIMINADO** — Ya no se usaba (Aria usa whatsapp-sendaia)
- [x] ~~Limpieza total de ramas viejas locales y remotas~~ **HECHA** — Eliminadas `feat/gsap-premium`, `feat/hero-3d`, `feat/logo-3d`, `feat/tracking-web`, `codex/sendaia-web-story-ads`, `fix/auditoria-a`. Solo queda `main`.
- [x] ~~Auditoría y optimización de móvil~~ **COMPLETADA** — Añadido `scroll-padding-top` en CSS para que los anclajes del menú móvil no queden tapados por el navbar fijo; ajustado tamaño de fuente en inputs de formulario y chat (`text-base sm:text-sm`) para evitar el auto-zoom molesto de iOS Safari; ajustado ancho y márgenes simétricos del modal de Aria en pantallas estrechas.

## ✅ Hecho 2026-08-17
- [x] ~~sendaia.es servía una versión de mayo, sin WhatsApp/Aria/voz~~ **ARREGLADO** — `main` (desactualizada 3 meses) pisaba en silencio el deploy bueno del 3-ago; fusionada `fix/auditoria-a` → `main`, verificado en navegador real con capturas
- [x] ~~Sin guardarraíl si vuelve a divergir~~ **MONTADO Y VERIFICADO** — GitHub Action diario + en cada push que compara producción contra main y avisa por Telegram si falta algo. Run `32029351689` en verde (success), 17-ago 12:20
- [x] ~~Regla de "no dejar ramas sueltas sin fusionar"~~ **DOCUMENTADA** — `CLAUDE.md` nuevo en la raíz del repo

## ✅ Hecho 2026-08-03
- [x] ~~Menú de secciones en móvil~~ **HECHA** — panel lateral, verificado pulsando "Casos" en iPhone real
- [x] ~~"Ver cómo funciona" no respondía~~ **ARREGLADA** — caía 66px fuera de pantalla; hero compactado en móvil
- [x] ~~"Activar sonido" tapaba el CTA~~ **ARREGLADA** — movido a la esquina superior en móvil
- [x] ~~Aria con el cerebro del agente~~ **HECHA** — verificado por red + regla de precios aguanta
