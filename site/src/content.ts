/**
 * Alle Texte und Bildzuordnungen der Seite an einer Stelle.
 * Inhalte stammen aus bau-firma.com / wallner-bau-und-garten.de.
 * Mit TODO markierte Felder sind Platzhalter und müssen vom Kunden bestätigt werden.
 */

export const firma = {
  name: 'Wallner Bau & Garten',
  legal: 'Wallner Bau & Garten Trockenbau',
  inhaber: 'Matthias Wallner',
  claim: 'Wir schaffen Werte',
  subclaim: 'Perfektion und Fachkompetenz für Ihr Projekt — freundschaftlich und zuverlässig.',
  telefon: '+49 176 41589835',
  telefonHref: 'tel:+4917641589835',
  email: 'info@wallner-bau-und-garten.de',
  strasse: 'Bachweg 14',
  plzOrt: '84494 Niedertaufkirchen',
  ustId: 'DE424495602',
  gebiet: 'Mühldorf am Inn · München · Burghausen · Landshut',
  jahre: '10',
} as const

export const zeiten = [
  { tag: 'Mo – Do', zeit: '08:00 – 17:00' },
  { tag: 'Freitag', zeit: '08:00 – 12:30' },
  { tag: 'Sa – So', zeit: 'Geschlossen' },
]

