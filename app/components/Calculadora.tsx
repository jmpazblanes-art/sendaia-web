"use client"

import { useState } from 'react'
import { track } from '@/lib/website-events'

// Calculadora de automatización. Misma cuenta que la de la web anterior
// (reubicada el 06-oct-2026): horas por persona y semana, 4,3 semanas al mes y una
// reducción del 75 % del tiempo en procesos repetitivos. Es una ESTIMACIÓN, y así
// se dice en pantalla.
function Control({ etiqueta, valor, texto, ayuda, min, max, onChange }: { etiqueta: string; valor: string; texto: number; ayuda: string; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={etiqueta} className="text-sm font-semibold text-azul">{etiqueta}</label>
        <span className="rounded-full bg-azul px-3 py-1 font-mono text-xs font-bold text-roto">{valor}</span>
      </div>
      <input
        id={etiqueta}
        type="range"
        min={min}
        max={max}
        step={1}
        value={texto}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-azul/15 accent-[#A8633C]"
      />
      <p className="mt-1.5 text-xs text-grafito-suave">{ayuda}</p>
    </div>
  )
}

export default function Calculadora() {
  const [horas, setHoras] = useState(15)
  const [costeHora, setCosteHora] = useState(20)
  const [personas, setPersonas] = useState(2)

  const horasTotalesMes = Math.round(horas * personas * 4.3)
  const horasAhorradasMes = Math.round(horasTotalesMes * 0.75)
  const ahorroAnual = Math.round(horasAhorradasMes * costeHora) * 12

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="space-y-8">
        <Control etiqueta="Horas por semana en tareas repetitivas" valor={`${horas} h / semana`} texto={horas} min={5} max={40} onChange={setHoras} ayuda="Facturas, emails, albaranes, llamadas y seguimiento." />
        <Control etiqueta="Personas en el equipo" valor={`${personas} ${personas === 1 ? 'persona' : 'personas'}`} texto={personas} min={1} max={10} onChange={setPersonas} ayuda="Personal que dedica parte de su jornada a gestión." />
        <Control etiqueta="Coste medio por hora" valor={`${costeHora} € / hora`} texto={costeHora} min={12} max={50} onChange={setCosteHora} ayuda="Coste de empresa por hora trabajada." />
      </div>

      <div className="sobre-azul flex flex-col justify-between rounded-[2rem] bg-azul p-8 text-roto sm:p-10">
        <div>
          <p className="eyebrow">Tiempo que podrías recuperar</p>
          <p className="mt-3 font-display text-6xl font-semibold" aria-live="polite">
            +{horasAhorradasMes} <span className="text-2xl text-roto/80">horas / mes</span>
          </p>
          <p className="mt-2 text-sm text-roto/70">Equivale a liberar unos {Math.round(horasAhorradasMes / 8)} días laborables completos al mes.</p>

          <div className="mt-8 border-t border-roto/15 pt-8">
            <p className="eyebrow">Ahorro económico anual estimado</p>
            <p className="mt-3 font-display text-4xl font-semibold" aria-live="polite">
              ~{ahorroAnual.toLocaleString('es-ES')} <span className="text-xl text-roto/80">€ / año</span>
            </p>
            <p className="mt-2 text-sm text-roto/70">
              Estimación orientativa, basada en una reducción del 75 % del tiempo en procesos repetitivos. El diagnóstico concreta cuánto es en tu caso.
            </p>
          </div>
        </div>

        <a
          href="#contacto"
          data-cta="calculadora_roi"
          onClick={() => track('cta_click', { cta: 'calculadora_roi', horas: horasAhorradasMes })}
          className="btn btn-cobre mt-10 w-full"
        >
          Recuperar estas {horasAhorradasMes} h/mes
        </a>
      </div>
    </div>
  )
}
