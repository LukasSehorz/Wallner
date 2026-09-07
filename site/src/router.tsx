import { useEffect, useState, type AnchorHTMLAttributes } from 'react'

/**
 * Sehr kleiner Router über die History-API.
 *
 * Die Seite hatte bis zur Kundenrückmeldung nur eine einzige Ansicht und
 * brauchte keinen Router. Jetzt gibt es Unterseiten für jede Leistung, für die
 * Projekte, den Kontakt und das Rechtliche — das sind fünf Seitentypen und ein
 * Dutzend Pfade. Dafür eine Router-Bibliothek samt Abhängigkeitsbaum
 * einzuziehen wäre mehr Aufwand als diese knapp 80 Zeilen.
 *
 * Netlify liefert für jeden Pfad die index.html aus (siehe netlify.toml),
 * deshalb funktionieren echte URLs wie /leistungen/trockenbau auch beim
 * direkten Aufruf und beim Teilen des Links.
 */

const EVENT = 'wallner:route'

export type Route = { pfad: string; hash: string }

/** '/leistungen/' und '/leistungen' sind derselbe Pfad. */
function normalisiere(pfad: string) {
  if (pfad.length > 1 && pfad.endsWith('/')) return pfad.slice(0, -1)
  return pfad
}

function aktuell(): Route {
  return { pfad: normalisiere(window.location.pathname), hash: window.location.hash }
}

export function navigiere(ziel: string, opts: { ersetzen?: boolean } = {}) {
  const url = new URL(ziel, window.location.origin)
  const gleich = normalisiere(url.pathname) === normalisiere(window.location.pathname)

  // Anker auf der Seite, auf der man schon steht: kein neuer History-Eintrag
  // mit identischem Pfad, sonst braucht der Zurück-Button zwei Klicks.
  const methode = opts.ersetzen || (gleich && url.hash) ? 'replaceState' : 'pushState'
  window.history[methode]({}, '', url.pathname + url.search + url.hash)
  window.dispatchEvent(new Event(EVENT))
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(aktuell)

  useEffect(() => {
    const auf = () => setRoute(aktuell())
    window.addEventListener('popstate', auf)
    window.addEventListener(EVENT, auf)
    return () => {
      window.removeEventListener('popstate', auf)
      window.removeEventListener(EVENT, auf)
    }
  }, [])

  return route
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/**
 * Interner Link. Bleibt ein echtes `<a href>` — Rechtsklick, Mittelklick,
 * „In neuem Tab öffnen“ und Suchmaschinen sollen weiter funktionieren; nur der
 * einfache Linksklick wird abgefangen.
 */
export function Link({ to, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigiere(to)
      }}
      {...rest}
    />
  )
}

/**
 * Scrollverhalten nach einem Seitenwechsel: neue Seite oben beginnen, Anker
 * anspringen. Das muss nach dem Rendern passieren, sonst existiert das
 * Zielelement noch nicht.
 */
export function useScrollBeiRoute({ pfad, hash }: Route) {
  useEffect(() => {
    // Sonst stellt der Browser beim Vor/Zurueck seine gemerkte Scrollposition
    // wieder her — und zwar nachdem wir schon gescrollt haben.
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pfad, hash])
}
