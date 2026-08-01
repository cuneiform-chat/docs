/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://docs.cuneiform.chat',
  generateRobotsTxt: false,
  outDir: './out',
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Skip root / page (just a redirect)
    if (path === '/' || path === '') return null

    // Active locales only. th (frozen) and ru/hi/ar (temporarily disabled,
    // Jul 2026) are not built.
    const isLocaleRoot = /^\/(en|es|pt|fr|bn)\/?$/.test(path)
    const isSectionIndex = /^\/(en|es|pt|fr|bn)\/[^/]+$/.test(path)

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: isLocaleRoot ? 1.0 : isSectionIndex ? 0.9 : 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}
