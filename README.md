# Wallner Bau & Garten — Website

Neue Website für Wallner Bau & Garten Trockenbau (Matthias Wallner, Niedertaufkirchen).
Ersetzt die Bestandsseite unter bau-firma.com / wallner-bau-und-garten.de.

**Design-Vorgabe:** Formensprache, Farben und Typografie nach
[bpmarineconstruction.com](https://bpmarineconstruction.com/), Markenfarbe Grün statt Blau.
Die Projekt-Referenzen übernehmen die „Featured Projects"-Scroll-Mechanik von
[jdavisgc.com](https://jdavisgc.com/).

**Stand 07.09.2026 — Umbau nach Kundenrückmeldung.** Der Kunde fand die erste Fassung als
Einzelseite zu voll: „das ist für ältere viel zu viel Information". Die Seite ist deshalb
aufgeteilt (siehe [Seitenstruktur](#seitenstruktur)). Der Aufbau der Startseite ab dem Hero
folgt jetzt der vom Kunden genannten Referenz [conprobau.de](https://www.conprobau.de/#leistungen):
Leistungen als schlichtes Icon-Raster ohne Beschreibung, danach Über uns, Projektanriss,
Google-Bewertungen und Kontakt in Kurzform. Der Hero behält den Vorher/Nachher-Reveal.

## Starten

```bash
cd site
npm install
npm run dev      # http://localhost:5173
npm run build    # Produktionsbuild nach site/dist
npm run preview  # Build lokal prüfen
```

## Seitenstruktur

Bis September 2026 war das eine einzige Seite mit Sprungmarken. Nach der Kundenrückmeldung
sind es echte Unterseiten:

| Pfad | Inhalt |
| --- | --- |
| `/` | Hero (Vorher/Nachher-Reveal), Leistungen als Aufzählung, „Wer wir sind", Projektanriss, Google-Bewertungen, Kontakt in Kurzform |
| `/leistungen` | Übersicht der sechs Leistungen |
| `/leistungen/<slug>` | Ausführliche Beschreibung einer Leistung, Ablauf, Bilder, Kontaktknopf |
| `/projekte` | Abgeschlossene Projekte und die komplette Bildergalerie |
| `/kontakt` | Anfrageformular und alle Kontaktdaten |
| `/rechtliches` | Impressum und Datenschutz (`/impressum` und `/datenschutz` führen dorthin) |

Der Router steht in `src/router.tsx` und ist bewusst selbst geschrieben: rund 80 Zeilen über
die History-API statt einer Router-Bibliothek samt Abhängigkeitsbaum. `netlify.toml` liefert
für jeden Pfad dieselbe `index.html` aus, damit direkte Aufrufe und geteilte Links
funktionieren. Titel, Beschreibung und Canonical setzt jede Seite über `src/seo.ts` selbst.

## Aufbau

```
site/
  src/
    content.ts              ← ALLE Texte, Bildzuordnungen und Kontaktdaten an einer Stelle
    router.tsx              Mini-Router über die History-API (Link, useRoute, Scrollverhalten)
    anim.ts                 useReveal — Einblenden beim Hereinscrollen (GSAP ScrollTrigger)
    seo.ts                  Titel, Description und Canonical je Seite
    index.css               Design-Tokens, Buttons, Eyebrow, Verlaufsbänder
    pages/
      Start.tsx             Startseite — kurz gehalten, Aufbau nach conprobau.de
      LeistungenUebersicht.tsx
      LeistungSeite.tsx     Eine Leistung ausführlich (Kopf, Text, Ablauf, Bilder, CTA)
      ProjekteSeite.tsx     Referenzen + Galerie
      KontaktSeite.tsx      Formular und Kontaktdaten
      RechtlichesSeite.tsx  Impressum und Datenschutz
      NichtGefunden.tsx     404 mit Absprung auf die Leistungen
    components/
      Nav.tsx               Sticky-Header mit Logo und aktiver Seitenmarkierung
      Hero.tsx              Fertiger Raum, Lupe zeigt den Rohbau; Text-Auftakt beim Laden
      LeistungenGrid.tsx    Die sechs Leistungen als Aufzählung mit Icon
      WerWirSind.tsx        Kurzer Über-uns-Block mit Kennzahlen
      ProjekteTeaser.tsx    Drei Bilder + Knopf auf /projekte
      KontaktKurz.tsx       Telefon und E-Mail als große Schaltflächen
      Seitenkopf.tsx        Gemeinsamer Kopfbereich der Unterseiten
      CTABand.tsx           Kontaktabsprung am Ende jeder Unterseite
      Projekte.tsx          Referenzen als Sticky-Kartenstapel (J-Davis-Mechanik)
      Galerie.tsx           Karussell mit Zähler, Fortschritt und Lightbox
      Bewertungen.tsx       Echte Google-Rezensionen als räumliches Banner mit Pfeilen
      Kontakt.tsx           Dunkle Infokarte + weißes Formular
      Rechtliches.tsx       Impressum und Datenschutz
      Footer.tsx            Footer mit Leistungsliste und Pflichtangaben
      icons.tsx             SVG-Set, Leistungs-Icons über den Slug zugeordnet
  public/
    logo/logo.png           Freigestelltes Kundenlogo (transparent)
    bilder/                 19 echte Projektfotos der Bestandsseite
    video/                  Hochkant-Clip (Kling 3.0) + Poster — derzeit ungenutzt
    og-wallner-...jpg       Social-Sharing-Bild, aus Logo und echtem Foto gesetzt
  index.html                Meta-Tags, Open Graph und JSON-LD (GeneralContractor)
recherche/
  bilder/                   Erste Fassung der Bilder (Web-Größe)
  bilder-original/          Originaldateien in voller Auflösung
  logo/                     Logo original + freigestellt
  video/                    Unkomprimierter Kling-Clip
  referenz/shots/           Screenshots von BP Marine (bp_*) und J Davis (jd_*)
```

## Design-Tokens

Der Akzent ist exakt das Grün aus dem Kundenlogo.

| Rolle | Wert | Ersetzt bei BP Marine |
| --- | --- | --- |
| Akzent | `#AAC527` (`lime`) | `#1D77E6` |
| Akzent hell | `#C3E02E` (`lime-bright`) | — |
| Akzent dunkel | `#5F730F` (`lime-dark`) | für Text auf Hell, erfüllt 4.5:1 |
| Section dunkel | `#0A140A` (`forest-900`) | `#071C32` |
| Section sehr dunkel | `#060D06` (`forest-950`) | `#031018` |
| Headline auf Hell | `#22401C` (`moss-900`) | `#123363` |
| Section hell | `#F3F7EE` (`mist`) | `#F4F8FC` |

Schriften wie bei der Referenz: **Teko** für Headlines (uppercase, enges Tracking),
**Poppins** für Fließtext.

## Offene Punkte

### 1. Google-Bewertungen — drin, aber drei Texte sind abgeschnitten
`src/content.ts` → `bewertungen` und `bewertungenFreigegeben`.

Die fünf echten Rezensionen aus dem Google-Unternehmensprofil sind seit dem 07.09.2026
eingetragen, `bewertungenFreigegeben` steht auf `true`, die Section ist live.

**Noch zu erledigen:** Drei Texte (Nadine Spörl, Nikola Milanovic, „O") waren in der Vorlage
hinter Googles „Mehr"-Link abgeschnitten und enden hier mit „…" (`gekuerzt: true`).
Vollständige Texte aus dem Google-Profil kopieren und das Flag entfernen. Im Dev-Server
markiert eine grüne Notiz auf der Karte, welche das sind; im Livebuild sieht man davon nichts.

Zwei Hinweise zum Wortlaut:

- Zwei Rezensionen sprechen von **„MW Raum"** statt von Wallner Bau & Garten — offenbar der
  frühere Name desselben Betriebs. Der Wortlaut bleibt unverändert; eine Rezension
  umzuschreiben wäre eine Fälschung.
- Es wird **keine Gesamtnote und keine Gesamtzahl** ausgegeben, und im JSON-LD steht keine
  `aggregateRating`. Beides war in der Vorlage nicht sicher lesbar, und eine falsche
  Sterne-Zusammenfassung wäre eine irreführende Werbeaussage (§ 5 UWG). Wenn die Zahlen
  belegt vorliegen, kann beides ergänzt werden.

Fällt `bewertungenFreigegeben` je zurück auf `false`, verschwindet die Section im
Produktionsbuild wieder komplett — die Sicherung ist absichtlich stehen geblieben.

### 2. Projektorte — unbestätigt, werden nicht ausgegeben
`src/content.ts` → `projekte` und `orteBestaetigt`. Die Orte sind aus dem Einzugsgebiet
abgeleitet und nicht vom Kunden bestätigt, deshalb steht `orteBestaetigt` auf `false` und die
Ortsangabe wird ausgelassen. Nach Rückmeldung: Orte korrigieren, Flag auf `true`.

### 3. Hero — Reveal-Kreis auf dem Desktop, Video auf dem Handy
Der Hero zeigt auf dem Desktop den Vorher/Nachher-Reveal: Grundebene ist der **fertige
Raum**, der Mauszeiger schneidet daraus einen Kreis frei, in dem der Rohbau darunter zum
Vorschein kommt — eine Lupe in die Vergangenheit. Auf Touchgeräten gibt es keinen Hover,
dort läuft weiterhin `public/video/hero-innenausbau-9x16.mp4`.

Zwischenstand: Der Reveal war am 07.09.2026 kurzzeitig durch einen Regler über den ganzen
Bildschirm ersetzt (Bildpaar als Hintergrund, auch auf dem Handy) und wurde noch am selben
Tag wieder zurückgebaut. Der Code dazu steht in der Git-Historie, falls die Variante doch
noch einmal gebraucht wird — sie hatte den Vorteil, dass der Effekt auch mobil funktioniert.

Wer den Hero auf Bewegtbild umstellen will, braucht für den Desktop einen 16:9-Clip —
dann aber als Ersatz für den Reveal, nicht daneben. Rezept dafür:

Erzeugt mit KIE AI, Modell `kling-3.0/video`, Bild-zu-Video aus dem echten Foto
`wohnraum-holzlamellen-led.jpg`. Kosten laut API: **42 Credits für 3 Sekunden im
`std`-Modus**, 5 Sekunden `std` und 3 Sekunden `pro` lagen darüber.

Wichtig: Kling übernimmt das Seitenverhältnis des Quellbildes und ignoriert
`aspect_ratio`. Für einen 16:9-Clip muss also ein **Querformat**-Foto als erstes Bild
dienen, zum Beispiel `dachgeschoss-ausbau.jpg` (2000×1125) oder
`erdarbeiten-bagger-lkw.jpg` (2000×1500).

```bash
curl -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer $KIE_KEY" -H "Content-Type: application/json" \
  -d '{"model":"kling-3.0/video","input":{
    "image_urls":["<öffentliche URL eines Querformat-Fotos>"],
    "prompt":"Slow cinematic dolly push forward, photorealistic, no people, stable geometry",
    "duration":"5","aspect_ratio":"16:9","mode":"pro","sound":false,"multi_shots":false}}'
# Status: GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=<id>
# Guthaben: GET https://api.kie.ai/api/v1/chat/credit
```

### 4. Kontaktformular ohne Backend
`src/components/Kontakt.tsx` → `FORM_ENDPOINT`. Solange `null`, öffnet das Formular eine
vorausgefüllte E-Mail im Mailprogramm. Für den Livebetrieb ein Ziel eintragen
(Formspree, Netlify Forms oder eigenes Skript).

### 5. Impressum — fehlende Registerangaben beim Kunden erfragen
`src/components/Rechtliches.tsx`. Das Impressum der Bestandsseite
(bau-firma.com/impressum) enthält nur Firma, Inhaber, Anschrift, Kontakt und USt-IdNr.
Offen und **bewusst nicht erfunden**:

- **Handwerksrolle.** Trockenbau ist ein zulassungsfreies Handwerk (Anlage B1 HwO).
  Ist der Betrieb in der Handwerksrolle eingetragen, gehören Kammer, Ort und die
  Berufsbezeichnung samt verleihendem Staat ins Impressum (§ 5 Abs. 1 Nr. 5 DDG).
- **Handelsregister.** Bei einem Einzelunternehmen ohne HR-Eintrag entfällt die Angabe.
  Falls doch eingetragen: Registergericht und Nummer ergänzen.

Erfundene Registerdaten wären im Impressum schlimmer als eine Lücke — deshalb steht dort
derzeit nichts dazu. Nach Rückmeldung des Kunden ergänzen.

Keine EU-Streitschlichtungs-Plattform verlinken: die OS-Plattform der EU-Kommission hat
am 20.07.2025 den Betrieb eingestellt, ein Link ginge ins Leere. Die Erklärung nach
§ 36 VSBG steht drin und genügt.

### 6. Domain in den Meta-Tags
`index.html` — `og:image`, `og:url` und `canonical` zeigen auf
`https://wallner-bau-und-garten.de/`. Falls die Seite unter einer anderen Domain live geht,
alle drei anpassen; relative OG-URLs lösen Facebook, LinkedIn und WhatsApp nicht auf.

### 7. Neue Leistungen „Dachflächenfenster" und „Türen" — Texte ungeprüft
`src/content.ts` → `leistungen`. Beide Punkte kommen aus der Kundenliste vom 07.09.2026 und
standen vorher nirgends. Die Beschreibungen sind neu verfasst und fachlich allgemein
gehalten. **Vom Kunden zu bestätigen**, besonders der Satz, dass die Arbeiten an der
Dachhaut zusammen mit Dachdeckerbetrieben aus der Region ausgeführt werden.

Für „Türen" gibt es außerdem keine eigenen Fotos. Gezeigt werden ersatzweise Flur- und
Innenausbaubilder — sobald echte Türenfotos vorliegen, in `leistungen[4].galerie`,
`bild` und `bildDetail` austauschen.

### 8. Badsanierung und Erdarbeiten stehen jetzt eingerückt
Die Kundenliste nennt sechs Leistungen und Badsanierung bzw. Erdarbeiten nicht mehr
einzeln. Beides ist reale Arbeit mit eigenen Fotos, deshalb steht es als `schwerpunkt`
innerhalb von „Sanierung & Renovierung" bzw. „Außenanlagen" — die Aufzählung bleibt bei den
gewünschten sechs Punkten, die Inhalte gehen nicht verloren. Falls der Kunde die beiden
doch wieder als eigene Punkte will: `schwerpunkt` in einen eigenen Eintrag in `leistungen`
umziehen, Icon in `icons.tsx` ist mit `IconBad` und `IconBagger` noch vorhanden.

### 9. „16 Jahre Erfahrung" — Zahl aktuell halten
`src/content.ts` → `firma.jahre`. Die Bestandsseite warb unverändert mit „10 Jahren", laut
Kunde der Stand von 2020. Der Wert steht jetzt an genau einer Stelle und speist Hero,
Über-uns-Block, Kennzahlen und die Kontaktseite. Beim nächsten Jahreswechsel hochzählen —
oder besser durch ein Gründungsjahr ersetzen und die Differenz rechnen lassen.

## Datenschutz-relevante Entscheidungen

- **Schriften selbst gehostet.** Teko und Poppins liegen als woff2 unter `public/fonts/`,
  eingebunden über `src/fonts.css`. Beim Seitenaufruf geht keine Anfrage an Google — das
  wäre sonst ein Widerspruch zur eigenen Datenschutzerklärung und nach LG München I,
  3 O 17493/20 abmahnfähig.
- **Keine Tracker, kein Cookie-Banner.** Die Seite lädt nichts von Dritten, setzt keine
  Cookies und schreibt nichts in `localStorage` oder `sessionStorage`. Im Browser
  nachgemessen: 0 Fremdverbindungen, 0 Cookies, 0 Storage-Einträge nach vollständigem
  Durchscrollen. Eine Einwilligung nach § 25 TDDDG ist damit nicht erforderlich, deshalb
  gibt es bewusst **keinen** Cookie-Banner.

  Der frühere `CookieHinweis.tsx` ist entfernt (Stand September 2026). Er bot eine Wahl
  zwischen „alle" und „nur notwendige" Cookies, obwohl es weder die einen noch die anderen
  gab, und legte als einzigen Speichereintrag seine eigene Wegklick-Notiz an.

  **Wird später ein einwilligungspflichtiger Dienst eingebunden** — Google Maps, YouTube,
  Google Fonts per CDN, Analytics, Meta-Pixel —, muss ein Banner zurück. Dann aber als
  echte Sperre: der Dienst darf erst *nach* der Einwilligung geladen werden. Eine bloße
  Hinweisleiste, die den Dienst trotzdem sofort lädt, erfüllt § 25 TDDDG nicht.
  Gleichzeitig sind dann Abschnitt 6 und 7 der Datenschutzerklärung anzupassen — beide
  behaupten derzeit ausdrücklich, dass es nichts dergleichen gibt.

## Schriftwahl

**Headlines: Rokkitt 900. Fließtext: Poppins.** Beide selbst gehostet.

Die Wortmarke im Logo ist eine schwere, kondensierte Versalschrift mit kleinen
dreieckigen Spornen und leicht eingezogenen Stämmen — ein Western-/Antique-Condensed-Stil,
vermutlich eine kommerzielle Schrift. Eine exakte Entsprechung gibt es bei den frei
lizenzierten Schriften nicht.

Getestet wurden 38 Kandidaten gegen die Wortmarke (Vergleichsbilder im Scratchpad).
Rokkitt 900 ist die einzige, die den Sporn- und Serifencharakter des Logos trägt; alle
kondensiert-schweren Grotesken ohne Serifen (Anton, Staatliches, Barlow Condensed,
Saira Condensed) wirken so generisch wie die zuvor eingesetzte Teko.

Zwei Dinge sind dabei zu beachten:

- Rokkitt baut bei gleicher `font-size` deutlich größer als Teko. Alle Headline-Größen
  sind deshalb um Faktor ~0.8 zurückgenommen, die `line-height` von 0.86 auf 0.94 —
  die optische Größe bleibt damit unverändert.
- Rokkitt ist außerdem breiter. Tab-Spalte, Kennzahlen-Kacheln und Fakten-Kacheln
  mussten nachjustiert werden. Auf Textüberläufe wurde bei 320, 390, 768, 1440 und
  1920 px gemessen geprüft.

Geladen sind nur die Schnitte 600–900; jede `font-display`-Nutzung hat deshalb ein
explizites Gewicht, sonst fiele sie auf ein nicht geladenes Rokkitt 400 zurück.

## Mobil

Die Seite ist durchgehend mobil-zuerst gebaut (Tailwind, Breakpoints ab `sm`). Geprüft mit
echtem Chrome auf 320, 360, 390, 412 und 768 px über alle Seitentypen: kein waagerechter
Überlauf, keine Tippfläche unter 44 px Höhe, keine Fließtextschrift unter 12 px, keine
JS-Fehler.

Zwei Dinge, die dabei aufgefallen sind und in den CSS-Regeln stecken:

- **Silbentrennung in Überschriften** (`.display` in `src/index.css`). Deutsche Komposita
  sind länger, als ein schmales Handy breit ist: „Dachflächenfenster" braucht in der
  Headline-Schrift 378 px, ein iPhone SE hat 320. Ohne Trennung schiebt so ein Wort die
  ganze Seite in die Breite — genau das ist auf `/impressum` bei
  „Verbraucherstreitbeilegung" passiert.
  Dazu gehört `hyphenate-limit-chars: 8 5 5`: ohne die Vorgabe füllt der Browser die Zeile
  so weit wie möglich und trennt an der letzten passenden Stelle, was
  „DACHFLÄCHENFENS-TER" ergab. Mit mindestens fünf Zeichen vor und nach dem Strich bleibt
  „DACHFLÄCHEN-FENSTER" übrig.
- **Hochformat-Bilder brauchen einen eigenen Rahmen.** Die Bildrahmen sind quer; ein
  9:16-Foto verliert darin oben und unten je ein Drittel. Deshalb gibt es am Schwerpunkt
  `hochformat: true` (Rahmen legt sich ans Bild an) und in den Galerien `fokus` als
  `object-position` — ohne die Angabe zeigt der quere Ausschnitt beim Bagger-Foto die Mauer
  statt der Maschinen.

## Scroll-Animationen

Alle Sections blenden ihre Inhalte beim Hereinscrollen ein: leicht von unten, gestaffelt.
Das läuft über einen einzigen Haken, `useReveal` in `src/anim.ts`. Eine Section holt sich
den Haken mit einem Ref und markiert die Elemente, die sich bewegen sollen, mit
`data-reveal`:

```tsx
const root = useRef<HTMLElement>(null)
useReveal(root)
…
<section ref={root}>
  <h2 data-reveal>…</h2>
  <li data-reveal>…</li>
</section>
```

Drei Entscheidungen dahinter, die man beim Erweitern kennen sollte:

- **Der Startzustand wird per GSAP gesetzt, nicht per CSS.** Läuft das Skript nicht, steht
  der Inhalt einfach da. Eine CSS-Regel `opacity: 0` würde ihn dauerhaft verstecken.
- **Ein Auslöser pro Element** (`ScrollTrigger.batch`), nicht einer pro Section. Bei einer
  langen Section wäre die Animation sonst längst durchgelaufen, bevor man ihr Ende sieht.
- **Nur ein Haken pro Elementbaum.** `useReveal` greift auf *alle* `data-reveal` unterhalb
  seines Refs zu. Deshalb hat `CTABand.tsx` bewusst keinen eigenen — die Unterseite, in der
  es steht, bringt ihn mit. Zwei Haken auf denselben Elementen überschreiben sich.

Bei `prefers-reduced-motion: reduce` passiert nichts: kein Startzustand, keine Animation.
Geprüft wurde außerdem, dass nach dem Durchscrollen kein markiertes Element auf halber
Deckkraft hängen bleibt — auf allen fünf Seitentypen, mobil und am Desktop.

Drei Stellen laufen bewusst nicht über `useReveal`:

- **Der Hero-Text** hat einen eigenen Auftakt beim Laden (`Hero.tsx`): die beiden
  Headline-Zeilen fahren hinter einer Maske hoch, der Akzentbalken zieht sich von links auf,
  Claim, Text und Schaltflächen kommen gestaffelt nach. Am Scrollen hängt das nichts — der
  Hero steht ja schon im Bild. Auch hier `gsap.from`, damit der Zielzustand der normale
  Zustand des Markups ist.
- **Das Bewertungs-Banner** bewegt sich auf Klick, nicht beim Scrollen, siehe unten.
- **Die Projekt-Referenzen** haben ihre eigene Mechanik, siehe übernächster Abschnitt.

## Das Bewertungs-Banner

Die Rezensionen stehen als räumliches Karussell: drei Karten sichtbar, die mittlere vorne,
die Nachbarn nach hinten gekippt. Pfeile, Pfeiltasten, Wischen und ein Klick auf eine
Nachbarkarte drehen die Reihe endlos weiter.

Zwei Punkte, die beim Ändern leicht kaputtgehen:

- **Alle Karten liegen im selben Rasterfeld** (`grid-area: 1/1`) statt absolut positioniert.
  Dadurch ist der Rahmen automatisch so hoch wie die längste Rezension und alle Karten sind
  gleich hoch. Absolut positioniert müsste man die Höhe raten — und die kürzeste Rezension
  („Super Service", zwei Wörter) hätte den Rahmen zusammenfallen lassen.
- **Der seitliche Versatz steht als CSS-Variable** (`--nah` / `--fern`) an der Liste, nicht
  im JavaScript. Er muss mit der Bildschirmbreite kleiner werden: bei festen 86 % waren die
  Nachbarn auf dem Handy aus dem Bild geschoben, bei festen 70 % lag am Desktop die vordere
  Karte über ihnen. Über die Variable regelt das der Breakpoint.

Das Wischen liegt auf der Bühne und nicht auf den Karten, damit auch der Bereich daneben
zieht; `touch-action: pan-y` überlässt das senkrechte Wischen dem Browser, sonst könnte man
auf dem Handy an der Section nicht mehr vorbeiscrollen.

## Die Projekt-Animation

Auf jdavisgc.com nachgemessen: die Bildhöhen dort sind konstant (596/630/630/630 px bei
1440 px Breite), eine Höhenanimation gibt es nicht. Die Karten sind `position: sticky` mit
identischem `top` und stapeln sich beim Scrollen übereinander — die nachfolgende Karte
schiebt sich über die vorherige. Was wie ein zulaufendes Bild aussieht, ist Überdeckung.

Zwei Fallstricke dabei:

- `position: sticky` bricht, sobald ein Vorfahr `overflow: hidden` hat. Deshalb steht auf
  `body` jetzt `overflow-x: clip` statt `hidden` (beschneidet genauso, erzeugt aber keinen
  Scroll-Container), und der Lichtkegel der Section hat einen eigenen Clip-Wrapper, der
  nicht Vorfahr der Kartenliste ist.
- Der Klebepunkt muss exakt der Navigationshöhe entsprechen (86 px mobil, 104 px ab `sm`).
  Bei einer größeren Distanz blitzt in der Lücke der vorbeilaufende Inhalt durch.

Bei `prefers-reduced-motion` löst `motion-reduce:static` den Stapel auf, dann stehen die
Karten schlicht untereinander.

## Qualitätssicherung

Die Seite wurde in mehreren Runden von einem Review-Agenten geprüft, der Screenshots auf
1440 px und 390 px aufnimmt, gegen die Referenz-Screenshots in `recherche/referenz/shots/`
vergleicht und Kontraste, Touch-Ziele, Tastaturbedienung und Konsolenausgaben misst.
Die Referenz-Screenshots bleiben im Projekt, damit spätere Änderungen weiter dagegen
geprüft werden können.

## Herkunft der Inhalte

Kontaktdaten, Öffnungszeiten, Impressums- und Datenschutzangaben stammen wörtlich von
bau-firma.com bzw. wallner-bau-und-garten.de. Dasselbe gilt für die Leistungsbeschreibungen
zu Trockenbau, Innenausbau, Sanierung, Badsanierung, Außenanlagen und Erdarbeiten.

Neu verfasst und **vom Kunden noch nicht bestätigt** sind die Texte zu „Dachflächenfenster"
und „Türen" (siehe offener Punkt 7) sowie die Kurzfassungen auf der Startseite. Die Angabe
„16 Jahre Erfahrung" kommt aus der Kundenrückmeldung vom 07.09.2026 und ersetzt die
veralteten „10 Jahre" der Bestandsseite.
Alle 19 Fotos und das Logo sind Originaldateien derselben Seite — es wurden keine
Stockbilder verwendet. Das Logo wurde lediglich vom dunklen Hintergrund freigestellt.
