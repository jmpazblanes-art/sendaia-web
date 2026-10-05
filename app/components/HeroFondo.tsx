// Fondo del hero: pared azul con textura de yeso (05-oct-2026).
// El azul plano quedaba soso; se probaron grietas de cobre y no convencieron,
// así que se queda la pared sola: manchas suaves (el grano lo pone
// la clase .sobre-azul, igual que en el resto de la web), un foco de luz
// arriba a la derecha y el pie más oscuro. SVG generado aquí, sin imágenes.
// Solo decoración: no recibe clics ni lo leen los lectores de pantalla.
export default function HeroFondo() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="pared-manchas" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves={3} seed={7} />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.9 0 0 0 -0.32" />
          </filter>
          <radialGradient id="pared-luz" cx="78%" cy="20%" r="75%">
            <stop offset="0" stopColor="#2A6278" stopOpacity="0.85" />
            <stop offset="1" stopColor="#173A4A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pared-pie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.55" stopColor="#102B37" stopOpacity="0" />
            <stop offset="1" stopColor="#102B37" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#pared-luz)" />
        <rect width="1440" height="900" filter="url(#pared-manchas)" opacity="0.1" />
        <rect width="1440" height="900" fill="url(#pared-pie)" />
      </svg>
    </div>
  )
}
