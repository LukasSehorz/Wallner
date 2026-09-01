import { useEffect, useRef, useState } from 'react'
import { leistungen } from '../content'
import { IconArrow, leistungsIcons } from './icons'
import VorherNachher from './VorherNachher'

/**
 * Leistungsdetail-Section — Ziel der Sprungmarken aus dem Hero-Index.
 *
 * Bewusst anders gebaut als die Tab-Section darüber, damit die Seite nicht
 * zweimal dasselbe zeigt:
 *   Tab-Section  → dunkle Platte, drei feste Spalten, Inhalt wird getauscht.
 *   diese hier   → tiefes Schwarzgrün, im Zickzack laufende Vollbreit-Zeilen,
 *                  jede Leistung dauerhaft sichtbar statt hinter einem Reiter,
 *                  Ablauf in drei Schritten statt Häkchenliste,
 *                  Einblenden beim Scrollen statt Umschalt-Animation.
 */

/** Blendet ein Element beim ersten Hereinscrollen ein. */
function useEinblenden<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [drin, setDrin] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrin(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setDrin(true)
        io.disconnect()
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, drin }
}

function Zeile({ l, i }: { l: (typeof leistungen)[number]; i: number }) {
  const { ref, drin } = useEinblenden<HTMLElement>()
  const Icon = leistungsIcons[i]
  const rechts = i % 2 === 1

  return (
    <article
      ref={ref}
      id={`leistung-${l.slug}`}
      // Sprungziel unter der festen Kopfzeile freihalten
      className="scroll-mt-[104px] border-t border-white/[.08] py-14 first:border-t-0 lg:scroll-mt-[124px] lg:py-20"
    >
      {/* Die Einblendung sitzt bewusst auf dieser inneren Ebene, nicht auf dem
          <article>: läge der Versatz auf dem Sprungziel selbst, würde der Browser
          die noch verschobene Position anspringen und die Zeile rutschte
          anschließend um genau diesen Betrag unter die Kopfzeile. */}
      <div
        className="grid items-center gap-9 lg:grid-cols-2 lg:gap-16"
        style={{
          opacity: drin ? 1 : 0,
          transform: drin ? 'none' : 'translateY(34px)',
          transition: 'opacity .75s cubic-bezier(.22,.61,.36,1), transform .75s cubic-bezier(.22,.61,.36,1)',
        }}
      >
        {/* Bild — im Zickzack mal links, mal rechts */}
        <div className={`relative ${rechts ? 'lg:order-2' : ''}`}>
          <div className="relative overflow-hidden rounded-[20px] shadow-plate">
            <img
              src={l.bildDetail}
              alt={`${l.titel} — ${l.kicker}`}
              loading="lazy"
              className="h-[260px] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04] sm:h-[400px] lg:h-[440px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(180deg,transparent 45%,rgba(6,13,6,.7) 100%)' }}
            />
          </div>

          {/* Nummer als Konturziffer, halb über die Bildkante gesetzt */}
          <span
            aria-hidden="true"
            className={`absolute -top-5 font-display text-[3.6rem] font-black leading-none text-transparent sm:-top-8 sm:text-[5.5rem] ${
              rechts ? '-right-1 sm:-right-3' : '-left-1 sm:-left-3'
            }`}
            style={{ WebkitTextStroke: '1.5px rgba(170,197,39,.6)' }}
          >
            {l.nr}
          </span>
        </div>

        {/* Text */}
        <div className={rechts ? 'lg:order-1' : ''}>
          <div className="flex items-center gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-forest-950">
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-lime">{l.kicker}</p>
          </div>

          <h3 className="display mt-5 text-[clamp(1.6rem,3.6vw,2.7rem)] text-white">{l.titel}</h3>

          <p className="mt-4 text-[15.5px] leading-relaxed text-white/70 sm:text-[16.5px]">{l.detail}</p>

          {/* Ablauf in drei Schritten — Struktur, die es oben nicht gibt */}
          <ol className="mt-8 flex flex-col gap-0">
            {l.schritte.map((s, n) => (
              <li key={s} className="relative flex gap-4 pb-5 last:pb-0">
                {/* Verbindungslinie zwischen den Schritten */}
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

          {/* Stichworte als Marken statt Häkchenliste */}
          <ul className="mt-7 flex flex-wrap gap-2">
            {l.bullets.map((b) => (
              <li
                key={b}
                className="rounded-md border border-white/10 bg-white/[.05] px-3 py-1.5 text-[12.5px] font-medium text-white/65"
              >
                {b}
              </li>
            ))}
          </ul>

          <a
            href="#kontakt"
            className="group mt-8 inline-flex items-center gap-2.5 font-display text-[16px] font-bold uppercase tracking-wider text-lime"
          >
            {l.titel} anfragen
            <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function LeistungenDetail() {
  const { ref, drin } = useEinblenden<HTMLDivElement>()

  return (
    <section id="leistungen-detail" tabIndex={-1} className="relative overflow-hidden bg-forest-950 py-24 lg:py-32">
      {/* Lichtkegel unten links — spiegelbildlich zur Tab-Section darüber */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-52 h-[620px] w-[620px] rounded-full opacity-[.13] blur-3xl"
        style={{ background: 'radial-gradient(circle,#AAC527 0%,transparent 68%)' }}
      />

      <div className="shell relative">
        {/* Kopf: Regler links, Einordnung rechts */}
        <div
          ref={ref}
          className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-16"
          style={{
            opacity: drin ? 1 : 0,
            transform: drin ? 'none' : 'translateY(28px)',
            transition: 'opacity .8s ease-out, transform .8s ease-out',
          }}
        >
          <VorherNachher />

          <div>
            <p className="eyebrow text-white/60">Leistungen im Detail</p>
            <h2 className="display mt-5 text-[clamp(1.7rem,4.6vw,3.4rem)] h-gradient">
              Vom Rohbau zum
              <br />
              fertigen Raum
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-white/70 sm:text-[17.5px]">
              Zwischen Ständerwerk und fertiger Wand liegen viele Schritte, die später niemand mehr
              sieht — und genau an denen sich entscheidet, ob das Ergebnis stimmt. Auf dieser Seite
              steht deshalb zu jeder Leistung, was wir übernehmen und in welcher Reihenfolge wir
              vorgehen.
            </p>
            <a href="#kontakt" className="btn-primary mt-8 w-fit">
              Projekt besprechen
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Die sechs Leistungen im Zickzack */}
        <div className="mt-20 lg:mt-28">
          {leistungen.map((l, i) => (
            <Zeile key={l.slug} l={l} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
