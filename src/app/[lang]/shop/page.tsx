import { products } from '@/src/lib/data'
import ProductCard from '@/src/components/ProductCard'
import { getDictionary, Locale } from '@/src/app/dictionaries'

interface ShopPageProps {
  params: { lang: string }
}

export default function ShopPage({ params }: ShopPageProps) {
  const locale = params.lang as Locale
  const dict = getDictionary(locale)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-cream-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-xs text-gold uppercase tracking-wider mb-4">
            XYRA Collection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            {dict.nav.shop}
          </h1>
          <p className="font-sans text-gray-600 max-w-md mx-auto">
            Luxury fishing gear designed for the discerning angler.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Reels', 'Lures', 'Baits', 'Gifts'].map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-sans text-sm transition-colors ${
                  index === 0
                    ? 'bg-gold text-white'
                    : 'bg-cream-dark text-gray-600 hover:bg-gold/10 hover:text-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-12 text-center">
            <p className="font-sans text-sm text-gray-500">
              Showing {products.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Gift Sets Banner */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-cream rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-center px-8">
                [IMAGE: Gift wrapping service]
              </span>
            </div>
            <div className="space-y-6">
              <p className="font-sans text-xs text-gold uppercase tracking-wider">
                Gift Services
              </p>
              <h2 className="font-serif text-3xl text-gray-800">
                The Perfect Gift
              </h2>
              <p className="font-sans text-gray-600 leading-relaxed">
                Every XYRA product comes with complimentary gift wrapping. 
                Make your present unforgettable with our signature gold-accented packaging.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 font-sans text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Complimentary gift wrapping
                </li>
                <li className="flex items-center gap-3 font-sans text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Personalized message cards
                </li>
                <li className="flex items-center gap-3 font-sans text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Express shipping available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
