# Wallner Bau & Garten — Website

Neue Website für Wallner Bau & Garten Trockenbau (Matthias Wallner, Niedertaufkirchen).
Ersetzt die Bestandsseite unter bau-firma.com / wallner-bau-und-garten.de.

**Design-Vorgabe:** Struktur und Optik eins zu eins nach
[bpmarineconstruction.com](https://bpmarineconstruction.com/), Markenfarbe Grün statt Blau.
Zwei Sections folgen [jdavisgc.com](https://jdavisgc.com/): die Projekt-Referenzen mit der
„Featured Projects"-Scroll-Mechanik und „Wir bauen für die Besten" mit Kennzahlen-Laufband
und großem Zitat (bei uns die Google-Bewertungen).

## Starten

```bash
cd site
npm install
npm run dev      # http://localhost:5173
npm run build    # Produktionsbuild nach site/dist
npm run preview  # Build lokal prüfen
```

## Aufbau

```
site/
  src/
    content.ts              ← ALLE Texte, Bildzuordnungen und Kontaktdaten an einer Stelle
    index.css               ← Design-Tokens, Buttons, Eyebrow, Verlaufsbänder
    components/
      Nav.tsx               Sticky-Header mit Logo, wie BP Marine
      Hero.tsx              Bewegtbild-Hero, Gradient-Headline, Pills
      Leistungsband.tsx     Gewerke-Laufband (Ersatz für BPs Partnerlogo-Leiste)
      Leistungen.tsx        Tab-Liste + Bild + Detailspalte
      UeberUns.tsx          Bild mit Overlay-Karte, Kennzahlen, Textkarte
      Projekte.tsx          Referenzen als Sticky-Kartenstapel (J-Davis-Mechanik)
      Galerie.tsx           Karussell mit Zähler, Fortschritt und Lightbox
      FuerDieBesten.tsx     Headline mit Marker + Kennzahlen-Laufband
      Bewertungen.tsx       Google-Bewertungen im J-Davis-Zitatlayout
      Kontakt.tsx           Dunkle Infokarte + weißes Formular
      Rechtliches.tsx       Impressum und Datenschutz (aufklappbar)
      Footer.tsx            Footer mit Pflichtangaben
      CookieHinweis.tsx     Cookie-Banner
  public/
    logo/logo.png           Freigestelltes Kundenlogo (transparent)
    bilder/                 19 echte Projektfotos der Bestandsseite
    video/                  Hero-Video (Kling 3.0) + Poster
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

### 1. Google-Bewertungen — Platzhalter, im Livebuild ausgeblendet
`src/content.ts` → `bewertungen` und `bewertungenFreigegeben`.

Solange `bewertungenFreigegeben` auf `false` steht, **fehlt die Section im Produktionsbuild
komplett**; im Dev-Server bleibt sie sichtbar, damit das Layout prüfbar ist. Das ist Absicht:
Fünf-Sterne-Bewertungen ohne reale Rezension wären eine irreführende Werbeaussage (§ 5 UWG).

Sobald die echten Rezensionen vorliegen: Name, Text und Sternezahl eintragen,
`platzhalter: true` entfernen und `bewertungenFreigegeben` auf `true` setzen.

### 2. Projektorte — unbestätigt, werden nicht ausgegeben
`src/content.ts` → `projekte` und `orteBestaetigt`. Die Orte sind aus dem Einzugsgebiet
abgeleitet und nicht vom Kunden bestätigt, deshalb steht `orteBestaetigt` auf `false` und die
Ortsangabe wird ausgelassen. Nach Rückmeldung: Orte korrigieren, Flag auf `true`.

### 3. Hero-Video Desktop fehlt
Der vorhandene Clip ist hochkant (720×1280) und läuft deshalb nur auf Mobilgeräten.
Für Desktop fehlt ein 16:9-Clip. Sobald er vorliegt: Pfad in `src/components/Hero.tsx`
in `HERO_VIDEO_16x9` eintragen — sonst nichts ändern, die Bildschleife wird automatisch
ersetzt.

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

### 5. Hoster in der Datenschutzerklärung
`src/components/Rechtliches.tsx`, Abschnitt 4 nennt IONOS. Nach dem Umzug auf den neuen
Hoster anpassen.

### 6. Domain in den Meta-Tags
`index.html` — `og:image`, `og:url` und `canonical` zeigen auf
`https://wallner-bau-und-garten.de/`. Falls die Seite unter einer anderen Domain live geht,
alle drei anpassen; relative OG-URLs lösen Facebook, LinkedIn und WhatsApp nicht auf.

## Datenschutz-relevante Entscheidungen

- **Schriften selbst gehostet.** Teko und Poppins liegen als woff2 unter `public/fonts/`,
  eingebunden über `src/fonts.css`. Beim Seitenaufruf geht keine Anfrage an Google — das
  wäre sonst ein Widerspruch zur eigenen Datenschutzerklärung und nach LG München I,
  3 O 17493/20 abmahnfähig.
- **Keine Tracker.** Die Seite lädt nichts von Dritten. Der Cookie-Hinweis speichert die
  Auswahl nur lokal in `localStorage`.

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

Alle Texte, Kontaktdaten, Öffnungszeiten, Leistungsbeschreibungen, Impressums- und
Datenschutzangaben stammen wörtlich von bau-firma.com bzw. wallner-bau-und-garten.de.
Alle 19 Fotos und das Logo sind Originaldateien derselben Seite — es wurden keine
Stockbilder verwendet. Das Logo wurde lediglich vom dunklen Hintergrund freigestellt.
