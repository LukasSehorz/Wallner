import { useRef } from 'react'
import { projekte } from '../content'
import { useReveal } from '../anim'
import { Link } from '../router'
import { IconArrow } from './icons'

/**
 * Projekte auf der Startseite nur als Anriss mit Absprungknopf.
 *
 * Kundenwunsch: „Für Bilder und Projekte bitte ein extra Button dafür, wer es
 * sehen will klickt drauf." Deshalb hier drei Bilder statt der kompletten
 * Referenzliste — alles Weitere liegt auf /projekte.
 */
export default function ProjekteTeaser() {
  const auswahl = projekte.slice(0, 3)
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} className="relative overflow-hidden bg-forest-900 pb-4 pt-16 lg:pt-20">
      <div className="shell relative">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-white/65">Projektarbeit</p>
            <h2 className="display mt-5 text-[clamp(1.7rem,4.9vw,3.4rem)] h-gradient">
              Abgeschlossene
              <br />
              Projekte.
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-relaxed text-white/75 lg:pb-2 lg:text-[17.5px]">
            Räume, Bäder, Terrassen und Erdarbeiten, die wir umgesetzt haben — alle Bilder auf
            einer eigenen Seite.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {auswahl.map((p) => (
            <li key={p.titel} data-reveal>
              <Link to="/projekte" className="group block overflow-hidden rounded-xl bg-forest-950">
                <img
                  src={p.bild}
                  alt={p.titel}
                  loading="lazy"
                  className="h-[210px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-[260px]"
                />
                <span className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="font-display text-[1.15rem] font-bold uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-lime">
                    {p.titel}
                  </span>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    {p.kategorie}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-10 flex justify-center">
          <Link to="/projekte" className="btn-primary">
            Alle Projekte und Bilder ansehen
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Übergang dunkel → hell in den Kontaktbereich */}
      <div className="mt-16 h-16 fade-to-light lg:h-24" aria-hidden="true" />
    </section>
  )
}
