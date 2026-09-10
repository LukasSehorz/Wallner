import Seitenkopf from '../components/Seitenkopf'
import LeistungenGrid from '../components/LeistungenGrid'
import { firma } from '../content'
import { useSeo } from '../seo'

/**
 * Netlify liefert für unbekannte Pfade dieselbe index.html aus, damit echte
 * URLs funktionieren. Dadurch landet auch ein Tippfehler in der Adresszeile
 * hier — statt einer leeren Seite bekommt man die Leistungen als Absprung.
 */
export default function NichtGefunden() {
  useSeo({
    titel: `Seite nicht gefunden | ${firma.nameLang}`,
    beschreibung: 'Die aufgerufene Seite existiert nicht.',
    pfad: '/',
    // Netlify liefert fuer unbekannte Adressen die index.html mit Status 200
    // aus, damit die echten URLs funktionieren. Ein 404 ist damit nicht
    // moeglich — ohne noindex wuerde Google jeden Tippfehler als eigene Seite
    // indexieren ("Soft 404") und die Startseite verwaessern.
    nichtIndexieren: true,
  })

  return (
    <>
      <Seitenkopf
        eyebrow="Fehler 404"
        titel="Seite nicht gefunden."
        text="Diese Adresse gibt es nicht (mehr). Über die Leistungen unten kommen Sie direkt weiter — oder rufen Sie uns einfach an."
        bild="/bilder/innenausbau-flur-rohbau.jpg"
        bildAlt="Flur im Rohbau während des Innenausbaus"
        zurueck={{ label: 'Zur Startseite', to: '/' }}
      />
      <LeistungenGrid ueberschrift={false} />
    </>
  )
}
