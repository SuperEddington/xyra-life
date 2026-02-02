import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { products } from '@/src/lib/data'
import ProductCard from '@/src/components/ProductCard'
import { getDictionary, Locale } from '@/src/app/dictionaries'

interface HomePageProps {
  params: { lang: string }
}

export default function HomePage({ params }: HomePageProps) {
  const locale = params.lang as Locale
  const dict = getDictionary(locale)

  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3)
  
  // Get the Candy Box gift set
  const giftSet = products.find(p => p.id === 'candy-box-set')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="font-sans text-xs text-gold uppercase tracking-wider">
                  New Collection
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight">
                {dict.hero.headline}
              </h1>
              
              <p className="font-sans text-lg md:text-xl text-gray-600 max-w-lg">
                {dict.hero.subhead}
              </p>
              
              <Link
                href={`/${locale}/shop`}
                className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-lg font-sans text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors"
              >
                {dict.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative aspect-[4/5] bg-cream rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg text-gray-400 text-center px-8">
                  [HERO: Elegant Woman Holding Fishing Rod at Sunset]
                </span>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-24 h-24 border border-gold/30 rounded-full" />
              <div className="absolute bottom-12 left-12 w-16 h-16 bg-gold/10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Featured Collection Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="font-sans text-xs text-gold uppercase tracking-wider mb-4">
              Curated For You
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-800 mb-4">
              {dict.featured.title}
            </h2>
            <p className="font-sans text-gray-600 max-w-md mx-auto">
              {dict.featured.subtitle}
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-2 text-gold font-sans text-sm uppercase tracking-wider hover:text-gold-dark transition-colors"
            >
              {dict.featured.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gifting Banner */}
      {giftSet && (
        <section className="py-20 md:py-28 bg-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Gift Image */}
              <div className="relative aspect-square bg-cream rounded-lg overflow-hidden order-2 md:order-1">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg text-gray-400 text-center px-8">
                    {giftSet.imagePlaceholder}
                  </span>
                </div>
                {/* Gift Tag */}
                <div className="absolute top-6 left-6 bg-gold text-white px-4 py-2 rounded-full">
                  <span className="font-sans text-xs uppercase tracking-wider">
                    Gift Set
                  </span>
                </div>
              </div>

              {/* Gift Content */}
              <div className="space-y-6 order-1 md:order-2">
                <p className="font-sans text-xs text-gold uppercase tracking-wider">
                  {dict.gifting.subtitle}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-gray-800">
                  {dict.gifting.title}
                </h2>
                <p className="font-sans text-gray-600 leading-relaxed">
                  {dict.gifting.description}
                </p>
                <ul className="space-y-3">
                  {giftSet.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 font-sans text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link
                    href={`/${locale}/product/${giftSet.id}`}
                    className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-lg font-sans text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors"
                  >
                    {dict.gifting.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Philosophy Teaser */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <blockquote className="font-serif text-2xl md:text-3xl text-gray-800 italic leading-relaxed mb-8">
            "Fishing is not a conquest. It is a connection."
          </blockquote>
          <p className="font-sans text-gray-600 mb-8">
            Discover the XYRA philosophy — where every cast becomes a ritual of grace.
          </p>
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-4 rounded-lg font-sans text-sm uppercase tracking-wider hover:bg-gold hover:text-white transition-colors"
          >
            {dict.nav.about}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
