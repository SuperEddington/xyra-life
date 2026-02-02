'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Locale, locales, defaultLocale } from '@/src/app/dictionaries'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  isLanguageMenuOpen: boolean
  setIsLanguageMenuOpen: (open: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode
  initialLocale: Locale 
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const setLocale = useCallback((newLocale: Locale) => {
    if (!locales.includes(newLocale)) return
    
    setLocaleState(newLocale)
    setIsLanguageMenuOpen(false)
    
    // Update cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`
    
    // Navigate to new locale path
    const currentPathWithoutLocale = pathname.replace(/^\/(en|fr|ja|zh)/, '') || '/'
    const newPath = `/${newLocale}${currentPathWithoutLocale}`
    router.push(newPath)
  }, [pathname, router])

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        isLanguageMenuOpen,
        setIsLanguageMenuOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
