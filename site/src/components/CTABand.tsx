import { firma } from '../content'
import { Link } from '../router'
import { IconArrow, IconPhone } from './icons'

/**
 * Kontaktabsprung am Ende jeder Unterseite.
 *
 * Kundenwunsch: „+ Button für Kontakt auf jeder Leistungsseite." Damit steht
 * auf jeder Unterseite derselbe kurze Weg zur Anfrage — telefonisch oder über
 * das Formular.
 */
export default function CTABand({ text }: { text?: string }) {
  return (
    <section className="bg-forest-950 py-16 lg:py-20">
      <div className="shell">
        {/* Kein eigener Scroll-Haken: die Leiste steht immer innerhalb einer
            Unterseite, und die bringt ihren mit. Zwei Haken auf denselben
            Elementen würden sich gegenseitig überschreiben. */}
        <div data-reveal className="flex flex-col gap-7 rounded-2xl border border-lime/25 bg-gradient-to-r from-lime/[.16] to-transparent p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[640px]">
            <h2 className="display text-[clamp(1.5rem,3.4vw,2.4rem)] text-white">
              Interessiert? Dann melden Sie sich.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-white/75">
              {text ??
                'Wir schauen uns Ihr Projekt vor Ort an und erstellen ein Angebot nach Ihren Vorstellungen.'}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link to="/kontakt" className="btn-primary justify-center">
              Anfrage senden
              <IconArrow className="h-4 w-4" />
            </Link>
            <a href={firma.telefonHref} className="btn-ghost justify-center">
              <IconPhone className="h-4 w-4" />
              {firma.telefon}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
