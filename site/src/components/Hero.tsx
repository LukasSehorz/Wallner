import { useEffect, useState } from 'react'
import { firma } from '../content'
import { IconArrow, IconPhone } from './icons'

/**
 * Hero nach Vorbild BP Marine: formatfüllendes Bewegtbild, dunkler Verlauf,
 * Eyebrow mit Strich, zweizeilige Headline (Zeile 1 im Verlauf, Zeile 2 massiv
 * weiß mit Akzentbalken), zwei CTAs und drei Fakten-Pills.
 *
 * Bewegtbild-Stand:
 * - Hochkant (9:16) liegt als Kling-3.0-Clip vor und läuft auf Mobilgeräten.
 * - Für Desktop fehlt noch der 16:9-Clip; bis dahin greift die Bildschleife.
 *   Sobald er vorliegt, Pfad in HERO_VIDEO_16x9 eintragen — sonst nichts ändern.
 */
const HERO_VIDEO_16x9: string | null = null
const HERO_VIDEO_9x16 = '/video/hero-innenausbau-9x16.mp4'
const HERO_POSTER_9x16 = '/video/hero-poster-9x16.jpg'

/** Nur echte Querformat-Aufnahmen — sonst beschneidet object-cover das Motiv. */
const SLIDES = [
  { src: '/bilder/dachgeschoss-holzboden.jpg', pos: 'center 62%' },
  { src: '/bilder/bad-tuerkis-led.jpg', pos: 'center 45%' },
  { src: '/bilder/erdarbeiten-bagger-lkw.jpg', pos: 'center 62%' },
  { src: '/bilder/garten-pool-terrasse.jpg', pos: 'center 58%' },
]

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (HERO_VIDEO_16x9) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5200)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="start" className="relative min-h-[92vh] overflow-hidden bg-forest-950 lg:min-h-[100vh]">
      {/* Bewegtbild-Ebene */}
      <div className="absolute inset-0">
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

        {/* Desktop: 16:9-Clip, solange nicht vorhanden die Bildschleife */}
        <div className="absolute inset-0 hidden lg:block">
          {HERO_VIDEO_16x9 ? (
            <video
              className="h-full w-full object-cover"
              src={HERO_VIDEO_16x9}
              poster={SLIDES[0].src}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          ) : (
            SLIDES.map((s, idx) => (
              <img
                key={s.src}
                src={s.src}
                alt=""
                aria-hidden="true"
                fetchPriority={idx === 0 ? 'high' : 'low'}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  objectPosition: s.pos,
                  opacity: idx === i ? 1 : 0,
                  transform: idx === i ? 'scale(1.07)' : 'scale(1)',
                  transition: 'opacity 1600ms ease-in-out, transform 7200ms linear',
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Verlaufsmasken — links Text-Lesbarkeit, rechts bleibt das Motiv sichtbar */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/85 to-forest-950/55 lg:via-forest-950/65 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-forest-950/30" />

      <div className="shell relative flex min-h-[92vh] flex-col justify-center pb-8 pt-[130px] sm:pb-16 lg:min-h-[100vh] lg:pb-32">
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
          <a href="#kontakt" className="btn-primary">
            Jetzt anfragen
            <IconArrow className="h-4 w-4" />
          </a>
          <a href={firma.telefonHref} className="btn-ghost">
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
    </section>
  )
}
