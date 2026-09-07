import { useRef, type ReactNode } from 'react'
import { useReveal } from '../anim'
import { Link } from '../router'
import { IconChevronLeft } from './icons'

/**
 * Kopfbereich der Unterseiten: Bild als Hintergrund, darüber Rückweg,
 * Kennzeichnung und Überschrift. Bewusst flacher als der Hero der Startseite —
 * die Unterseite soll sofort zum Inhalt kommen.
 */
export default function Seitenkopf({
  eyebrow,
  titel,
  text,
  bild,
  bildAlt,
  zurueck,
  children,
}: {
  eyebrow: string
  titel: ReactNode
  text?: string
  bild: string
  bildAlt: string
  zurueck?: { label: string; to: string }
  children?: ReactNode
}) {
  const root = useRef<HTMLElement>(null)
  // Der Kopf steht beim Aufruf schon im Bild — die Staffelung wirkt hier als
  // Auftakt der Seite, nicht als Scroll-Effekt.
  useReveal(root, { start: 'top 100%', versatz: 22 })

  return (
    <section ref={root} className="relative flex min-h-[52svh] flex-col justify-end overflow-hidden bg-forest-950 pb-14 pt-[126px] sm:pt-[150px] lg:min-h-[58svh] lg:pb-20">
      <img
        src={bild}
        alt={bildAlt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 55%' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest-950/96 via-forest-950/85 to-forest-950/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/70"
      />

      <div className="shell relative">
        {zurueck && (
          <Link
            data-reveal
            to={zurueck.to}
            className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-lime"
          >
            <IconChevronLeft className="h-4 w-4" />
            {zurueck.label}
          </Link>
        )}

        <p data-reveal className={`eyebrow text-lime ${zurueck ? 'mt-7' : ''}`}>{eyebrow}</p>

        <h1 data-reveal className="display mt-5 text-[clamp(2rem,6.4vw,4.6rem)] text-white">
          {titel}
        </h1>

        {text && (
          <p
            data-reveal
            className="mt-6 max-w-[640px] text-[17px] leading-relaxed text-white/80 sm:text-[19px]"
          >
            {text}
          </p>
        )}

        {/* Die Schaltflächen der Unterseiten kommen als letztes dazu. Der
            Wrapper trägt die Markierung, damit der Aufrufer nichts wissen muss. */}
        {children && <div data-reveal>{children}</div>}
      </div>
    </section>
  )
}
