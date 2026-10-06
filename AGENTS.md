# sendaia-web — reglas de este repo

## 🔴 REGLA DURA: nada de ramas viviendo semanas fuera de main

**Origen (17-ago-2026):** `main` estuvo desactualizada desde el 22-may hasta el
12-ago (3 meses) mientras TODO el trabajo real —WhatsApp con contexto, Aria con
cerebro, vídeos optimizados, RGPD, SEO— vivía y se desplegaba directamente desde
`fix/auditoria-a`. El 11-ago alguien volvió a desplegar `main` (vieja) y pisó en
silencio la versión buena en producción. Pachi vio la web "rota": sin WhatsApp,
sin Aria, sin agente de voz. HTTP 200 todo el rato — por eso nadie lo notó antes.
Ver [[bug_sendaia_web_main_desincronizada_pisaba_produccion]] en el cerebro.

**Causa raíz: no fue una decisión de Pachi.** Fue que cada sesión que tocaba la
web seguía currando en `fix/auditoria-a` en vez de fusionar a `main` al terminar.

### A partir de ahora:
1. **Todo el trabajo se hace en `main` directamente**, o en una rama que se
   fusiona a `main` EL MISMO DÍA que se despliega a producción. Nunca dejar una
   rama con deploys de producción propios viviendo días/semanas sin fusionar.
2. **Antes de desplegar o dar por buena la web**, comprobar que `main` local
   está al día con lo último bueno:
   ```bash
   git fetch origin
   git log origin/main --oneline -1
   git log origin/fix/auditoria-a --oneline -1   # si esta rama sigue existiendo
   ```
   Si `main` va por detrás de la rama de trabajo → fusionar ANTES de tocar nada más.
3. **Antes de reportar "la web está bien"**: verificar en navegador real
   (WhatsApp, Aria, agente de voz, vídeos) — no basta con HTTP 200. Un deploy
   de código antiguo también da 200.
4. Ramas viejas sueltas que hay que limpiar o fusionar cuando se retomen:
   `feat/gsap-premium`, `feat/hero-3d`, `feat/logo-3d`, `feat/tracking-web`,
   `codex/sendaia-web-story-ads`. Si alguna de estas se llega a desplegar por
   error, puede repetir el mismo incidente.

## 🎬 Animaciones — GSAP
`package.json` usa `gsap` + `@gsap/react`. Al retomar `feat/gsap-premium` o
tocar cualquier animación (scroll, hero, transiciones), invocar las skills
globales `gsap-core`/`gsap-react`/`gsap-scrolltrigger` según el caso — no usar
solo `framer-motion` a mano cuando ya hay GSAP en el stack.

## Rediseño «Sistemas que trabajan» — bloque 1 en producción (05/10/2026)

Commit `3b6fc29` en `main`. Encargo de Pachi con prompt maestro: la web deja de ser un catálogo y pasa a ser un escaparate de los tres agentes (voz, WhatsApp, Aria).

**Qué hay**
- Identidad: azul profundo `#173A4A`, piedra `#E8E1D8`, blanco roto `#FAF8F5`, cobre `#B8734A`, grafito `#2A2A2A`. Tokens en `app/globals.css` (`--azul`, `--cobre`…) y clases `bg-azul`, `text-cobre`… Los botones usan `--cobre-boton` (`#A8633C`) por contraste. Textura de pared en toda la web: clases `.sobre-azul` / `.pared-azul` (grano claro) y `.lienzo` (grano oscuro).
- Logo en SVG: `app/components/Logo.tsx`, trazado sobre `public/images/logo.png` (misma molécula, texto Helvetica Bold en contornos). No rediseñar: solo cambia el color.
- Home nueva `app/page.tsx`: hero · agentes · demos por negocio + demo de facturas · escenario del sistema · caso de climatización (anónimo) · pasos · diagnóstico.
- `app/components/SistemaScroll.tsx`: sección fija que se dibuja con el scroll (sustituye al robot). Sin librerías.
- `app/components/HeroFondo.tsx`: pared con luz. **Las grietas de cobre se probaron y Pachi las descartó** («quedan mal»): no reintroducirlas.

