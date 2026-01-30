import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  latex: true,
  defaultShowCopyCode: true,
})

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment at docs.cuneiform.chat
  // If using cuneiform-chat.github.io/docs, uncomment basePath:
  // basePath: '/docs',
})
