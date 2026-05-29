import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { LocaleSwitcher } from '../../components/locale-switcher'

// Active locales: en (source), es, pt, fr, ru, bn, hi.
// Disabled: th — content/th/ retained on disk, not built.
// Mirrors the admin panel locale policy. See
// `.claude/references/features/admin-panel-i18n.md` for rationale.
const LOCALES = ['en', 'es', 'pt', 'fr', 'ru', 'bn', 'hi'] as const
type Locale = (typeof LOCALES)[number]
const RTL_LOCALES: Locale[] = []

const UI_STRINGS: Record<
  Locale,
  {
    editLink: string
    feedbackContent: string
    title: string
    description: string
    tagline: string
    tryIt: string
    requestDemo: string
    tocTitle: string
    backToTop: string
    searchPlaceholder: string
  }
> = {
  en: {
    editLink: 'Edit this page on GitHub →',
    feedbackContent: 'Question? Give us feedback →',
    title: 'Cuneiform Chat Documentation',
    description:
      'Learn how to create document-trained AI chatbots with Cuneiform Chat',
    tagline: 'Run your business through conversation.',
    tryIt: 'Try It',
    requestDemo: 'Request Demo',
    tocTitle: 'On This Page',
    backToTop: 'Scroll to top',
    searchPlaceholder: 'Search documentation…',
  },
  es: {
    editLink: 'Editar esta página en GitHub →',
    feedbackContent: '¿Preguntas? Envíanos tu opinión →',
    title: 'Documentación de Cuneiform Chat',
    description:
      'Aprende a crear chatbots de IA entrenados con documentos usando Cuneiform Chat',
    tagline: 'Gestiona tu negocio conversando.',
    tryIt: 'Pruébalo',
    requestDemo: 'Solicitar demo',
    tocTitle: 'En esta página',
    backToTop: 'Volver arriba',
    searchPlaceholder: 'Buscar documentación…',
  },
  pt: {
    editLink: 'Editar esta página no GitHub →',
    feedbackContent: 'Dúvidas? Envie-nos seu feedback →',
    title: 'Documentação do Cuneiform Chat',
    description:
      'Aprenda a criar chatbots de IA treinados com documentos usando o Cuneiform Chat',
    tagline: 'Gerencie seu negócio conversando.',
    tryIt: 'Experimente',
    requestDemo: 'Solicitar demo',
    tocTitle: 'Nesta página',
    backToTop: 'Voltar ao topo',
    searchPlaceholder: 'Buscar na documentação…',
  },
  fr: {
    editLink: 'Modifier cette page sur GitHub →',
    feedbackContent: 'Des questions ? Donnez-nous votre avis →',
    title: 'Documentation Cuneiform Chat',
    description:
      'Apprenez à créer des chatbots IA entraînés sur vos documents avec Cuneiform Chat',
    tagline: 'Gérez votre entreprise par la conversation.',
    tryIt: 'Essayer',
    requestDemo: 'Demander une démo',
    tocTitle: 'Sur cette page',
    backToTop: 'Retour en haut',
    searchPlaceholder: 'Rechercher dans la documentation…',
  },
  ru: {
    editLink: 'Редактировать эту страницу на GitHub →',
    feedbackContent: 'Есть вопрос? Поделитесь отзывом →',
    title: 'Документация Cuneiform Chat',
    description:
      'Научитесь создавать AI-чат-ботов, обученных на ваших документах, с Cuneiform Chat',
    tagline: 'Управляйте бизнесом через диалог.',
    tryIt: 'Попробовать',
    requestDemo: 'Запросить демо',
    tocTitle: 'На этой странице',
    backToTop: 'Наверх',
    searchPlaceholder: 'Поиск по документации…',
  },
  bn: {
    editLink: 'GitHub-এ এই পৃষ্ঠাটি সম্পাদনা করুন →',
    feedbackContent: 'প্রশ্ন আছে? আমাদের ফিডব্যাক দিন →',
    title: 'Cuneiform Chat ডকুমেন্টেশন',
    description:
      'Cuneiform Chat দিয়ে ডকুমেন্ট-প্রশিক্ষিত AI চ্যাটবট তৈরি করতে শিখুন',
    tagline: 'কথোপকথনের মাধ্যমে আপনার ব্যবসা পরিচালনা করুন।',
    tryIt: 'ব্যবহার করুন',
    requestDemo: 'ডেমো অনুরোধ করুন',
    tocTitle: 'এই পৃষ্ঠায়',
    backToTop: 'উপরে যান',
    searchPlaceholder: 'ডকুমেন্টেশনে খুঁজুন…',
  },
  hi: {
    editLink: 'इस पृष्ठ को GitHub पर संपादित करें →',
    feedbackContent: 'कोई सवाल? हमें फीडबैक दें →',
    title: 'Cuneiform Chat दस्तावेज़ीकरण',
    description:
      'Cuneiform Chat के साथ documents पर trained AI chatbot बनाना सीखें',
    tagline: 'अपना business बातचीत के ज़रिए चलाएं।',
    tryIt: 'आज़माएं',
    requestDemo: 'डेमो का अनुरोध करें',
    tocTitle: 'इस पृष्ठ पर',
    backToTop: 'ऊपर जाएं',
    searchPlaceholder: 'दस्तावेज़ीकरण में खोजें…',
  },
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const strings = UI_STRINGS[lang as Locale] || UI_STRINGS.en
  return {
    title: {
      template: `%s – ${strings.title}`,
      default: strings.title,
    },
    description: strings.description,
    openGraph: {
      title: strings.title,
      description: strings.description,
      url: `https://docs.cuneiform.chat/${lang}`,
      images: 'https://cuneiform.chat/logo.png',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: strings.title,
      description: strings.description,
      images: 'https://cuneiform.chat/logo.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = (LOCALES.includes(lang as Locale) ? lang : 'en') as Locale
  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
  const strings = UI_STRINGS[locale] || UI_STRINGS.en

  const logo = (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/logo.png" alt="Cuneiform Chat" style={{ height: '32px' }} />
      <span style={{ fontWeight: 600, fontSize: '18px' }}>Cuneiform Chat</span>
    </span>
  )

  const navbar = (
    <Navbar
      logo={logo}
      projectLink="https://github.com/cuneiform-chat"
      chatLink="https://cuneiform.chat"
      chatIcon={<span style={{ fontSize: '14px' }}>{strings.tryIt}</span>}
    >
      <LocaleSwitcher />
      <a
        href="https://cuneiform.chat/demo"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: '6px 14px',
          background: '#10b981',
          color: 'white',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {strings.requestDemo}
      </a>
    </Navbar>
  )

  const footer = (
    <Footer>
      {new Date().getFullYear()} &copy; Cuneiform Chat &mdash;{' '}
      <em>{strings.tagline}</em>
    </Footer>
  )

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <Head color={{ hue: 220, saturation: 100 }} />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap(`/${locale}`)}
          docsRepositoryBase="https://github.com/cuneiform-chat/docs/tree/main/content"
          editLink={strings.editLink}
          feedback={{
            content: strings.feedbackContent,
            labels: 'feedback',
          }}
          footer={footer}
          search={<Search placeholder={strings.searchPlaceholder} />}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ title: strings.tocTitle, backToTop: strings.backToTop }}
          navigation={{ prev: true, next: true }}
          darkMode
        >
          {children}
        </Layout>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J5C597MWT2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-J5C597MWT2');`}
        </Script>
      </body>
    </html>
  )
}
