import { useRef } from 'react'
import { firma, zeiten } from '../content'
import { useReveal } from '../anim'
import { Link } from '../router'
import { IconArrow, IconClock, IconMail, IconPhone, IconPin } from './icons'

/**
 * Kontakt in Kurzform auf der Startseite.
 *
 * Kundenwunsch: „Kontakt kann auf die erste Seite in Kurzform integriert werden
 * für Leute die es einfach haben wollen." Deshalb steht hier kein Formular,
 * sondern das, was man mit einem Fingertipp erledigen kann: anrufen oder
 * schreiben. Das Formular liegt eine Seite weiter unter /kontakt.
 *
 * Aufbau wie der Kontaktabschnitt der Referenz conprobau.de: eine Überschrift,
 * darunter Telefonnummer und E-Mail als große Schaltflächen.
 */
export default function KontaktKurz() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section id="kontakt" ref={root} className="scroll-mt-[86px] bg-mist py-16 sm:scroll-mt-[104px] lg:py-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,.85fr)] lg:items-center lg:gap-16">
          <div>
            <p data-reveal className="eyebrow text-lime-dark">Kontakt</p>
            <h2 data-reveal className="display mt-5 text-[clamp(1.8rem,5.2vw,3.6rem)] text-moss-900">
              Interessiert?
              <br />
              Dann melden Sie sich.
            </h2>
            <p data-reveal className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-moss-900/70 sm:text-[17.5px]">
              Ein Anruf genügt. Wir schauen uns die Situation vor Ort an und sagen Ihnen ehrlich,
              was sinnvoll ist — für Privat und Gewerbe.
            </p>

            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={firma.telefonHref}
                className="flex items-center gap-4 rounded-xl bg-forest-950 px-6 py-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-forest-950">
                  <IconPhone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                    Direkt anrufen
                  </span>
                  <span className="display block text-[1.5rem] text-white sm:text-[1.75rem]">
                    {firma.telefon}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${firma.email}`}
                className="flex items-center gap-4 rounded-xl border border-moss-900/15 bg-white px-6 py-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime/20 text-lime-dark">
                  <IconMail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-moss-900/55">
                    E-Mail schreiben
                  </span>
                  <span className="block text-[15px] font-semibold text-moss-900 [overflow-wrap:anywhere]">
                    {firma.email}
                  </span>
                </span>
              </a>
            </div>

            <div data-reveal className="mt-6">
              <Link
                to="/kontakt"
                className="btn border border-moss-900/20 bg-transparent text-moss-900 hover:-translate-y-0.5 hover:border-lime hover:bg-lime/10"
              >
                Lieber schriftlich? Zum Formular
                <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div data-reveal className="rounded-2xl border border-moss-900/10 bg-white p-7 shadow-lift sm:p-9">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-moss-900/55">
              <IconClock className="h-4 w-4 text-lime-dark" />
              Geschäftszeiten
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {zeiten.map((z) => (
                <li key={z.tag} className="flex justify-between gap-4 text-[15px] text-moss-900">
                  <span className="font-semibold">{z.tag}</span>
                  <span className="tabular-nums text-moss-900/65">{z.zeit}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 flex items-start gap-3 border-t border-moss-900/10 pt-7 text-[15px] text-moss-900">
              <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-lime-dark" />
              <span>
                {firma.legal}
                <br />
                {firma.strasse}
                <br />
                {firma.plzOrt}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
