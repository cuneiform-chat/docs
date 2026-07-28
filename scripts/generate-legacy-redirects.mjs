/**
 * Postbuild script: writes HTML stubs at the legacy non-locale-prefixed paths.
 *
 * The i18n migration (commit d9bfa13) moved /<section>/* → /en/<section>/*.
 * Google still has the pre-migration URLs (e.g. /getting-started,
 * /knowledge-base, /knowledge-base/cloud-storage) in its index. GitHub Pages
 * serves HTTP 404 for those paths, and Google does not follow the JS
 * soft-redirect in app/not-found.tsx from a 404 response.
 *
 * This script walks out/en/ after `next build` and writes a matching .html
 * stub at the non-prefixed location. Each stub returns HTTP 200 with:
 *   - <link rel="canonical">         → tells Google the real URL is /en/<path>
 *   - <meta http-equiv="refresh" 0>  → Google treats content="0" as 301
 *   - <meta name="robots" noindex>   → drop the legacy URL from the index
 *   - <script>location.replace()</script> → instant client redirect
 *
 * Next.js 15 App Router with output:'export' produces flat .html files
 * (e.g. out/en/knowledge-base/cloud-storage.html), so we walk for *.html
 * rather than index.html in subdirs.
 *
 * Runs after next-sitemap in package.json postbuild, so the sitemap stays
 * clean (legacy stubs are not added to it).
 */

import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, relative, dirname } from 'path'

const OUT_DIR = new URL('../out', import.meta.url).pathname
const EN_DIR = join(OUT_DIR, 'en')
const SITE_URL = 'https://docs.cuneiform.chat'

// Top-level segments that must never be clobbered.
const RESERVED_TOP = new Set([
  'en', 'es', 'pt', 'fr', 'bn',                    // active locales
  'th', 'ru', 'hi', 'ar',                          // disabled locales (frozen)
  '_next', '_pagefind',                            // framework / search assets
])

// Files inside out/en/ that should not generate a legacy mirror.
const SKIP_LEAF = new Set(['404.html', 'index.html', 'index.txt', 'en.txt'])

// Orphan paths Google indexed that have no /en/<name>.html equivalent — almost
// all are Telegram/BotFather slash-commands documented inside MDX prose. Markdown
// renders `/newbot` as plain text (backticks are correctly applied today), but
// Google still crawls these URLs from external links and older index entries.
// Map each to the most relevant doc page.
const ORPHAN_REDIRECTS = {
  // BotFather commands
  '/newbot': '/en/integrations/telegram',
  '/mybots': '/en/integrations/telegram',
  '/setdescription': '/en/integrations/telegram',
  '/setabouttext': '/en/integrations/telegram',
  '/setprivacy': '/en/integrations/telegram',
  '/setuserpic': '/en/integrations/telegram',
  '/start': '/en/integrations/telegram',
  // Google Chat commands
  '/set-agent': '/en/integrations/google-chat',
  '/connect': '/en/integrations/google-chat',
  // Saba-on-Telegram commands
  '/ask': '/en/integrations/saba-on-telegram',
  '/health': '/en/integrations/saba-on-telegram',
  '/help': '/en',
  // Telegram bot commands (written as code-spans in MDX, crawled as URLs)
  '/reset': '/en/integrations/telegram',
  '/command': '/en/integrations/telegram',
  '/comando': '/es/integrations/telegram',
  // Misc
  '/usage': '/en/billing/usage',
}

if (!existsSync(EN_DIR)) {
  console.error('[legacy-redirects] out/en/ not found — did `next build` run?')
  process.exit(1)
}

function walkHtml(dir, base = dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('_')) continue // _next, _pagefind, etc.
    const full = join(dir, entry)
    const s = statSync(full)
    if (s.isDirectory()) {
      out.push(...walkHtml(full, base))
    } else if (entry.endsWith('.html') && !SKIP_LEAF.has(entry)) {
      out.push(relative(base, full))
    }
  }
  return out
}

function stubHtml(targetUrlPath) {
  const absolute = `${SITE_URL}${targetUrlPath}`
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${absolute}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${targetUrlPath}">
<script>window.location.replace(${JSON.stringify(targetUrlPath)});</script>
</head>
<body>
<p>Redirecting to <a href="${targetUrlPath}">${absolute}</a>…</p>
</body>
</html>
`
}

const files = walkHtml(EN_DIR)
let written = 0
let skippedReserved = 0
let skippedExists = 0

for (const rel of files) {
  // rel is e.g. "knowledge-base/cloud-storage.html" or "getting-started.html"
  const topSegment = rel.split('/')[0].replace(/\.html$/, '')
  if (RESERVED_TOP.has(topSegment)) {
    skippedReserved++
    continue
  }

  const legacyFile = join(OUT_DIR, rel)
  if (existsSync(legacyFile)) {
    skippedExists++
    continue
  }

  // The /en/foo.html file is served at the URL /en/foo (no extension).
  // So the redirect target strips the .html.
  const targetUrlPath = '/en/' + rel.replace(/\.html$/, '')

  mkdirSync(dirname(legacyFile), { recursive: true })
  writeFileSync(legacyFile, stubHtml(targetUrlPath))
  written++
}

let orphansWritten = 0
let orphansSkipped = 0
for (const [urlPath, target] of Object.entries(ORPHAN_REDIRECTS)) {
  // urlPath is e.g. "/newbot" → file "out/newbot.html"
  const legacyFile = join(OUT_DIR, urlPath.replace(/^\//, '') + '.html')
  if (existsSync(legacyFile)) {
    orphansSkipped++
    continue
  }
  mkdirSync(dirname(legacyFile), { recursive: true })
  writeFileSync(legacyFile, stubHtml(target))
  orphansWritten++
}

console.log(
  `[legacy-redirects] wrote ${written} mirror stub(s), ` +
    `skipped ${skippedReserved} reserved + ${skippedExists} pre-existing; ` +
    `wrote ${orphansWritten} orphan stub(s), skipped ${orphansSkipped} pre-existing.`
)
