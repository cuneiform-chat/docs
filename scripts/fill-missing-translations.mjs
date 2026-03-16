/**
 * Prebuild script: copies missing translation files from English source.
 *
 * For each non-en locale, scans content/en/ and copies any missing files
 * to content/{locale}/ so Nextra can generate all locale pages.
 * MDX files get a <TranslationNotice /> banner prepended.
 * _meta.ts files are copied as-is (English nav titles as fallback).
 */

import { readdirSync, statSync, existsSync, copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, relative, extname } from 'path'

const CONTENT_DIR = new URL('../content', import.meta.url).pathname
const SOURCE_LOCALE = 'en'

// Read locales from a simple config to stay in sync with next.config.mjs
const LOCALES = ['bn', 'es', 'fr', 'hi', 'pt', 'ru', 'th'] // non-source locales only

const NOTICE_BANNER = `{/* ⚠️ This page has not been translated yet. You are viewing the English version. */}
{/* Translation contributions welcome: https://github.com/cuneiform-chat/docs */}

`

function getAllFiles(dir, base = dir) {
  const results = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      results.push(...getAllFiles(fullPath, base))
    } else {
      results.push(relative(base, fullPath))
    }
  }
  return results
}

function ensureDir(filePath) {
  const dir = filePath.substring(0, filePath.lastIndexOf('/'))
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

const sourceDir = join(CONTENT_DIR, SOURCE_LOCALE)
const sourceFiles = getAllFiles(sourceDir)

let copiedCount = 0
let skippedCount = 0

for (const locale of LOCALES) {
  const localeDir = join(CONTENT_DIR, locale)

  for (const relPath of sourceFiles) {
    const targetPath = join(localeDir, relPath)

    if (existsSync(targetPath)) {
      skippedCount++
      continue
    }

    ensureDir(targetPath)
    const sourcePath = join(sourceDir, relPath)
    const ext = extname(relPath)

    if (ext === '.mdx' || ext === '.md') {
      // Prepend translation notice to MDX content
      const content = readFileSync(sourcePath, 'utf-8')
      // Insert notice after frontmatter (if present)
      const frontmatterMatch = content.match(/^---\n[\s\S]*?\n---\n/)
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[0]
        const rest = content.slice(frontmatter.length)
        writeFileSync(targetPath, frontmatter + '\n' + NOTICE_BANNER + rest)
      } else {
        writeFileSync(targetPath, NOTICE_BANNER + content)
      }
    } else {
      // Copy non-MDX files (like _meta.ts) as-is
      copyFileSync(sourcePath, targetPath)
    }

    copiedCount++
  }
}

console.log(`[fill-translations] Copied ${copiedCount} missing files, skipped ${skippedCount} existing files`)
