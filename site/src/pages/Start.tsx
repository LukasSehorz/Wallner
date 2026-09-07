import Hero from '../components/Hero'
import LeistungenGrid from '../components/LeistungenGrid'
import WerWirSind from '../components/WerWirSind'
import ProjekteTeaser from '../components/ProjekteTeaser'
import Bewertungen from '../components/Bewertungen'
import KontaktKurz from '../components/KontaktKurz'
import { firma } from '../content'
import { useSeo } from '../seo'

/**
 * Startseite — bewusst kurz.
 *
 * Der Kunde hat zur ersten Fassung gesagt: „alles auf der ersten Seite möchte
 * ich so nicht haben, das ist für ältere viel zu viel Information. Die erste
 * Seite soll nur Hauptinfo in kurz haben: was machen wir, wer sind wir, seit
 * wann gibt's uns. Die Leistungen aufgezählt aber nicht umschrieben." Genau
 * diese Reihenfolge steht hier — Leistungsbeschreibungen, Projektliste und
 * Bildergalerie sind auf Unterseiten gewandert.
 *
 * Der Aufbau ab dem Hero folgt der vom Kunden genannten Referenz conprobau.de:
 * die Leistungen als schlichtes Raster mit Icon und einem Satz, dann Über uns,
 * Projekte, Bewertungen, Kontakt.
 *
 * Das laufende Textband („UNSERE LEISTUNGEN."), das dort zwischen Hero und
 * Raster stand, ist auf Wunsch wieder raus.
 */
export default function Start() {
  useSeo({
    titel: `${firma.nameLang} | Trockenbau, Innenausbau, Sanierung & Außenanlagen`,
    beschreibung: `${firma.name} aus Niedertaufkirchen: Trockenbau, Innenausbau, Sanierung, Dachflächenfenster, Türen und Außenanlagen im Raum Mühldorf am Inn, München, Burghausen und Landshut.`,
    pfad: '/',
  })

  return (
    <>
      <Hero />
      <LeistungenGrid />
      <WerWirSind />
      <ProjekteTeaser />
      <Bewertungen />
      <KontaktKurz />
    </>
  )
}
