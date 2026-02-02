'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Globe, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/src/contexts/CartContext'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { Locale, locales, getDictionary } from '@/src/app/dictionaries'

interface NavbarProps {
  locale: Locale
}

export default function Navbar({ locale }: NavbarProps) {
  const dict = getDictionary(locale)
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()
  const { setLocale, isLanguageMenuOpen, setIsLanguageMenuOpen } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/shop`, label: dict.nav.shop },
    { href: `/${locale}/about`, label: dict.nav.about },
  ]

  const languageNames: Record<Locale, string> = {
    en: dict.language.en,
    fr: dict.language.fr,
    ja: dict.language.ja,
    zh: dict.language.zh,
  }

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsLanguageMenuOpen(false) // 切换语言后最好关闭菜单
  }

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <span className="font-serif text-2xl font-bold text-gold tracking-wider">
              XYRA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm tracking-wide transition-colors hover:text-gold ${
                  pathname === link.href ? 'text-gold' : 'text-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gold/10 transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-5 h-5 text-gray-700" />
                <span className="hidden sm:inline text-sm font-sans text-gray-700 uppercase">
                  {locale}
                </span>
              </button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gold/20 py-2 z-50">
                  {locales.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2 text-sm font-sans transition-colors hover:bg-cream ${
                        locale === lang ? 'text-gold font-medium' : 'text-gray-700'
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center font-sans">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold/20">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-sans text-sm tracking-wide transition-colors hover:text-gold ${
                    pathname === link.href ? 'text-gold' : 'text-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
