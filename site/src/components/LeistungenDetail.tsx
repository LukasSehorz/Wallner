import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { leistungen, type Leistung } from '../content'
import { IconArrow, leistungsIcons } from './icons'
import VorherNachher from './VorherNachher'

gsap.registerPlugin(ScrollTrigger)

/**
 * Die Leistungs-Section der Seite — Ziel der Sprungmarken aus dem Hero-Index.
 *
 * Jedes Gewerk bekommt eine eigene Anordnung, damit die Section beim Scrollen
 * nicht sechsmal dasselbe Muster wiederholt. Gleich bleiben Farben, Typografie
 * und die Bausteine (Kopf, Fließtext, Stichwortmarken, Absprung); es ändern
 * sich Spaltenaufteilung, Bildzuschnitt und vor allem die Darstellung der drei
 * Arbeitsschritte — an ihr fällt Wiederholung sonst am stärksten auf.
 *
 *   01 Innenausbau    Bild links, Schritte als senkrechte Zeitachse
 *   02 Sanierung      Breitbild oben, Schritte als drei große Karten
 *   03 Badsanierung   hohes Bild rechts, Schritte als waagerechte Schiene
 *   04 Außenanlagen   zwei versetzte Bilder, Schritte als Kette mit Pfeilen
 *   05 Erdarbeiten    Text im Bild, Schritte als Leiste am unteren Rand
 *   06 Trockenbau     schmale Textspalte, Schritte mit Konturziffern
 */

/* ---------- gemeinsame Bausteine ---------- */

function Kopf({ l, i }: { l: Leistung; i: number }) {
  const Icon = leistungsIcons[i]
  return (
    <div data-anim>
      <div className="flex items-center gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-forest-950">
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-lime">{l.kicker}</p>
      </div>
      <h3 className="display mt-5 text-[clamp(1.6rem,3.6vw,2.7rem)] text-white">{l.titel}</h3>
    </div>
  )
}

function Text({ l, className = '' }: { l: Leistung; className?: string }) {
  return (
    <p data-anim className={`text-[15.5px] leading-relaxed text-white/70 sm:text-[16.5px] ${className}`}>
      {l.detail}
    </p>
  )
}

function Marken({ l, className = '' }: { l: Leistung; className?: string }) {
  return (
    <ul data-anim className={`flex flex-wrap gap-2 ${className}`}>
      {l.bullets.map((b) => (
        <li
          key={b}
          className="rounded-md border border-white/10 bg-white/[.05] px-3 py-1.5 text-[12.5px] font-medium text-white/65"
        >
          {b}
        </li>
      ))}
    </ul>
  )
}

function Absprung({ l, className = '' }: { l: Leistung; className?: string }) {
  return (
    <a
      data-anim
      href="#kontakt"
      className={`group inline-flex items-center gap-2.5 font-display text-[16px] font-bold uppercase tracking-wider text-lime ${className}`}
    >
      {l.titel} anfragen
      <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  )
}

