# GEMINI.md — Contexto y Memoria del Proyecto SendaIA Web

Este archivo proporciona contexto persistente, reglas arquitectónicas y un registro de las mejoras realizadas para Gemini en el proyecto `sendaia-web`.

---

## 🏛️ 1. Arquitectura y Stack Tecnológico
- **Framework**: Next.js 16 (App Router con Turbopack).
- **Lógica & UI**: React 19, TypeScript 5, Tailwind CSS v4, Lucide React.
- **Animaciones & Motion**: GSAP 3 (ScrollTrigger, SplitText, @gsap/react), Framer Motion.
- **Integraciones**:
  - **Aria Chatbot**: Backend centralizado en `https://whatsapp-sendaia.vercel.app/api/chat-web`.
  - **Agente de Voz**: Retell Web SDK (`retell-client-js-sdk`) conectado a `/api/voice`.
  - **Tracking & CRM**: `/api/site-event` y `/api/contact` conectados a Supabase / CRM.
- **Fuentes tipográficas**:
  - `Fraunces` (Headlines editoriales serif).
  - `Manrope` (Texto base sans).
  - `Caveat` (Eslogan manuscrito *«Tú disfrutas.»*).

---

## 🔴 2. Reglas Clave del Repositorio (Ver `CLAUDE.md`)
1. **Trabajo directo en `main`**: Todo el trabajo se realiza directamente en `main` o se fusiona el mismo día en que se despliega.
2. **Cero ramas huérfanas**: No dejar ramas de desarrollo desfasadas con despliegues independientes en Vercel.
3. **Verificación visual en navegador real**: Antes de dar por bueno un deploy, verificar WhatsApp, Aria, voz y layout en navegador real (no solo HTTP 200).
4. **Pre-push hook**: Comprobación obligatoria de TypeScript y build antes de subir a remoto.

---

## 🚀 3. Principales Mejoras Realizadas (Sesión 2026-08-19)

### A. Conversión y Captación (CRO & SEO)
- **Calculadora Interactiva de ROI (`#calculadora`)**:
  - Sliders para horas semanales, tamaño del equipo y coste/hora.
  - Cálculo dinámico en tiempo real de horas recuperadas al mes y ahorro económico anual.
  - Enlaces de salto directo en el menú móvil y en la barra de navegación de escritorio.
- **Micro-Bocadillo Gancho en Aria**:
  - Tooltip flotante animado tras 4.5 segundos para convertir visitantes pasivos en conversaciones activas.
- **Canal Dual de WhatsApp**:
  - Botón de WhatsApp directo en el formulario de contacto para usuarios que prefieren mensajería instantánea.
  - Enlaces de WhatsApp con mensajes pre-rellenados por sector en las 6 páginas (`/sectores/...`).
- **Schema SEO `FAQPage`**:
  - Microdatos enriquecidos en `app/layout.tsx` para potenciar snippets en Google y respuestas en motores de IA (ChatGPT Search, Perplexity).

### B. Mobile & Experiencia de Usuario
- **Scroll suave con `scroll-padding-top`**: Evita que los anclajes del menú móvil queden ocultos detrás del navbar fijo.
- **Prevención de auto-zoom en iOS Safari**: Ajustados los inputs a `text-base sm:text-sm`.
- **Ajuste simétrico del modal de chat**: Optimizado para pantallas móviles compactas.

### C. Limpieza y Optimización del Repositorio
- Eliminado el endpoint muerto `app/api/chat/route.ts`.
- Limpieza total de ramas viejas locales y remotas (`feat/gsap-premium`, `feat/hero-3d`, `feat/logo-3d`, `feat/tracking-web`, `codex/sendaia-web-story-ads`, `fix/auditoria-a`).
- Integrado enlace y schema de Facebook (`sameAs`).
