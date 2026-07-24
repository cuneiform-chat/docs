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
- **Active locales: `en` (source) `es` `pt` `fr` `ru` `bn` `hi` `ar` (RTL). `th` is DISABLED** — a `content/th/`
  dir exists but the `postbuild` Pagefind step deliberately omits `th`; never generate/sync it (mirrors the
  admin-panel locale policy).
- **`pt` = Brazilian Portuguese (pt-BR), never European** — applies to `_meta.ts` labels and MDX alike.
- **Adding a language is `/gen-docs-i18n <code>`, not a manual `content/<code>/` copy** — it wires the
  `_meta.ts` nav, `app/[lang]` config, and locale-switcher together.

## Local index

- **Repo README / docs:** `README.md` covers local setup; `DOCS_FIX_PLAN.md` is a working doc. Cross-repo
  context (4 doc layers, brand/Saba rules, which skill writes where) lives in
  `.claude/references/features/documentation-branding.md`.
