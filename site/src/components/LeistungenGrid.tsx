import { useRef } from 'react'
import { leistungen } from '../content'
import { useReveal } from '../anim'
import { Link } from '../router'
import { IconArrow, leistungsIcons } from './icons'

/**
 * Die sechs Leistungen als reine Aufzählung — Icon, Name, ein Satz.
 *
 * Ausdrücklicher Kundenwunsch: „Die Leistungen aufgezählt aber nicht
 * umschrieben. Das umschreiben bitte einzeln mit Button abrufbar auf
 * Unterseite." Jede Kachel ist deshalb der Absprung auf /leistungen/<slug>,
 * und der lange Text steht ausschließlich dort.
 *
 * Anordnung nach dem Vorbild conprobau.de: heller Grund, drei Spalten,
 * Icon über der Überschrift, kurzer Text darunter.
 */
export default function LeistungenGrid({ ueberschrift = true }: { ueberschrift?: boolean }) {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section id="leistungen" ref={root} className="bg-mist py-16 lg:py-24">
      <div className="shell">
        {ueberschrift && (
          <div data-reveal className="max-w-[720px]">
            <p className="eyebrow text-lime-dark">Was wir machen</p>
            <h2 className="display mt-5 text-[clamp(1.7rem,4.9vw,3.4rem)] text-moss-900">
              Sechs Leistungen
              <br />
              aus einer Hand.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-moss-900/70 sm:text-[17.5px]">
              Klicken Sie die Leistung an, die Sie brauchen — dort steht ausführlich, was wir
              übernehmen und wie wir vorgehen.
            </p>
          </div>
        )}

        <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${ueberschrift ? 'mt-12' : ''}`}>
          {leistungen.map((l) => {
            const Icon = leistungsIcons[l.slug]
            return (
              <li key={l.slug} data-reveal>
                <Link
                  to={`/leistungen/${l.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-moss-900/10 bg-white p-7 shadow-[0_2px_12px_-8px_rgba(34,64,28,.4)] transition-all duration-200 hover:-translate-y-1 hover:border-lime hover:shadow-lift sm:p-8"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-lime/15 text-lime-dark transition-colors group-hover:bg-lime group-hover:text-forest-950">
                    {Icon ? <Icon className="h-7 w-7" /> : null}
                  </span>

                  <span className="mt-6 block font-sans text-[11px] font-bold tabular-nums tracking-[0.22em] text-moss-900/40">
                    {l.nr}
                  </span>
                  {/* „Dachflächenfenster" ist breiter als eine Kachel. Getrennt wird
                      nur an der weichen Trennmarke aus content.ts — `auto` hätte
                      „DACHFLÄCHENFENS-TER" ergeben. */}
                  <h3 className="display mt-2 hyphens-manual text-[1.5rem] leading-none text-moss-900 [overflow-wrap:anywhere] sm:text-[1.8rem]">
                    {l.kurzTitel ?? l.titel}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-moss-900/70">{l.kurz}</p>

                  <span className="mt-6 inline-flex items-center gap-2 font-display text-[15px] font-bold uppercase tracking-wider text-lime-dark">
                    Mehr erfahren
                    <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
