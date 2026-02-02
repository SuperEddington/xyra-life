export interface Product {
  id: string
  name: string
  price: number
  imagePlaceholder: string
  features: string[]
  category: string
  description: string
}

export const products: Product[] = [
  {
    id: "muse-bfs-pink",
    name: "Muse Air BFS Reel",
    price: 109.99,
    imagePlaceholder: "[PRODUCT: Pink Micro Reel Side Profile]",
    features: ["28mm Shallow Spool", "130g Ultra-light", "Real Flower Resin Knob"],
    category: "Reels",
    description: "Our flagship BFS reel, designed with the discerning angler in mind. The Muse Air features a real flower resin knob that brings nature's beauty to every cast."
  },
  {
    id: "blanc-de-chine-spin",
    name: "Blanc De Chine Spinning Reel",
    price: 99.99,
    imagePlaceholder: "[PRODUCT: White Spinning Reel]",
    features: ["Creamy Matte Finish", "Champagne Gold Trim", "Gold Flake Knob"],
    category: "Reels",
    description: "Inspired by the finest porcelain, this spinning reel combines elegance with performance. The creamy matte finish and champagne gold trim create a timeless aesthetic."
  },
  {
    id: "crystal-minnow",
    name: "Crystal Minnow Pendant",
    price: 16.99,
    imagePlaceholder: "[PRODUCT: Transparent Crystal Lure]",
    features: ["Prism Refraction", "Laser Etched Internal", "Sinking Action"],
    category: "Lures",
    description: "A lure that doubles as jewelry. The Crystal Minnow catches light and fish with equal grace, featuring intricate laser-etched internals that create mesmerizing prism effects."
  },
  {
    id: "mermaid-tears",
    name: "Mermaid Tears Soft Baits",
    price: 12.99,
    imagePlaceholder: "[PRODUCT: Soft Bait Pack]",
    features: ["Pack of 8", "Biodegradable", "Pearlescent Glitter"],
    category: "Baits",
    description: "Soft baits that shimmer like treasures from the deep. Biodegradable and beautiful, each pack contains 8 pearlescent lures that move with irresistible fluidity."
  },
  {
    id: "candy-box-set",
    name: "The Candy Box Gift Set",
    price: 34.99,
    imagePlaceholder: "[PRODUCT: Open Gift Box Flatlay]",
    features: ["5x Matte Lures", "Macaron Colors", "Luxury Gift Box"],
    category: "Gifts",
    description: "The perfect introduction to the XYRA world. Five matte lures in delicate macaron colors, presented in a reusable luxury gift box that brings joy before the first cast."
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
  const currentProduct = getProductById(currentId)
  if (!currentProduct) return products.slice(0, limit)
  
  return products
    .filter(p => p.id !== currentId && p.category === currentProduct.category)
    .slice(0, limit)
}
