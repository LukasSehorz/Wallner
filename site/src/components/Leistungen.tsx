import { useRef, useState } from 'react'
import { firma, leistungen } from '../content'
import { IconArrow, IconCheck, IconPin, leistungsIcons } from './icons'

/**
 * Leistungs-Section nach BP-Marine-Vorbild: dunkle Platte mit drei Spalten —
 * Tab-Liste links, Bild in der Mitte, heller Detailbereich rechts.
 */
export default function Leistungen() {
  const [aktiv, setAktiv] = useState(0)
  const l = leistungen[aktiv]
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  /** Pfeiltasten-Steuerung nach WAI-ARIA-Tabs-Muster. */
  function onKeyDown(e: React.KeyboardEvent) {
    const last = leistungen.length - 1
    let next: number | null = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = aktiv === last ? 0 : aktiv + 1
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = aktiv === 0 ? last : aktiv - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setAktiv(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="leistungen" tabIndex={-1} className="relative overflow-hidden bg-forest-900 pb-10 pt-24 lg:pb-16 lg:pt-32">
      {/* dezenter Lichtkegel oben rechts wie bei der Referenz */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-[.16] blur-3xl"
        style={{ background: 'radial-gradient(circle,#AAC527 0%,transparent 68%)' }}
      />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-white/65">Was wir machen</p>
            <h2 className="display mt-5 text-[clamp(1.7rem,4.9vw,3.75rem)] h-gradient">
              Komplette Bauleistungen
            </h2>
          </div>
          <p className="text-[17px] leading-relaxed text-white/75 lg:pb-3 lg:text-[19px]">
            Vom Innenausbau über die Badsanierung bis zu Außenanlagen und Erdarbeiten: Wallner Bau &amp;
            Garten bringt Team, Gerät und Erfahrung mit, um Ihr Projekt sauber zu Ende zu bringen.
          </p>
        </div>

        {/* Platte */}
        <div className="mt-14 rounded-[28px] border border-white/[.08] bg-white/[.04] p-3 shadow-plate sm:p-4">
          <div className="grid overflow-hidden rounded-2xl lg:grid-cols-[minmax(0,362px)_minmax(0,1fr)_minmax(0,400px)]">
            {/* Spalte 1 — Tabs */}
            <ul
              className="flex flex-col gap-2.5 bg-forest-950/40 p-3 sm:p-4"
              role="tablist"
              aria-label="Leistungen"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
            >
              {leistungen.map((s, idx) => {
                const Icon = leistungsIcons[idx]
                const on = idx === aktiv
                return (
                  <li key={s.nr} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`leistung-tab-${s.nr}`}
                      aria-selected={on}
                      aria-controls="leistung-panel"
                      tabIndex={on ? 0 : -1}
                      ref={(el) => {
                        tabs.current[idx] = el
                      }}
                      onClick={() => setAktiv(idx)}
                      className={`group flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                        on
                          ? 'border-lime bg-[#43570F] shadow-limeGlow'
                          : 'border-white/[.07] bg-white/[.035] hover:border-white/20 hover:bg-white/[.07]'
                      }`}
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors ${
                          on ? 'bg-lime text-forest-950' : 'bg-white/10 text-white/70'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${
                            on ? 'text-white/70' : 'text-white/55'
                          }`}
                        >
                          Leistung {s.nr}
                        </span>
                        <span
                          className={`block font-display text-xl font-bold uppercase leading-tight tracking-wide ${
                            on ? 'text-white' : 'text-white'
                          }`}
                        >
                          {s.titel}
                        </span>
                        <span
                          className={`mt-0.5 block truncate text-[12px] font-medium ${
                            on ? 'text-white/75' : 'text-white/55'
                          }`}
                        >
                          {s.kicker}
                        </span>
                      </span>
                      <IconArrow
                        className={`h-4 w-4 shrink-0 transition-all ${
                          on ? 'text-lime' : 'text-white/35 group-hover:translate-x-0.5 group-hover:text-white/70'
                        }`}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Spalte 2 — Bild */}
            <div className="relative min-h-[280px] overflow-hidden bg-forest-950 lg:min-h-0">
              {leistungen.map((s, idx) => (
                <img
                  key={s.nr}
                  src={s.bild}
                  alt={`${s.titel} — ${s.kicker}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                  style={{ opacity: idx === aktiv ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 p-4 lg:hidden">
                <span className="pill bg-forest-950/70">{l.kicker}</span>
              </div>
            </div>

            {/* Spalte 3 — Detail */}
            <div
              id="leistung-panel"
              role="tabpanel"
              aria-labelledby={`leistung-tab-${l.nr}`}
              tabIndex={0}
              className="flex flex-col justify-center gap-5 bg-white p-7 sm:p-9"
            >
              <h3 className="display text-[clamp(1.65rem,2.8vw,2.35rem)] text-moss-900">{l.titel}</h3>
              <p className="text-[15px] leading-relaxed text-moss-900/75">{l.text}</p>

              <ul className="flex flex-col gap-3">
                {l.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[14px] font-medium text-moss-900/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-forest-950">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Vertrauenskarte an der Stelle, an der BP Marine die
                  Partner-Karte platziert */}
              <div className="rounded-xl border border-lime/40 bg-lime/12 p-5">
                <p className="text-[14px] font-semibold leading-relaxed text-moss-900">
                  {firma.subclaim}
                </p>
                <p className="mt-3 flex items-start gap-2 text-[12.5px] font-medium text-moss-900/75">
                  <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-dark" />
                  {firma.gebiet.replaceAll(' · ', ' · ')}
                </p>
              </div>

              <a href="#kontakt" className="btn-primary w-fit">
                Jetzt anfragen
                <IconArrow className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
