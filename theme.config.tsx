import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

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
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Cuneiform Chat Documentation" />
      <meta property="og:description" content="Learn how to create document-trained AI chatbots with Cuneiform Chat" />
      <meta property="og:image" content="/og-image.png" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
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
