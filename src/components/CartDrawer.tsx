'use client'

import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/src/contexts/CartContext'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { getDictionary } from '@/src/app/dictionaries'

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart()
  const { locale } = useLanguage()
  const dict = getDictionary(locale)

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <h2 className="font-serif text-xl text-gray-800">{dict.cart.title}</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-gold/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gold/40 mb-4" />
              <p className="font-sans text-gray-500 mb-4">{dict.cart.empty}</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="font-sans text-sm text-gold hover:text-gold-dark transition-colors"
              >
                {dict.cart.continueShopping}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Product Image Placeholder */}
                  <div className="w-20 h-20 bg-cream-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-gray-400 text-center px-2">
                      {item.imagePlaceholder}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-serif text-sm text-gray-800">{item.name}</h3>
                    <p className="font-sans text-sm text-gold mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={dict.cart.remove}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold/20 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between font-sans text-sm">
              <span className="text-gray-600">{dict.cart.subtotal}</span>
              <span className="text-gray-800">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between font-sans text-sm">
              <span className="text-gray-600">{dict.cart.shipping}</span>
              <span className="text-gray-800">Free</span>
            </div>

            {/* Total */}
            <div className="flex justify-between font-serif text-lg border-t border-gold/20 pt-4">
              <span className="text-gray-800">{dict.cart.total}</span>
              <span className="text-gold">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-gold text-white font-sans py-3 rounded-lg hover:bg-gold-dark transition-colors">
              {dict.cart.checkout}
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center font-sans text-sm text-gray-500 hover:text-gold transition-colors"
            >
              {dict.cart.continueShopping}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
