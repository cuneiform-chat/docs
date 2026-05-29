import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
  unstable_shouldAddLocaleToLinks: true,
})

// Active locales: en (source), es, pt, fr, ru, bn.
// Disabled (content/{hi,th}/ directories retained but not built):
// hi, th. Mirrors the admin panel locale policy. See
// `.claude/references/features/admin-panel-i18n.md` for rationale.
export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'es', 'pt', 'fr', 'ru', 'bn'],
    defaultLocale: 'en',
  },
})
