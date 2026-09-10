/**
 * Erzeugt `sitemap.xml` und `robots.txt` beim Build.
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
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

export const HAUPTADRESSE = 'https://bau-firma.com'

type Eintrag = { pfad: string; prioritaet: string; frequenz: string }

function leistungsSlugs(wurzel: string): string[] {
  const quelle = readFileSync(resolve(wurzel, 'src/content.ts'), 'utf-8')
  const slugs = [...quelle.matchAll(/^\s*slug: '([a-z0-9-]+)',/gm)].map((m) => m[1])
  if (slugs.length === 0) {
    throw new Error(
      'sitemap: keine Leistungs-Slugs in src/content.ts gefunden. ' +
        'Wurde das Feld umbenannt? Ohne Slugs waere die Sitemap unvollstaendig.',
    )
  }
  return slugs
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

export function sitemapPlugin(): Plugin {
  let wurzel = process.cwd()

  return {
    name: 'wallner-sitemap',
    apply: 'build',
    configResolved(config) {
      wurzel = config.root
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
  }
}
