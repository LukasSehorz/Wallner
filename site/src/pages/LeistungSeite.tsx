import { useRef } from 'react'
import { firma, leistungen, type Leistung } from '../content'
import { useReveal } from '../anim'
import { Link } from '../router'
import { useSeo } from '../seo'
import Seitenkopf from '../components/Seitenkopf'
import CTABand from '../components/CTABand'
import { IconArrow, IconPhone, leistungsIcons } from './../components/icons'

/**
 * Detailseite einer Leistung — hier und nur hier steht die ausführliche
 * Beschreibung. Auf der Startseite steht dazu ein Satz.
 *
 * Aufbau: Kopf mit Bild, Fließtext neben einem zweiten Bild, die drei
 * Arbeitsschritte, gegebenenfalls ein Schwerpunkt (Badsanierung bzw.
 * Erdarbeiten), Bilder zur Leistung, Absprung zu den übrigen Leistungen und
 * zum Schluss der Kontaktknopf, den der Kunde auf jeder Leistungsseite
 * sehen wollte.
 */
export default function LeistungSeite({ leistung: l }: { leistung: Leistung }) {
  const Icon = leistungsIcons[l.slug]
  const andere = leistungen.filter((a) => a.slug !== l.slug)
  const root = useRef<HTMLDivElement>(null)
  useReveal(root)

  useSeo({
    titel: `${l.titel} | ${firma.nameLang}`,
    beschreibung: l.meta,
    pfad: `/leistungen/${l.slug}`,
  })

  return (
    <div ref={root}>
      <Seitenkopf
        eyebrow={`Leistung ${l.nr} von ${String(leistungen.length).padStart(2, '0')}`}
        titel={l.titel}
        text={l.kurz}
        bild={l.bild}
        bildAlt={`${l.titel} — ${l.kicker}`}
        zurueck={{ label: 'Alle Leistungen', to: '/leistungen' }}
      >
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Link to="/kontakt" className="btn-primary">
            {l.titel} anfragen
            <IconArrow className="h-4 w-4" />
          </Link>
          <a href={firma.telefonHref} className="btn-ghost">
            <IconPhone className="h-4 w-4" />
            {firma.telefon}
          </a>
        </div>
      </Seitenkopf>

      {/* Beschreibung */}
      <section className="bg-forest-950 py-16 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16">
          <div>
            <div data-reveal className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-forest-950">
                {Icon ? <Icon className="h-6 w-6" /> : null}
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-lime">
                {l.kicker}
              </p>
            </div>

            <h2 data-reveal className="display mt-6 text-[clamp(1.6rem,3.8vw,2.6rem)] h-gradient">
              Was wir übernehmen
            </h2>

            <p data-reveal className="mt-6 text-[16px] leading-relaxed text-white/80 sm:text-[17.5px]">
              {l.detail}
            </p>
            {l.detail2 && (
              <p data-reveal className="mt-4 text-[16px] leading-relaxed text-white/70 sm:text-[17.5px]">
                {l.detail2}
              </p>
            )}

            <ul data-reveal className="mt-9 flex flex-col gap-2.5">
              {l.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[.04] px-4 py-3"
                >
                  <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  <span className="text-[15px] font-medium text-white/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-[124px] lg:self-start">
            <div data-reveal className="overflow-hidden rounded-[20px] shadow-plate">
              <img
                src={l.bildDetail}
                alt={`${l.titel} bei Wallner Bau & Garten`}
                loading="lazy"
                className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-forest-900 py-16 lg:py-20">
        <div className="shell">
          <p data-reveal className="eyebrow text-white/60">Ablauf</p>
          <h2 data-reveal className="display mt-5 text-[clamp(1.6rem,3.8vw,2.6rem)] text-white">
            So gehen wir vor.
          </h2>

          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {l.schritte.map((s, n) => (
              <li
                key={s}
                data-reveal
                className="rounded-xl border border-white/10 bg-white/[.04] p-6 transition-colors duration-300 hover:border-lime/40 hover:bg-white/[.07]"
              >
                <span className="font-display text-[2.2rem] font-black leading-none text-lime/85">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-[15px] font-medium leading-snug text-white/85">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Schwerpunkt innerhalb der Leistung */}
      {l.schwerpunkt && (
        <section className="bg-forest-950 py-16 lg:py-20">
          <div className="shell grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
            <div data-reveal className="overflow-hidden rounded-[20px] shadow-plate lg:order-2">
              <img
                src={l.schwerpunkt.bild}
                alt={l.schwerpunkt.bildAlt}
                loading="lazy"
                className="h-[280px] w-full object-cover sm:h-[420px]"
              />
            </div>
            <div data-reveal className="lg:order-1">
              <h2 className="display text-[clamp(1.5rem,3.4vw,2.4rem)] text-white">
                {l.schwerpunkt.titel}
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-white/75 sm:text-[17.5px]">
                {l.schwerpunkt.text}
              </p>
              <Link
                to="/kontakt"
                className="group mt-7 inline-flex items-center gap-2.5 font-display text-[16px] font-bold uppercase tracking-wider text-lime"
              >
                Dazu beraten lassen
                <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bilder zur Leistung */}
      <section className="bg-forest-950 pb-16 lg:pb-20">
        <div className="shell">
          <p data-reveal className="eyebrow text-white/60">Bilder</p>
          <h2 data-reveal className="display mt-5 text-[clamp(1.5rem,3.4vw,2.4rem)] text-white">
            Aus der Praxis.
          </h2>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {l.galerie.map((g) => (
              <li key={g.bild} data-reveal className="overflow-hidden rounded-xl bg-forest-900">
                <img
                  src={g.bild}
                  alt={g.alt}
                  loading="lazy"
                  className="h-[220px] w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-[260px]"
                />
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-8">
            <Link
              to="/projekte"
              className="btn border border-white/20 bg-white/[.06] text-white backdrop-blur hover:-translate-y-0.5 hover:border-lime/60"
            >
              Alle Projekte ansehen
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTABand text={`Sie brauchen ${l.titel}? Rufen Sie an oder schicken Sie uns kurz Ihre Anfrage — wir melden uns in der Regel innerhalb eines Werktags.`} />

      {/* Weitere Leistungen */}
      <section className="border-t border-white/10 bg-forest-950 pb-20 lg:pb-24">
        <div className="shell pt-14">
          <p data-reveal className="eyebrow text-white/60">Weitere Leistungen</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {andere.map((a) => {
              const AIcon = leistungsIcons[a.slug]
              return (
                <li key={a.slug} data-reveal>
                  <Link
                    to={`/leistungen/${a.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[.04] px-5 py-4 transition-colors hover:border-lime/50 hover:bg-white/[.08]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-lime/15 text-lime">
                      {AIcon ? <AIcon className="h-5 w-5" /> : null}
                    </span>
                    <span className="min-w-0 flex-1 font-display text-[1.2rem] font-bold uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-lime">
                      {a.kurzTitel ?? a.titel}
                    </span>
                    <IconArrow className="h-4 w-4 shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-lime" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}
