import { useState } from 'react'
import { firma, zeiten } from '../content'
import { IconClock, IconMail, IconPhone, IconPin } from './icons'

/**
 * Kontaktbereich nach BP-Marine-Vorbild: links dunkle Karte mit Headline,
 * Telefonblock und Fakten-Kacheln, rechts weiße Formularkarte.
 *
 * TODO: `FORM_ENDPOINT` auf das echte Ziel setzen (z. B. Formspree, Netlify
 * Forms oder eigenes PHP-Skript). Solange nichts hinterlegt ist, öffnet das
 * Formular eine vorausgefüllte E-Mail im Mailprogramm.
 */
const FORM_ENDPOINT: string | null = null

const fakten = [
  { titel: 'Leistungen', text: '6 Gewerke aus einer Hand' },
  { titel: 'Einzugsgebiet', text: 'Mühldorf, München, Burghausen, Landshut' },
  { titel: 'Erfahrung', text: `Über ${firma.jahre} Jahre im Bauwesen` },
]

export default function Kontakt() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [fehler, setFehler] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFehler(null)
    const form = e.currentTarget
    const fd = new FormData(form)

    if (!fd.get('einwilligung')) {
      setFehler('Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.')
      return
    }

    setBusy(true)
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error('Senden fehlgeschlagen')
      } else {
        const body = [
          `Name: ${fd.get('name')}`,
          `E-Mail: ${fd.get('email')}`,
          `Telefon: ${fd.get('telefon')}`,
          `Ort / Adresse: ${fd.get('ort')}`,
          `Rückmeldung: ${fd.get('rueckmeldung')}`,
          '',
          `${fd.get('nachricht')}`,
        ].join('\n')
        window.location.href = `mailto:${firma.email}?subject=${encodeURIComponent(
          'Anfrage über die Website',
        )}&body=${encodeURIComponent(body)}`
      }
      setSent(true)
      form.reset()
    } catch {
      setFehler('Die Nachricht konnte nicht gesendet werden. Bitte rufen Sie uns kurz an.')
    } finally {
      setBusy(false)
    }
  }

  const feld =
    'w-full rounded-lg border border-moss-900/15 bg-mist px-4 py-3 text-[15px] text-moss-900 outline-none transition-colors placeholder:text-moss-900/35 focus:border-lime focus:bg-white'
  const label = 'block text-[11px] font-bold uppercase tracking-[0.16em] text-moss-900'

  return (
    <section id="kontakt" className="relative overflow-hidden bg-forest-900 pb-20 pt-14 lg:pb-24 lg:pt-20">
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full opacity-[.12] blur-3xl"
        style={{ background: 'radial-gradient(circle,#AAC527 0%,transparent 70%)' }}
      />

      <div className="shell relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Links */}
        <div className="card-dark flex flex-col p-8 sm:p-11">
          <p className="eyebrow text-white/60">Ihr Projekt startet hier</p>

          <h2 className="display mt-5 text-[clamp(1.7rem,4.9vw,3.75rem)] h-gradient">
            Sprechen wir
            <br />
            über Ihr Projekt?
          </h2>

          <p className="mt-6 text-[16px] leading-relaxed text-white/75">
            Ob Innenausbau, Sanierung, Badumbau, Terrasse oder Erdarbeiten — wir schauen uns die
            Situation vor Ort an und erstellen Ihnen ein Angebot nach Ihren Vorstellungen. Egal ob
            privat oder gewerblich.
          </p>

          <a
            href={firma.telefonHref}
            className="mt-8 flex items-center gap-5 rounded-xl border border-white/12 bg-white/[.05] p-5 transition-colors hover:border-lime/50 hover:bg-white/[.09]"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lime text-forest-950">
              <IconPhone className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                Direkt anrufen
              </span>
              <span className="display block text-2xl text-white sm:whitespace-nowrap sm:text-4xl">{firma.telefon}</span>
            </span>
          </a>

          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {fakten.map((f) => (
              <li key={f.titel} className="rounded-xl border border-white/10 bg-white/[.04] p-4">
                <p className="font-display text-[17px] font-bold uppercase leading-tight tracking-wide text-white [overflow-wrap:anywhere]">
                  {f.titel}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-snug text-white/60">{f.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                <IconClock className="h-4 w-4" />
                Geschäftszeiten
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {zeiten.map((z) => (
                  <li key={z.tag} className="flex justify-between gap-4 text-[14px] text-white/80">
                    <span className="font-medium">{z.tag}</span>
                    <span className="tabular-nums text-white/60">{z.zeit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${firma.email}`}
                className="flex min-h-11 items-start gap-3 py-2 text-[14px] text-white/80 transition-colors hover:text-lime"
              >
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span className="[overflow-wrap:anywhere]">{firma.email}</span>
              </a>
              <p className="flex items-start gap-3 text-[14px] text-white/80">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span>
                  {firma.strasse}
                  <br />
                  {firma.plzOrt}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Rechts — Formular */}
        <div className="rounded-2xl bg-white p-8 shadow-plate sm:p-11">
          <h3 className="display text-[clamp(1.65rem,3.3vw,2.45rem)] text-moss-900">Anfrage senden</h3>
          <p className="mt-3 text-[14px] text-moss-900/75">
            Wir melden uns in der Regel innerhalb eines Werktags bei Ihnen zurück.
          </p>

          {sent ? (
            <div
              className="mt-8 rounded-xl border border-lime bg-lime/12 p-6"
              role="status"
              aria-live="polite"
            >
              <p className="display text-2xl text-moss-900">{FORM_ENDPOINT ? 'Danke für Ihre Anfrage.' : 'Ihr Mailprogramm wurde geöffnet.'}</p>
              <p className="mt-2 text-[14px] text-moss-900/70">
                {FORM_ENDPOINT
                  ? 'Wir haben Ihre Nachricht erhalten und melden uns zeitnah. '
                  : 'Bitte senden Sie die vorbereitete Nachricht dort noch ab — erst dann erreicht sie uns. '}
                Wenn es eilt, erreichen Sie uns direkt unter{' '}
                <a href={firma.telefonHref} className="font-semibold text-lime-dark underline">
                  {firma.telefon}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-5 text-[13px] font-semibold uppercase tracking-wider text-moss-900/75 underline"
              >
                Weitere Nachricht schreiben
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5" noValidate={false}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="name">
                    Name <span className="text-lime-dark">*</span>
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={`${feld} mt-2`} />
                </div>
                <div>
                  <label className={label} htmlFor="email">
                    E-Mail <span className="text-lime-dark">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    className={`${feld} mt-2`}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="telefon">
                    Telefon
                  </label>
                  <input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    className={`${feld} mt-2`}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="ort">
                    Ort des Projekts
                  </label>
                  <input id="ort" name="ort" autoComplete="address-level2" className={`${feld} mt-2`} />
                </div>
              </div>

              <div>
                <label className={label} htmlFor="nachricht">
                  Ihre Nachricht <span className="text-lime-dark">*</span>
                </label>
                <textarea id="nachricht" name="nachricht" required rows={5} className={`${feld} mt-2 resize-y`} />
                <p className="mt-2 text-[12px] text-moss-900/75">
                  Beschreiben Sie kurz Gewerk, Umfang und Wunschtermin — das beschleunigt das Angebot.
                </p>
              </div>

              <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
                <legend className={`${label} mb-2`}>Gewünschte Rückmeldung</legend>
                {['Telefonischer Rückruf', 'Schriftliche Rückmeldung'].map((o, idx) => (
                  <label key={o} className="flex min-h-11 items-center gap-2.5 py-2 text-[14px] text-moss-900/80">
                    <input
                      type="radio"
                      name="rueckmeldung"
                      value={o}
                      defaultChecked={idx === 0}
                      className="h-5 w-5 accent-[#AAC527]"
                    />
                    {o}
                  </label>
                ))}
              </fieldset>

              <label className="flex items-start gap-3 py-2 text-[13px] leading-relaxed text-moss-900/70">
                <input
                  type="checkbox"
                  name="einwilligung"
                  required
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#AAC527]"
                />
                <span>
                  Ich bin damit einverstanden, dass diese Daten zum Zweck der Kontaktaufnahme
                  gespeichert und verarbeitet werden. Mir ist bekannt, dass ich meine Einwilligung
                  jederzeit widerrufen kann. <span className="text-lime-dark">*</span>
                </span>
              </label>

              {fehler && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700">
                  {fehler}
                </p>
              )}

              <button type="submit" disabled={busy} className="btn-primary w-fit disabled:opacity-60">
                {busy ? 'Wird gesendet …' : 'Anfrage senden'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
