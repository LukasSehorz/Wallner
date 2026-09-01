import { useEffect, useRef } from 'react'
import { firma, leistungen, vorherNachher } from '../content'
import { IconArrow, IconPhone } from './icons'

/**
 * Hero nach Vorbild BP Marine: formatfüllendes Bild, dunkler Verlauf, Eyebrow mit
 * Strich, zweizeilige Headline, zwei CTAs — ergänzt um zwei Elemente:
 *
 * 1. Vorher/Nachher-Reveal (Vorbild: Header78 der Schmidt-Seite). Grundebene ist
 *    die Baustelle; der Mauszeiger schneidet einen Kreis frei, in dem der fertige
 *    Raum steht. Beide Bilder sind deckungsgleich, deshalb wirkt es wie ein Blick
 *    in die Zukunft desselben Raums statt wie zwei getrennte Fotos.
 *    Nur bei feinem Zeiger (Maus) — Touch hat keinen Hover, dort steht statt
 *    dessen der Regler in der Leistungsdetail-Section.
 * 2. Leistungs-Index rechts, der in die Detail-Section springt.
 *
 * Bewegtbild-Stand: Hochkant (9:16) liegt als Kling-3.0-Clip vor und läuft auf
 * Mobilgeräten. Der Desktop zeigt das Reveal-Bildpaar.
 */
const HERO_VIDEO_9x16 = '/video/hero-innenausbau-9x16.mp4'
const HERO_POSTER_9x16 = '/video/hero-poster-9x16.jpg'

