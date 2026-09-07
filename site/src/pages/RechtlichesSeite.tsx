import Seitenkopf from '../components/Seitenkopf'
import Rechtliches from '../components/Rechtliches'
import { firma } from '../content'
import { useSeo } from '../seo'

export default function RechtlichesSeite() {
  useSeo({
    titel: `Impressum & Datenschutz | ${firma.nameLang}`,
    beschreibung: `Impressum und Datenschutzerklärung von ${firma.legal}, ${firma.strasse}, ${firma.plzOrt}.`,
    pfad: '/rechtliches',
  })

  return (
    <>
      <Seitenkopf
        eyebrow="Rechtliches"
        titel="Impressum & Datenschutz"
        bild="/bilder/wohnraum-fertig.jpg"
        bildAlt="Fertiggestellter heller Wohnraum mit bodentiefem Fenster"
        zurueck={{ label: 'Zur Startseite', to: '/' }}
      />
      <Rechtliches />
    </>
  )
}
