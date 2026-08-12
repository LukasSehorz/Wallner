import { useCallback, useEffect, useRef, useState } from 'react'
import { galerie } from '../content'
import { IconArrow, IconChevronLeft, IconChevronRight, IconClose } from './icons'

/**
 * Galerie-Karussell nach BP-Marine-Vorbild: dunkle Platte, Zähler „04 / 19",
 * Pfeil-Buttons, Fortschrittsbalken und Lightbox. Darunter das CTA-Band.
 */
export default function Galerie() {
  const track = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [box, setBox] = useState<number | null>(null)
  const dialog = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  /** Lightbox öffnen und merken, wohin der Fokus danach zurück muss. */
  const openBox = (i: number, el: HTMLElement) => {
    opener.current = el
    setBox(i)
  }

  const onScroll = useCallback(() => {
    const t = track.current
    if (!t) return
    const max = t.scrollWidth - t.clientWidth
    setProgress(max > 0 ? t.scrollLeft / max : 0)
    const card = t.querySelector<HTMLElement>('li')
    if (card) {
      const step = card.offsetWidth + 16
      setIndex(Math.min(galerie.length - 1, Math.round(t.scrollLeft / step)))
    }
  }, [])

  const nudge = (dir: -1 | 1) => {
    const t = track.current
    if (!t) return
    const card = t.querySelector<HTMLElement>('li')
    const step = card ? card.offsetWidth + 16 : 320
    t.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Lightbox: Tastatursteuerung, Fokusfalle und Fokusrückgabe
  useEffect(() => {
    if (box === null) return

    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBox(null)
        return
      }
      if (e.key === 'ArrowRight') setBox((v) => (v === null ? v : (v + 1) % galerie.length))
      if (e.key === 'ArrowLeft') setBox((v) => (v === null ? v : (v - 1 + galerie.length) % galerie.length))
      if (e.key !== 'Tab') return

      // Fokus im Dialog halten — sonst wandert er unsichtbar durch die Seite
      const f = dialog.current?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
      if (!f || f.length === 0) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener.current?.focus()
    }
  }, [box])

  return (
    <section className="relative overflow-hidden bg-forest-900 pb-14 lg:pb-20">
      <div className="shell relative">
        {/* Platte */}
        <div className="rounded-[28px] border border-white/[.08] bg-gradient-to-b from-white/[.07] to-white/[.02] p-7 shadow-plate sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-white/60">Weitere Projektfotos</p>
              <h2 className="display mt-4 text-[clamp(1.7rem,4.9vw,3.75rem)] text-white">
                Mehr Arbeit von der Baustelle
              </h2>
              <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-white/70">
                Blättern Sie durch weitere Aufnahmen aus Innenausbau, Trockenbau, Badsanierung,
                Außenanlagen und Erdarbeiten.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => nudge(-1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition-all hover:border-lime hover:bg-lime hover:text-forest-950"
                aria-label="Vorheriges Bild"
              >
                <IconChevronLeft className="h-5 w-5" />
              </button>
              <p className="font-display font-bold text-2xl tabular-nums tracking-widest text-white/85">
                {String(index + 1).padStart(2, '0')} / {galerie.length}
              </p>
              <button
                type="button"
                onClick={() => nudge(1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition-all hover:border-lime hover:bg-lime hover:text-forest-950"
                aria-label="Nächstes Bild"
              >
                <IconChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Track */}
          <ul
            ref={track}
            onScroll={onScroll}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
          >
            {galerie.map((g, i) => (
              <li
                key={g.bild}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31.6%]"
              >
                <button
                  type="button"
                  onClick={(e) => openBox(i, e.currentTarget)}
                  className="group block w-full overflow-hidden rounded-xl bg-forest-950"
                  aria-label={`${g.alt} — größer anzeigen`}
                >
                  <img
                    src={g.bild}
                    alt={g.alt}
                    loading="lazy"
                    className="h-[230px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[280px]"
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Fortschritt */}
          <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-lime transition-[width] duration-150"
              style={{ width: `${Math.max((100 / galerie.length) * 3, progress * 100)}%` }}
            />
          </div>
        </div>

        {/* CTA-Band */}
        <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-lime/25 bg-gradient-to-r from-lime/[.14] to-transparent p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[720px] text-[17px] font-semibold leading-relaxed text-white">
            Sie haben ein Projekt im Kopf — Innenausbau, Bad, Terrasse oder Erdarbeiten? Wir schauen
            uns die Baustelle an und sagen Ihnen ehrlich, was sinnvoll ist.
          </p>
          <a href="#kontakt" className="btn-primary shrink-0">
            Projekt starten
            <IconArrow className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {box !== null && (
        <div
          ref={dialog}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          onClick={() => setBox(null)}
        >
          <button
            type="button"
            ref={closeBtn}
            onClick={() => setBox(null)}
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white hover:border-lime hover:text-lime"
            aria-label="Schließen"
          >
            <IconClose className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setBox((v) => (v === null ? v : (v - 1 + galerie.length) % galerie.length))
            }}
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white hover:border-lime hover:text-lime sm:left-8"
            aria-label="Vorheriges Bild"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-5xl">
            <img
              src={galerie[box].bild}
              alt={galerie[box].alt}
              className="max-h-[78vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center text-[13px] text-white/70">
              {galerie[box].alt}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setBox((v) => (v === null ? v : (v + 1) % galerie.length))
            }}
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white hover:border-lime hover:text-lime sm:right-8"
            aria-label="Nächstes Bild"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  )
}