/** Radius des freigeschnittenen Kreises in px. */
const RADIUS = 210

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reveal = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = sectionRef.current
    const rev = reveal.current
    const cur = cursor.current
    if (!sec || !rev || !cur) return

    // Touch-Geräte und Nutzer mit reduzierter Bewegung bekommen den Effekt nicht.
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let tx = 0
    let ty = 0
    let sx = 0
    let sy = 0
    let aktiv = false
    let raf = 0

    const zu = () => {
      rev.style.clipPath = 'circle(0px at 50% 50%)'
      cur.style.opacity = '0'
    }

    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      if (!aktiv) {
        // Beim Eintreten ohne Nachlauf starten, sonst fliegt der Kreis
        // von der letzten Position quer durchs Bild.
        aktiv = true
        sx = tx
        sy = ty
        cur.style.opacity = '1'
      }
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!aktiv) return
      sx += (tx - sx) * 0.18
      sy += (ty - sy) * 0.18
      rev.style.clipPath = `circle(${RADIUS}px at ${sx}px ${sy}px)`
      cur.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`
    }

    const onLeave = () => {
      aktiv = false
      zu()
    }

    zu()
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      zu()
    }
  }, [])

  return (
    <section
      id="start"
      ref={sectionRef}
      className="relative min-h-[92vh] overflow-hidden bg-forest-950 lg:min-h-[100vh] lg:[cursor:none]"
    >
      {/* Mobil: echter Hochkant-Clip aus dem Innenausbau-Projekt */}
      <video
        className="absolute inset-0 h-full w-full object-cover lg:hidden"
        src={HERO_VIDEO_9x16}
        poster={HERO_POSTER_9x16}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Desktop-Grundebene: die Baustelle */}
      <img
        src={vorherNachher.vorher}
        alt={vorherNachher.vorherAlt}
        fetchPriority="high"
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
        style={{ objectPosition: 'center 55%' }}
      />

      {/* Verlaufsmasken — links Text-Lesbarkeit, rechts bleibt das Motiv sichtbar */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/85 to-forest-950/55 lg:via-forest-950/70 lg:to-forest-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-forest-950/30" />

      {/* Reveal-Ebene: der fertige Raum, per clip-path freigeschnitten.
          Der Verlauf liegt im selben Wrapper, damit die Headline auch über dem
          hellen Nachher-Bild lesbar bleibt — nur spürbar heller als die
          Grundebene, sonst wäre der Effekt kaum zu sehen. */}
      <div
        ref={reveal}
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{ clipPath: 'circle(0px at 50% 50%)', willChange: 'clip-path' }}
      >
        <img
          src={vorherNachher.nachher}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 55%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/82 via-forest-950/28 to-transparent" />
      </div>

      {/* Eigener Zeiger: Ring mit Punkt, nur solange der Reveal aktiv ist */}
      <div
        ref={cursor}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden place-items-center lg:grid"
        style={{ height: 54, width: 54, opacity: 0, transition: 'opacity .25s ease', willChange: 'transform' }}
      >
        <span className="absolute inset-0 rounded-full border border-lime/70" />
        <span className="block h-1.5 w-1.5 rounded-full bg-lime" />
      </div>

      <div className="shell relative z-10 grid min-h-[92vh] grid-cols-1 items-center gap-y-12 pb-8 pt-[130px] sm:pb-16 lg:min-h-[100vh] lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-x-16 lg:pb-24">
        {/* Spalte 1 — Kernaussage */}
        <div>
          <p className="eyebrow text-white/70">{firma.gebiet}</p>

          <h1 className="display mt-6 text-[clamp(1.85rem,6.9vw,5.9rem)]">
            <span className="block h-gradient">Komplett-Service</span>
            <span className="block text-white">Bau und Garten</span>
          </h1>

          {/* Akzentbalken unter der Headline */}
          <div
            className="mt-4 h-[7px] w-full max-w-[820px] rounded-full"
            style={{ background: 'linear-gradient(90deg,#AAC527 0%,#AAC527 45%,rgba(170,197,39,0) 100%)' }}
          />

          {/* Slogan aus dem Logo, in der Headline-Schrift und im Markengrün */}
          <p className="display mt-6 text-[clamp(1.25rem,2.6vw,2.05rem)] tracking-[0.06em] text-lime">
            {firma.claim}
          </p>

          <p className="mt-6 max-w-[640px] text-[17px] leading-relaxed text-white/85 sm:text-[19px]">
            {firma.name} ist Ihr zuverlässiger Partner für Innenausbau, Sanierung, Renovierung und
            Außenanlagen. Wir realisieren Projekte für Privat und Gewerbe im Raum Mühldorf am Inn,
            München, Burghausen und Landshut.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a href="#kontakt" className="btn-primary cursor-pointer">
              Jetzt anfragen
              <IconArrow className="h-4 w-4" />
            </a>
            <a href={firma.telefonHref} className="btn-ghost cursor-pointer">
              <IconPhone className="h-4 w-4" />
              {firma.telefon}
            </a>
          </div>

          <ul className="mt-11 flex flex-wrap gap-3">
            <li className="pill">Über {firma.jahre} Jahre Erfahrung</li>
            <li className="pill">Raum Mühldorf am Inn</li>
            <li className="pill">Privat &amp; Gewerbe</li>
          </ul>
        </div>

        {/* Spalte 2 — Leistungs-Index, führt in die Detail-Section */}
        {/* Der Reveal-Kreis wandert unter dieser Liste durch. Ohne eigene Fläche
            säße weiße Schrift zeitweise auf hellem Eichenholz — deshalb ab lg
            eine leicht mattierte Platte, die den Kontrast unabhängig vom
            Bildinhalt hält und das Bild dahinter trotzdem durchscheinen lässt. */}
        <nav
          aria-label="Unsere Leistungen"
          className="lg:rounded-2xl lg:border lg:border-white/[.09] lg:bg-forest-950/50 lg:p-6 lg:pt-7 lg:backdrop-blur-[3px]"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 shrink-0 bg-lime" />
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              Unsere Leistungen
            </p>
          </div>

          <ul className="relative mt-5 lg:mt-7">
            {/* Senkrechte Linie als linke Kante der Liste */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-px"
              style={{
                background:
                  'linear-gradient(180deg, rgba(170,197,39,.9) 0%, rgba(170,197,39,.35) 72%, rgba(170,197,39,0) 100%)',
              }}
            />
            {leistungen.map((l, i) => (
              <li key={l.slug} className={i < leistungen.length - 1 ? 'border-b border-white/[.09]' : ''}>
                <a
                  href={`#leistung-${l.slug}`}
                  className="group flex cursor-pointer items-center gap-4 py-3 pl-5 pr-2 transition-colors duration-200 hover:bg-white/[.06] sm:gap-5 sm:pl-7 lg:py-[.85rem]"
                >
                  <span className="font-sans text-[11px] font-bold tabular-nums tracking-[0.2em] text-lime/85">
                    {l.nr}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block font-display text-[1.35rem] font-bold uppercase leading-none tracking-wide text-white lg:text-[1.7rem]"
                      style={{ textShadow: '0 2px 16px rgba(0,0,0,.65)' }}
                    >
                      {l.titel}
                    </span>
                    <span className="mt-1 block truncate text-[12.5px] font-medium text-white/75">
                      {l.kicker}
                    </span>
                  </span>
                  <IconArrow className="h-4 w-4 shrink-0 text-white/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-lime" />
                </a>
              </li>
            ))}
          </ul>

          {/* Bedienhinweis — ohne ihn findet kaum jemand den Reveal */}
          <p className="mt-6 hidden items-center gap-2.5 text-[12px] font-medium text-white/45 lg:flex">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-lime/40">
              <span className="block h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            Maus über das Bild bewegen: Rohbau wird zum fertigen Raum
          </p>
        </nav>
      </div>
    </section>
  )
}
