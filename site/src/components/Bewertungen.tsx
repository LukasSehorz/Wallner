import { useEffect, useState } from 'react'
import { bewertungen, bewertungenFreigegeben, firma } from '../content'
import { IconChevronLeft, IconChevronRight, IconGoogle, IconStar } from './icons'

/**
 * Google-Bewertungen im Zitat-Layout von J Davis: großes Zitat in Markenfarbe
 * auf hellem Grund, weißer Kreis dahinter, Name und Rolle links daneben.
 *
 * TODO Kunde: Die Rezensionen in `content.ts` sind Platzhalter und müssen durch
 * die echten Texte aus dem Google-Unternehmensprofil ersetzt werden.
 */
export default function Bewertungen() {
  const [i, setI] = useState(0)
  const b = bewertungen[i]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % bewertungen.length), 9000)
    return () => clearInterval(t)
  }, [])

  // Platzhalter dürfen nicht live gehen — im Dev-Server bleiben sie sichtbar,
  // damit das Layout prüfbar ist. Der Abbruch steht bewusst nach allen Hooks.
  if (!bewertungenFreigegeben && import.meta.env.PROD) return null

  return (
    <section className="relative overflow-hidden bg-mist py-16 lg:py-20" aria-label="Google Bewertungen">
      {/* Kreis hinter dem Zitat */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[min(62vw,560px)] -translate-x-[30%] -translate-y-[46%] rounded-full bg-white lg:block"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <IconGoogle className="h-6 w-6" />
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-moss-900/70">
              Google Bewertungen
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setI((v) => (v - 1 + bewertungen.length) % bewertungen.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-moss-900/20 text-moss-900 transition-all hover:border-lime hover:bg-lime"
              aria-label="Vorherige Bewertung"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <p className="font-display font-bold text-xl tabular-nums tracking-widest text-moss-900/70">
              {String(i + 1).padStart(2, '0')} / {String(bewertungen.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % bewertungen.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-moss-900/20 text-moss-900 transition-all hover:border-lime hover:bg-lime"
              aria-label="Nächste Bewertung"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center">
          <div className="lg:pb-4">
            <div className="flex gap-1 text-lime-dark" aria-label={`${b.sterne} von 5 Sternen`}>
              {Array.from({ length: b.sterne }).map((_, s) => (
                <IconStar key={s} className="h-5 w-5" />
              ))}
            </div>
            <p className="mt-4 text-[16px] font-semibold text-moss-900">{b.name}</p>
            <p className="text-[14px] text-moss-900/75">{b.rolle}</p>
            {b.platzhalter && (
              <p className="mt-4 inline-block rounded-md border border-lime-deep/40 bg-lime/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-lime-dark">
                Platzhalter — echte Rezension folgt
              </p>
            )}
          </div>

          {/* Zitat in der Fließtextschrift wie bei J Davis — nicht in Teko,
              sonst liest es sich als Headline statt als Rezension. */}
          <blockquote
            key={i}
            className="animate-fadeUp font-sans text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-[1.25] text-lime-dark"
          >
            „{b.text}“
          </blockquote>
        </div>

        <p className="mt-12 text-[13px] text-moss-900/75">
          Bewertungen aus dem Google-Unternehmensprofil von {firma.name}.
        </p>
      </div>
    </section>
  )
}