**Lo que NO se toca (integraciones)**
- `app/components/AssistantDock.tsx` (voz Retell + chat Aria) y `ContactForm.tsx` son la lógica de la home anterior movida tal cual. Las tarjetas de la home los disparan con eventos de ventana: `sendaia:voz`, `sendaia:aria`; el dock avisa del estado con `sendaia:voz-estado`.
- En móvil el botón de voz marca `tel:+34858215026` (cambio de Gemini, commit `b72416a`).
- WhatsApp: `34627256996` es el número del AGENTE (Cloud API). Constantes exportadas en `app/WhatsAppButton.tsx`.
- La home anterior está entera en `app/_legacy/HomeLegacy.tsx` (no enrutada). De ahí salen calculadora, servicios, opiniones y desarrollo web. No borrar hasta reubicarlo.

**Previews**: una rama nueva necesita `RETELL_API_KEY` y `RETELL_AGENT_ID` en el entorno Preview de ESA rama (`vercel env add … preview <rama>`), o la voz da 500. `CRM_WEBHOOK_SECRET` solo está en Production: en preview el formulario no llega al CRM.

## Bloque 2 — páginas interiores (06/10/2026)

Rutas nuevas, todas estáticas y en el sitemap: `/agentes`, `/automatizaciones`, `/demos`, `/demos/facturas`, `/casos-reales`, `/sendaia`, `/soluciones`, `/calculadora`. Menú y pie apuntan a ellas (`NAVEGACION` en `SiteHeader.tsx`). Ninguna URL anterior desaparece (`/sectores/*`, legales y `/demo/facturas` siguen).

- **Armazón común**: `app/components/Pagina.tsx` (`PaginaInterior`, `Hero`, `Titular`, `CtaDiagnostico`). Cada página interior lleva su propio formulario (`id="contacto"`), así que su cabecera enlaza a `#contacto`; la home y los sectores usan `/#contacto`.
- **Contenido compartido**: `app/components/datos.ts` (pasos, demos, casos, pilares, sectores, helper `meta()` para título/canónica/OG). Los casos están **en anónimo** y sin cifras nuevas; «cómo funciona» sale de lo ya publicado. No inventar métricas.
- **Opiniones** (Google + opinión directa) y **calculadora** se han reubicado desde `app/_legacy/HomeLegacy.tsx` (`Opiniones.tsx`, `Calculadora.tsx`). Misma lógica y misma cuenta (75 %, 4,3 semanas/mes); se rotula como estimación.
- **Demo de facturas**: `/demos/facturas` incrusta la app existente (`demo-pedidos-legumbre-espino.vercel.app`, datos simulados). `/demo/facturas` (redirect de `next.config.ts`) sigue funcionando.
- **Desarrollo web** vive en `/soluciones` (complemento, no centro). No está en el menú.
- **Tarjeta social** `app/opengraph-image.tsx`: azul + cobre, con el logo desde `Logo.tsx` (que exporta sus datos). Las páginas heredan esa imagen.
- **Tracking**: `HomeEfectos seccion=…` manda `page_view` por página y cuenta cualquier `data-cta`. Eventos de demos: `demo_video` (+ `demo`), `voz_probar`, `aria_hablar`, `whatsapp_abrir`, `demo_facturas*`, `casos_*`, `calculadora_roi`.

### Efecto pared (decisión de Pachi, 06/10)
Textura mineral tipo estuco / microcemento fino, **muy sutil: «más que se sienta que se vea»**, sin patrón repetido, con variaciones mínimas de tono y profundidad; aire de consultora premium con dirección de arte arquitectónica. Es **opt-in**: clases `.pared` (sobre piedra / blanco roto) y `.pared-azul` (sobre azul) en `globals.css`, pensadas para cabeceras, zonas editoriales y pie. **Las zonas con agentes, demos, formularios, calculadora y el escenario del sistema van limpias.** No volver a la versión marcada del 05/10 (estuco con relieve) ni a las grietas de cobre.

**Pendiente**
- Imagen propia por página al compartir (hoy todas heredan la del sitio).
- Rediseño de fondo de las páginas de sector y legales (llevan cabecera, pie, paleta y logo nuevos).
- Aircontec: caso en anónimo y sin capturas hasta autorización expresa.
- Este repo NO tiene `vercel.json` con `ignoreCommand`: un commit solo de docs dispara build de producción.

