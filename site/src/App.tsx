import Nav from './components/Nav'
import Hero from './components/Hero'
import Leistungsband from './components/Leistungsband'
import LeistungenDetail from './components/LeistungenDetail'
import UeberUns from './components/UeberUns'
import Projekte from './components/Projekte'
import Galerie from './components/Galerie'
import FuerDieBesten from './components/FuerDieBesten'
import Bewertungen from './components/Bewertungen'
import Kontakt from './components/Kontakt'
import Rechtliches from './components/Rechtliches'
import Footer from './components/Footer'

/*
 * Kein Cookie-Banner: Diese Seite setzt keine Cookies und greift auf keine
 * Informationen im Endgerät zu. Schriften und Medien liegen lokal, es sind
 * keine Kartendienste, Videoplattformen, Social-Plugins oder Analysedienste
 * eingebunden, und das Kontaktformular überträgt nichts an einen Server.
 * Eine Einwilligung nach § 25 TDDDG ist damit nicht erforderlich.
 *
 * Der frühere Banner sprach von optionalen Cookies zur Nutzungsanalyse, die es
 * nie gab, und legte als einzigen Speichereintrag seine eigene Wegklick-Notiz
 * an. Wird später ein einwilligungspflichtiger Dienst eingebunden — Google
 * Maps, YouTube, Analytics —, muss er zurück; dann aber mit echter Sperre vor
 * dem Laden des Dienstes, nicht nur als Hinweisleiste.
 */


export default function App() {
  return (
    <>
      <a
        href="#leistungen"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-forest-950"
      >
        Zum Inhalt springen
      </a>

      <Nav />
      <main>
        <Hero />
        <Leistungsband />
        <LeistungenDetail />
        <UeberUns />
        <Projekte />
        <Galerie />
        <FuerDieBesten />
        <Bewertungen />
        <Kontakt />
        <Rechtliches />
      </main>
      <Footer />
    </>
  )
}
