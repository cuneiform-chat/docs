'use client'

import { usePathname } from 'next/navigation'

const LOCALES = ['en', 'bn'] as const
const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  bn: 'বাংলা',
}

export function LocaleSwitcher() {
  const pathname = usePathname()

  const currentLocale = pathname.split('/')[1] || 'en'

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value
    const newPath = pathname.replace(/^\/(en|bn)/, `/${newLocale}`)
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
        <option key={l} value={l}>
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  )
}
