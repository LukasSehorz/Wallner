import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { firma, vorherNachher } from '../content'
import { Link } from '../router'
import { IconArrow, IconPhone } from './icons'

/**
 * Hero mit dem Vorher/Nachher-Reveal (Vorbild: Header78 der Schmidt-Seite).
 *
 * Grundebene ist der fertige Raum; der Mauszeiger schneidet einen Kreis frei,
 * in dem der Rohbau darunter zum Vorschein kommt — wie eine Lupe, die zeigt,
 * wo das Ganze angefangen hat. Beide Bilder sind deckungsgleich, deshalb wirkt
 * es wie ein Blick zurück in denselben Raum statt wie zwei getrennte Fotos.
 * Der Effekt braucht einen feinen Zeiger — auf Touchgeräten gibt es keinen
 * Hover, dort läuft stattdessen der Hochkant-Clip.
 *
 * Zwischenstand 07.09.2026: Der Reveal war kurzzeitig durch einen Regler über
 * den ganzen Bildschirm ersetzt (Bildpaar als Hintergrund, auch auf dem Handy).
 * Auf Wunsch wieder zurückgebaut — der Kreis ist der gewünschte Effekt.
 *
 * Der Leistungs-Index, der früher rechts im Hero stand, ist bewusst nicht
 * zurückgekommen: die Leistungen stehen jetzt direkt darunter als eigene
 * Section, und die Startseite soll nach Kundenwunsch kurz bleiben.
 *
 * Der Text bekommt beim Laden einen Auftakt: die beiden Headline-Zeilen fahren
 * hinter einer Kante hoch, der Balken zieht sich auf, der Rest kommt gestaffelt
 * nach. Anders als im Rest der Seite hängt das nicht am Scrollen — der Hero
 * steht ja schon im Bild.
 */
const HERO_VIDEO_9x16 = '/video/hero-innenausbau-9x16.mp4'
const HERO_POSTER_9x16 = '/video/hero-poster-9x16.jpg'

