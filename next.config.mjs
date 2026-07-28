import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
  unstable_shouldAddLocaleToLinks: true,
})

// Active locales: en (source), es, pt, fr, bn.
// Disabled: th (frozen long-term) + ru, hi, ar (TEMPORARILY disabled Jul 2026).
// Disabled-locale content dirs are retained on disk but not built or routed.
// Mirrors the admin panel locale policy (chat_saas_admin_panel/i18n/config.ts).
// See `.claude/references/features/admin-panel-i18n.md` for rationale.
export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'es', 'pt', 'fr', 'bn'],
    defaultLocale: 'en',
  },
})
