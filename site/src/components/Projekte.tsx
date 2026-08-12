import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { orteBestaetigt, projekte } from '../content'
import { IconArrow } from './icons'

gsap.registerPlugin(ScrollTrigger)

/**
 * Projektreferenzen mit der Scroll-Mechanik von J Davis „Featured Projects".
 *
 * Nachgemessen auf jdavisgc.com: die Bildhöhen sind konstant (596/630/630/630 px
 * bei 1440 px Breite), es gibt dort keine Höhenanimation. Die Karten sind
 * `position: sticky` mit identischem `top` und stapeln sich beim Scrollen
 * übereinander — die nachfolgende Karte schiebt sich über die vorherige. Was wie
 * ein zulaufendes Bild wirkt, ist also Überdeckung, nicht Verkleinerung.
 *
 * Damit das trägt, braucht jede Karte einen deckenden Hintergrund, und die
 * Karten müssen Geschwister im selben Container sein: dann lösen sie sich am
 * Ende der Liste gemeinsam und scrollen als Block weiter.
 *
 * Farbwelt und Rahmen folgen der Project-Work-Section von BP Marine.
 */
export default function Projekte() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-head]', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })

      // Kein Verkleinern der überdeckten Karte: J Davis hat das nicht, und es
      // würde die Geometrie verschieben, sodass die untere Karte oben unter der
      // Navigation hervorschaut. Die Tiefe entsteht allein aus der Überdeckung.
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projekte"
      ref={root}
      className="relative bg-forest-900 pb-24 pt-14 lg:pb-32 lg:pt-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-52 top-1/3 h-[620px] w-[620px] rounded-full opacity-[.13] blur-3xl"
          style={{ background: 'radial-gradient(circle,#AAC527 0%,transparent 70%)' }}
        />
      </div>

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div data-head>
            <p className="eyebrow text-white/65">Projektarbeit</p>
            <h2 className="display mt-5 text-[clamp(1.7rem,4.9vw,3.75rem)] h-gradient">
              Abgeschlossene
              <br />
              Projekte.
            </h2>
          </div>
          <p data-head className="text-[17px] leading-relaxed text-white/75 lg:pb-3 lg:text-[19px]">
            Ein Blick auf Räume, Bäder, Terrassen und Erdarbeiten, die wir für unsere Kundinnen und
            Kunden umgesetzt haben — vom ersten Aufmaß bis zur Übergabe.
          </p>
        </div>

        {/* Sticky-Stapel: alle Karten kleben auf derselben Höhe, die spätere
            legt sich über die frühere. `motion-reduce` löst den Stapel auf. */}
        <ul className="mt-14">
          {projekte.map((p) => (
            <li
              key={p.titel}
              data-karte
              className="sticky top-[86px] motion-reduce:static sm:top-[104px]"
            >
              <a
                href="#kontakt"
                className="group block bg-forest-900 pb-5 pt-6"
                aria-label={`${p.titel}${orteBestaetigt ? `, ${p.ort}` : ''} — ${p.kategorie}. Projekt anfragen`}
              >
                <div>
                  <div className="flex flex-col items-start gap-3 border-t border-white/12 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                    <h3 className="display text-[clamp(1.4rem,2.95vw,2.45rem)] text-white transition-colors group-hover:text-lime sm:flex-1">
                      {p.titel}
                    </h3>
                    <div className="flex w-full items-center gap-4 sm:w-auto sm:gap-6">
                      {orteBestaetigt && (
                        <span className="text-[14px] font-medium text-white/60">{p.ort}</span>
                      )}
                      <span className="rounded-full border border-white/20 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-white/75">
                        {p.kategorie}
                      </span>
                      <span className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-all group-hover:border-lime group-hover:bg-lime group-hover:text-forest-950 sm:ml-0">
                        <IconArrow className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-xl bg-forest-950">
                    <img
                      src={p.bild}
                      alt={orteBestaetigt ? `${p.titel} in ${p.ort}` : p.titel}
                      loading="lazy"
                      className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[420px] lg:h-[540px]"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
