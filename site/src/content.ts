/**
 * Alle Texte und Bildzuordnungen der Seite an einer Stelle.
 * Inhalte stammen aus bau-firma.com / wallner-bau-und-garten.de sowie aus der
 * Kundenrückmeldung vom 07.09.2026.
 * Mit TODO markierte Felder sind Platzhalter und müssen vom Kunden bestätigt werden.
 */

export const firma = {
  name: 'Wallner Bau & Garten',
  /** Schreibweise für Überschriften — der Kunde möchte hier kein „&“. */
  nameLang: 'Wallner Bau und Garten',
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
  /**
   * Erfahrung in Jahren. Die früher genannten „10 Jahre“ waren der Stand von
   * 2020 und standen seitdem unverändert auf der Bestandsseite — 2026 sind es
   * 16. Diese eine Zahl speist Hero, Über-uns-Block und Kennzahlenband.
   */
  jahre: '16',
} as const

export const zeiten = [
  { tag: 'Mo – Do', zeit: '08:00 – 17:00' },
  { tag: 'Freitag', zeit: '08:00 – 12:30' },
  { tag: 'Sa – So', zeit: 'Geschlossen' },
]

/**
 * Hauptnavigation. Seit dem Umbau auf Unterseiten sind das echte Pfade, keine
 * Sprungmarken mehr.
 *
 * „Über uns“ steht bewusst nicht drin: der Block ist kurz und liegt auf der
 * Startseite, ein eigener Menüpunkt dafür wäre eine Zeile zu viel. Die
 * Sprungmarke `#ueber-uns` gibt es weiterhin, falls sie mal verlinkt wird.
 */
