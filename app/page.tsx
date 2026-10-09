import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  Check,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  Sparkles,
  Stethoscope,
  Wrench,
  Receipt,
} from "lucide-react"
import SiteHeader from "./components/SiteHeader"
import SiteFooter from "./components/SiteFooter"
import AssistantDock from "./components/AssistantDock"
import ContactForm from "./components/ContactForm"
import WhatsAppButton from "./WhatsAppButton"
import SistemaScroll from "./components/SistemaScroll"
import { FOTOS, PASOS } from "./components/datos"
import HeroFondo from "./components/HeroFondo"
import { BotonAria, BotonVoz, BotonWhatsApp, HomeEfectos, IrAAgentes } from "./components/HomeClient"

// PREVIEW: Home estilizada, rapida y directa.
// Mantiene intactos: Hero, los 3 Agentes Vivos y el SistemaScroll (animacion con scroll).
// Convierte Demos y Casos en escaparates compactos que enlazan a sus paginas dedicadas.

export default function Home() {
  return (
    <main className="lienzo">
      <HomeEfectos />
      <SiteHeader />

      {/* ── 1 · HERO ── */}
      <section className="sobre-azul pared-azul relative overflow-hidden bg-azul text-roto">
        <HeroFondo />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28">
          <div>
            <p className="eyebrow">SendaIA · Sistemas con IA para empresas</p>
            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
              Tu empresa no necesita más herramientas.{" "}
              <span className="text-cobre-claro">Necesita sistemas que trabajen.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-roto/80 sm:text-xl">
              Agentes de voz, WhatsApp y automatizaciones conectados a tu negocio para eliminar trabajo manual y
              recuperar tiempo.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <IrAAgentes />
              <a href="#caso" data-cta="hero_casos" className="btn btn-linea">
                Ver casos reales
              </a>
            </div>
            <p className="mt-10 text-sm text-roto/70">Nosotros ponemos los sistemas. Tú disfrutas.</p>
          </div>

          {/* Representacion del sistema trabajando */}
          <div aria-hidden className="hidden lg:block">
            <div className="rounded-3xl border border-roto/15 bg-azul-hondo/80 p-7 shadow-[0_30px_80px_rgba(8,24,32,0.45)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-roto/65">El sistema, trabajando</p>
              <ul className="mt-6 space-y-4">
                {[
                  { I: PhoneCall, entra: "Entra una llamada", hace: "Atendida · cita registrada" },
                  { I: MessageCircle, entra: "Llega un WhatsApp", hace: "Respondido · datos recogidos" },
                  { I: FileText, entra: "Llega una factura", hace: "Leída · asignada a su sitio" },
                  { I: Mail, entra: "Entra un correo", hace: "Clasificado · borrador listo" },
                ].map(({ I, entra, hace }) => (
                  <li key={entra} className="flex items-center gap-4 rounded-2xl bg-roto/[0.05] px-4 py-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-roto/10 text-cobre-claro">
                      <I className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.95rem] font-semibold">{entra}</span>
                      <span className="block text-sm text-roto/70">{hace}</span>
                    </span>
                    <Check className="h-4 w-4 shrink-0 text-cobre-claro" />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-roto/65">
                Sin que nadie de tu equipo tenga que acordarse de hacerlo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · AGENTES VIVOS (Los protagonistas) ── */}
      <section id="agentes" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="aparece max-w-3xl">
            <p className="eyebrow">Ya funcionan</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-azul sm:text-5xl">
              Conoce a los agentes de SendaIA
            </h2>
            <p className="mt-5 text-xl text-grafito-suave">No te contamos lo que pueden hacer. Te dejamos verlo.</p>
          </div>

          {/* Voz: protagonista */}
          <div className="aparece sobre-azul mt-14 grid overflow-hidden rounded-[2rem] bg-azul text-roto lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <p className="eyebrow">Agente de voz</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-[2.6rem]">
                Habla con nuestro agente.
              </h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-roto/80">
                Atiende llamadas, entiende lo que necesita el cliente, consulta información, gestiona citas y registra
                la conversación.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BotonVoz origen="home_agentes" />
                <a href="tel:+34858215026" data-cta="voz_telefono" className="btn btn-linea">
                  <Phone className="h-4 w-4" aria-hidden /> 858 215 026
                </a>
              </div>
              <p className="mt-5 text-sm text-roto/65">
                Desde el ordenador hablas por el micrófono. Desde el móvil, te llama al agente por teléfono.
              </p>
            </div>
            <div className="relative hidden items-center justify-center overflow-hidden bg-azul-hondo/60 p-6 lg:flex">
              <figure className="relative w-full overflow-hidden rounded-2xl border border-roto/15 shadow-xl">
                <Image
                  src={FOTOS.voz.src}
                  alt={FOTOS.voz.alt}
                  width={FOTOS.voz.ancho}
                  height={FOTOS.voz.alto}
                  unoptimized
                  className="block h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-2 right-3 rounded bg-azul/85 px-2 py-0.5 text-[11px] text-roto/75 backdrop-blur-sm">
                  Imagen ilustrativa, generada con IA
                </figcaption>
              </figure>
            </div>
          </div>

          {/* WhatsApp y ARIA */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="aparece flex flex-col rounded-[2rem] bg-piedra p-8 sm:p-12">
              <p className="eyebrow">Agente de WhatsApp</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-azul sm:text-4xl">
                Escríbele como lo haría un cliente.
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-grafito-suave">
                Responde consultas, recoge información, realiza seguimientos y se conecta directamente con tu sistema.
              </p>
              <div className="mt-auto pt-8">
                <BotonWhatsApp origen="home_agentes" />
              </div>
            </div>

            <div className="aparece relative flex flex-col overflow-hidden rounded-[2rem] border border-azul/20 bg-azul p-8 text-roto shadow-sm sm:p-12">
              <Image
                src={FOTOS.oficina.src}
                alt={FOTOS.oficina.alt}
                width={FOTOS.oficina.ancho}
                height={FOTOS.oficina.alto}
                unoptimized
                className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-azul via-azul/90 to-azul/60" />
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-roto/10 text-cobre-claro backdrop-blur-sm">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <p className="eyebrow !text-cobre-claro">Tu guía dentro de SendaIA</p>
              </div>
              <h3 className="relative z-10 mt-5 font-display text-4xl font-semibold tracking-[0.04em] text-roto sm:text-5xl">ARIA</h3>
              <p className="relative z-10 mt-5 text-lg leading-relaxed text-roto/80">
                Cuéntale qué tarea te está quitando tiempo y descubre cómo podría convertirse en un sistema.
              </p>
              <div className="relative z-10 mt-auto pt-8">
                <BotonAria origen="home_agentes" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · ESCAPARATE DE DEMOS (Compacto: 3 tarjetas de impacto sin saturar) ── */}
      <section id="demos" className="scroll-mt-20 bg-piedra py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="aparece max-w-2xl">
              <p className="eyebrow">Laboratorio SendaIA</p>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-azul sm:text-4xl">
                Pruébalo en un entorno real.
              </h2>
              <p className="mt-3 text-lg text-grafito-suave">
                Demostraciones en vivo de cómo los sistemas procesan documentos y captan clientes.
              </p>
            </div>
            <Link
              href="/demos"
              data-cta="home_ver_todas_demos"
              className="inline-flex items-center gap-2 font-bold text-cobre-texto hover:underline shrink-0"
            >
              Ver todas las demos y sectores <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {/* Demo 1: Facturas */}
            <Link
              href="/demos/facturas"
              className="group flex flex-col overflow-hidden rounded-2xl border border-azul/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-azul/5">
                <Image
                  src={FOTOS.facturas.src}
                  alt={FOTOS.facturas.alt}
                  width={FOTOS.facturas.ancho}
                  height={FOTOS.facturas.alto}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-azul/90 text-cobre-claro shadow backdrop-blur-sm">
                  <Receipt className="h-5 w-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-bold text-xl text-azul transition-colors group-hover:text-cobre-texto">
                  Extracción de Facturas
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grafito-suave">
                  Sube un PDF o foto real. La IA lee proveedor, importes, líneas de gasto y lo estructura en segundos.
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cobre-texto">
                  Probar con tu factura <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Demo 2: Clínicas y Salud */}
            <Link
              href="/demo/dadent.html"
              className="group flex flex-col overflow-hidden rounded-2xl border border-azul/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-azul/5">
                <Image
                  src={FOTOS.clinica.src}
                  alt={FOTOS.clinica.alt}
                  width={FOTOS.clinica.ancho}
                  height={FOTOS.clinica.alto}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-azul/90 text-cobre-claro shadow backdrop-blur-sm">
                  <Stethoscope className="h-5 w-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-bold text-xl text-azul transition-colors group-hover:text-cobre-texto">
                  Citas y Captación Clínica
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grafito-suave">
                  Reserva médica en 3 toques, calculadora interactiva de cuotas y confirmación instantánea por WhatsApp.
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cobre-texto">
                  Probar en móvil <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Demo 3: Climatización e Instaladores */}
            <Link
              href="/casos-reales#climatizacion"
              className="group flex flex-col overflow-hidden rounded-2xl border border-azul/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-azul/5">
                <Image
                  src={FOTOS.analitica.src}
                  alt={FOTOS.analitica.alt}
                  width={FOTOS.analitica.ancho}
                  height={FOTOS.analitica.alto}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-azul/90 text-cobre-claro shadow backdrop-blur-sm">
                  <Wrench className="h-5 w-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-bold text-xl text-azul transition-colors group-hover:text-cobre-texto">
                  Partes y Control de Obras
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grafito-suave">
                  Cómo una empresa de 83 trabajadores cuadra 932 facturas con horas y costes de obra en tiempo real.
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cobre-texto">
                  Ver caso operativo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4 · EL SISTEMA (INTACTO CON TODA SU ANIMACIÓN DE SCROLL) ── */}
      <section id="sistema" className="sobre-azul scroll-mt-20 bg-azul text-roto">
        <SistemaScroll>
          <p className="eyebrow">Automatización</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">
            Los agentes son solo la parte que ves.
          </h2>
          <p className="mt-5 text-xl text-roto/80">Detrás construimos el sistema que hace que todo funcione.</p>
          <p className="mt-8 max-w-md border-l-2 border-cobre pl-5 text-lg leading-relaxed text-roto/75">
            No conectamos herramientas porque sí. Diseñamos el sistema alrededor de tu negocio.
          </p>
          <Link href="/automatizaciones" data-cta="home_automatizaciones" className="btn btn-cobre mt-8">
            Descubrir automatizaciones <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </SistemaScroll>
      </section>

      {/* ── 5 · CASO REAL Y PROCESO (Compacto: métrica ganadora + 4 pasos) ── */}
      <section id="caso" className="pared scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="aparece">
              <p className="eyebrow">Caso real · Granada</p>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.08] text-azul sm:text-5xl">
                932 facturas procesadas solas.
              </h2>
              <p className="mt-5 text-lg text-grafito-suave">
                Instaladora de climatización · 83 trabajadores · en marcha desde mayo de 2026.
              </p>
              <p className="mt-4 text-base leading-relaxed text-grafito">
                Las facturas de proveedor entran por correo, la IA extrae cada línea de gasto y la asigna a su obra con
                el margen visible al instante.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link href="/casos-reales#climatizacion" className="btn btn-cobre">
                  Ver caso completo <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/casos-reales" className="font-semibold text-azul underline underline-offset-4 text-sm">
                  Otros sectores
                </Link>
              </div>
            </div>

            {/* 4 pasos rápidos */}
            <div className="aparece rounded-3xl bg-piedra p-8 sm:p-10 border border-azul/10">
              <p className="eyebrow">Metodología</p>
              <h3 className="mt-2 text-2xl font-bold text-azul">Cuatro pasos. Sin sorpresas.</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {PASOS.map((p) => (
                  <div key={p.n} className="border-t border-azul/20 pt-4">
                    <span className="font-display text-2xl font-bold text-cobre-texto">{p.n}</span>
                    <h4 className="mt-1 font-bold text-sm text-azul uppercase tracking-wide">{p.titulo}</h4>
                    <p className="mt-1.5 text-xs text-grafito-suave leading-relaxed">{p.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 · CTA FINAL (Diagnóstico) ── */}
      <section id="contacto" className="sobre-azul scroll-mt-20 bg-azul py-20 text-roto sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">
              ¿Qué tarea sigue haciendo una persona que podría hacer un sistema?
            </h2>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-roto/80">
              Cuéntanosla. Analizamos el proceso y te decimos qué tiene sentido automatizar y qué no.
            </p>
            <ul className="mt-9 space-y-4 text-roto/80">
              <li className="flex items-start gap-3">
                <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-cobre-claro" aria-hidden />
                <span>Un diagnóstico de 30 minutos, sin coste.</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cobre-claro" aria-hidden />
                <span>
                  O llámanos:{" "}
                  <a href="tel:+34858215026" data-cta="contacto_telefono" className="font-bold underline underline-offset-4">
                    858 215 026
                  </a>
                </span>
              </li>
            </ul>
            <p className="mt-12 font-display text-2xl text-cobre-claro">Nosotros ponemos los sistemas. Tú disfrutas.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <AssistantDock />
      <WhatsAppButton />
      <SiteFooter />
    </main>
  )
}
