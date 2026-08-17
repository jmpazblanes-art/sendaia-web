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
