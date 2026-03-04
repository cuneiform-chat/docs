import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
  unstable_shouldAddLocaleToLinks: true,
})

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'bn', 'es', 'hi'],
    defaultLocale: 'en',
  },
})
