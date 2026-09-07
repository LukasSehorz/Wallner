import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Einblenden beim Hereinscrollen — die eine Bewegung, die auf dieser Seite
 * überall gleich läuft: Inhalte kommen leicht von unten und werden sichtbar.
 *
 * Drei Dinge sind dabei wichtig und der Grund, warum das hier zentral steht
 * statt in jeder Section einzeln:
 *
 * 1. Der Startzustand wird per GSAP gesetzt, nicht per CSS. Läuft das Skript
 *    nicht (Fehler, alter Browser, deaktiviertes JavaScript), steht der Inhalt
 *    einfach da — er wäre sonst dauerhaft unsichtbar.
 * 2. `ScrollTrigger.batch` gibt jedem Element seinen eigenen Auslöser und fasst
 *    nur zusammen, was gemeinsam ins Bild kommt. Ein Auslöser pro Section würde
 *    bei langen Sections alles durchlaufen lassen, bevor man es sieht.
 * 3. Bei `prefers-reduced-motion` passiert gar nichts — kein Startzustand,
 *    keine Animation.
 *
 * Bilder mit `loading="lazy"` verschieben die Messpunkte, wenn sie verspätet
 * ankommen; deshalb wird nach dem Laden einmal neu gemessen.
 */
export function useReveal(
  root: RefObject<HTMLElement | null>,
  { selektor = '[data-reveal]', start = 'top 88%', versatz = 28 } = {},
) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const ziele = gsap.utils.toArray<HTMLElement>(selektor)
      if (!ziele.length) return

      gsap.set(ziele, { opacity: 0, y: versatz })

      ScrollTrigger.batch(ziele, {
        start,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: true,
          }),
      })

      const neuMessen = () => ScrollTrigger.refresh()
      window.addEventListener('load', neuMessen)
      return () => window.removeEventListener('load', neuMessen)
    }, el)

    return () => ctx.revert()
  }, [root, selektor, start, versatz])
}
