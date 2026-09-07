import { useRef } from 'react'
import { firma, kennzahlen } from '../content'
import { useReveal } from '../anim'
import { Link } from '../router'
import { IconArrow } from './icons'

/**
 * „Wer sind wir, seit wann gibt's uns" — kurz, wie vom Kunden gefordert.
 *
 * Der frühere Über-uns-Block hatte drei Absätze Fließtext, ein Kennzahlenband
 * und eine zweite Section („Wir bauen für die Besten") gleich hinterher. Beides
 * ist hier zu einem Block zusammengezogen; die Langfassung braucht die
 * Startseite nicht.
 */
export default function WerWirSind() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section id="ueber-uns" ref={root} className="relative scroll-mt-[86px] sm:scroll-mt-[104px]">
      {/* Übergang hell → dunkel */}
      <div className="h-16 fade-to-dark lg:h-24" aria-hidden="true" />

      <div className="relative overflow-hidden bg-forest-950 pb-20 pt-4 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-52 top-10 h-[560px] w-[560px] rounded-full opacity-[.13] blur-3xl"
          style={{ background: 'radial-gradient(circle,#AAC527 0%,transparent 70%)' }}
        />

        <div className="shell relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div data-reveal className="overflow-hidden rounded-2xl shadow-plate">
            <img
              src="/bilder/team-portrait-baustelle.jpg"
              alt="Mitarbeiter von Wallner Bau & Garten auf einer Baustelle"
              loading="lazy"
              className="h-[300px] w-full object-cover sm:h-[440px]"
            />
          </div>

          <div>
            <p data-reveal className="eyebrow text-white/65">Wer wir sind</p>

            <h2 data-reveal className="display mt-5 text-[clamp(1.7rem,4.9vw,3.4rem)] h-gradient">
              Seit über {firma.jahre} Jahren
              <br />
              am Bau zuhause.
            </h2>

            <p data-reveal className="mt-6 text-[17px] font-semibold leading-relaxed text-white sm:text-[19px]">
              {firma.name} ist ein junges Team aus ausgebildeten Fachkräften rund um Inhaber{' '}
              {firma.inhaber}.
            </p>

            <p data-reveal className="mt-4 max-w-[560px] text-[15.5px] leading-relaxed text-white/70 sm:text-[16.5px]">
              Wir arbeiten für Privat und Gewerbe im Raum Mühldorf am Inn, München, Burghausen und
              Landshut — mit eigenem Gerät, festen Partnerbetrieben aus der Region und einem
              Ansprechpartner von der ersten Besichtigung bis zur Übergabe.
            </p>

            <ul data-reveal className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {kennzahlen.map((k) => (
                <li key={k.label} className="rounded-xl border border-white/10 bg-white/[.05] p-4">
                  <p className="display text-[1.9rem] leading-none text-lime">{k.wert}</p>
                  <p className="mt-2 text-[12px] font-medium uppercase leading-snug tracking-wider text-white/60">
                    {k.label}
                  </p>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              <Link to="/projekte" className="btn-primary">
                Projekte ansehen
                <IconArrow className="h-4 w-4" />
              </Link>
              <Link to="/kontakt" className="btn-ghost">
                Kontakt aufnehmen
                <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
