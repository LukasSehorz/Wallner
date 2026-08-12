import { kennzahlen } from '../content'

/**
 * „Wir bauen für die Besten" — Aufbau nach J Davis „Building for the best":
 * Bild oben rechts, Headline mit farbig hinterlegtem Wort unten links,
 * darunter das endlos laufende Kennzahlen-Band.
 */
export default function FuerDieBesten() {
  const band = [...kennzahlen, ...kennzahlen, ...kennzahlen]

  return (
    <section className="relative overflow-hidden bg-mist">
      {/* Übergang dunkel → hell */}
      <div className="h-16 fade-to-light lg:h-24" aria-hidden="true" />

      <div className="shell grid gap-12 pb-16 pt-6 lg:grid-cols-2 lg:items-end lg:gap-16 lg:pb-20">
        <div className="order-2 lg:order-1">
          <h2 className="display text-[clamp(1.7rem,4.9vw,3.75rem)] leading-[1.02] text-moss-900">
            Wir bauen für
            <br />
            die{' '}
            {/* Marker als inline-block: die Box wächst mit der Zeilenhöhe des
                Wortes, dadurch sitzt sie exakt auf der Schrift. */}
            <span className="inline-block bg-lime px-3 pb-[0.06em] pt-[0.14em] leading-[0.86] text-forest-950">
              Besten
            </span>
          </h2>
          <p className="mt-6 max-w-[420px] text-[16px] leading-relaxed text-moss-900/70">
            Unser Anspruch ist es, Räume zu schaffen, in denen Menschen gerne leben und arbeiten —
            sauber ausgeführt, termintreu und mit einem Ansprechpartner von Anfang bis Ende.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <img
            src="/bilder/pickup-bagger-baustelle.jpg"
            alt="Firmenfahrzeug und Radlader von Wallner Bau & Garten auf der Baustelle"
            loading="lazy"
            className="h-[280px] w-full rounded-xl object-cover shadow-lift sm:h-[400px]"
          />
        </div>
      </div>

      {/* Kennzahlen-Laufband */}
      <div className="relative overflow-hidden border-y border-moss-900/12 py-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-mist via-mist to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-mist via-mist to-transparent sm:w-28" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {band.map((k, i) => (
            <div key={`${k.label}-${i}`} className="flex shrink-0 items-center">
              <div className="flex items-baseline gap-4 px-6 sm:px-10">
                <span className="display text-[clamp(2.2rem,7vw,5.6rem)] leading-none text-moss-900">
                  {k.wert}
                </span>
                <span className="max-w-[130px] text-[13px] font-semibold uppercase leading-tight tracking-wider text-lime-dark">
                  {k.label}
                </span>
              </div>
              <span className="h-14 w-px shrink-0 bg-moss-900/15" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