export const nav = [
  { label: 'Start', href: '#start' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Projekte', href: '#projekte' },
  { label: 'Kontakt', href: '#kontakt' },
]

/** Leistungs-Stichworte aus der Leistungsgrafik der Bestandsseite */
export const leistungsBand = [
  'Trockenbau',
  'Innenausbau',
  'Altbau',
  'Neubau',
  'Sanierung',
  'Renovierung',
  'Gartenanlage',
  'Badsanierung',
  'Erdarbeiten',
  'Terrassenbau',
]

export type Leistung = {
  nr: string
  /** Anker-Ziel der Leistungsdetail-Section — aus dem Hero verlinkt. */
  slug: string
  titel: string
  kicker: string
  text: string
  /** Ausführlicher Text, nur in der Detail-Section. */
  detail: string
  bild: string
  /** Zweites Bild für die Detail-Section, damit sie nicht wie die Tab-Section wirkt. */
  bildDetail: string
  bullets: string[]
  /** Ablauf in drei Schritten — Struktur-Element nur der Detail-Section. */
  schritte: [string, string, string]
  hinweis?: string
}

/**
 * Vorher-/Nachher-Paar für den Hero-Reveal und den Regler in der Detail-Section.
 *
 * Beide Bilder sind mit GPT Image 2 erzeugt: das Nachher-Bild entstand als
 * Image-to-Image aus dem Vorher-Bild, damit Kamerastand, Fensterlage und
 * Raumgeometrie deckungsgleich sind — sonst „springt" der Ausschnitt.
 * Es sind Beispielvisualisierungen, keine Fotos eines realen Wallner-Projekts;
 * deshalb sind sie hier als solche ausgezeichnet und werden nicht als
 * Referenzprojekt beschriftet.
 */
export const vorherNachher = {
  vorher: '/bilder/hero-vorher-rohbau.jpg',
  nachher: '/bilder/hero-nachher-fertig.jpg',
  vorherAlt: 'Wohnraum im Rohbau: Trockenbau-Ständerwerk, unverputzte Platten und Estrich',
  nachherAlt: 'Derselbe Raum fertig ausgebaut: Eichenlamellenwand mit indirekter LED-Beleuchtung',
  hinweis: 'Beispielvisualisierung',
}

export const leistungen: Leistung[] = [
  {
    nr: '01',
    slug: 'innenausbau',
    titel: 'Innenausbau',
    kicker: 'Räume nach Ihren Wünschen',
    text: 'Wir gestalten Ihre Räume nach Ihren Wünschen und Bedürfnissen. Ob Gewerbe oder privater Wohnraum, unsere kreativen und funktionalen Konzepte überzeugen.',
    detail: 'Innenausbau heißt bei uns: aus einem Rohbau wird ein Raum, in dem man sich sofort wohlfühlt. Wir übernehmen Böden, Decken, Wandverkleidungen und Innentüren im Zusammenhang — so greifen die Gewerke ineinander, statt sich gegenseitig aufzuhalten. Besonders gefragt sind Akustik- und Lamellenwände in Kombination mit indirekter Beleuchtung, weil sie einem Raum Ruhe geben, ohne ihn schwer wirken zu lassen.',
    bild: '/bilder/wohnraum-holzlamellen-led.jpg',
    bildDetail: '/bilder/wohnraum-fertig.jpg',
    bullets: [
      'Privater Wohnraum und Gewerbeflächen',
      'Akustik- und Lamellenwände, indirekte LED-Beleuchtung',
      'Böden, Decken und Innentüren aus einer Hand',
    ],
    schritte: [
      'Aufmaß und gemeinsame Materialauswahl vor Ort',
      'Ausführung im abgestimmten Takt der Gewerke',
      'Übergabe des fertigen, besenreinen Raums',
    ],
  },
  {
    nr: '02',
    slug: 'sanierung',
    titel: 'Sanierung & Renovierung',
    kicker: 'Auf den neuesten Stand',
    text: 'Wir bringen Ihre Räume auf den neuesten Stand. Dabei legen wir großen Wert auf eine sorgfältige Planung und eine präzise Ausführung, um den Charme und die Funktionalität Ihrer Immobilie zu erhalten und zu verbessern.',
    detail: 'Im Bestand entscheidet sich vieles erst, wenn die erste Wand offen ist. Deshalb planen wir Sanierungen mit Luft für das, was dahinter zum Vorschein kommt, und stimmen jeden Schritt mit Ihnen ab, bevor er ausgeführt wird. Der Anspruch bleibt dabei immer derselbe: Was den Charakter des Hauses ausmacht, bleibt erhalten — alles andere kommt auf den heutigen Stand.',
    bild: '/bilder/dachgeschoss-ausbau.jpg',
    bildDetail: '/bilder/dachgeschoss-holzboden.jpg',
    bullets: [
      'Altbausanierung mit Respekt vor dem Bestand',
      'Sorgfältige Planung, präzise Ausführung',
      'Dachgeschossausbau und Grundrissänderungen',
    ],
    schritte: [
      'Bestandsaufnahme und ehrliche Einschätzung',
      'Rückbau und Neuaufbau Schritt für Schritt',
      'Feinarbeiten bis ins Detail',
    ],
  },
  {
    nr: '03',
    slug: 'badsanierung',
    titel: 'Badsanierung',
    kicker: 'Alles aus einer Hand',
    text: 'Badezimmer­sanierung aus einer Hand. In Zusammenarbeit mit Sanitärfirmen in unserer Umgebung übernehmen wir Planung und Ausführung, um einen reibungslosen Ablauf zu gewährleisten.',
    detail: 'Ein Bad ist der Raum, in dem die meisten Gewerke auf dem kleinsten Grundriss zusammenkommen. Genau daran scheitern Zeitpläne sonst am häufigsten. Wir koordinieren Sanitär, Fliese, Trockenbau und Elektrik deshalb selbst und arbeiten dafür fest mit Sanitärfirmen aus der Region zusammen — Sie haben einen Ansprechpartner statt vier.',
    bild: '/bilder/bad-fertig-1.jpg',
    bildDetail: '/bilder/bad-dusche-fertig.jpg',
    bullets: [
      'Planung und Ausführung aus einer Hand',
      'Enge Zusammenarbeit mit regionalen Sanitärfirmen',
      'Bodengleiche Duschen, Fliesen- und Lichtkonzept',
    ],
    schritte: [
      'Planung von Grundriss, Fliese und Licht',
      'Entkernung und Neuaufbau mit festen Terminen',
      'Endmontage und Übergabe des fertigen Bads',
    ],
  },
  {
    nr: '04',
    slug: 'aussenanlagen',
    titel: 'Außenanlagen',
    kicker: 'Terrasse und Garten',
    text: 'Terrassenbau oder individuelle Gartengestaltung — wir verwandeln Ihre Außenbereiche in echte Wohlfühloasen, ganz nach Ihren Vorstellungen.',
    detail: 'Draußen zählt der Unterbau mindestens so viel wie der Belag. Wir bauen Terrassen und Wege deshalb von unten auf richtig auf — tragfähig gegründet, sauber entwässert und mit den passenden Einfassungen. Ob Holz, WPC oder Naturstein entscheiden wir gemeinsam nach Lage, Nutzung und dem Aufwand, den Sie später in die Pflege stecken möchten.',
    bild: '/bilder/garten-pool-terrasse.jpg',
    bildDetail: '/bilder/terrasse-holzdeck.jpg',
    bullets: [
      'Terrassenbau in Holz, WPC und Naturstein',
      'Individuelle Gartengestaltung und Sichtschutz',
      'Wege, Einfassungen und Pflasterarbeiten',
    ],
    schritte: [
      'Aufmaß, Höhenplanung und Materialwahl',
      'Unterbau, Entwässerung und Einfassung',
      'Belag, Sichtschutz und Feinmodellierung',
    ],
  },
  {
    nr: '05',
    slug: 'erdarbeiten',
    titel: 'Erdarbeiten',
    kicker: 'Rund ums Haus und im Garten',
    text: 'Minibaggerarbeiten und Erdbewegung rund ums Haus und im Garten. Mit eigenem Bagger bis 1,5 Tonnen kommen wir auch dort hin, wo großes Gerät keinen Platz mehr hat.',
    detail: 'Unser eigener Minibagger bis 1,5 Tonnen passt durch Hofeinfahrten und zwischen Bestandsmauern hindurch, wo größere Maschinen längst aufgeben müssen. Weil das Gerät uns selbst gehört, hängen Ihre Termine nicht an der Verfügbarkeit eines Mietparks — auch kurzfristige und kleinere Einsätze lassen sich so sauber einplanen.',
    bild: '/bilder/minibagger-rot-erdarbeiten.jpg',
    bildDetail: '/bilder/erdarbeiten-bagger-lkw.jpg',
    bullets: [
      'Eigener Minibagger bis 1,5 Tonnen',
      'Erdbewegung, Aushub und Geländemodellierung',
      'Auch auf engen Grundstücken einsetzbar',
    ],
    schritte: [
      'Zufahrt und Leitungslage vorab klären',
      'Aushub, Abtrag und Bodenverbesserung',
      'Modellierung und Abtransport des Materials',
    ],
  },
  {
    nr: '06',
    slug: 'trockenbau',
    titel: 'Trockenbau',
    kicker: 'Wände, Decken, Akustik',
    text: 'Trockenbau ist unser Handwerk seit dem ersten Tag: Wände, abgehängte Decken, Vorsatzschalen und Dämmung — sauber ausgeführt und passgenau auf Ihr Projekt abgestimmt.',
    detail: 'Trockenbau ist unser Ursprungsgewerk — und die Disziplin, an der man saubere Arbeit am schnellsten erkennt. Gerade Kanten, dichte Anschlüsse an den Bestand und Decken, die auch in der Dachschräge in der Flucht bleiben, entstehen nicht zufällig, sondern durch ein sorgfältig gestelltes Ständerwerk. Was danach kommt, wird dadurch erst einfach.',
    bild: '/bilder/trockenbau-decke.jpg',
    bildDetail: '/bilder/trockenbau-dachfenster.jpg',
    bullets: [
      'Trennwände, Vorsatzschalen und Dämmung',
      'Abgehängte Decken mit Lichtvouten',
      'Sauberer Anschluss an Bestand und Dachschrägen',
    ],
    schritte: [
      'Ständerwerk stellen und exakt ausrichten',
      'Dämmung, Beplankung und Installationsebene',
      'Spachteln und Schleifen bis Q3 oder Q4',
    ],
  },
]

export const stats = [
  { wert: '10+', label: 'Jahre Erfahrung im Bauwesen' },
  { wert: 'Team', label: 'Junges Team aus ausgebildeten Fachkräften' },
  { wert: 'Regional', label: 'Zuhause im Raum Mühldorf am Inn' },
]

/** Kennzahlen-Laufband „Wir bauen für die Besten" (J-Davis-Vorbild) */
export const kennzahlen = [
  { wert: '10+', label: 'Jahre Erfahrung' },
  { wert: '100%', label: 'Aus einer Hand' },
  { wert: '4', label: 'Regionen im Einzugsgebiet' },
  { wert: '1,5 t', label: 'Eigener Minibagger' },
  { wert: '6', label: 'Gewerke im Angebot' },
]

export type Projekt = {
  titel: string
  ort: string
  kategorie: string
  bild: string
}

/**
 * Die Orte sind aus dem Einzugsgebiet abgeleitet und vom Kunden NICHT bestätigt.
 * Solange `orteBestaetigt` false ist, werden sie nicht ausgegeben — sonst stünden
 * dort erfundene Referenzangaben. Nach Rückmeldung des Kunden: Orte korrigieren
 * und das Flag auf true setzen.
 */
export const orteBestaetigt = false

export const projekte: Projekt[] = [
  { titel: 'Wohnraum mit Lamellenwand', ort: 'Mühldorf am Inn', kategorie: 'Innenausbau', bild: '/bilder/wohnraum-holzlamellen-led.jpg' },
  { titel: 'Badsanierung komplett', ort: 'Burghausen', kategorie: 'Badsanierung', bild: '/bilder/bad-fertig-1.jpg' },
  { titel: 'Dachgeschossausbau', ort: 'Landshut', kategorie: 'Sanierung', bild: '/bilder/dachgeschoss-holzboden.jpg' },
  { titel: 'Terrasse und Gartenanlage', ort: 'Niedertaufkirchen', kategorie: 'Außenanlagen', bild: '/bilder/garten-pool-terrasse.jpg' },
  { titel: 'Deckengestaltung mit Lichtvoute', ort: 'München', kategorie: 'Trockenbau', bild: '/bilder/trockenbau-decke.jpg' },
  { titel: 'Erdarbeiten am Hang', ort: 'Mühldorf am Inn', kategorie: 'Erdarbeiten', bild: '/bilder/erdarbeiten-bagger-lkw.jpg' },
]

/** Galerie — alle echten Baustellen- und Ergebnisfotos */
export const galerie = [
  { bild: '/bilder/wohnraum-holzlamellen-led.jpg', alt: 'Wohnraum mit vertikaler Holzlamellenwand und indirekter LED-Beleuchtung' },
  { bild: '/bilder/bad-fertig-1.jpg', alt: 'Fertig saniertes Badezimmer mit Waschtisch und Spiegelwand' },
  { bild: '/bilder/bad-dusche-fertig.jpg', alt: 'Bodengleiche Dusche mit großformatigen Fliesen' },
  { bild: '/bilder/bad-tuerkis-led.jpg', alt: 'Badezimmer mit freistehender Wanne und türkiser LED-Beleuchtung' },
  { bild: '/bilder/bad-rohbau.jpg', alt: 'Badezimmer im Rohbauzustand während der Sanierung' },
  { bild: '/bilder/trockenbau-decke.jpg', alt: 'Abgehängte Trockenbaudecke mit Lichtvouten im Rohbau' },
  { bild: '/bilder/trockenbau-dachfenster.jpg', alt: 'Trockenbauarbeiten rund um ein neu eingesetztes Dachfenster' },
  { bild: '/bilder/dachgeschoss-ausbau.jpg', alt: 'Dachgeschoss während des Ausbaus mit sichtbarem Gebälk' },
  { bild: '/bilder/dachgeschoss-holzboden.jpg', alt: 'Fertiges Dachgeschoss mit Holzboden und Einbauschränken' },
  { bild: '/bilder/wohnraum-fertig.jpg', alt: 'Fertiggestellter heller Wohnraum mit bodentiefem Fenster' },
  { bild: '/bilder/innenausbau-flur-rohbau.jpg', alt: 'Flur im Rohbau während des Innenausbaus' },
  { bild: '/bilder/flur-teppich.jpg', alt: 'Fertiger Flur mit Teppichboden und Einbauschrank' },
  { bild: '/bilder/decke-led-blau.jpg', alt: 'Deckengestaltung mit umlaufender LED-Beleuchtung' },
  { bild: '/bilder/terrasse-holzdeck.jpg', alt: 'Terrasse mit Holzdielenbelag und Geländer' },
  { bild: '/bilder/garten-pool-terrasse.jpg', alt: 'Gartenanlage mit Pool, Plattenbelag und Sichtschutz' },
  { bild: '/bilder/erdarbeiten-bagger-lkw.jpg', alt: 'Erdarbeiten mit Bagger und Kipper auf der Baustelle' },
  { bild: '/bilder/minibagger-rot-erdarbeiten.jpg', alt: 'Minibagger bei Erdarbeiten im Gelände' },
  { bild: '/bilder/pickup-bagger-baustelle.jpg', alt: 'Firmenfahrzeug mit Anhänger und Radlader auf der Baustelle' },
  { bild: '/bilder/team-portrait-baustelle.jpg', alt: 'Mitarbeiter von Wallner Bau & Garten auf der Baustelle' },
]

/**
 * Google-Bewertungen.
 *
 * `bewertungenFreigegeben` bleibt false, solange hier Platzhalter stehen: die
 * Section wird dann im Produktionsbuild komplett ausgelassen. Fünf-Sterne-
 * Bewertungen ohne reale Rezension wären eine irreführende Werbeaussage
 * (§ 5 UWG) — deshalb darf der Platzhalterstand nicht live gehen.
 * Im Dev-Server bleibt die Section sichtbar, damit das Layout prüfbar ist.
 *
 * Sobald die echten Rezensionen vorliegen: Name, Text, Datum und Sterne
 * eintragen, `platzhalter` entfernen und das Flag auf true setzen.
 */
export const bewertungenFreigegeben = false

export const bewertungen = [
  {
    name: 'Platzhalter Rezension 1',
    rolle: 'Google Rezension',
    sterne: 5,
    text: 'Hier steht die erste echte Google-Bewertung von Wallner Bau & Garten. Der Text wird eins zu eins aus dem Google-Unternehmensprofil übernommen.',
    platzhalter: true,
  },
  {
    name: 'Platzhalter Rezension 2',
    rolle: 'Google Rezension',
    sterne: 5,
    text: 'Hier steht die zweite echte Google-Bewertung. Bitte Originaltext, Name und Datum aus dem Google-Profil einsetzen.',
    platzhalter: true,
  },
  {
    name: 'Platzhalter Rezension 3',
    rolle: 'Google Rezension',
    sterne: 5,
    text: 'Hier steht die dritte echte Google-Bewertung. Bitte Originaltext, Name und Datum aus dem Google-Profil einsetzen.',
    platzhalter: true,
  },
]
