/**
 * Erzeugt `sitemap.xml`, `robots.txt` und je Unterseite eine eigene
 * `index.html` mit passendem Titel, Beschreibung und Canonical.
 *
 * Warum die Vorab-Seiten noetig sind: Die Seite baut sich im Browser zusammen,
 * `useSeo` laeuft erst nach dem JavaScript. Im ausgelieferten HTML trug
 * deshalb JEDE Unterseite den Titel und das Canonical der Startseite — sieben
 * Adressen, die alle behaupteten, `bau-firma.com/` zu sein. Google fasst so
 * etwas als Dubletten auf und indexiert im Zweifel nur eine davon.
 * Netlify liefert dank der Ordnerstruktur automatisch die passende Datei aus.
 *
 * Beides von Hand zu pflegen geht erfahrungsgemaess schief, sobald eine
 * Unterseite dazukommt: Die Sitemap zeigt dann auf eine Seite, die es nicht
 * gibt, oder verschweigt eine neue. Deshalb entsteht sie aus der Slug-Liste in
 * `src/content.ts` — derselben Quelle, aus der auch die Navigation und die
 * Leistungsseiten kommen.
 *
 * Gelesen wird die Datei als Text und die Slugs per Regex gezogen, statt sie zu
 * importieren: `src/` wird mit Bundler-Regeln uebersetzt, diese Datei mit
 * Node-Regeln. Ein direkter Import wuerde beide Konfigurationen gegeneinander
 * laufen lassen.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'

export const HAUPTADRESSE = 'https://bau-firma.com'

type Eintrag = { pfad: string; prioritaet: string; frequenz: string }

type Leistung = { slug: string; titel: string; meta: string }

/**
 * Liest Slug, Titel und Meta-Beschreibung je Leistung aus `content.ts`.
 *
 * Gelesen wird als Text statt importiert: `src/` wird mit Bundler-Regeln
 * uebersetzt, diese Datei mit Node-Regeln. Ein direkter Import wuerde beide
 * Konfigurationen gegeneinander laufen lassen.
 */
function leistungen(wurzel: string): Leistung[] {
  const quelle = readFileSync(resolve(wurzel, 'src/content.ts'), 'utf-8')

  // Ein Block je Leistung: ab `slug:` bis zum abschliessenden `meta:`.
  const treffer = [
    ...quelle.matchAll(
      /slug: '([a-z0-9-]+)',\s*\n\s*titel: '([^']+)',[\s\S]*?\n\s*meta:\s*\n?\s*'([^']+)',/g,
    ),
  ]

  const gefunden = treffer.map((m) => ({ slug: m[1], titel: m[2], meta: m[3] }))

  if (gefunden.length === 0) {
    throw new Error(
      'sitemap: keine Leistungen in src/content.ts gefunden. Wurden die Felder ' +
        'slug/titel/meta umbenannt? Ohne sie waeren Sitemap und Vorab-Seiten unvollstaendig.',
    )
  }
  return gefunden
}

function leistungsSlugs(wurzel: string): string[] {
  return leistungen(wurzel).map((l) => l.slug)
}

function seiten(wurzel: string): Eintrag[] {
  return [
    { pfad: '/', prioritaet: '1.0', frequenz: 'monthly' },
    { pfad: '/leistungen', prioritaet: '0.9', frequenz: 'monthly' },
    ...leistungsSlugs(wurzel).map((slug) => ({
      pfad: `/leistungen/${slug}`,
      prioritaet: '0.8',
      frequenz: 'monthly',
    })),
    { pfad: '/projekte', prioritaet: '0.7', frequenz: 'monthly' },
    { pfad: '/kontakt', prioritaet: '0.7', frequenz: 'yearly' },
    // Rechtliches gehoert hinein — die Seite ist Pflicht und wird verlinkt —
    // aber mit niedriger Prioritaet: sie soll niemanden anziehen.
    { pfad: '/rechtliches', prioritaet: '0.2', frequenz: 'yearly' },
  ]
}

function nameLang(wurzel: string): string {
  const quelle = readFileSync(resolve(wurzel, 'src/content.ts'), 'utf-8')
  const m = quelle.match(/nameLang: '([^']+)'/)
  if (!m) throw new Error('sitemap: nameLang nicht in src/content.ts gefunden.')
  return m[1]
}

