# QA de sendaia.es — cómo comprobar que la web está en orden

Dos scripts de Playwright (Node) que miran la web como un visitante real. Se escribieron el 06/10/2026 durante el rediseño y se usaron antes de cada paso a producción.

## Cómo se ejecutan
```bash
# Playwright no es dependencia de la web (a propósito: tocar package.json dispara un build).
# Usa uno que ya tengas instalado y dile dónde está:
export PLAYWRIGHT_PATH=/ruta/a/node_modules/playwright   # o instálalo donde prefieras

node scripts/qa/qa-rutas.cjs         https://sendaia.es 99   # rutas + metadatos
node scripts/qa/qa-interacciones.cjs https://sendaia.es 98   # voz, Aria, WhatsApp, calculadora, vídeo, móvil
```
El segundo número es un prefijo para los nombres de las capturas, que van a `$CAPTURAS` (por defecto `~/.claude/capturas/sendaia-web/`). **Nunca dentro del repo.** Para probar una *preview*, pasa su URL en lugar de `https://sendaia.es`.

## Qué comprueban
- **`qa-rutas.cjs`**: las 18 páginas dan 200, título (sin «· SendaIA · SendaIA» duplicado), canónica, imagen para compartir propia, migas de pan y cero errores de JavaScript. Descarga cuatro tarjetas sociales y comprueba que son PNG.
- **`qa-interacciones.cjs`**: voz, Aria y WhatsApp en `/agentes`; la calculadora reacciona; el vídeo mp4 NO se descarga hasta pulsar; el modal de opiniones abre; el CTA de la cabecera; los enlaces del pie; el sitemap; la tarjeta social; y las 10 páginas principales en móvil (iPhone 13) sin desborde horizontal ni errores.

## ⚠️ Efectos secundarios (léelo antes de lanzarlos en bucle)
| Qué hace | Consecuencia |
|---|---|
| Pulsa «Probar agente de voz» y cuelga | Pide un token a Retell y arranca una llamada de unos segundos: **gasta un poco de saldo de Retell** |
| Escribe un mensaje a Aria | Queda guardado como una conversación `web:<sesión>` en el agente de WhatsApp (su Supabase) |
| Abre vídeos / demos | Ninguna |
| NO envía el formulario de diagnóstico | Ese se prueba aparte: ver `AGENTS.md` y Notion («Cómo probar el formulario») |

No los lances en bucle contra producción (regla de costes de Pachi) y **no consultes Google con un navegador automático**: te pide «No soy un robot» y esa comprobación no se salta.

## Rendimiento (Lighthouse en local)
PageSpeed Insights sin clave da «quota exceeded». Usa el Chromium de Playwright:
```bash
CHROME_PATH="<ruta al Chromium de Playwright>" npx -y lighthouse@12 https://sendaia.es/ \
  --quiet --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=/tmp/lh.json \
  --only-categories=performance,accessibility,seo,best-practices
```
En macOS no existe `timeout`. Lighthouse **simula** el móvil: el LCP «real» (CPU x4 y 4G lenta) fue de 1,2 s cuando Lighthouse daba 2,7–3,9 s. No optimices a ciegas con la cifra simulada. Las *previews* de Vercel van como `noindex`, así que su SEO sale bajo (69): en producción es 100.

## Estado medido el 06/10/2026 (producción)
Lighthouse móvil de la home: rendimiento 96 · accesibilidad 100 · buenas prácticas 100 · SEO 100. 22 URLs en 200. Voz entregando token. Sin errores de servidor desde la recarga de Retell.
