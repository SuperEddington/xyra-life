'use client'

import Link from 'next/link'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { getDictionary } from '@/src/app/dictionaries'

export default function Footer() {
  const { locale } = useLanguage()
  const dict = getDictionary(locale)

  return (
    <footer className="bg-cream-dark border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-gold tracking-wider mb-4">
              XYRA
            </h2>
            <p className="font-serif text-lg text-gray-600 italic mb-2">
              {dict.footer.tagline}
            </p>
            <p className="font-sans text-sm text-gray-500 max-w-md">
              {dict.metadata.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-sm font-medium text-gray-800 uppercase tracking-wider mb-4">
              {dict.footer.links.shop}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/shop`}
                  className="font-sans text-sm text-gray-600 hover:text-gold transition-colors"
                >
                  {dict.nav.shop}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="font-sans text-sm text-gray-600 hover:text-gold transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-sans text-sm font-medium text-gray-800 uppercase tracking-wider mb-4">
              {dict.footer.links.contact}
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="font-sans text-sm text-gray-600">
                  hello@xyra.com
                </span>
              </li>
              <li>
                <Link
                  href={`/${locale}`}
                  className="font-sans text-sm text-gray-600 hover:text-gold transition-colors"
                >
                  {dict.footer.links.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-gray-500">
            {dict.footer.copyright}
          </p>
          <div className="flex items-center space-x-4">
            <span className="font-sans text-xs text-gray-400">
              {dict.language.title}:
            </span>
            <div className="flex space-x-2">
              {(['en', 'fr', 'ja', 'zh'] as const).map((lang) => (
                <Link
                  key={lang}
                  href={`/${lang}`}
                  className={`font-sans text-xs uppercase ${
                    locale === lang ? 'text-gold font-medium' : 'text-gray-400 hover:text-gold'
                  } transition-colors`}
                >
                  {lang}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