/** Konturziffer als Grafikelement — Position wechselt je Anordnung. */
function Ziffer({ nr, className = '' }: { nr: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none font-display font-black leading-none text-transparent ${className}`}
      style={{ WebkitTextStroke: '1.5px rgba(170,197,39,.6)' }}
    >
      {nr}
    </span>
  )
}

function Bild({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-[20px] shadow-plate ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg,transparent 45%,rgba(6,13,6,.7) 100%)' }}
      />
    </div>
  )
}

/* ---------- sechs Darstellungen der Arbeitsschritte ---------- */

/** 01 — senkrechte Zeitachse mit durchgehender Linie */
function SchritteAchse({ l }: { l: Leistung }) {
  return (
    <ol data-anim className="mt-8 flex flex-col">
      {l.schritte.map((s, n) => (
        <li key={s} className="relative flex gap-4 pb-5 last:pb-0">
          {n < l.schritte.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-[13px] top-7 w-px bg-gradient-to-b from-lime/50 to-lime/5"
            />
          )}
          <span className="grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full border border-lime/45 bg-forest-900 text-[11px] font-bold tabular-nums text-lime">
            {n + 1}
          </span>
          <span className="pt-0.5 text-[14.5px] font-medium leading-snug text-white/80">{s}</span>
        </li>
      ))}
    </ol>
  )
}

/** 02 — drei große Karten nebeneinander */
function SchritteKarten({ l }: { l: Leistung }) {
  return (
    <ol data-anim className="mt-10 grid gap-3 sm:grid-cols-3">
      {l.schritte.map((s, n) => (
        <li
          key={s}
          className="rounded-xl border border-white/10 bg-white/[.04] p-5 transition-colors duration-300 hover:border-lime/40 hover:bg-white/[.07]"
        >
          <span className="font-display text-[2rem] font-black leading-none text-lime/85">
            {String(n + 1).padStart(2, '0')}
          </span>
          <p className="mt-3 text-[14px] font-medium leading-snug text-white/80">{s}</p>
        </li>
      ))}
    </ol>
  )
}

/** 03 — waagerechte Schiene mit Punkten auf einer Linie */
function SchritteSchiene({ l }: { l: Leistung }) {
  return (
    <ol data-anim className="relative mt-9 grid gap-6 sm:grid-cols-3 sm:gap-4">
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-2 hidden h-px w-[calc(100%-10px)] bg-gradient-to-r from-lime/60 via-lime/30 to-lime/5 sm:block"
      />
      {l.schritte.map((s, n) => (
        <li key={s} className="relative sm:pt-7">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-[11px] w-[11px] rounded-full border-2 border-lime bg-forest-950 sm:block"
          />
          <span className="text-[11px] font-bold tracking-[0.2em] text-lime sm:hidden">
            SCHRITT {n + 1}
          </span>
          <p className="mt-1 text-[14px] font-medium leading-snug text-white/80 sm:mt-0">{s}</p>
        </li>
      ))}
    </ol>
  )
}

/** 04 — Treppe: jede Marke rückt weiter ein, das liest sich als Abfolge.
    Pfeile zwischen den Marken funktionieren hier nicht: die Texte sind zu
    lang, die Marken brechen um, und die Pfeile stünden am Zeilenende statt
    zwischen zwei Schritten. */
function SchritteTreppe({ l }: { l: Leistung }) {
  return (
    <ol data-anim className="mt-9 flex flex-col gap-2.5">
      {l.schritte.map((s, n) => (
        <li key={s} style={{ paddingLeft: `${n * 1.75}rem` }}>
          <span className="inline-flex items-center gap-3 rounded-full border border-lime/30 bg-lime/[.09] py-2 pl-2 pr-5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-[11px] font-bold text-forest-950">
              {n + 1}
            </span>
            <span className="text-[13.5px] font-medium leading-tight text-white/85">{s}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

/** 05 — Leiste mit senkrechten Trennern, sitzt im Bild */
function SchritteLeiste({ l }: { l: Leistung }) {
  return (
    <ol data-anim className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
      {l.schritte.map((s, n) => (
        <li key={s} className="bg-forest-950/85 p-4 backdrop-blur sm:p-5">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
            Schritt {n + 1}
          </span>
          <p className="mt-2 text-[13.5px] font-medium leading-snug text-white/85">{s}</p>
        </li>
      ))}
    </ol>
  )
}

/** 06 — große Konturziffern mit linker Akzentkante */
function SchritteZiffern({ l }: { l: Leistung }) {
  return (
    <ol data-anim className="mt-9 flex flex-col gap-4">
      {l.schritte.map((s, n) => (
        <li key={s} className="flex items-center gap-5 border-l-2 border-lime/35 pl-5">
          <Ziffer nr={String(n + 1)} className="shrink-0 text-[2.4rem]" />
          <p className="text-[14.5px] font-medium leading-snug text-white/80">{s}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------- sechs Anordnungen ---------- */

function Zeile01({ l, i }: { l: Leistung; i: number }) {
  return (
    <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
      <div data-anim className="relative">
        <Bild src={l.bildDetail} alt={`${l.titel} — ${l.kicker}`} className="h-[260px] sm:h-[400px] lg:h-[460px]" />
        <Ziffer nr={l.nr} className="absolute -left-1 -top-5 text-[3.6rem] sm:-left-3 sm:-top-8 sm:text-[5.5rem]" />
      </div>
      <div>
        <Kopf l={l} i={i} />
        <Text l={l} className="mt-4" />
        <SchritteAchse l={l} />
        <Marken l={l} className="mt-7" />
        <Absprung l={l} className="mt-8" />
      </div>
    </div>
  )
}

function Zeile02({ l, i }: { l: Leistung; i: number }) {
  return (
    <div>
      <div data-anim className="relative">
        <Bild src={l.bildDetail} alt={`${l.titel} — ${l.kicker}`} className="h-[220px] sm:h-[320px] lg:h-[400px]" />
        <Ziffer nr={l.nr} className="absolute -top-6 right-2 text-[3.6rem] sm:-top-10 sm:right-6 sm:text-[6rem]" />
      </div>
      <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <Kopf l={l} i={i} />
        <div>
          <Text l={l} />
          <Marken l={l} className="mt-6" />
        </div>
      </div>
      <SchritteKarten l={l} />
      <Absprung l={l} className="mt-9" />
    </div>
  )
}

function Zeile03({ l, i }: { l: Leistung; i: number }) {
  return (
    <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-14">
      <div>
        <Kopf l={l} i={i} />
        <Text l={l} className="mt-4" />
        <SchritteSchiene l={l} />
        <Marken l={l} className="mt-8" />
        <Absprung l={l} className="mt-8" />
      </div>
      {/* hohes Bild — bricht bewusst mit dem Querformat der übrigen Zeilen */}
      <div data-anim className="relative lg:order-2">
        <Bild src={l.bildDetail} alt={`${l.titel} — ${l.kicker}`} className="h-[320px] sm:h-[460px] lg:h-[560px]" />
        <Ziffer nr={l.nr} className="absolute -bottom-4 -left-2 text-[3.6rem] sm:-bottom-7 sm:-left-4 sm:text-[5.5rem]" />
      </div>
    </div>
  )
}

function Zeile04({ l, i }: { l: Leistung; i: number }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Zwei versetzte Bilder statt einem — nur in dieser Zeile. Die
          Außenanlagen-Fotos liegen alle im Hochformat (3:4), deshalb hier
          zwei hohe Kacheln nebeneinander statt eines Querformats: so muss
          kaum etwas weggeschnitten werden. */}
      <div data-anim className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:order-2">
        <div className="pt-8 sm:pt-12">
          <Bild src={l.bildDetail} alt={`${l.titel} — ${l.kicker}`} className="h-[280px] sm:h-[400px]" />
        </div>
        <div className="pb-8 sm:pb-12">
          <Bild src={l.bild} alt="" className="h-[280px] sm:h-[400px]" />
        </div>
        <Ziffer nr={l.nr} className="absolute -top-4 left-1/2 -translate-x-1/2 text-[3.6rem] sm:-top-7 sm:text-[5.5rem]" />
      </div>
      <div className="lg:order-1">
        <Kopf l={l} i={i} />
        <Text l={l} className="mt-4" />
        <SchritteTreppe l={l} />
        <Marken l={l} className="mt-7" />
        <Absprung l={l} className="mt-8" />
      </div>
    </div>
  )
}

function Zeile05({ l, i }: { l: Leistung; i: number }) {
  return (
    <div>
      {/* Text sitzt im Bild — einzige Zeile, die das macht */}
      <div data-anim className="relative overflow-hidden rounded-[22px] shadow-plate">
        <img
          src={l.bildDetail}
          alt={`${l.titel} — ${l.kicker}`}
          loading="lazy"
          className="h-[440px] w-full object-cover sm:h-[500px] lg:h-[540px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(6,13,6,.94) 0%, rgba(6,13,6,.86) 38%, rgba(6,13,6,.45) 72%, rgba(6,13,6,.2) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <div className="max-w-[520px]">
            <Kopf l={l} i={i} />
            <Text l={l} className="mt-4" />
            <Absprung l={l} className="mt-7" />
          </div>
        </div>
        <Ziffer nr={l.nr} className="absolute right-4 top-4 text-[3.6rem] sm:right-8 sm:top-7 sm:text-[6rem]" />
      </div>
      <SchritteLeiste l={l} />
      <Marken l={l} className="mt-6" />
    </div>
  )
}

function Zeile06({ l, i }: { l: Leistung; i: number }) {
  return (
    <div className="grid gap-9 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
      <div className="lg:sticky lg:top-[124px]">
        <Kopf l={l} i={i} />
        <Text l={l} className="mt-4" />
        <Marken l={l} className="mt-7" />
        <Absprung l={l} className="mt-8" />
      </div>
      <div>
        <div data-anim className="relative">
          <Bild src={l.bildDetail} alt={`${l.titel} — ${l.kicker}`} className="h-[260px] sm:h-[380px] lg:h-[420px]" />
          <Ziffer nr={l.nr} className="absolute -left-2 -top-6 text-[3.6rem] sm:-left-4 sm:-top-9 sm:text-[5.5rem]" />
        </div>
        <SchritteZiffern l={l} />
      </div>
    </div>
  )
}

const ANORDNUNGEN = [Zeile01, Zeile02, Zeile03, Zeile04, Zeile05, Zeile06]

/* ---------- Section ---------- */

export default function LeistungenDetail() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const ziele = gsap.utils.toArray<HTMLElement>(
        '[data-auftakt] > *, [data-kopf] > *, [data-anim]',
      )
      if (!ziele.length) return

      gsap.set(ziele, { opacity: 0, y: 32 })

      /* Ein Auslöser je Element statt einer je Zeile.
         Mit einem Auslöser pro Zeile startet die Animation, sobald die
         Zeilenoberkante auftaucht — Bausteine am unteren Ende einer 700 px
         hohen Zeile wären dann längst durchgelaufen, bevor man sie sieht.
         `batch` fasst zusammen, was gemeinsam ins Bild kommt, und staffelt
         nur diese; alles Übrige wartet, bis es selbst sichtbar wird.

         Bewegt werden ausschließlich innere Bausteine, nie das <article>:
         es ist Sprungziel der Hero-Links, und ein Versatz darauf würde den
         Browser die verschobene Position anspringen lassen — die Zeile käme
         anschließend unter der Kopfzeile zu liegen. */
      ScrollTrigger.batch(ziele, {
        // 88 % Viewporthöhe: das Element steht bereits im Bild, wenn es losläuft.
        start: 'top 88%',
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            stagger: 0.09,
            overwrite: true,
          }),
      })

      // Die Zeilenbilder liegen auf `loading="lazy"`. Kommen sie verspätet an,
      // verschieben sich die Messpunkte — ohne Neuberechnung bliebe weiter
      // unten etwas unsichtbar stehen.
      const neuMessen = () => ScrollTrigger.refresh()
      window.addEventListener('load', neuMessen)
      return () => window.removeEventListener('load', neuMessen)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="leistungen" ref={root} tabIndex={-1} className="relative">
      {/* Übergang hell → dunkel, gespiegelt zum Band vor „Über uns“. Ohne ihn
          stößt das helle Leistungsband hart auf die dunkle Section. */}
      <div className="h-16 fade-to-dark lg:h-24" aria-hidden="true" />

      <div className="relative overflow-hidden bg-forest-950 pb-24 pt-4 lg:pb-32">
        {/* Lichtkegel unten links */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-52 h-[620px] w-[620px] rounded-full opacity-[.13] blur-3xl"
          style={{ background: 'radial-gradient(circle,#AAC527 0%,transparent 68%)' }}
        />

        <div className="shell relative">
          {/* Kopf: Regler links, Einordnung rechts */}
          <div
            data-kopf
            className="grid gap-10 pt-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pt-16"
          >
            <VorherNachher />

            <div>
              <h2 className="display text-[clamp(1.7rem,4.6vw,3.4rem)] h-gradient">
                Vom Rohbau zum
                <br />
                fertigen Raum
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-white/70 sm:text-[17.5px]">
                Vom Innenausbau über die Badsanierung bis zu Außenanlagen und Erdarbeiten: Wallner
                Bau &amp; Garten bringt Team, Gerät und Erfahrung mit, um Ihr Projekt sauber zu
                Ende zu bringen. Zu jeder Leistung steht hier, was wir übernehmen und wie wir
                vorgehen.
              </p>
              <a href="#kontakt" className="btn-primary mt-8 w-fit">
                Projekt besprechen
                <IconArrow className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Auftakt der Leistungsliste: Überschrift über dünnem grünen Strich.
              Steht bewusst zwischen Regler und Leistung 01 — dort trennt er
              die Einleitung von der Aufzählung. Der erste Artikel führt
              deshalb keinen eigenen oberen Rahmen (first:border-t-0). */}
          <div data-auftakt className="mt-20 lg:mt-28">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-lime">
              Unsere Leistungen
            </p>
            <div
              aria-hidden="true"
              className="mt-4 h-px w-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(170,197,39,.85) 0%, rgba(170,197,39,.35) 55%, rgba(170,197,39,0) 100%)',
              }}
            />
          </div>

          {/* Die sechs Leistungen, jede in eigener Anordnung */}
          <div className="mt-12 lg:mt-16">
            {leistungen.map((l, i) => {
              const Anordnung = ANORDNUNGEN[i % ANORDNUNGEN.length]
              return (
                <article
                  key={l.slug}
                  id={`leistung-${l.slug}`}
                  className="scroll-mt-[104px] border-t border-white/[.08] py-14 first:border-t-0 first:pt-0 lg:scroll-mt-[124px] lg:py-20 lg:first:pt-0"
                >
                  <Anordnung l={l} i={i} />
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
