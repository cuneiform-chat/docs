'use client'

import { usePathname } from 'next/navigation'

// Active locales: en (source), es, pt, fr, ru, bn, hi, ar (RTL).
// Disabled: th — content directory retained on disk but no
// longer built or routed. Do NOT add disabled codes back without updating
// next.config.mjs and `.claude/references/features/admin-panel-i18n.md`.
const LOCALES = ['en', 'es', 'pt', 'fr', 'ru', 'bn', 'hi', 'ar'] as const
const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  ru: 'Русский',
  bn: 'বাংলা',
  hi: 'हिन्दी',
  ar: 'العربية',
}

export function LocaleSwitcher() {
  const pathname = usePathname()

  const currentLocale = pathname.split('/')[1] || 'en'

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value
    const newPath = pathname.replace(/^\/(en|es|pt|fr|ru|bn|hi|ar)/, `/${newLocale}`)
    window.location.href = newPath
  }

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      aria-label="Select language"
      style={{
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        border: '1px solid var(--nextra-border-color, #e5e7eb)',
        background: 'transparent',
        color: 'inherit',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {LOCALES.map((l) => (
        <option key={l} value={l} style={{ color: '#000', background: '#fff' }}>
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  )
}
