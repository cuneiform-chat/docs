import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { LocaleSwitcher } from '../../components/locale-switcher'

const LOCALES = ['en', 'bn', 'es', 'fr', 'hi', 'pt', 'ru', 'th'] as const
type Locale = (typeof LOCALES)[number]
const RTL_LOCALES: Locale[] = [] // Add 'ar' when ready

const UI_STRINGS: Record<
  Locale,
  {
    editLink: string
    feedbackContent: string
    title: string
    description: string
    tagline: string
  }
> = {
  en: {
    editLink: 'Edit this page on GitHub →',
    feedbackContent: 'Question? Give us feedback →',
    title: 'Cuneiform Chat Documentation',
    description:
      'Learn how to create document-trained AI chatbots with Cuneiform Chat',
    tagline: 'Clay tablets to chatbot. Remembering the beginning.',
  },
  bn: {
    editLink: 'GitHub-এ এই page edit করুন →',
    feedbackContent: 'প্রশ্ন? আমাদের feedback দিন →',
    title: 'Cuneiform Chat Documentation',
    description:
      'Cuneiform Chat দিয়ে document-trained AI chatbot তৈরি করতে শিখুন',
    tagline: 'Clay tablets to chatbot. Remembering the beginning.',
  },
  es: {
    editLink: 'Editar esta página en GitHub →',
    feedbackContent: '¿Preguntas? Envíanos tu opinión →',
    title: 'Documentación de Cuneiform Chat',
    description:
      'Aprende a crear chatbots de IA entrenados con documentos usando Cuneiform Chat',
    tagline: 'De tablillas de arcilla al chatbot. Recordando el origen.',
  },
  fr: {
    editLink: 'Modifier cette page sur GitHub →',
    feedbackContent: 'Des questions ? Donnez-nous votre avis →',
    title: 'Documentation Cuneiform Chat',
    description:
      'Apprenez à créer des chatbots IA entraînés sur vos documents avec Cuneiform Chat',
    tagline: "Des tablettes d'argile au chatbot. Se souvenir du commencement.",
  },
  hi: {
    editLink: 'GitHub पर इस page को edit करें →',
    feedbackContent: 'प्रश्न? हमें feedback दें →',
    title: 'Cuneiform Chat Documentation',
    description:
      'Cuneiform Chat के साथ document-trained AI chatbot बनाना सीखें',
    tagline: 'Clay tablets to chatbot. Remembering the beginning.',
  },
  pt: {
    editLink: 'Editar esta página no GitHub →',
    feedbackContent: 'Dúvidas? Envie-nos seu feedback →',
    title: 'Documentação do Cuneiform Chat',
    description:
      'Aprenda a criar chatbots de IA treinados com documentos usando o Cuneiform Chat',
    tagline: 'De tabuletas de argila ao chatbot. Lembrando o começo.',
  },
  ru: {
    editLink: 'Редактировать эту страницу на GitHub →',
    feedbackContent: 'Вопросы? Оставьте отзыв →',
    title: 'Документация Cuneiform Chat',
    description:
      'Узнайте, как создавать AI-чатботы, обученные на документах, с помощью Cuneiform Chat',
    tagline: 'От глиняных табличек к чатботу. Помня о начале.',
  },
  th: {
    editLink: 'แก้ไขหน้านี้บน GitHub →',
    feedbackContent: 'มีคำถาม? ให้คำติชมแก่เรา →',
    title: 'Cuneiform Chat Documentation',
    description:
      'เรียนรู้วิธีสร้าง AI chatbot ที่ฝึกด้วยเอกสารด้วย Cuneiform Chat',
    tagline: 'Clay tablets to chatbot. Remembering the beginning.',
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
    alternates: {
      canonical: `https://docs.cuneiform.chat/${lang}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `https://docs.cuneiform.chat/${l}`])
      ),
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
      chatIcon={<span style={{ fontSize: '14px' }}>Try It</span>}
    >
      <LocaleSwitcher />
      <a
        href="https://cuneiform.chat/request-demo"
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
        Request Demo
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
      <Head color={{ hue: 220, saturation: 100 }}>
        <link
          rel="canonical"
          href={`https://docs.cuneiform.chat/${locale}`}
        />
        {LOCALES.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://docs.cuneiform.chat/${l}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://docs.cuneiform.chat/en"
        />
      </Head>
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
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: true }}
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
