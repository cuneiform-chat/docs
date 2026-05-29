import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath', 'lang')

// Active locales: en (source), es, pt, fr, ru, bn, hi — keep in sync with
// next.config.mjs i18n.locales. Drives per-page hreflang alternates.
const LOCALES = ['en', 'es', 'pt', 'fr', 'ru', 'bn', 'hi'] as const
const SITE_URL = 'https://docs.cuneiform.chat'

export async function generateMetadata(props: {
  params: Promise<{ mdxPath?: string[]; lang: string }>
}) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)

  const subPath = params.mdxPath?.length ? `/${params.mdxPath.join('/')}` : ''
  const canonical = `${SITE_URL}/${params.lang}${subPath}`

  return {
    ...metadata,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${subPath}`])
        ),
        'x-default': `${SITE_URL}/en${subPath}`,
      },
    },
  }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: {
  params: Promise<{ mdxPath?: string[]; lang: string }>
}) {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
    params.mdxPath,
    params.lang
  )
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
