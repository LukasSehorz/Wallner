import { useEffect, useState } from 'react'

const KEY = 'wbg-cookie-consent'

export default function CookieHinweis() {
  const [zeigen, setZeigen] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setZeigen(true)
    } catch {
      setZeigen(true)
    }
  }, [])

  const entscheiden = (wert: 'alle' | 'notwendig') => {
    try {
      localStorage.setItem(KEY, wert)
    } catch {
      /* Speicher nicht verfügbar — Auswahl gilt für diese Sitzung */
    }
    setZeigen(false)
  }

  if (!zeigen) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-moss-900/10 bg-white/97 backdrop-blur"
      role="region"
      aria-label="Cookie-Hinweis"
    >
      <div className="shell flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-3xl text-[13.5px] leading-relaxed text-moss-900/75">
          Wir verwenden Cookies, um diese Website bereitzustellen. Notwendige Cookies halten die
          Seite funktionsfähig, optionale helfen uns zu verstehen, wie die Seite genutzt wird.{' '}
          <a
            href="#datenschutz"
            onClick={() => setZeigen(false)}
            className="font-semibold text-lime-dark underline"
          >
            Datenschutzerklärung
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => entscheiden('alle')}
            className="rounded-lg bg-lime px-6 py-2.5 font-display font-bold text-lg uppercase tracking-wide text-forest-950 transition-colors hover:bg-lime-bright"
          >
            Alle akzeptieren
          </button>
          <button
            type="button"
            onClick={() => entscheiden('notwendig')}
            className="rounded-lg border border-moss-900/25 px-6 py-2.5 font-display font-bold text-lg uppercase tracking-wide text-moss-900 transition-colors hover:border-moss-900/50"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  )
}
