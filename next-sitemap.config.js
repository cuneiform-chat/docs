/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://docs.cuneiform.chat',
  generateRobotsTxt: false,
  outDir: './out',
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const isRoot = path === '/' || path === ''
    const isSectionIndex = /^\/[^/]+$/.test(path)
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: isRoot ? 1.0 : isSectionIndex ? 0.9 : 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}
