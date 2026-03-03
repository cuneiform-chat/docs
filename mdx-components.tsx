import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { LocaleLink } from './components/locale-link'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components?: Record<string, React.ComponentType>) {
  return {
    ...docsComponents,
    a: LocaleLink,
    ...components,
  }
}
