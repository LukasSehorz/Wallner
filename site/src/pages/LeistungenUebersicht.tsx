import LeistungenGrid from '../components/LeistungenGrid'
import { useRef } from 'react'
import { useReveal } from '../anim'
import Seitenkopf from '../components/Seitenkopf'
import CTABand from '../components/CTABand'
import { firma } from '../content'
import { useSeo } from '../seo'

export default function LeistungenUebersicht() {
  const root = useRef<HTMLDivElement>(null)
  useReveal(root)

  useSeo({
    titel: `Leistungen | ${firma.nameLang}`,
    beschreibung:
      'Trockenbau, Innenausbau, Sanierung und Renovierung, Dachflächenfenster, Türen und Außenanlagen — die sechs Leistungen von Wallner Bau & Garten im Überblick.',
    pfad: '/leistungen',
  })

  return (
    <div ref={root}>
      <Seitenkopf
        eyebrow="Unsere Leistungen"
        titel={
          <>
            Sechs Gewerke,
            <br />
            ein Ansprechpartner.
          </>
        }
        text="Wählen Sie die Leistung, die Sie brauchen — auf der jeweiligen Seite steht ausführlich, was wir übernehmen, wie wir vorgehen und wie Sie uns erreichen."
        bild="/bilder/trockenbau-decke.jpg"
        bildAlt="Abgehängte Trockenbaudecke mit Lichtvouten im Rohbau"
        zurueck={{ label: 'Zur Startseite', to: '/' }}
      />
      <LeistungenGrid ueberschrift={false} />
      <CTABand />
    </div>
  )
}
