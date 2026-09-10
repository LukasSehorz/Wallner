/**
 * Nimmt das Kontaktformular entgegen und schickt die Anfrage per Resend an den
 * Betrieb. Läuft auf Netlify als serverseitige Funktion — der API-Key darf
 * niemals in den Browser-Code, sonst kann jeder darüber Mails verschicken.
 *
 * Erreichbar unter /api/anfrage (siehe netlify.toml).
 *
 * Nötige Umgebungsvariablen in Netlify (Site configuration -> Environment
 * variables). Ohne sie antwortet die Funktion mit 500 und schreibt den Grund
 * ins Log, statt stillschweigend nichts zu tun:
 *
 *   RESEND_API_KEY   Der API-Key aus dem Resend-Konto (beginnt mit "re_").
 *   ANFRAGE_AN       Zieladresse, z. B. info@wallner-bau-und-garten.de
 *   ANFRAGE_VON      Absender auf einer bei Resend verifizierten Domain,
 *                    z. B. "Wallner Website <anfrage@bau-firma.com>"
 */

type Felder = {
  name: string
  email: string
  telefon: string
  ort: string
  rueckmeldung: string
  nachricht: string
  einwilligung: string
  /** Honigtopf: für Menschen unsichtbar, Bots füllen ihn aus. */
  webseite: string
}

const PFLICHT: (keyof Felder)[] = ['name', 'email', 'nachricht']

function text(werte: Felder) {
  return [
    'Neue Anfrage über die Website',
    '',
    `Name:            ${werte.name}`,
    `E-Mail:          ${werte.email}`,
    `Telefon:         ${werte.telefon || '—'}`,
    `Ort des Projekts: ${werte.ort || '—'}`,
    `Rückmeldung:     ${werte.rueckmeldung || '—'}`,
    '',
    'Nachricht:',
    werte.nachricht,
    '',
    '---',
    'Einwilligung zur Datenverarbeitung wurde im Formular erteilt.',
  ].join('\n')
}

/** Auf HTML verzichtet: reiner Text kommt überall an und landet seltener im Spam. */
export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Nur POST', { status: 405 })
  }

  const key = process.env.RESEND_API_KEY
  const an = process.env.ANFRAGE_AN
  const von = process.env.ANFRAGE_VON

  if (!key || !an || !von) {
    // Bewusst konkret im Log, bewusst vage in der Antwort: der Besucher soll
    // nichts über die Konfiguration erfahren.
    console.error('Resend nicht konfiguriert:', {
      RESEND_API_KEY: Boolean(key),
      ANFRAGE_AN: Boolean(an),
      ANFRAGE_VON: Boolean(von),
    })
    return Response.json({ ok: false, grund: 'nicht-konfiguriert' }, { status: 500 })
  }

  let werte: Felder
  try {
    const daten = await request.formData()
    werte = Object.fromEntries(
      ['name', 'email', 'telefon', 'ort', 'rueckmeldung', 'nachricht', 'einwilligung', 'webseite'].map(
        (k) => [k, String(daten.get(k) ?? '').trim()],
      ),
    ) as Felder
  } catch {
    return Response.json({ ok: false, grund: 'unlesbar' }, { status: 400 })
  }

  // Honigtopf: ausgefüllt heißt Bot. Wir antworten mit 200, damit der Bot
  // denkt, es hätte geklappt, und nicht weiterprobiert.
  if (werte.webseite) return Response.json({ ok: true })

  if (!werte.einwilligung) {
    return Response.json({ ok: false, grund: 'einwilligung' }, { status: 400 })
  }
  for (const feld of PFLICHT) {
    if (!werte[feld]) return Response.json({ ok: false, grund: `fehlt:${feld}` }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(werte.email)) {
    return Response.json({ ok: false, grund: 'email-ungueltig' }, { status: 400 })
  }
  if (werte.nachricht.length > 5000) {
    return Response.json({ ok: false, grund: 'zu-lang' }, { status: 400 })
  }

  const antwort = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: von,
      to: [an],
      // Damit "Antworten" im Mailprogramm direkt an den Interessenten geht.
      reply_to: werte.email,
      subject: `Anfrage über die Website — ${werte.name}`,
      text: text(werte),
    }),
  })

  if (!antwort.ok) {
    console.error('Resend antwortete mit', antwort.status, await antwort.text())
    return Response.json({ ok: false, grund: 'versand' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
