import Nav from './components/Nav'
import Footer from './components/Footer'
import Start from './pages/Start'
import LeistungenUebersicht from './pages/LeistungenUebersicht'
import LeistungSeite from './pages/LeistungSeite'
import ProjekteSeite from './pages/ProjekteSeite'
import KontaktSeite from './pages/KontaktSeite'
import RechtlichesSeite from './pages/RechtlichesSeite'
import NichtGefunden from './pages/NichtGefunden'
import { leistungNach } from './content'
import { useRoute, useScrollBeiRoute } from './router'

/*
 * Kein Cookie-Banner: Diese Seite setzt keine Cookies und greift auf keine
 * Informationen im Endgerät zu. Schriften und Medien liegen lokal, es sind
 * keine Kartendienste, Videoplattformen, Social-Plugins oder Analysedienste
 * eingebunden, und das Kontaktformular überträgt nichts an einen Server.
 * Eine Einwilligung nach § 25 TDDDG ist damit nicht erforderlich.
 *
 * Wird später ein einwilligungspflichtiger Dienst eingebunden — Google Maps,
 * YouTube, Analytics —, muss er zurück; dann aber mit echter Sperre vor dem
 * Laden des Dienstes, nicht nur als Hinweisleiste.
 */

/**
 * Aus einer Einzelseite sind nach der Kundenrückmeldung mehrere Seiten
 * geworden: Start, Leistungsübersicht, sechs Leistungsseiten, Projekte,
 * Kontakt und Rechtliches. Die Zuordnung Pfad → Ansicht steht hier.
 */
function Seite({ pfad }: { pfad: string }) {
  if (pfad === '/') return <Start />
  if (pfad === '/leistungen') return <LeistungenUebersicht />
  if (pfad === '/projekte') return <ProjekteSeite />
  if (pfad === '/kontakt') return <KontaktSeite />
  // /impressum und /datenschutz sind die Pfade, die in älteren Verweisen und
  // in Geschäftspapieren stehen könnten — beide führen auf dieselbe Seite.
  if (pfad === '/rechtliches' || pfad === '/impressum' || pfad === '/datenschutz')
    return <RechtlichesSeite />

  if (pfad.startsWith('/leistungen/')) {
    const leistung = leistungNach(pfad.slice('/leistungen/'.length))
    if (leistung) return <LeistungSeite leistung={leistung} />
  }

  return <NichtGefunden />
}

export default function App() {
  const route = useRoute()
  useScrollBeiRoute(route)

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-forest-950"
      >
        Zum Inhalt springen
      </a>

      <Nav />
      <main id="inhalt" tabIndex={-1}>
        <Seite pfad={route.pfad} />
      </main>
      <Footer />
    </>
  )
}
