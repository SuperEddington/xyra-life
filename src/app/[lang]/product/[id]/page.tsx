import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, ShoppingBag, Star } from 'lucide-react'
import { getProductById, products, getRelatedProducts } from '@/src/lib/data'
import ProductCard from '@/src/components/ProductCard'
import AddToCartButton from '@/src/components/AddToCartButton'
import { getDictionary, Locale } from '@/src/app/dictionaries'

interface ProductPageProps {
  params: { lang: string; id: string }
}

export async function generateStaticParams() {
  const params: { lang: string; id: string }[] = []
  const locales = ['en', 'fr', 'ja', 'zh']
  
  for (const locale of locales) {
    for (const product of products) {
      params.push({ lang: locale, id: product.id })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | XYRA`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const locale = params.lang as Locale
  const dict = getDictionary(locale)
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id, 3)

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-cream-dark py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 font-sans text-sm text-gray-600 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {dict.nav.shop}
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-cream-dark rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-center px-8">
                  {product.imagePlaceholder}
                </span>
              </div>
              {/* Thumbnail placeholders */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-cream-dark rounded-lg flex items-center justify-center"
                  >
                    <span className="text-xs text-gray-400">[{i}]</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-gold uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                  <span className="font-sans text-sm text-gray-500 ml-2">
                    (24 reviews)
                  </span>
                </div>
              </div>

              {/* Name & Price */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-gray-800 mb-4">
                  {product.name}
                </h1>
                <p className="font-sans text-2xl text-gold font-medium">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <p className="font-sans text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="font-sans text-sm font-medium text-gray-800 uppercase tracking-wider mb-4">
                  {dict.product.features}
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 font-sans text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-sans text-sm text-gray-600">
                  {dict.product.inStock}
                </span>
              </div>

              {/* Add to Cart */}
              <AddToCartButton product={product} />

              {/* Shipping Info */}
              <div className="pt-6 border-t border-gold/20 space-y-3">
                <div className="flex items-center gap-3 font-sans text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center gap-3 font-sans text-sm text-gray-600">
                  <Check className="w-4 h-4 text-gold" />
                  30-day hassle-free returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-800 mb-12 text-center">
              {dict.product.relatedProducts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
