import { useEffect } from 'react'

/**
 * Titel, Beschreibung und Canonical je Seite setzen.
 *
 * Die Seite wird im Browser zusammengebaut, deshalb steht in der index.html nur
 * der Startseiten-Kopf. Ohne diesen Haken bekämen alle Unterseiten denselben
 * Titel — für die Suche und für geteilte Links wäre das ein Rückschritt
 * gegenüber der bisherigen Einzelseite.
 */
/**
 * Hauptadresse der Seite. Sie steckt in jedem Canonical und in og:url und sagt
 * Google, welche Adresse die echte ist.
 *
 * Der Betrieb hat zwei Domains: bau-firma.com (seit Jahren online, mit dem
 * gewachsenen Suchverlauf) und wallner-bau-und-garten.de. Entschieden wurde
 * für bau-firma.com — die zweite Domain leitet dorthin weiter. Steht hier die
 * falsche, verweist jede Unterseite auf eine Adresse, unter der sie nicht
 * erreichbar ist, und die Seite verschenkt ihre Sichtbarkeit.
 */
const BASIS = 'https://bau-firma.com'

function setzeMeta(name: string, inhalt: string, attribut: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribut}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribut, name)
    document.head.appendChild(el)
  }
  el.content = inhalt
}

export function useSeo({
  titel,
  beschreibung,
  pfad,
}: {
  titel: string
  beschreibung: string
  pfad: string
}) {
  useEffect(() => {
    document.title = titel
    setzeMeta('description', beschreibung)
    setzeMeta('og:title', titel, 'property')
    setzeMeta('og:description', beschreibung, 'property')
    setzeMeta('og:url', BASIS + pfad, 'property')

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = BASIS + pfad
  }, [titel, beschreibung, pfad])
}
