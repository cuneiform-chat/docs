# `cuneiform-chat-docs` — public documentation site (Nextra)

> On-demand context for working **inside this repo**. Repo-wide rules + cross-repo facts live in the
> ROOT `.claude/CLAUDE.md`; this file adds only what is true ONLY here.

## Identity

The public docs site for the product, brand **"Cuneiform Chat"** (assistant: **"Saba"**), served at
`cuneiform.chat`. Nextra 4 on Next.js 15 (App Router). Not a service in the microservice mesh — a static
content site. Claude reaches it through **five doc skills** (`/fix-public-docs`, `/add-public-docs`,
`/gen-docs-i18n`, `/translate-docs-section`, `/align-docs`), which is the usual reason to be in here.

- **Port / Database / Redis:** none — static site (`next build` → `out/`).
- **Tech stack:** Nextra `^4.0.0`, Next.js `^15.0.0`, React, TypeScript, MDX; Pagefind search; next-sitemap.
- **Primary layout:**
  - `content/<locale>/` — the MDX source of truth, one tree per locale; `_meta.ts` files define Nextra nav
    order/titles (per-locale).
  - `app/[lang]/` — the App-Router locale segment (`layout.tsx`, `rtl.css` for `ar`).
  - `scripts/` — `fill-missing-translations.mjs` (prebuild) + `generate-legacy-redirects.mjs` (postbuild).
- **Entry point:** `app/[lang]/` + `content/`.

## Build / Run / Test

- **Install deps:** `npm install`.
- **Run locally:** `npm run dev` (a `predev` hook first runs `fill-missing-translations.mjs`).
- **Build:** `npm run build` (`prebuild` autofills translations; `postbuild` runs Pagefind per-locale +
  next-sitemap + legacy redirects).
- **Lint:** `npm run lint` (`next lint`).
- **Type-check / unit tests:** none committed — do NOT invent one.

## Gotchas

- **`content/en/` is the source of truth; other locales auto-fill from it.** `fill-missing-translations.mjs`
  copies any file missing from a non-`en` locale out of `content/en/`, prepending a `<TranslationNotice />`
  banner to MDX. So a new English page appears (untranslated) in every locale on the next build — translate
  it, don't assume it's absent.
- **Active locales: `en` (source) `es` `pt` `fr` `bn`. DISABLED: `th` (long-term) + `ru` `hi` `ar` (RTL) —
  TEMPORARILY, Jul 2026.** Their `content/<code>/` dirs stay on disk but are not built, routed or synced;
  never generate/sync them (mirrors the admin-panel locale policy — the two repos must change together).
  **The locale list is duplicated across SEVEN files** — `next.config.mjs`, `app/[lang]/layout.tsx`,
  `app/[lang]/[[...mdxPath]]/page.tsx` (hreflang), `components/locale-switcher.tsx`,
  `next-sitemap.config.js`, `scripts/fill-missing-translations.mjs`, `app/not-found.tsx` (the JS
  soft-redirect that collapses a disabled prefix to `/en`) — **plus the per-locale `pagefind --site
  out/<locale>` legs in `package.json`'s `postbuild`. Leaving a `pagefind` leg for a locale that is no
  longer built fails the entire build** on the missing directory. Nothing enforces the mirror.
- **`.github/workflows/deploy.yml` deliberately does NOT re-declare the pagefind / next-sitemap /
  fill-translations steps — it only runs `npm run build`.** It used to duplicate them "for safety", which
  made it an untracked EIGHTH copy of the locale list; it drifted (kept the disabled `ru`, missed the
  active `bn`) and hard-failed the deploy on the unbuilt `out/ru` (run #96, Aug 2026). Adding a locale leg
  back to the workflow re-creates that failure mode — `postbuild` owns the per-locale legs.
- **`pt` = Brazilian Portuguese (pt-BR), never European** — applies to `_meta.ts` labels and MDX alike.
- **Adding a language is `/gen-docs-i18n <code>`, not a manual `content/<code>/` copy** — it wires the
  `_meta.ts` nav, `app/[lang]` config, and locale-switcher together.

## Local index

- **Repo README / docs:** `README.md` covers local setup; `DOCS_FIX_PLAN.md` is a working doc. Cross-repo
  context (4 doc layers, brand/Saba rules, which skill writes where) lives in
  `.claude/references/features/documentation-branding.md`.
