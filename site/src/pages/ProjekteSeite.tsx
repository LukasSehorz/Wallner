import { useRef } from 'react'
import { useReveal } from '../anim'
import Seitenkopf from '../components/Seitenkopf'
import Projekte from '../components/Projekte'
import Galerie from '../components/Galerie'
import CTABand from '../components/CTABand'
import { firma } from '../content'
import { useSeo } from '../seo'

/**
 * Projekte und Bilder auf einer eigenen Seite.
 *
 * Kundenwunsch: „Für Bilder und Projekte bitte ein extra Button dafür, wer es
 * sehen will klickt drauf. Abgeschlossene Projekte ebenfalls Unterseite."
 */
export default function ProjekteSeite() {
  const root = useRef<HTMLDivElement>(null)
  useReveal(root)

  useSeo({
    titel: `Projekte | ${firma.nameLang}`,
    beschreibung:
      'Abgeschlossene Projekte von Wallner Bau & Garten: Innenausbau, Trockenbau, Badsanierung, Dachgeschossausbau, Terrassen und Erdarbeiten im Raum Mühldorf am Inn.',
    pfad: '/projekte',
  })

  return (
    <div ref={root}>
      <Seitenkopf
        eyebrow="Projektarbeit"
        titel={
          <>
            Abgeschlossene
            <br />
            Projekte.
          </>
        }
        text="Ein Blick auf Räume, Bäder, Terrassen und Erdarbeiten, die wir für unsere Kundinnen und Kunden umgesetzt haben — vom ersten Aufmaß bis zur Übergabe."
        bild="/bilder/wohnraum-holzlamellen-led.jpg"
        bildAlt="Wohnraum mit vertikaler Holzlamellenwand und indirekter LED-Beleuchtung"
        zurueck={{ label: 'Zur Startseite', to: '/' }}
      />
      <Projekte />
      <Galerie />
      <CTABand text="Sie haben ein Projekt im Kopf? Wir schauen uns die Baustelle an und sagen Ihnen ehrlich, was sinnvoll ist." />
    </div>
  )
}