export const nav = [
  { label: 'Start', href: '/' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Projekte', href: '/projekte' },
  { label: 'Kontakt', href: '/kontakt' },
]

export type Schwerpunkt = {
  titel: string
  text: string
  bild: string
  bildAlt: string
}

export type Leistung = {
  nr: string
  /** Pfadsegment der Unterseite: /leistungen/<slug> */
  slug: string
  titel: string
  /** Kurzform für Kacheln und Navigation, wenn `titel` zu lang baut. */
  kurzTitel?: string
  kicker: string
  /** Ein Satz — mehr steht auf der Startseite nicht. */
  kurz: string
  /** Ausführliche Beschreibung, ausschließlich auf der Unterseite. */
  detail: string
  detail2?: string
  bild: string
  bildDetail: string
  bullets: string[]
  schritte: [string, string, string]
  /** Hervorgehobenes Teilgebiet innerhalb der Leistung. */
  schwerpunkt?: Schwerpunkt
  galerie: { bild: string; alt: string }[]
  /** Meta-Description der Unterseite. */
  meta: string
}

/**
 * Vorher-/Nachher-Paar. Es füllt seit der Kundenrückmeldung den kompletten
 * Hero-Hintergrund (Vorbild: Startseite von Malerei Schmidt & Bautenschutz).
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

/**
 * Die sechs Leistungen in der Reihenfolge, die der Kunde vorgegeben hat.
 *
 * Badsanierung und Erdarbeiten standen früher als eigene Punkte in der Liste,
 * kommen in der Kundenliste aber nicht mehr vor. Beides ist reale Arbeit mit
 * eigenen Fotos, deshalb steht es jetzt als `schwerpunkt` innerhalb von
 * Sanierung bzw. Außenanlagen — die Liste bleibt bei den sechs gewünschten
 * Punkten, die Inhalte gehen trotzdem nicht verloren.
 *
 * TODO Kunde: Die Texte zu „Dachflächenfenster“ und „Türen“ sind neu verfasst
 * und fachlich allgemein gehalten — bitte auf Richtigkeit prüfen, besonders die
 * Aussage zur Zusammenarbeit mit Dachdeckerbetrieben.
 * TODO Kunde: Für „Türen“ liegen keine eigenen Fotos vor; gezeigt werden
 * ersatzweise Flur- und Innenausbaubilder.
 */
export const leistungen: Leistung[] = [
  {
    nr: '01',
    slug: 'trockenbau',
    titel: 'Trockenbau',
    kicker: 'Wände, Decken, Akustik',
    kurz: 'Trennwände, abgehängte Decken, Vorsatzschalen und Dämmung.',
    detail:
      'Trockenbau ist unser Ursprungsgewerk — und die Disziplin, an der man saubere Arbeit am schnellsten erkennt. Gerade Kanten, dichte Anschlüsse an den Bestand und Decken, die auch in der Dachschräge in der Flucht bleiben, entstehen nicht zufällig, sondern durch ein sorgfältig gestelltes Ständerwerk. Was danach kommt, wird dadurch erst einfach.',
    detail2:
      'Wir arbeiten mit den Systemen der gängigen Hersteller und spachteln je nach Anspruch bis Q3 oder Q4 — also bis zu der Oberfläche, die Ihr späterer Anstrich oder die Tapete tatsächlich braucht. Auf Wunsch übernehmen wir gleich die Installationsebene für Elektrik und Licht mit.',
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
    galerie: [
      { bild: '/bilder/trockenbau-decke.jpg', alt: 'Abgehängte Trockenbaudecke mit Lichtvouten im Rohbau' },
      { bild: '/bilder/trockenbau-dachfenster.jpg', alt: 'Trockenbauarbeiten rund um ein neu eingesetztes Dachfenster' },
      { bild: '/bilder/decke-led-blau.jpg', alt: 'Deckengestaltung mit umlaufender LED-Beleuchtung' },
      { bild: '/bilder/innenausbau-flur-rohbau.jpg', alt: 'Flur im Rohbau während des Innenausbaus' },
    ],
    meta: 'Trockenbau von Wallner Bau & Garten: Trennwände, Vorsatzschalen, abgehängte Decken mit Lichtvouten und Dämmung im Raum Mühldorf am Inn.',
  },
  {
    nr: '02',
    slug: 'innenausbau',
    titel: 'Innenausbau',
    kicker: 'Räume nach Ihren Wünschen',
    kurz: 'Böden, Decken, Wandverkleidungen und Innentüren aus einer Hand.',
    detail:
      'Innenausbau heißt bei uns: aus einem Rohbau wird ein Raum, in dem man sich sofort wohlfühlt. Wir übernehmen Böden, Decken, Wandverkleidungen und Innentüren im Zusammenhang — so greifen die Gewerke ineinander, statt sich gegenseitig aufzuhalten.',
    detail2:
      'Besonders gefragt sind Akustik- und Lamellenwände in Kombination mit indirekter Beleuchtung, weil sie einem Raum Ruhe geben, ohne ihn schwer wirken zu lassen. Ob privater Wohnraum oder Gewerbefläche: Wir stimmen Material und Ablauf vorher mit Ihnen ab und übergeben am Ende einen fertigen, besenreinen Raum.',
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
    galerie: [
      { bild: '/bilder/wohnraum-holzlamellen-led.jpg', alt: 'Wohnraum mit vertikaler Holzlamellenwand und indirekter LED-Beleuchtung' },
      { bild: '/bilder/wohnraum-fertig.jpg', alt: 'Fertiggestellter heller Wohnraum mit bodentiefem Fenster' },
      { bild: '/bilder/flur-teppich.jpg', alt: 'Fertiger Flur mit Teppichboden und Einbauschrank' },
      { bild: '/bilder/decke-led-blau.jpg', alt: 'Deckengestaltung mit umlaufender LED-Beleuchtung' },
    ],
    meta: 'Innenausbau von Wallner Bau & Garten: Böden, Decken, Akustik- und Lamellenwände, Innentüren für Privat und Gewerbe im Raum Mühldorf am Inn.',
  },
  {
    nr: '03',
    slug: 'sanierung',
    titel: 'Sanierung & Renovierung',
    kurzTitel: 'Sanierung / Renovierung',
    kicker: 'Auf den neuesten Stand',
    kurz: 'Altbau, Dachgeschossausbau und Renovierung im bewohnten Bestand.',
    detail:
      'Im Bestand entscheidet sich vieles erst, wenn die erste Wand offen ist. Deshalb planen wir Sanierungen mit Luft für das, was dahinter zum Vorschein kommt, und stimmen jeden Schritt mit Ihnen ab, bevor er ausgeführt wird.',
    detail2:
      'Der Anspruch bleibt dabei immer derselbe: Was den Charakter des Hauses ausmacht, bleibt erhalten — alles andere kommt auf den heutigen Stand. Das reicht von der einzelnen Renovierung im bewohnten Haus bis zum kompletten Dachgeschossausbau mit neuem Grundriss.',
    bild: '/bilder/dachgeschoss-holzboden.jpg',
    bildDetail: '/bilder/dachgeschoss-ausbau.jpg',
    bullets: [
      'Altbausanierung mit Respekt vor dem Bestand',
      'Dachgeschossausbau und Grundrissänderungen',
      'Renovierung auch im bewohnten Haus',
    ],
    schritte: [
      'Bestandsaufnahme und ehrliche Einschätzung',
      'Rückbau und Neuaufbau Schritt für Schritt',
      'Feinarbeiten bis ins Detail',
    ],
    schwerpunkt: {
      titel: 'Schwerpunkt: Badsanierung',
      text: 'Ein Bad ist der Raum, in dem die meisten Gewerke auf dem kleinsten Grundriss zusammenkommen — genau daran scheitern Zeitpläne sonst am häufigsten. Wir koordinieren Trockenbau, Fliese und Elektrik selbst und arbeiten dafür fest mit Sanitärfirmen aus der Region zusammen. Sie haben einen Ansprechpartner statt vier.',
      bild: '/bilder/bad-fertig-1.jpg',
      bildAlt: 'Fertig saniertes Badezimmer mit Waschtisch und Spiegelwand',
    },
    galerie: [
      { bild: '/bilder/dachgeschoss-ausbau.jpg', alt: 'Dachgeschoss während des Ausbaus mit sichtbarem Gebälk' },
      { bild: '/bilder/dachgeschoss-holzboden.jpg', alt: 'Fertiges Dachgeschoss mit Holzboden und Einbauschränken' },
      { bild: '/bilder/bad-rohbau.jpg', alt: 'Badezimmer im Rohbauzustand während der Sanierung' },
      { bild: '/bilder/bad-dusche-fertig.jpg', alt: 'Bodengleiche Dusche mit großformatigen Fliesen' },
      { bild: '/bilder/bad-tuerkis-led.jpg', alt: 'Badezimmer mit freistehender Wanne und türkiser LED-Beleuchtung' },
    ],
    meta: 'Sanierung und Renovierung von Wallner Bau & Garten: Altbausanierung, Dachgeschossausbau und Badsanierung im Raum Mühldorf am Inn.',
  },
  {
    nr: '04',
    slug: 'dachflaechenfenster',
    titel: 'Dachflächenfenster',
    // Weiches Trennzeichen (U+00AD): das Wort ist breiter als eine Kachel.
    // Ohne die Marke trennt der Browser irgendwo — mit ihr an der Fuge.
    kurzTitel: 'Dachflächen\u00ADfenster',
    kicker: 'Licht ins Dachgeschoss',
    kurz: 'Einbau, Austausch und sauberer Innenanschluss von Dachfenstern.',
    detail:
      'Ein Dachflächenfenster macht aus einem Abstellgeschoss innerhalb weniger Stunden einen Raum, den man wirklich nutzt. Entscheidend ist dabei nicht das Fenster selbst, sondern alles ringsherum: der dichte Anschluss an die Dachhaut, die gedämmte Laibung und die Verkleidung innen.',
    detail2:
      'Wir klären vorab Sparrenabstand, Größe und Position, arbeiten für die Arbeiten an der Dachhaut mit Dachdeckerbetrieben aus der Region zusammen und übernehmen den kompletten Innenausbau rund um die Öffnung selbst. Auch der Austausch alter Fenster im vorhandenen Ausschnitt gehört dazu.',
    bild: '/bilder/trockenbau-dachfenster.jpg',
    bildDetail: '/bilder/dachgeschoss-ausbau.jpg',
    bullets: [
      'Einbau in bestehende und neue Dachflächen',
      'Austausch alter Fenster im vorhandenen Ausschnitt',
      'Laibung, Dämmung und Verkleidung im Trockenbau',
    ],
    schritte: [
      'Aufmaß, Sparrenabstand und Fensterwahl klären',
      'Öffnung, Einbau und dichter Anschluss außen',
      'Dämmung, Laibung und Verkleidung innen',
    ],
    galerie: [
      { bild: '/bilder/trockenbau-dachfenster.jpg', alt: 'Trockenbauarbeiten rund um ein neu eingesetztes Dachfenster' },
      { bild: '/bilder/dachgeschoss-ausbau.jpg', alt: 'Dachgeschoss während des Ausbaus mit sichtbarem Gebälk' },
      { bild: '/bilder/dachgeschoss-holzboden.jpg', alt: 'Fertiges Dachgeschoss mit Holzboden und Einbauschränken' },
    ],
    meta: 'Dachflächenfenster von Wallner Bau & Garten: Einbau, Austausch, gedämmte Laibung und Innenverkleidung im Raum Mühldorf am Inn.',
  },
  {
    nr: '05',
    slug: 'tueren',
    titel: 'Türen',
    kicker: 'Innentüren und Zargen',
    kurz: 'Innentüren, Zargen und Schiebetüren — messen, einbauen, einstellen.',
    detail:
      'Türen sind das Bauteil, das man im fertigen Raum am häufigsten anfasst — entsprechend fällt jede Ungenauigkeit auf. Wir nehmen Maß am Bestand, gleichen Wandstärken und schiefe Laibungen aus und setzen Zarge und Blatt so, dass die Tür in jeder Stellung stehen bleibt und die Fuge rundum gleich läuft.',
    detail2:
      'Das reicht vom Austausch einzelner Türen im bewohnten Haus bis zur kompletten Ausstattung eines Neubaus. Schiebetüren und in der Wand laufende Elemente planen wir früh mit, weil dafür schon das Ständerwerk stimmen muss.',
    bild: '/bilder/flur-teppich.jpg',
    bildDetail: '/bilder/innenausbau-flur-rohbau.jpg',
    bullets: [
      'Innentüren, Zargen und Beschläge',
      'Schiebetüren und in der Wand laufende Elemente',
      'Austausch im Bestand mit Anpassung der Laibung',
    ],
    schritte: [
      'Aufmaß am Bestand und gemeinsame Auswahl',
      'Zarge setzen, ausrichten und hinterfüllen',
      'Blatt einhängen, einstellen und übergeben',
    ],
    galerie: [
      { bild: '/bilder/flur-teppich.jpg', alt: 'Fertiger Flur mit Teppichboden und Einbauschrank' },
      { bild: '/bilder/innenausbau-flur-rohbau.jpg', alt: 'Flur im Rohbau während des Innenausbaus' },
      { bild: '/bilder/wohnraum-fertig.jpg', alt: 'Fertiggestellter heller Wohnraum mit bodentiefem Fenster' },
    ],
    meta: 'Türen von Wallner Bau & Garten: Innentüren, Zargen, Beschläge und Schiebetüren — Einbau und Austausch im Raum Mühldorf am Inn.',
  },
  {
    nr: '06',
    slug: 'aussenanlagen',
    titel: 'Außenanlagen',
    kicker: 'Terrasse und Garten',
    kurz: 'Terrassen, Wege, Gartengestaltung und Erdarbeiten mit eigenem Bagger.',
    detail:
      'Draußen zählt der Unterbau mindestens so viel wie der Belag. Wir bauen Terrassen und Wege deshalb von unten auf richtig auf — tragfähig gegründet, sauber entwässert und mit den passenden Einfassungen.',
    detail2:
      'Ob Holz, WPC oder Naturstein entscheiden wir gemeinsam nach Lage, Nutzung und dem Aufwand, den Sie später in die Pflege stecken möchten. Sichtschutz, Pflasterarbeiten und die Feinmodellierung des Geländes gehören für uns zum selben Auftrag.',
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
    schwerpunkt: {
      titel: 'Schwerpunkt: Erdarbeiten',
      text: 'Unser eigener Minibagger bis 1,5 Tonnen passt durch Hofeinfahrten und zwischen Bestandsmauern hindurch, wo größere Maschinen aufgeben müssen. Weil das Gerät uns selbst gehört, hängen Ihre Termine nicht an der Verfügbarkeit eines Mietparks — auch kurzfristige und kleinere Einsätze lassen sich sauber einplanen.',
      bild: '/bilder/minibagger-rot-erdarbeiten.jpg',
      bildAlt: 'Minibagger bei Erdarbeiten im Gelände',
    },
    galerie: [
      { bild: '/bilder/garten-pool-terrasse.jpg', alt: 'Gartenanlage mit Pool, Plattenbelag und Sichtschutz' },
      { bild: '/bilder/terrasse-holzdeck.jpg', alt: 'Terrasse mit Holzdielenbelag und Geländer' },
      { bild: '/bilder/erdarbeiten-bagger-lkw.jpg', alt: 'Erdarbeiten mit Bagger und Kipper auf der Baustelle' },
      { bild: '/bilder/minibagger-rot-erdarbeiten.jpg', alt: 'Minibagger bei Erdarbeiten im Gelände' },
      { bild: '/bilder/pickup-bagger-baustelle.jpg', alt: 'Firmenfahrzeug mit Anhänger und Radlader auf der Baustelle' },
    ],
    meta: 'Außenanlagen von Wallner Bau & Garten: Terrassenbau, Gartengestaltung, Pflasterarbeiten und Erdarbeiten mit eigenem Minibagger.',
  },
]

export function leistungNach(slug: string): Leistung | undefined {
  return leistungen.find((l) => l.slug === slug)
}

export const stats = [
  { wert: `${firma.jahre}+`, label: 'Jahre Erfahrung im Bauwesen' },
  { wert: '6', label: 'Gewerke aus einer Hand' },
  { wert: 'Regional', label: 'Zuhause im Raum Mühldorf am Inn' },
]

/** Kennzahlen für den Über-uns-Block auf der Startseite */
export const kennzahlen = [
  { wert: `${firma.jahre}+`, label: 'Jahre Erfahrung' },
  { wert: '100%', label: 'Aus einer Hand' },
  { wert: '4', label: 'Regionen im Einzugsgebiet' },
  { wert: '1,5 t', label: 'Eigener Minibagger' },
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
  { titel: 'Badsanierung komplett', ort: 'Burghausen', kategorie: 'Sanierung', bild: '/bilder/bad-fertig-1.jpg' },
  { titel: 'Dachgeschossausbau', ort: 'Landshut', kategorie: 'Sanierung', bild: '/bilder/dachgeschoss-holzboden.jpg' },
  { titel: 'Terrasse und Gartenanlage', ort: 'Niedertaufkirchen', kategorie: 'Außenanlagen', bild: '/bilder/garten-pool-terrasse.jpg' },
  { titel: 'Deckengestaltung mit Lichtvoute', ort: 'München', kategorie: 'Trockenbau', bild: '/bilder/trockenbau-decke.jpg' },
  { titel: 'Erdarbeiten mit Bagger und Kipper', ort: 'Mühldorf am Inn', kategorie: 'Außenanlagen', bild: '/bilder/erdarbeiten-bagger-lkw.jpg' },
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
 * Google-Bewertungen aus dem Unternehmensprofil, übernommen am 07.09.2026.
 *
 * Alle fünf stehen wörtlich so im Profil. Wichtig beim Nachpflegen:
 *
 * - Drei Texte waren in der Ansicht hinter „Mehr" abgeschnitten und enden hier
 *   deshalb mit „…“ (`gekuerzt: true`). Erfunden wird der Rest nicht — die
 *   vollständigen Texte müssen aus dem Google-Profil kopiert werden.
 * - Zwei Rezensionen sprechen von „MW Raum“ statt von Wallner Bau & Garten.
 *   Sie stehen im selben Profil, stammen also vom selben Betrieb unter dem
 *   früheren Namen. Der Wortlaut bleibt unverändert — eine Rezension
 *   umzuschreiben wäre eine Fälschung.
 * - Die Datumsangaben sind aus Googles relativen Angaben („vor 6 Monaten“)
 *   abgeleitet und damit auf den Monat genau, nicht auf den Tag.
 *
 * Es wird bewusst KEINE Gesamtnote und keine Anzahl aller Rezensionen
 * ausgegeben: beides war in der Vorlage nicht sicher lesbar, und eine falsche
 * Sterne-Zusammenfassung wäre eine irreführende Werbeaussage (§ 5 UWG).
 * Aus demselben Grund steht im JSON-LD keine `aggregateRating`.
 */
export const bewertungenFreigegeben = true

export type Bewertung = {
  name: string
  datum: string
  sterne: number
  text: string
  /** Text war in der Google-Ansicht abgeschnitten — Rest fehlt noch. */
  gekuerzt?: boolean
}

export const bewertungen: Bewertung[] = [
  {
    name: 'Chrislibear 87',
    datum: 'Mai 2026',
    sterne: 5,
    text: 'Top Firma! Die Pflaster- und Erdarbeiten wurden schnell und absolut fachgerecht erledigt. Ich bin sehr zufrieden mit dem Ergebnis und empfehle sie gerne weiter. Werde auch zukünftig diese Firma beauftragen weiter so, danke.',
  },
  {
    name: 'Nadine Spörl',
    datum: '2025',
    sterne: 5,
    text: 'Die Firma Mw Raum übernahm unseren Dachausbau. Fachlich kompetent, mit allen Informationen zu aktuellen Vorgaben, termingerecht, lösungsorientiert und bei allen …',
    gekuerzt: true,
  },
  {
    name: 'Nikola Milanovic',
    datum: '2025',
    sterne: 5,
    text: 'Die Firma MW Raum ist kurzfristig bei mir eingesprungen da mich mein Trockenbauer mitten während der Arbeiten hat sitzen lassen. Ich bin sehr zufrieden mit der …',
    gekuerzt: true,
  },
  {
    name: 'O',
    datum: '2025',
    sterne: 5,
    text: 'Eine junge Firma mit Seltenheitswert. Schnell, engagiert, fach- und sachgerechte saubere Ausführung und preiswert. Herr Wallner bringt eigene richtig gute Ideen …',
    gekuerzt: true,
  },
  {
    name: 'Anni',
    datum: 'März 2026',
    sterne: 5,
    text: 'Super Service',
  },
]
