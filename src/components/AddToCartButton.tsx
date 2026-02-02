'use client'

import { useState } from 'react'
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react'
import { Product } from '@/src/lib/data'
import { useCart } from '@/src/contexts/CartContext'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { getDictionary } from '@/src/app/dictionaries'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart } = useCart()
  const { locale } = useLanguage()
  const dict = getDictionary(locale)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imagePlaceholder: product.imagePlaceholder,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-sans text-sm text-gray-600">
          {dict.product.quantity}:
        </span>
        <div className="flex items-center border border-gold/30 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gold/10 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-sans text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center hover:bg-gold/10 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-sans text-sm uppercase tracking-wider transition-all ${
          isAdded
            ? 'bg-green-500 text-white'
            : 'bg-gold text-white hover:bg-gold-dark'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            {dict.product.addToCart}
          </>
        )}
      </button>
    </div>
  )
}
