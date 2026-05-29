import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
  unstable_shouldAddLocaleToLinks: true,
})

// Active locales: en (source), es, pt, fr, ru, bn, hi.
// Disabled (content/th/ directory retained but not built):
// th. Mirrors the admin panel locale policy. See
// `.claude/references/features/admin-panel-i18n.md` for rationale.
export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'es', 'pt', 'fr', 'ru', 'bn', 'hi'],
    defaultLocale: 'en',
  },
})
