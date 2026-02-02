# XYRA - Luxury Lifestyle E-commerce

A production-ready Next.js 14 e-commerce application with full internationalization (i18n) support for the XYRA luxury lifestyle brand.

## Features

- **Internationalization (i18n)**: Full support for English, French, Japanese, and Simplified Chinese
- **Dynamic Routing**: Locale-based routing with `/[lang]/` pattern
- **Shopping Cart**: React Context-based cart state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Luxury Aesthetic**: Cream and gold color palette with Playfair Display and Lato fonts

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Fonts**: Playfair Display (Serif), Lato (Sans)

## Project Structure

```
xyra/
├── middleware.ts              # Locale detection and redirection
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
├── src/
│   ├── app/
│   │   ├── [lang]/            # Dynamic locale routes
│   │   │   ├── about/         # About page (The Philosophy)
│   │   │   ├── shop/          # Shop page
│   │   │   ├── product/
│   │   │   │   └── [id]/      # Product detail pages
│   │   │   ├── layout.tsx     # Root layout with providers
│   │   │   └── page.tsx       # Homepage
│   │   ├── dictionaries/      # Translation files
│   │   │   ├── en.json        # English translations
│   │   │   ├── fr.json        # French translations
│   │   │   ├── ja.json        # Japanese translations
│   │   │   ├── zh.json        # Chinese translations
│   │   │   └── index.ts       # Dictionary utilities
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── AddToCartButton.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ProductCard.tsx
│   ├── contexts/              # React Context providers
│   │   ├── CartContext.tsx    # Shopping cart state
│   │   ├── LanguageContext.tsx # Language switcher state
│   │   └── index.ts
│   └── lib/
│       └── data.ts            # Product data
```

## Supported Locales

- **en** - English (default)
- **fr** - Français (French)
- **ja** - 日本語 (Japanese)
- **zh** - 简体中文 (Simplified Chinese)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static export will be generated in the `dist/` directory.

## Language Switching

The application features a language switcher in the navbar with a globe icon. Clicking it reveals a dropdown with all supported languages. When a language is selected:

1. The URL is updated (e.g., `/en/shop` → `/fr/shop`)
2. A cookie (`NEXT_LOCALE`) is set to remember the preference
3. All UI text is updated to the selected language

## Middleware Behavior

The `middleware.ts` file handles:

- **Locale Detection**: Checks cookies and Accept-Language header
- **Default Redirect**: Redirects `/` to `/{defaultLocale}/`
- **Invalid Locale Handling**: Redirects unknown locales to default

## Product Data

Products are defined in `src/lib/data.ts` with the following structure:

```typescript
interface Product {
  id: string
  name: string
  price: number
  imagePlaceholder: string  // Placeholder text for images
  features: string[]
  category: string
  description: string
}
```

## Cart Functionality

The shopping cart supports:

- Adding products
- Removing products
- Updating quantities
- Persistent state during session
- Slide-out drawer UI

## Design System

### Colors

- **Cream**: `#FDFBF7` (background)
- **Cream Dark**: `#F2F0EB` (section backgrounds)
- **Gold**: `#D4AF37` (primary accent)
- **Gold Light**: `#E5C76B`
- **Gold Dark**: `#B8960C`

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Lato (sans-serif)

## License

© 2024 XYRA. All rights reserved.
