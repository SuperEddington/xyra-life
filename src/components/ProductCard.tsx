'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/src/lib/data'
import { useCart } from '@/src/contexts/CartContext'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { getDictionary } from '@/src/app/dictionaries'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { locale } = useLanguage()
  const dict = getDictionary(locale)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imagePlaceholder: product.imagePlaceholder,
    })
  }

  return (
    <div className="group">
      <Link href={`/${locale}/product/${product.id}`}>
        {/* Image Placeholder */}
        <div className="relative aspect-square bg-cream-dark rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-gray-400 text-center px-4">
              {product.imagePlaceholder}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-white"
            aria-label={dict.product.addToCart}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="font-sans text-xs text-gray-500 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-serif text-lg text-gray-800 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="font-sans text-gold font-medium">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  )
}
