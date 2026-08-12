import Nav from './components/Nav'
import Hero from './components/Hero'
import Leistungsband from './components/Leistungsband'
import Leistungen from './components/Leistungen'
import UeberUns from './components/UeberUns'
import Projekte from './components/Projekte'
import Galerie from './components/Galerie'
import FuerDieBesten from './components/FuerDieBesten'
import Bewertungen from './components/Bewertungen'
import Kontakt from './components/Kontakt'
import Rechtliches from './components/Rechtliches'
import Footer from './components/Footer'
import CookieHinweis from './components/CookieHinweis'

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
        <Leistungen />
        <UeberUns />
        <Projekte />
        <Galerie />
        <FuerDieBesten />
        <Bewertungen />
        <Kontakt />
        <Rechtliches />
      </main>
      <Footer />
      <CookieHinweis />
    </>
  )
}
