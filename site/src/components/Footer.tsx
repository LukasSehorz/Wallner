import { firma, nav } from '../content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forest-950">
      <div className="shell flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <img
            src="/logo/logo.png"
            alt={`${firma.name} Logo`}
            width={1242}
            height={568}
            className="h-14 w-auto"
          />
          <p className="display mt-5 text-2xl tracking-[0.06em] text-lime">{firma.claim}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">{firma.subclaim}</p>
          <p className="mt-4 text-[14px] text-white/70">
            {firma.strasse}
            <br />
            {firma.plzOrt}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-1" aria-label="Footer-Navigation">
          {[...nav, { label: 'Impressum', href: '#impressum' }, { label: 'Datenschutz', href: '#datenschutz' }].map(
            (n) => (
              <a
                key={n.href}
                href={n.href}
                className="inline-flex min-h-11 items-center font-display font-bold text-xl uppercase tracking-wide text-white/75 transition-colors hover:text-lime"
              >
                {n.label}
              </a>
            ),
          )}
        </nav>

        <div className="text-[14px] text-white/70">
          <a href={firma.telefonHref} className="inline-flex min-h-11 items-center transition-colors hover:text-lime">
            {firma.telefon}
          </a>
          <a
            href={`mailto:${firma.email}`}
            className="inline-flex min-h-11 items-center break-all transition-colors hover:text-lime"
          >
            {firma.email}
          </a>
        </div>
      </div>

      {/* Impressum-Zeile mit den Pflichtangaben der Bestandsseite */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 text-[12.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {firma.legal} · Vertreten durch {firma.inhaber} ·
            USt-IdNr. {firma.ustId}
          </p>
          <p>Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
