/**
 * HTML-Vorlage für die Anfrage-Mail, im Firmendesign.
 *
 * E-Mail-Programme sind kein Browser. Outlook rendert mit der Word-Engine,
 * Gmail entfernt <style>-Bloecke bei Weiterleitungen, viele Clients kennen
 * weder Flexbox noch Grid. Deshalb hier bewusst altmodisch:
 *
 * - Layout ueber verschachtelte <table>, nicht ueber div/flex.
 * - Alle Stile inline am Element, keine Klassen.
 * - Feste Pixelbreiten statt rem/vw.
 * - Keine Hintergrundbilder, keine Web-Fonts (Georgia als Serifen-Ersatz fuer
 *   die Rokkitt-Headline, Arial fuer den Fliesstext — beides ueberall da).
 *
 * Farben aus tailwind.config.js: forest-950 #060D06, forest-900 #0A140A,
 * lime #AAC527, moss-900 #22401C, mist #F3F7EE.
 */

export type Anfrage = {
  name: string
  email: string
  telefon: string
  ort: string
  rueckmeldung: string
  nachricht: string
}

/** Schuetzt vor kaputtem Layout und vor eingeschleustem Markup. */
function sicher(wert: string) {
  return wert
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Fuer Adressen in `href`. `sicher()` allein genuegt hier nicht: es laesst
 * Zeichen wie `?`, `&` oder Leerzeichen durch, die die URL zerlegen wuerden.
 * `encodeURIComponent` macht daraus eine unzerlegbare Zeichenkette; die
 * anschliessende Maskierung schuetzt zusaetzlich das Attribut selbst.
 *
 * Die Funktion pruefen wir nicht auf Gueltigkeit — das erledigt bereits die
 * Pruefung in anfrage.ts, bevor die Vorlage ueberhaupt aufgerufen wird.
 */
function sichereAdresse(wert: string) {
  return sicher(encodeURIComponent(wert))
}

/** Zeilenumbrueche des Besuchers erhalten. */
function mitUmbruechen(wert: string) {
  return sicher(wert).replace(/\r?\n/g, '<br />')
}

function zeile(bezeichnung: string, wert: string, link?: string) {
  const inhalt = link
    ? `<a href="${link}" style="color:#22401C;text-decoration:underline;word-break:break-word;">${sicher(wert)}</a>`
    : sicher(wert)

  // Beschriftung und Wert stehen untereinander statt nebeneinander. Zwei
  // Spalten mit fester Breite sprengen auf Handybreite den Rahmen, und
  // Media Queries sind in Mailprogrammen unzuverlaessig — Gmail entfernt
  // <style> beim Weiterleiten. Untereinander funktioniert ueberall gleich.
  return `
    <tr>
      <td style="padding:12px 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:#5A7A3A;">
        ${sicher(bezeichnung)}
      </td>
    </tr>
    <tr>
      <td style="padding:0 0 12px 0;border-bottom:1px solid #E7EEDD;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#22401C;word-break:break-word;">
        ${inhalt}
      </td>
    </tr>`
}

export function anfrageHtml(a: Anfrage, eingegangen: string) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Neue Anfrage über die Website</title>
</head>
<body style="margin:0;padding:0;background-color:#F3F7EE;">
  <!-- Vorschautext: erscheint in der Betreffzeile-Vorschau, sonst zieht sich
       der Client die ersten sichtbaren Woerter aus dem Kopfbereich. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${sicher(a.name)} — ${sicher(a.ort || 'Ort nicht angegeben')} · ${sicher(a.telefon || a.email)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F3F7EE;padding:20px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(34,64,28,0.10);">

          <!-- Kopf im Markendunkel -->
          <tr>
            <td style="background-color:#0A140A;padding:24px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:#ffffff;">
                    Wallner Bau &amp; Garten
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#AAC527;">
                    Wir schaffen Werte
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gruener Akzentbalken wie unter der Headline auf der Seite -->
          <tr>
            <td style="height:5px;background-color:#AAC527;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Ueberschrift -->
          <tr>
            <td style="padding:26px 22px 0 22px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#5A7A3A;">
                Neue Projektanfrage
              </div>
              <div style="padding-top:10px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:bold;line-height:1.2;color:#22401C;word-break:break-word;">
                ${sicher(a.name)}
              </div>
              <div style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#5A7A3A;">
                Eingegangen am ${sicher(eingegangen)}
              </div>
            </td>
          </tr>

          <!-- Kontaktdaten -->
          <tr>
            <td style="padding:20px 22px 0 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${zeile('E-Mail', a.email, `mailto:${sichereAdresse(a.email)}`)}
                ${a.telefon ? zeile('Telefon', a.telefon, `tel:${a.telefon.replace(/[^\d+]/g, '')}`) : ''}
                ${a.ort ? zeile('Ort des Projekts', a.ort) : ''}
                ${a.rueckmeldung ? zeile('Gewünschte Rückmeldung', a.rueckmeldung) : ''}
              </table>
            </td>
          </tr>

          <!-- Nachricht, abgesetzt auf hellem Grund -->
          <tr>
            <td style="padding:24px 22px 0 22px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#5A7A3A;padding-bottom:10px;">
                Nachricht
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F3F7EE;border-left:3px solid #AAC527;border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#22401C;word-break:break-word;">
                    ${mitUmbruechen(a.nachricht)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Antwort-Schaltflaeche. Als Tabelle gebaut, damit sie auch in
               Outlook eine Flaeche ist und nicht nur ein blauer Text. -->
          <tr>
            <td style="padding:24px 22px 0 22px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#AAC527;border-radius:8px;">
                    <a href="mailto:${sichereAdresse(a.email)}?subject=${encodeURIComponent('Ihre Anfrage bei Wallner Bau & Garten')}"
                       style="display:inline-block;padding:14px 28px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#0A140A;text-decoration:none;">
                      Direkt antworten
                    </a>
                  </td>
                </tr>
              </table>
              <div style="padding-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#5A7A3A;">
                „Antworten" im Mailprogramm geht ebenfalls direkt an ${sicher(a.email)}.
              </div>
            </td>
          </tr>

          <!-- Fuss -->
          <tr>
            <td style="padding:24px 22px 28px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #E7EEDD;">
                <tr>
                  <td style="padding-top:18px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#5A7A3A;">
                    Diese Nachricht wurde über das Kontaktformular auf
                    <a href="https://bau-firma.com" style="color:#5A7A3A;">bau-firma.com</a> gesendet.<br />
                    Die Einwilligung zur Verarbeitung der Daten wurde im Formular erteilt.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
