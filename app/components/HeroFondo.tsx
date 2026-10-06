// Luz del hero (06-oct-2026). La pared (estuco) la pone la clase .sobre-azul en
// la propia sección, igual que en el resto de la web; aquí solo va la luz: un
// foco arriba a la derecha, fundido con la pared para no tapar el relieve, y el
// pie algo más oscuro. Las grietas de cobre se probaron y se descartaron.
// Solo decoración: no recibe clics ni lo leen los lectores de pantalla.
export default function HeroFondo() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: 'screen',
          background: 'radial-gradient(60% 70% at 78% 18%, rgba(46,110,136,0.6) 0%, rgba(23,58,74,0) 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(16,43,55,0) 55%, rgba(16,43,55,0.6) 100%)' }}
      />
    </div>
  )
}
