import { useRef } from 'react'
import { useReveal } from '../anim'
import Seitenkopf from '../components/Seitenkopf'
import Kontakt from '../components/Kontakt'
import { firma } from '../content'
import { useSeo } from '../seo'

export default function KontaktSeite() {
  const root = useRef<HTMLDivElement>(null)
  useReveal(root)

  useSeo({
    titel: `Kontakt | ${firma.nameLang}`,
    beschreibung: `Kontakt zu ${firma.name} in Niedertaufkirchen: Telefon ${firma.telefon}, E-Mail ${firma.email} oder direkt über das Anfrageformular.`,
    pfad: '/kontakt',
  })

  return (
    <div ref={root}>
      <Seitenkopf
        eyebrow="Kontakt"
        titel={
          <>
            Sprechen wir
            <br />
            über Ihr Projekt.
          </>
        }
        text="Ob Trockenbau, Innenausbau, Sanierung, Dachflächenfenster, Türen oder Außenanlagen — wir schauen uns die Situation vor Ort an und erstellen ein Angebot nach Ihren Vorstellungen."
        bild="/bilder/pickup-bagger-baustelle.jpg"
        bildAlt="Firmenfahrzeug und Radlader von Wallner Bau & Garten auf der Baustelle"
        zurueck={{ label: 'Zur Startseite', to: '/' }}
      />
      <Kontakt />
    </div>
  )
}
