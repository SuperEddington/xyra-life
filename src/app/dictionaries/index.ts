import en from './en.json'
import fr from './fr.json'
import ja from './ja.json'
import zh from './zh.json'

export type Locale = 'en' | 'fr' | 'ja' | 'zh'

export const dictionaries = {
  en,
  fr,
  ja,
  zh,
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.en
}

export const locales: Locale[] = ['en', 'fr', 'ja', 'zh']
export const defaultLocale: Locale = 'en'
