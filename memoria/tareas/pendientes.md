# Tareas pendientes — sendaia.es

> Última actualización: 2026-08-03

## 🟡 Importante
- [ ] Que Pachi abra sendaia.es en su móvil y confirme el menú lateral y el botón "Ver cómo funciona" · avisar a Ana de que está arreglado
- [ ] Decidir si `/api/chat` (endpoint viejo de Aria, gpt-4o-mini) se borra. Ya no lo usa Aria; comprobar antes si lo llama algo más · `app/api/chat/route.ts`

## 🟢 Menor
- [ ] Revisar el resto de la web en móvil con el mismo método (medir si los CTA caen dentro de pantalla), no solo el hero

## ✅ Hecho hoy (2026-08-03)
- [x] ~~Menú de secciones en móvil~~ **HECHA** — panel lateral, verificado pulsando "Casos" en iPhone real
- [x] ~~"Ver cómo funciona" no respondía~~ **ARREGLADA** — caía 66px fuera de pantalla; hero compactado en móvil
- [x] ~~"Activar sonido" tapaba el CTA~~ **ARREGLADA** — movido a la esquina superior en móvil
- [x] ~~Aria con el cerebro del agente~~ **HECHA** — verificado por red + regla de precios aguanta