/** Radius des freigeschnittenen Kreises in px. */
const RADIUS = 210

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reveal = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)

  /* Auftakt beim Laden. Bewusst `gsap.from`: der Zielzustand ist der normale
     Zustand des Markups. Läuft das Skript nicht, steht der Text einfach da —
     bei `gsap.to` aus einem CSS-Startwert heraus wäre er dauerhaft weg. */
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })

      tl.from('[data-auftakt="eyebrow"]', { y: 14, opacity: 0, duration: 0.6 })
        .from('[data-auftakt="zeile"]', { yPercent: 118, duration: 0.95, stagger: 0.11 }, '-=0.35')
        .from(
          '[data-auftakt="balken"]',
          { scaleX: 0, transformOrigin: 'left center', duration: 0.85 },
          '-=0.55',
        )
        .from('[data-auftakt="claim"]', { y: 18, opacity: 0, duration: 0.6 }, '-=0.55')
        .from('[data-auftakt="text"]', { y: 18, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('[data-auftakt="cta"]', { y: 18, opacity: 0, duration: 0.6 }, '-=0.42')
        .from('[data-auftakt="fuss"]', { opacity: 0, duration: 0.7 }, '-=0.3')
    }, sec)

    return () => ctx.revert()
  }, [])

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

      {/* Desktop-Grundebene: der fertige Raum */}
      <img
        src={vorherNachher.nachher}
        alt={vorherNachher.nachherAlt}
        fetchPriority="high"
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
        style={{ objectPosition: 'center 55%' }}
      />

      {/* Verlaufsmasken — links Text-Lesbarkeit, rechts bleibt das Motiv sichtbar.
          Auf dem Desktop liegt darunter jetzt das helle Fertig-Bild, deshalb
          deckt der Verlauf dort etwas mehr ab als über dem dunklen Rohbau. */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/85 to-forest-950/55 lg:via-forest-950/80 lg:to-forest-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-forest-950/30" />

      {/* Reveal-Ebene: der Rohbau, per clip-path freigeschnitten.
          Der Verlauf liegt im selben Wrapper, damit die Headline auch im Kreis
          lesbar bleibt. Er ist schwächer als der der Grundebene — das Rohbau-
          Bild ist ohnehin dunkel, und der Kreis soll sich deutlich abheben. */}
      <div
        ref={reveal}
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{ clipPath: 'circle(0px at 50% 50%)', willChange: 'clip-path' }}
      >
        <img
          src={vorherNachher.vorher}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 55%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/40 to-forest-950/8" />
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

      <div className="shell relative z-10 flex min-h-[92vh] flex-col justify-center pb-24 pt-[130px] lg:min-h-[100vh] lg:pb-28">
        <div className="max-w-[760px]">
          <p data-auftakt="eyebrow" className="eyebrow text-white/70">
            {firma.gebiet}
          </p>

          {/* Jede Zeile sitzt in einer Maske (`overflow-hidden`), aus der sie
              hochfährt. Das Padding gibt den Oberlängen Luft, die negative
              Marge nimmt es für das Layout wieder zurück — sonst stünden die
              beiden Zeilen weiter auseinander als ohne Animation. */}
          <h1 className="display mt-6 text-[clamp(2.1rem,7.4vw,6.2rem)]">
            <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
              <span data-auftakt="zeile" className="block h-gradient">
                Wallner Bau
              </span>
            </span>
            <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
              <span data-auftakt="zeile" className="block text-white">
                und Garten
              </span>
            </span>
          </h1>

          {/* Akzentbalken unter der Headline */}
          <div
            aria-hidden="true"
            data-auftakt="balken"
            className="mt-4 h-[7px] w-full max-w-[720px] rounded-full"
            style={{ background: 'linear-gradient(90deg,#AAC527 0%,#AAC527 45%,rgba(170,197,39,0) 100%)' }}
          />

          {/* Slogan aus dem Logo, in der Headline-Schrift und im Markengrün */}
          <p
            data-auftakt="claim"
            className="display mt-6 text-[clamp(1.3rem,2.8vw,2.15rem)] tracking-[0.06em] text-lime"
          >
            {firma.claim}
          </p>

          {/* Kurzfassung: was wir machen und seit wann. Alles Weitere steht auf
              den Unterseiten — ausdrücklicher Wunsch des Kunden. */}
          <p
            data-auftakt="text"
            className="mt-6 max-w-[560px] text-[17px] font-medium leading-relaxed text-white/90 sm:text-[20px]"
          >
            Ihr Handwerksbetrieb für Trockenbau, Innenausbau, Sanierung und Außenanlagen — seit über{' '}
            {firma.jahre} Jahren im Raum Mühldorf am Inn.
          </p>

          <div data-auftakt="cta" className="mt-9 flex flex-wrap gap-3.5">
            <Link to="/kontakt" className="btn-primary cursor-pointer">
              Jetzt anfragen
              <IconArrow className="h-4 w-4" />
            </Link>
            <a href={firma.telefonHref} className="btn-ghost cursor-pointer">
              <IconPhone className="h-4 w-4" />
              {firma.telefon}
            </a>
          </div>
        </div>
      </div>

      {/* Fußzeile: Bedienhinweis (nur wo der Effekt läuft) und Bildnachweis */}
      <div
        data-auftakt="fuss"
        className="shell absolute inset-x-0 bottom-5 z-10 flex flex-wrap items-end justify-between gap-3"
      >
        <p className="hidden items-center gap-2.5 text-[12.5px] font-medium text-white/60 lg:flex">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-lime/40">
            <span className="block h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          Maus über das Bild bewegen: so sah der Raum vorher aus
        </p>
        <span className="ml-auto hidden rounded border border-white/20 bg-forest-950/50 px-2 py-0.5 text-[10.5px] uppercase tracking-wider text-white/55 backdrop-blur lg:inline">
          {vorherNachher.hinweis}
        </span>
      </div>
    </section>
  )
}
