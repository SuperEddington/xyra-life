import { Sparkles, Heart, Gem, Leaf } from 'lucide-react'
import { getDictionary, Locale } from '@/src/app/dictionaries'

interface AboutPageProps {
  params: { lang: string }
}

export default function AboutPage({ params }: AboutPageProps) {
  const locale = params.lang as Locale
  const dict = getDictionary(locale)

  const values = [
    {
      icon: Sparkles,
      title: dict.about.values.elegance,
      description: "Every XYRA product is designed to bring beauty to your fishing experience."
    },
    {
      icon: Heart,
      title: dict.about.values.mindfulness,
      description: "We believe in the healing power of quiet moments by the water."
    },
    {
      icon: Gem,
      title: dict.about.values.craftsmanship,
      description: "Each piece is meticulously crafted with attention to every detail."
    },
    {
      icon: Leaf,
      title: dict.about.values.sustainability,
      description: "We use biodegradable materials and eco-friendly practices."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cream-dark py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-xs text-gold uppercase tracking-wider mb-6">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-8">
            {dict.about.title}
          </h1>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-gold/20 rounded-full opacity-50" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gold/5 rounded-full" />
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="font-sans text-xl text-gray-700 leading-relaxed mb-8">
              {dict.about.story.paragraph1}
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 my-16 items-center">
              <div className="aspect-[4/3] bg-cream-dark rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-center px-8">
                  [IMAGE: Artisan crafting a flower resin knob]
                </span>
              </div>
              <div>
                <p className="font-sans text-lg text-gray-700 leading-relaxed">
                  {dict.about.story.paragraph2}
                </p>
              </div>
            </div>

            <div className="bg-cream-dark p-8 md:p-12 rounded-lg my-16">
              <p className="font-serif text-2xl md:text-3xl text-gray-800 italic text-center leading-relaxed">
                "{dict.about.story.paragraph3}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-xs text-gold uppercase tracking-wider mb-4">
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-800">
              {dict.about.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Elements */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-xs text-gold uppercase tracking-wider mb-4">
              Signature Details
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-800">
              The XYRA Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Flower Resin Knobs */}
            <div className="text-center">
              <div className="aspect-square bg-cream-dark rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-400 text-center px-4 text-sm">
                  [DETAIL: Real flower preserved in resin knob]
                </span>
              </div>
              <h3 className="font-serif text-xl text-gray-800 mb-3">
                Flower-Resin Knobs
              </h3>
              <p className="font-sans text-sm text-gray-600">
                Real flowers preserved in crystal-clear resin, bringing nature's beauty to every cast.
              </p>
            </div>

            {/* Blanc De Chine Finish */}
            <div className="text-center">
              <div className="aspect-square bg-cream-dark rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-400 text-center px-4 text-sm">
                  [DETAIL: Creamy matte finish with gold trim]
                </span>
              </div>
              <h3 className="font-serif text-xl text-gray-800 mb-3">
                Blanc De Chine Finish
              </h3>
              <p className="font-sans text-sm text-gray-600">
                Inspired by fine porcelain, our signature creamy matte finish exudes timeless elegance.
              </p>
            </div>

            {/* Pearlescent Baits */}
            <div className="text-center">
              <div className="aspect-square bg-cream-dark rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-400 text-center px-4 text-sm">
                  [DETAIL: Pearlescent soft bait catching light]
                </span>
              </div>
              <h3 className="font-serif text-xl text-gray-800 mb-3">
                Pearlescent Baits
              </h3>
              <p className="font-sans text-sm text-gray-600">
                Biodegradable soft baits with iridescent glitter that shimmers like treasures from the deep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-800 mb-6">
            Begin Your Ritual
          </h2>
          <p className="font-sans text-gray-600 mb-8 max-w-lg mx-auto">
            Discover our collection of luxury fishing gear, designed for women who appreciate the art of angling.
          </p>
          <a
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-lg font-sans text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors"
          >
            Explore Collection
          </a>
        </div>
      </section>
    </div>
  )
}
