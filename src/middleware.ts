import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './app/dictionaries' // 确保这里能引用到 locales，如果报错，可以直接把 locales 写在下面

// 如果上面引用报错，请取消下面这行的注释，直接在这里定义语言数组：
// const locales = ['en', 'fr', 'ja', 'zh']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. 如果访问的是静态资源（图片、图标等），直接放行，不做任何处理
  if (
    pathname.includes('.') || // 包含点号通常是文件 (image.png, favicon.ico)
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return
  }

  // 2. 检查路径是否已经包含语言前缀 (例如 /en, /zh/shop)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 3. 如果已经有语言前缀，放行
  if (pathnameHasLocale) return

  // 4. 【关键】如果路径没有语言前缀（比如访问根目录 /），强制跳转到默认语言
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  // 307 Temporary Redirect 是最稳妥的跳转方式
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // 匹配规则：匹配除了 _next, api, static 之外的所有路径
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
}
