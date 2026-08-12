import { firma } from '../content'

/**
 * Impressum und Datenschutzerklärung — Pflichtangaben, wortgleich von der
 * Bestandsseite übernommen. Als <details> ausgeführt, damit die Einseiter-
 * Struktur erhalten bleibt und die Inhalte trotzdem verlinkbar sind.
 *
 * TODO Kunde: Die Datenschutzerklärung nennt IONOS als Hoster. Nach dem Umzug
 * auf den neuen Hoster muss Abschnitt 4 angepasst werden.
 */
export default function Rechtliches() {
  const h = 'display mt-6 text-xl text-white first:mt-0'
  const p = 'mt-2 text-[13.5px] leading-relaxed text-white/70 [overflow-wrap:anywhere]'

  return (
    <section className="border-t border-white/10 bg-forest-950 py-16">
      <div className="shell">
        <p className="eyebrow text-white/55">Rechtliches</p>
      </div>

      <div className="shell mt-8 grid gap-4 lg:grid-cols-2">
        <details id="impressum" className="group min-w-0 rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1.5">
            <h2 className="display text-2xl text-white [overflow-wrap:anywhere] sm:text-3xl">Impressum</h2>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-transform group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>

          <div className="mt-6 border-t border-white/10 pt-6">
            <h3 className={h}>Vertreten durch</h3>
            <p className={p}>
              {firma.legal}
              <br />
              {firma.inhaber}
            </p>

            <h3 className={h}>Büroanschrift</h3>
            <p className={p}>
              {firma.strasse}
              <br />
              {firma.plzOrt}
            </p>

            <h3 className={h}>Kontakt</h3>
            <p className={p}>
              E-Mail:{' '}
              <a href={`mailto:${firma.email}`} className="text-lime underline">
                {firma.email}
              </a>
              <br />
              Telefon:{' '}
              <a href={firma.telefonHref} className="text-lime underline">
                {firma.telefon}
              </a>
            </p>

            <h3 className={h}>Umsatzsteuer</h3>
            <p className={p}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: {firma.ustId}
            </p>

            <h3 className={h}>Information gemäß § 36 VSBG</h3>
            <p className={p}>
              Gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz) erklärt der Betreiber dieser
              Website: Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h3 className={h}>Urheberrecht</h3>
            <p className={p}>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
              und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
              dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
              die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
              aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </details>

        <details id="datenschutz" className="group min-w-0 rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1.5">
            <h2 className="display text-2xl text-white [overflow-wrap:anywhere] sm:text-3xl">Datenschutzerklärung</h2>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-transform group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>

          <div className="mt-6 border-t border-white/10 pt-6">
            <h3 className={h}>1. Verantwortlicher</h3>
            <p className={p}>
              Wallner Bau und Garten, Inhaber: {firma.inhaber}
              <br />
              Büroanschrift: {firma.strasse}, {firma.plzOrt}
              <br />
              Telefon: {firma.telefon} · E-Mail: {firma.email}
            </p>

            <h3 className={h}>2. Allgemeines zur Datenverarbeitung</h3>
            <p className={p}>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre personenbezogenen Daten
              werden vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO)
              sowie dieser Datenschutzerklärung behandelt.
            </p>

            <h3 className={h}>3. Erhebung und Speicherung personenbezogener Daten</h3>
            <p className={p}>
              Beim Aufrufen unserer Website werden durch den Hostinganbieter automatisch
              Informationen erhoben und in sogenannten Server-Logfiles gespeichert: IP-Adresse, Datum
              und Uhrzeit der Anfrage, Browsertyp und -version, Betriebssystem, Referrer-URL sowie
              der Hostname des zugreifenden Rechners. Diese Daten dienen der Gewährleistung eines
              reibungslosen Verbindungsaufbaus und der Systemsicherheit. Rechtsgrundlage: Art. 6
              Abs. 1 lit. f DSGVO.
            </p>

            <h3 className={h}>4. Hosting</h3>
            <p className={p}>
              Unsere Website wird bei der IONOS SE gehostet. IONOS verarbeitet die Daten nur im
              Rahmen einer Auftragsverarbeitung gemäß Art. 28 DSGVO.
            </p>

            <h3 className={h}>5. Kontaktaufnahme</h3>
            <p className={p}>
              Bei Kontaktaufnahme per Formular oder E-Mail werden Ihre Angaben (Name, E-Mail-Adresse,
              Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert. Rechtsgrundlage: Art. 6 Abs. 1
              lit. b DSGVO. Bei telefonischer Kontaktaufnahme werden keine Daten ohne Ihre
              Einwilligung gespeichert.
            </p>

            <h3 className={h}>6. Cookies</h3>
            <p className={p}>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem
              Endgerät gespeichert werden. Technisch notwendige Cookies dienen dem Betrieb der
              Website, optionale Cookies werden nur mit Ihrer Einwilligung gesetzt. Rechtsgrundlage:
              Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse).
            </p>

            <h3 className={h}>7. Social-Media-Links</h3>
            <p className={p}>
              Unsere Website kann Links zu sozialen Netzwerken enthalten. Beim Anklicken dieser Links
              gelten die Datenschutzbestimmungen der jeweiligen Anbieter. Es findet keine
              automatische Datenübertragung beim bloßen Besuch unserer Website statt.
            </p>

            <h3 className={h}>8. Rechte der betroffenen Personen</h3>
            <p className={p}>
              Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
              Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
              Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art. 21 DSGVO). Außerdem haben
              Sie das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde.
            </p>

            <h3 className={h}>9. Widerruf Ihrer Einwilligung</h3>
            <p className={p}>
              Sie können eine bereits erteilte Einwilligung jederzeit mit Wirkung für die Zukunft
              widerrufen.
            </p>
          </div>
        </details>
      </div>
    </section>
  )
}
