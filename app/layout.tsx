import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    template: '%s – Cuneiform Chat Docs',
    default: 'Cuneiform Chat Documentation',
  },
  description:
    'Learn how to create document-trained AI chatbots with Cuneiform Chat',
  openGraph: {
    title: 'Cuneiform Chat Documentation',
    description:
      'Learn how to create document-trained AI chatbots with Cuneiform Chat',
    url: 'https://docs.cuneiform.chat',
    images: 'https://cuneiform.chat/logo.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuneiform Chat Documentation',
    description:
      'Learn how to create document-trained AI chatbots with Cuneiform Chat',
    images: 'https://cuneiform.chat/logo.png',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  metadataBase: new URL('https://docs.cuneiform.chat'),
}

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
    <em>Clay tablets to chatbot. Remembering the beginning.</em>
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 220, saturation: 100 }}>
        <link rel="canonical" href="https://docs.cuneiform.chat" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/cuneiform-chat/docs/tree/main/content"
          editLink="Edit this page on GitHub →"
          feedback={{ content: 'Question? Give us feedback →', labels: 'feedback' }}
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