/** Maskiert Text, der in ein HTML-Attribut geschrieben wird. */
function attr(wert: string) {
  return wert.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Titel und Beschreibung je Adresse — muss zu den useSeo-Aufrufen passen. */
function kopfDaten(wurzel: string): Record<string, { titel: string; text: string }> {
  const firma = nameLang(wurzel)
  const daten: Record<string, { titel: string; text: string }> = {
    '/leistungen': {
      titel: `Leistungen | ${firma}`,
      text: `Trockenbau, Innenausbau, Sanierung, Dachflächenfenster, Türen und Außenanlagen von ${firma} im Raum Mühldorf am Inn.`,
    },
    '/projekte': {
      titel: `Projekte | ${firma}`,
      text: `Abgeschlossene Projekte von ${firma}: Innenausbau, Trockenbau, Bäder, Terrassen und Erdarbeiten.`,
    },
    '/kontakt': {
      titel: `Kontakt | ${firma}`,
      text: `Kontakt zu ${firma} in Niedertaufkirchen — telefonisch oder direkt über das Anfrageformular.`,
    },
    '/rechtliches': {
      titel: `Impressum & Datenschutz | ${firma}`,
      text: `Impressum und Datenschutzerklärung von ${firma}.`,
    },
  }
  for (const l of leistungen(wurzel)) {
    daten[`/leistungen/${l.slug}`] = { titel: `${l.titel} | ${firma}`, text: l.meta }
  }
  return daten
}

/**
 * Schreibt den Kopf der gebauten index.html je Adresse um.
 *
 * Ersetzt wird nur, was schon da ist — faellt ein Tag weg, bleibt die Datei
 * unveraendert statt kaputt. Der Rumpf ist derselbe wie bei der Startseite;
 * sobald das JavaScript laeuft, uebernimmt der Router.
 */
function kopfErsetzen(html: string, titel: string, text: string, adresse: string) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(titel)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${attr(text)}" />`,
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${attr(titel)}" />`,
    )
    .replace(
      /<meta property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${attr(text)}" />`,
    )
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${adresse}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${adresse}" />`)
}

export function sitemapPlugin(): Plugin {
  let wurzel = process.cwd()
  let ausgabe = 'dist'

  return {
    name: 'wallner-sitemap',
    apply: 'build',
    configResolved(config) {
      wurzel = config.root
      ausgabe = resolve(config.root, config.build.outDir)
    },
    generateBundle() {
      const stand = new Date().toISOString().slice(0, 10)

      const eintraege = seiten(wurzel)
        .map(
          (s) => `  <url>
    <loc>${HAUPTADRESSE}${s.pfad}</loc>
    <lastmod>${stand}</lastmod>
    <changefreq>${s.frequenz}</changefreq>
    <priority>${s.prioritaet}</priority>
  </url>`,
        )
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${eintraege}
</urlset>
`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `# Alle Inhalte duerfen indexiert werden.
User-agent: *
Allow: /

Sitemap: ${HAUPTADRESSE}/sitemap.xml
`,
      })
    },

    /*
     * Die Vorab-Seiten entstehen erst hier und nicht in `generateBundle`:
     * Vite legt die index.html erst danach ins Bundle. In `generateBundle`
     * war sie schlicht noch nicht da, und die Seiten wurden stillschweigend
     * nicht erzeugt. In `writeBundle` liegen die Dateien bereits auf der
     * Platte, deshalb wird hier direkt geschrieben statt emittiert.
     */
    writeBundle() {
      const quelle = resolve(ausgabe, 'index.html')
      const rumpf = readFileSync(quelle, 'utf-8')

      for (const [pfad, kopf] of Object.entries(kopfDaten(wurzel))) {
        /*
         * Geschrieben wird `leistungen/trockenbau.html`, NICHT
         * `leistungen/trockenbau/index.html`.
         *
         * Der Unterschied entscheidet ueber die Adresse: Bei einer
         * index.html im Ordner liefert Netlify die Seite unter
         * `/leistungen/trockenbau/` aus und leitet die Fassung ohne
         * Schraegstrich per 301 dorthin um. Dann zeigten Sitemap,
         * Canonical und die Links des Routers auf eine Adresse, die
         * umleitet — und die Seite widerspraeche mit ihrem eigenen
         * Canonical dem Ort, an dem sie liegt.
         *
         * Als `.html`-Datei daneben liefert Netlify sie direkt unter
         * `/leistungen/trockenbau` aus, ohne Umleitung. Damit stimmen
         * Sitemap, Canonical, Routerlinks und Serveradresse ueberein.
         */
        const ziel = resolve(ausgabe, `${pfad.replace(/^\//, '')}.html`)
        mkdirSync(dirname(ziel), { recursive: true })
        writeFileSync(ziel, kopfErsetzen(rumpf, kopf.titel, kopf.text, HAUPTADRESSE + pfad))
      }
    },
  }
}
