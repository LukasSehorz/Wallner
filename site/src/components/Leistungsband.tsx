import { leistungsBand } from '../content'

/**
 * Entspricht der Partner-Leiste bei BP Marine: heller Streifen direkt unter
 * dem Hero. Statt Partnerlogos (liegen für Wallner nicht vor) läuft hier das
 * Gewerke-Band aus der Leistungsgrafik der Bestandsseite.
 */
export default function Leistungsband() {
  const items = [...leistungsBand, ...leistungsBand]

  return (
    <section className="relative overflow-hidden bg-mist py-11" aria-label="Unsere Gewerke">
      <p className="shell eyebrow eyebrow-center text-moss-700">Unsere Gewerke</p>

      <div className="relative mt-7">
        {/* Weiche Kanten links/rechts */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-mist via-mist sm:w-40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-mist via-mist sm:w-40 to-transparent" />

        <div className="flex w-max animate-marquee-slow gap-3.5 hover:[animation-play-state:paused]">
          {items.map((t, idx) => (
            <span
              key={`${t}-${idx}`}
              className="rounded-xl border border-moss-900/12 bg-white px-7 py-4 font-display font-bold text-2xl uppercase leading-none tracking-wide text-moss-900 shadow-[0_2px_10px_-4px_rgba(34,64,28,.25)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
