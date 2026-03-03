'use client'

import { usePathname } from 'next/navigation'
import type { AnchorHTMLAttributes } from 'react'

/**
 * Wraps <a> to auto-prefix locale on absolute internal links in MDX content.
 * e.g. href="/agents/testing" → "/en/agents/testing" when viewing /en/...
 */
export function LocaleLink({
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname()

  if (href && href.startsWith('/') && !href.startsWith('//')) {
    // Extract locale from current path (e.g., /en/agents/... → "en")
    const locale = pathname.split('/')[1]
    if (locale && !href.startsWith(`/${locale}/`) && href !== `/${locale}`) {
      href = `/${locale}${href}`
    }
  }

  return <a href={href} {...props} />
}
