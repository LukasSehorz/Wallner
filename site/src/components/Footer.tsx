import { firma, leistungen, nav } from '../content'
import { Link } from '../router'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forest-950">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="max-w-sm">
          <Link to="/" aria-label={`${firma.name} — zur Startseite`}>
            <img
              src="/logo/logo.png"
              alt={`${firma.name} Logo`}
              width={1242}
              height={568}
              className="h-14 w-auto"
            />
          </Link>
          <p className="display mt-5 text-2xl tracking-[0.06em] text-lime">{firma.claim}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">{firma.subclaim}</p>
          <p className="mt-4 text-[14px] text-white/70">
            {firma.strasse}
            <br />
            {firma.plzOrt}
          </p>
        </div>

        {/* Leistungen als eigene Spalte: seit dem Umbau sind das echte
            Unterseiten, die von hier aus direkt erreichbar sein sollen. */}
        <nav aria-label="Leistungen">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
            Leistungen
          </p>
          <ul className="mt-4 flex flex-col">
            {leistungen.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/leistungen/${l.slug}`}
                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-white/75 transition-colors hover:text-lime"
                >
                  {l.kurzTitel ?? l.titel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">Seiten</p>
          <ul className="mt-4 flex flex-col">
            {[
              ...nav,
              { label: 'Impressum', href: '/rechtliches#impressum' },
              { label: 'Datenschutz', href: '/rechtliches#datenschutz' },
            ].map((n) => (
              <li key={n.href}>
                <Link
                  to={n.href}
                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-white/75 transition-colors hover:text-lime"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col text-[14px] text-white/70">
            <a
              href={firma.telefonHref}
              className="inline-flex min-h-11 items-center font-semibold transition-colors hover:text-lime"
            >
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
