import { useRef, useState } from 'react'
import { bewertungen, bewertungenFreigegeben, firma } from '../content'
import { useReveal } from '../anim'
import { IconChevronLeft, IconChevronRight, IconGoogle, IconStar } from './icons'

/**
 * Google-Bewertungen als räumliches Banner: die mittlere Karte steht vorne,
 * links und rechts daneben kippen die Nachbarn nach hinten weg. Über die Pfeile
 * rotiert die Reihe endlos durch.
 *
 * Umsetzung ohne absolute Positionierung: alle Karten liegen im selben
 * Raster­feld (`grid-area: 1/1`). Dadurch ist der Rahmen automatisch so hoch wie
 * die längste Rezension und alle Karten sind gleich hoch — bei absoluter
 * Positionierung müsste man die Höhe raten oder messen, und der kurze
 * „Super Service"-Text hätte den Rahmen zusammenfallen lassen.
 *
 * Die Tiefe entsteht durch `perspective` auf dem Rahmen und `translateZ` /
 * `rotateY` auf den Karten. Der Rahmen schneidet außen ab, sonst schöben die
 * hinteren Karten die Seite in die Breite.
 */

/**
 * Ruheposition der Nachbarn und der Karten dahinter.
 *
 * Der seitliche Versatz steht nicht hier, sondern als CSS-Variable `--nah` /
 * `--fern` an der Liste — er muss mit der Bildschirmbreite kleiner werden.
 * Bei festen 86 % waren die Nachbarn auf dem Handy fast komplett aus dem Bild
 * geschoben; am Desktop wiederum lag die vordere Karte bei kleineren Werten
 * über ihnen. Über die Variable regelt das der Breakpoint statt JavaScript.
 */
const NACHBAR = { z: -240, dreh: 38, skala: 0.86, deckung: 0.85, versatz: 'var(--nah)' }
const HINTEN = { z: -440, dreh: 44, skala: 0.74, deckung: 0, versatz: 'var(--fern)' }

/**
 * Kürzester Abstand zur aktiven Karte auf dem Ring: für fünf Karten immer ein
 * Wert zwischen -2 und 2, egal wie oft man weitergeklickt hat.
 */
function ringAbstand(i: number, aktiv: number, anzahl: number) {
  const halb = Math.floor(anzahl / 2)
  return ((((i - aktiv + halb) % anzahl) + anzahl) % anzahl) - halb
}

