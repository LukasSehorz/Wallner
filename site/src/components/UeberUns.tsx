import { firma, stats } from '../content'
import { IconArrow } from './icons'

/**
 * Über-uns-Block nach BP-Marine-Vorbild: heller Verlauf, links Bild mit
 * dunkler Overlay-Karte plus Kennzahlen-Kacheln, rechts weiße Textkarte.
 */
export default function UeberUns() {
  return (
    <section id="ueber-uns" className="relative">
      {/* Übergang dunkel → hell */}
      <div className="h-16 fade-to-light lg:h-24" aria-hidden="true" />

      <div className="bg-mist pb-24 pt-4 lg:pb-32">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:items-start">
          {/* Links: Bild + Kennzahlen */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl shadow-lift">
              <img
                src="/bilder/team-portrait-baustelle.jpg"
                alt="Mitarbeiter von Wallner Bau & Garten auf einer Baustelle"
                loading="lazy"
                className="h-[320px] w-full object-cover sm:h-[520px]"
              />
              {/* Abdunkelung unter der Karte, damit sie auf jedem Motiv trägt */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-2/3 sm:block"
                style={{ background: 'linear-gradient(180deg,transparent 0%,rgba(6,13,6,.85) 62%)' }}
                aria-hidden="true"
              />
              {/* Auf Mobil unter das Bild gesetzt, damit die Karte nicht auf
                  dem Gesicht im Portrait liegt. */}
              <div className="relative p-0 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-4">
                <div className="flex flex-col gap-3 rounded-b-2xl border border-white/10 bg-forest-950 p-5 sm:flex-row sm:items-center sm:gap-6 sm:rounded-xl sm:bg-forest-950/95">
                  <p className="display shrink-0 text-4xl leading-none text-lime sm:text-[2.75rem]">
                    Seit {firma.jahre}
                    <br />
                    Jahren
                  </p>
                  <p className="text-[13px] leading-relaxed text-white/75">
                    <span className="mb-1 block font-semibold uppercase tracking-wider text-white">
                      Erfahrung im Bauwesen
                    </span>
                    Projekte für Privat und Gewerbe im Raum {firma.gebiet.replaceAll(' · ', ', ')}.
                  </p>
                </div>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="rounded-xl border border-moss-900/10 bg-white p-4 shadow-[0_2px_10px_-6px_rgba(34,64,28,.35)]"
                >
                  <p className="display text-2xl text-moss-900 [overflow-wrap:anywhere] sm:text-3xl">{s.wert}</p>
                  <p className="mt-1 text-[12.5px] font-medium leading-snug text-moss-900/75">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechts: Textkarte */}
          <div className="rounded-2xl bg-white p-8 shadow-lift sm:p-11">
            <p className="eyebrow text-lime-dark">Über {firma.name}</p>

            <h2 className="display mt-5 text-[clamp(1.7rem,4.9vw,3.75rem)] text-moss-900">
              Wir können,
              <br />
              was wir tun.
            </h2>

            <p className="mt-7 text-[17px] font-semibold leading-relaxed text-moss-900 sm:text-[19px]">
              {firma.name} ist ein junges Team und Ihr kompetenter Partner für Innenausbau,
              Sanierung, Renovierung und Außenanlagen.
            </p>

            <p className="mt-5 text-[15px] leading-relaxed text-moss-900/70">
              Mit langjähriger Erfahrung, einem Team aus bestens ausgebildeten Fachkräften und einer
              eingespielten Zusammenarbeit mit regionalen Partnerbetrieben setzen wir neue Maßstäbe in
              Qualität, Zuverlässigkeit und Innovationskraft.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-moss-900/70">
              Unsere Projekte realisieren wir vor allem im Raum Mühldorf am Inn, München, Burghausen,
              Landshut und Umgebung. Wir setzen auf Qualität, Effizienz und einen hervorragenden
              Kundenservice — und stehen bereit, um Ihr Projekt zu realisieren.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#kontakt" className="btn-primary">
                Jetzt anfragen
                <IconArrow className="h-4 w-4" />
              </a>
              <a
                href="#leistungen"
                className="btn border border-moss-900/20 bg-transparent text-moss-900 hover:-translate-y-0.5 hover:border-lime hover:bg-lime/10"
              >
                Leistungen ansehen
                <IconArrow className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
