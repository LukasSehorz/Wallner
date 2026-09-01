import { useEffect, useRef, useState } from 'react'
import { vorherNachher } from '../content'

/**
 * Vorher/Nachher-Regler als Gegenstück zum Maus-Reveal im Hero.
 *
 * Der Hero-Effekt braucht einen Mauszeiger und fällt auf Touch-Geräten weg —
 * hier bekommt dieselbe Aussage eine Bedienung, die überall funktioniert.
 *
 * Umgesetzt über ein natives `input[type=range]`, das unsichtbar über der
 * ganzen Fläche liegt: damit sind Ziehen mit Maus, Wischen auf Touch,
 * Tastaturbedienung und Screenreader-Beschriftung ohne eigene Zeigerlogik
 * abgedeckt. Der sichtbare Griff folgt nur dem Wert.
 */
export default function VorherNachher() {
  const [pos, setPos] = useState(50)
  const [gesehen, setGesehen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  /* Einmalige Andeutung beim Hereinscrollen: der Regler fährt kurz auf und
     wieder zurück, sonst hält man das Bild für ein statisches Foto. */
  useEffect(() => {
    const el = box.current
    if (!el || gesehen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Ausserhalb des Callbacks, damit das Aufräumen unten es auch erwischt,
    // wenn die Andeutung beim Unmount noch läuft.
    let raf = 0

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        setGesehen(true)

        const start = performance.now()
        const DAUER = 2100
        const lauf = (t: number) => {
          const p = Math.min((t - start) / DAUER, 1)
          // einmal nach rechts und zurück, weich abgebremst
          const welle = Math.sin(p * Math.PI)
          const eased = welle * welle * (3 - 2 * welle)
          setPos(50 + eased * 30)
          if (p < 1) raf = requestAnimationFrame(lauf)
        }
        raf = requestAnimationFrame(lauf)
      },
      { threshold: 0.45 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [gesehen])

  return (
    <figure className="m-0">
      {/* Rahmen exakt 16:9 — das Seitenverhältnis der beiden Quellbilder
          (2400×1350). Jedes andere Verhältnis zwingt object-cover zum
          Beschneiden, und man sähe nicht mehr den ganzen Raum. */}
      <div
        ref={box}
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-[22px] border border-white/10 shadow-plate"
      >
        {/* Grundebene: das fertige Ergebnis */}
        <img
          src={vorherNachher.nachher}
          alt={vorherNachher.nachherAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Darüber die Baustelle, links stehend abgeschnitten */}
        <img
          src={vorherNachher.vorher}
          alt={vorherNachher.vorherAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        {/* Trennkante mit Griff — rein dekorativ, bedient wird der Range-Input */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-lime"
          style={{ left: `${pos}%`, boxShadow: '0 0 22px rgba(170,197,39,.75)' }}
        >
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-lime bg-forest-950/85 backdrop-blur transition-transform duration-200 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-lime" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
            </svg>
          </span>
        </div>

        {/* Beschriftung der beiden Zustände */}
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-forest-950/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          Rohbau
        </span>
        <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-forest-950">
          Fertig
        </span>

        {/* Bedienelement: unsichtbar, deckt die volle Fläche ab */}
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Regler: Rohbau links, fertiger Raum rechts"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-white/45">
        <span className="font-semibold text-white/70">Regler ziehen</span>
        <span aria-hidden="true">·</span>
        <span>Derselbe Raum vor und nach dem Ausbau</span>
        <span aria-hidden="true">·</span>
        <span className="rounded border border-white/15 px-2 py-0.5 text-[11px] uppercase tracking-wider">
          {vorherNachher.hinweis}
        </span>
      </figcaption>
    </figure>
  )
}