export default function Bewertungen() {
  const root = useRef<HTMLElement>(null)
  const wisch = useRef<{ x: number; y: number } | null>(null)
  const [aktiv, setAktiv] = useState(0)
  useReveal(root)

  const anzahl = bewertungen.length
  const weiter = (richtung: 1 | -1) => setAktiv((v) => (v + richtung + anzahl) % anzahl)

  // Der Schalter bleibt als Sicherung: fällt die Freigabe zurück auf false,
  // verschwindet die Section im Produktionsbuild wieder komplett.
  if (!bewertungenFreigegeben && import.meta.env.PROD) return null

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-mist py-16 lg:py-24"
      aria-label="Google Bewertungen"
    >
      {/* Sehr weicher Lichtfleck, damit die helle Fläche nicht flach wirkt */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[560px] w-[560px] rounded-full opacity-[.22] blur-3xl"
        style={{ background: 'radial-gradient(circle,#AAC527 0%,transparent 70%)' }}
      />

      <div className="shell relative">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-lime-dark">Kundenstimmen</p>
            <h2 className="display mt-5 text-[clamp(1.7rem,4.6vw,3.2rem)] text-moss-900">
              Das sagen unsere
              <br />
              Kundinnen und Kunden.
            </h2>
            <p className="mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-moss-900/70">
              Original-Rezensionen aus dem Google-Unternehmensprofil — unverändert übernommen.
            </p>
          </div>

          <a
            data-reveal
            href="https://www.google.com/search?q=Wallner+Bau+und+Garten+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-moss-900/12 bg-white py-3 pl-4 pr-5 shadow-[0_2px_12px_-8px_rgba(34,64,28,.5)] transition-all duration-200 hover:-translate-y-0.5 hover:border-lime hover:shadow-lift"
          >
            <IconGoogle className="h-6 w-6 shrink-0" />
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-moss-900/50">
                Bewertungen bei
              </span>
              <span className="block text-[15px] font-semibold text-moss-900">Google ansehen</span>
            </span>
          </a>
        </div>

        <div data-reveal className="mt-12">
          {/* Bühne. Das Wischen liegt hier und nicht auf den Karten, damit auch
              der Bereich neben den Karten zieht. `touch-action: pan-y` lässt das
              senkrechte Scrollen beim Browser. */}
          <div
            role="group"
            aria-roledescription="Karussell"
            aria-label="Google Bewertungen durchblättern"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') weiter(-1)
              else if (e.key === 'ArrowRight') weiter(1)
              else return
              e.preventDefault()
            }}
            onPointerDown={(e) => {
              wisch.current = { x: e.clientX, y: e.clientY }
            }}
            onPointerUp={(e) => {
              const start = wisch.current
              wisch.current = null
              if (!start) return
              const dx = e.clientX - start.x
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(e.clientY - start.y)) {
                weiter(dx < 0 ? 1 : -1)
              }
            }}
            className="relative overflow-hidden rounded-3xl py-6 [perspective:1000px]"
            style={{ touchAction: 'pan-y' }}
          >
            <ul className="grid [--fern:104%] [--nah:70%] sm:[--fern:112%] sm:[--nah:80%] lg:[--fern:120%] lg:[--nah:86%]">
              {bewertungen.map((b, i) => {
                const ab = ringAbstand(i, aktiv, anzahl)
                const seite = Math.sign(ab)
                const vorn = ab === 0
                const daneben = Math.abs(ab) === 1
                const lage = daneben ? NACHBAR : HINTEN

                return (
                  <li
                    key={b.name}
                    // Alle Karten im selben Rasterfeld — siehe Kopfkommentar.
                    style={{
                      gridArea: '1 / 1',
                      transform: vorn
                        ? 'translateX(0) translateZ(0) rotateY(0deg) scale(1)'
                        : `translateX(${seite < 0 ? `calc(-1 * ${lage.versatz})` : lage.versatz}) translateZ(${lage.z}px) rotateY(${-seite * lage.dreh}deg) scale(${lage.skala})`,
                      // Die Nachbarn etwas zurücknehmen, damit das Auge
                      // zuerst auf der vorderen Karte landet.
                      opacity: vorn ? 1 : lage.deckung,
                      zIndex: vorn ? 3 : daneben ? 2 : 1,
                      pointerEvents: vorn || daneben ? 'auto' : 'none',
                      willChange: 'transform',
                    }}
                    className="w-full max-w-[330px] justify-self-center transition-[transform,opacity] duration-[550ms] ease-out motion-reduce:transition-none sm:max-w-[380px] lg:max-w-[430px]"
                  >
                    <div
                      // Die Nachbarn holt ein Klick nach vorne — bequemer als
                      // jedes Mal den Pfeil zu treffen.
                      onClick={() => !vorn && daneben && weiter(seite as 1 | -1)}
                      aria-hidden={!vorn && !daneben}
                      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-7 sm:p-8 ${
                        vorn
                          ? 'border-lime/60 shadow-[0_30px_60px_-30px_rgba(34,64,28,.55)]'
                          : 'cursor-pointer border-moss-900/10 shadow-[0_18px_40px_-28px_rgba(34,64,28,.5)]'
                      }`}
                    >
                      {/* Anführungszeichen als Grafik. Rein dekorativ, deshalb aus
                          dem Textfluss genommen — sonst läse ein Screenreader es mit. */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -right-2 -top-9 select-none font-display text-[8rem] leading-none transition-colors duration-300 ${
                          vorn ? 'text-lime/35' : 'text-lime/15'
                        }`}
                      >
                        „
                      </span>

                      <div
                        className="relative flex gap-1 text-lime-dark"
                        aria-label={`${b.sterne} von 5 Sternen`}
                      >
                        {Array.from({ length: b.sterne }).map((_, s) => (
                          <IconStar key={s} className="h-[18px] w-[18px]" />
                        ))}
                      </div>

                      <blockquote className="relative mt-5 flex-1 text-[15.5px] leading-relaxed text-moss-900">
                        {b.text}
                      </blockquote>

                      {/* Nur im Dev-Server: Merker für die noch fehlenden Resttexte.
                          Im Livebuild sieht davon niemand etwas. */}
                      {b.gekuerzt && import.meta.env.DEV && (
                        <p className="relative mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-lime-dark/70">
                          <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" />
                          Rest bei Google abgeschnitten
                        </p>
                      )}

                      <div className="relative mt-7 flex items-center gap-3 border-t border-moss-900/10 pt-5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime/20 font-display text-[17px] font-bold uppercase text-lime-dark">
                          {b.name.slice(0, 1)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14.5px] font-semibold text-moss-900">
                            {b.name}
                          </span>
                          <span className="block text-[12.5px] text-moss-900/60">{b.datum}</span>
                        </span>
                        <IconGoogle className="h-[18px] w-[18px] shrink-0 opacity-70" />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Steuerung */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => weiter(-1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-moss-900/20 bg-white text-moss-900 transition-all hover:border-lime hover:bg-lime hover:text-forest-950"
              aria-label="Vorherige Bewertung"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>

            <p
              className="font-display text-[19px] font-bold tabular-nums tracking-widest text-moss-900/70"
              aria-live="polite"
            >
              {String(aktiv + 1).padStart(2, '0')} / {String(anzahl).padStart(2, '0')}
            </p>

            <button
              type="button"
              onClick={() => weiter(1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-moss-900/20 bg-white text-moss-900 transition-all hover:border-lime hover:bg-lime hover:text-forest-950"
              aria-label="Nächste Bewertung"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p data-reveal className="mt-10 text-center text-[13px] text-moss-900/60">
          Rezensionen aus dem Google-Unternehmensprofil von {firma.name}, Stand September 2026.
        </p>
      </div>
    </section>
  )
}
