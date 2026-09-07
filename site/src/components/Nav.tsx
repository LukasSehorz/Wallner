import { useEffect, useRef, useState } from 'react'
import { firma, nav } from '../content'
import { Link, useRoute } from '../router'
import { IconClose, IconMenu, IconPhone } from './icons'

/** '/#ueber-uns' → '/' — für den Abgleich mit dem aktuellen Pfad. */
function pfadVon(href: string) {
  const p = href.split('#')[0]
  return p === '' ? '/' : p
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const burger = useRef<HTMLButtonElement>(null)
  const { pfad } = useRoute()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Nach einem Seitenwechsel muss das mobile Menü zu sein, sonst steht man auf
  // der neuen Seite hinter einem offenen Panel.
  useEffect(() => setOpen(false), [pfad])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burger.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const aktiv = (href: string) => {
    const ziel = pfadVon(href)
    if (ziel === '/') return pfad === '/' && !href.includes('#')
    return pfad === ziel || pfad.startsWith(ziel + '/')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-forest-950/95 shadow-lift backdrop-blur-xl' : 'bg-forest-950/80 backdrop-blur-md'
      }`}
    >
      <div className="shell flex h-[86px] items-center justify-between gap-6 sm:h-[104px]">
        <Link to="/" className="shrink-0" aria-label={`${firma.name} — zur Startseite`}>
          <img
            src="/logo/logo.png"
            alt={`${firma.name} Logo`}
            width={1242}
            height={568}
            className="h-[52px] w-auto sm:h-[74px]"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Hauptnavigation">
          {nav.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              aria-current={aktiv(n.href) ? 'page' : undefined}
              className={`font-display text-[19px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-lime ${
                aktiv(n.href) ? 'text-lime' : 'text-white/90'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={firma.telefonHref}
            className="inline-flex items-center gap-2 font-display text-[19px] font-bold uppercase tracking-[0.08em] text-white/90 transition-colors hover:text-lime"
          >
            <IconPhone className="h-4 w-4 text-lime" />
            Jetzt anrufen
          </a>
        </nav>

        <button
          type="button"
          ref={burger}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white lg:hidden"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobiles Menü */}
      {/* Geschlossen muss das Panel auch für Tastatur und Screenreader weg sein —
          `max-h-0` allein lässt die Links im Tab-Fluss. */}
      <div
        inert={!open}
        aria-hidden={!open}
        className={`overflow-hidden border-t border-white/10 bg-forest-950 transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[480px]' : 'max-h-0'
        }`}
      >
        <nav className="shell flex flex-col gap-1 py-5" aria-label="Mobile Navigation">
          {nav.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              onClick={() => setOpen(false)}
              aria-current={aktiv(n.href) ? 'page' : undefined}
              className={`rounded-lg px-3 py-3 font-display font-bold text-2xl uppercase tracking-wide transition-colors hover:bg-white/5 hover:text-lime ${
                aktiv(n.href) ? 'text-lime' : 'text-white/90'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={firma.telefonHref}
            className="btn-primary mt-3 justify-center"
            onClick={() => setOpen(false)}
          >
            <IconPhone className="h-4 w-4" />
            {firma.telefon}
          </a>
        </nav>
      </div>
    </header>
  )
}
