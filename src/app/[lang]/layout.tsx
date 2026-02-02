import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, getDictionary, Locale } from '@/src/app/dictionaries'
import { CartProvider } from '@/src/contexts/CartContext'
import { LanguageProvider } from '@/src/contexts/LanguageContext'
import Navbar from '@/src/components/Navbar'
import CartDrawer from '@/src/components/CartDrawer'
import Footer from '@/src/components/Footer'
import '@/src/app/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = params.lang as Locale
  const dict = getDictionary(locale)
  
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Validate locale
  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  const locale = lang as Locale

  return (
    <html lang={locale} className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans bg-cream min-h-screen flex flex-col">
        <LanguageProvider initialLocale={locale}>
          <CartProvider>
            <Navbar locale={locale} />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
