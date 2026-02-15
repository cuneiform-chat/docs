import React from 'react'
import { useRouter } from 'next/router'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/logo.png" alt="Cuneiform Chat" style={{ height: '32px' }} />
      <span style={{ fontWeight: 600, fontSize: '18px' }}>Cuneiform Chat</span>
    </span>
  ),
  project: {
    link: 'https://github.com/cuneiform-chat',
  },
  chat: {
    link: 'https://cuneiform.chat',
    icon: (
      <span style={{ fontSize: '14px' }}>Try It</span>
    ),
  },
  docsRepositoryBase: 'https://github.com/cuneiform-chat/docs/tree/main',
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} © Cuneiform Chat — <em>Clay tablets to chatbot. Remembering the beginning.</em>
      </span>
    ),
  },
  head: () => {
    const { asPath } = useRouter()
    const { frontMatter, title } = useConfig()
    const url = 'https://docs.cuneiform.chat' + asPath
    const description = frontMatter.description || 'Learn how to create document-trained AI chatbots with Cuneiform Chat'
    const pageTitle = title ? `${title} – Cuneiform Chat Docs` : 'Cuneiform Chat Documentation'

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://cuneiform.chat/logo.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://cuneiform.chat/logo.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="canonical" href={url} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J5C597MWT2" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-J5C597MWT2');`
        }} />
      </>
    )
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Cuneiform Chat Docs'
    }
  },
  primaryHue: 220, // Blue hue, adjust to match your brand
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  navigation: {
    prev: true,
    next: true,
  },
  darkMode: true,
}

export default config
