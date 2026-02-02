import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales
const locales = ['en', 'fr', 'ja', 'zh']
const defaultLocale = 'en'

// Get the preferred locale from request headers
function getLocale(request: NextRequest): string {
  // Check for locale cookie first
  const localeCookie = request.cookies.get('NEXT_LOCALE')
  if (localeCookie && locales.includes(localeCookie.value)) {
    return localeCookie.value
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage.split(',').map(lang => {
      const [code] = lang.split(';')
      return code.trim().toLowerCase().split('-')[0]
    })

    for (const locale of preferredLocales) {
      if (locales.includes(locale)) {
        return locale
      }
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Redirect to the appropriate locale
  const locale = getLocale(request)
  
  // Handle root path
  if (pathname === '/') {
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url))
    response.cookies.set('NEXT_LOCALE', locale, { maxAge: 365 * 24 * 60 * 60 })
    return response
  }

  // Handle other paths without locale
  const response = NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  response.cookies.set('NEXT_LOCALE', locale, { maxAge: 365 * 24 * 60 * 60 })
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
}
