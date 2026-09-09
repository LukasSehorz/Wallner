import { firma } from '../content'

/**
 * Impressum und Datenschutzerklärung.
 *
 * Die Pflichtangaben stammen wörtlich von bau-firma.com/impressum. Ergänzt sind
 * nur Abschnitte, die dort fehlen und für den Betrieb dieser Seite nötig sind.
 * Bewusst NICHT ergänzt: Handelsregister, Handwerkskammer und Aufsichtsbehörde —
 * dazu liegen keine belegten Angaben vor, und erfundene Registerdaten wären im
 * Impressum schlimmer als eine Lücke. Siehe offene Punkte in der README.
 *
 * Stand der Datenschutzerklärung: die Seite läuft auf Netlify, bindet keinerlei
 * Dienste Dritter ein (Schriften liegen lokal unter /fonts) und setzt keine
 * Cookies. Das Kontaktformular überträgt nichts an einen Server, sondern öffnet
 * eine vorbereitete E-Mail im Mailprogramm der Besucherin. Ändert sich eines
 * dieser drei Dinge, müssen die Abschnitte 4, 5 und 6 angepasst werden.
 */
const STAND = 'September 2026'

export default function Rechtliches() {
  const h = 'display mt-6 text-xl text-white first:mt-0'
  const p = 'mt-2 text-[13.5px] leading-relaxed text-white/70 [overflow-wrap:anywhere]'

  return (
    <section className="border-t border-white/10 bg-forest-950 py-16">
      <div className="shell">
        <p className="eyebrow text-white/55">Rechtliches</p>
      </div>

      <div className="shell mt-8 grid gap-4 lg:grid-cols-2">
        <details id="impressum" open className="group min-w-0 scroll-mt-[104px] rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
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
            <h3 className={h}>Angaben gemäß § 5 DDG</h3>
            <p className={p}>
              {firma.legal}
              <br />
              Inhaber: {firma.inhaber}
              <br />
              {firma.strasse}
              <br />
              {firma.plzOrt}
            </p>

            <h3 className={h}>Kontakt</h3>
            <p className={p}>
              Telefon:{' '}
              <a href={firma.telefonHref} className="inline-flex min-h-11 items-center py-1 text-lime underline">
                {firma.telefon}
              </a>
              <br />
              E-Mail:{' '}
              <a href={`mailto:${firma.email}`} className="inline-flex min-h-11 items-center py-1 text-lime underline">
                {firma.email}
              </a>
            </p>

            <h3 className={h}>Umsatzsteuer</h3>
            <p className={p}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: {firma.ustId}
            </p>

            <h3 className={h}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
            <p className={p}>
              {firma.inhaber}
              <br />
              {firma.strasse}, {firma.plzOrt}
            </p>

            <h3 className={h}>Verbraucherstreitbeilegung</h3>
            <p className={p}>
              Gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz) erklärt der Betreiber dieser
              Website: Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h3 className={h}>Haftung für Inhalte</h3>
            <p className={p}>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden
              wir diese Inhalte umgehend entfernen.
            </p>

            <h3 className={h}>Haftung für Links</h3>
            <p className={p}>
              Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
              keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
              Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft, rechtswidrige Inhalte
              waren zu diesem Zeitpunkt nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Links umgehend entfernen.
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

        <details id="datenschutz" open className="group min-w-0 scroll-mt-[104px] rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
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
              {firma.legal}, Inhaber: {firma.inhaber}
              <br />
              {firma.strasse}, {firma.plzOrt}
              <br />
              Telefon: {firma.telefon} · E-Mail: {firma.email}
            </p>

            <h3 className={h}>2. Allgemeines zur Datenverarbeitung</h3>
            <p className={p}>
              Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Ihre Daten werden
              vertraulich und entsprechend der Datenschutz-Grundverordnung (DSGVO), dem
              Bundesdatenschutzgesetz sowie dieser Datenschutzerklärung behandelt. Die Übertragung
              dieser Website erfolgt durchgehend verschlüsselt über HTTPS (TLS).
            </p>

            <h3 className={h}>3. Server-Logfiles</h3>
            <p className={p}>
              Beim Aufruf dieser Website werden durch den Hostinganbieter automatisch Informationen
              in sogenannten Server-Logfiles erfasst: IP-Adresse, Datum und Uhrzeit der Anfrage,
              Browsertyp und -version, Betriebssystem, Referrer-URL sowie die Bezeichnung der
              abgerufenen Datei. Diese Daten dienen dem technisch fehlerfreien Betrieb und der
              Sicherheit der Website. Sie werden nicht mit anderen Datenquellen zusammengeführt und
              nicht zur Analyse des Nutzungsverhaltens verwendet. Rechtsgrundlage ist unser
              berechtigtes Interesse an einem sicheren und störungsfreien Betrieb nach Art. 6 Abs. 1
              lit. f DSGVO.
            </p>

            <h3 className={h}>4. Hosting</h3>
            <p className={p}>
              Diese Website wird von Netlify, Inc., San Francisco, Kalifornien, USA, gehostet.
              Netlify verarbeitet die unter Punkt 3 genannten Daten ausschließlich in unserem
              Auftrag als Auftragsverarbeiter nach Art. 28 DSGVO. Dabei können Daten in die USA
              übermittelt werden. Netlify ist unter dem EU-US Data Privacy Framework zertifiziert;
              für Übermittlungen in die USA besteht damit ein Angemessenheitsbeschluss der
              Europäischen Kommission nach Art. 45 DSGVO. Ergänzend gelten die Standard­vertrags­klauseln
              der EU-Kommission.
            </p>

            <h3 className={h}>5. Kontaktaufnahme</h3>
            <p className={p}>
              Das Kontaktformular auf dieser Website überträgt Ihre Eingaben nicht an einen Server.
              Beim Absenden werden die eingegebenen Angaben in eine vorbereitete E-Mail übernommen,
              die sich in Ihrem eigenen E-Mail-Programm öffnet — versendet wird sie erst durch Sie
              selbst. Erst mit dem Versand erhalten wir Ihre Angaben und speichern sie zur
              Bearbeitung Ihrer Anfrage. Dasselbe gilt für eine Kontaktaufnahme per E-Mail oder
              Telefon. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen
              Vertragsschluss zielt, sonst Art. 6 Abs. 1 lit. f DSGVO. Wir löschen die Daten, sobald
              Ihre Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungsfristen
              entgegenstehen.
            </p>

            <h3 className={h}>6. Keine Cookies, kein Tracking</h3>
            <p className={p}>
              Diese Website setzt keine Cookies und speichert keine Informationen auf Ihrem Endgerät.
              Es findet keine Reichweitenmessung, keine Analyse Ihres Nutzungsverhaltens und kein
              Profiling statt. Eine Einwilligung nach § 25 TDDDG ist deshalb nicht erforderlich —
              aus diesem Grund fragt diese Website auch keine Cookie-Einwilligung ab.
            </p>

            <h3 className={h}>7. Keine Dienste Dritter</h3>
            <p className={p}>
              Diese Website bindet keine Inhalte Dritter ein. Insbesondere werden keine externen
              Schriftarten, keine Kartendienste, keine Videoplattformen, keine Social-Media-Plugins
              und keine Analysedienste geladen. Alle Schriften und Medien werden von unserem eigenen
              Server ausgeliefert. Beim bloßen Besuch dieser Website wird daher keine Verbindung zu
              Dritten aufgebaut und Ihre IP-Adresse an niemanden außer den unter Punkt 4 genannten
              Hoster übermittelt. Sollten wir auf externe Profile verlinken, gelten dort die
              Datenschutzbestimmungen des jeweiligen Anbieters — eine Datenübertragung findet erst
              statt, wenn Sie einen solchen Link aktiv anklicken.
            </p>

            <h3 className={h}>8. Ihre Rechte</h3>
            <p className={p}>
              Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten
              (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf
              Einschränkung der Verarbeitung (Art. 18 DSGVO), auf Datenübertragbarkeit (Art. 20
              DSGVO) sowie auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte
              Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Wenden Sie
              sich dazu formlos an die unter Punkt 1 genannten Kontaktdaten.
            </p>

            <h3 className={h}>9. Beschwerderecht</h3>
            <p className={p}>
              Unbeschadet anderer Rechtsbehelfe steht Ihnen ein Beschwerderecht bei einer
              Datenschutz-Aufsichtsbehörde zu. Für uns zuständig ist das Bayerische Landesamt für
              Datenschutzaufsicht (BayLDA), Promenade 27, 91522 Ansbach.
            </p>

            <p className="mt-8 border-t border-white/10 pt-4 text-[12px] text-white/45">
              Stand: {STAND}
            </p>
          </div>
        </details>
      </div>
    </section>
  )
}
