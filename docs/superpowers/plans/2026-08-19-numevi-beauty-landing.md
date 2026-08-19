# Numevi Beauty Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, production-quality Next.js marketing site for "Numevi Beauty" — a premium beauty/personal-care brand showcase with no e-commerce functionality.

**Architecture:** Next.js (App Router, TypeScript) with a single route (`/`) composed of stacked section components (`components/*.tsx`), all content sourced from a typed static data module (`lib/data.ts`) — no backend, no database, no API routes. Styling via Tailwind CSS using a custom brand palette/typography configured in `tailwind.config.ts`. No automated test framework; verification per task is `npm run build` (TypeScript/build correctness) plus a manual browser check via the preview tool.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `next/font/google` (Playfair Display + Inter), `next/image` with `images.unsplash.com` as a remote pattern.

## Global Constraints

- NOT an e-commerce site: no cart, checkout, payment, order management, purchasing, or quantity-selector UI anywhere. "View Details" is informational only (opens a modal).
- Brand: name "Numevi Beauty", tagline "Beauty, Elevated."
- Palette (exact hex, add to `tailwind.config.ts` under `theme.extend.colors`): cream `#FAF6F2`, charcoal `#231F20`, rose `#C98A93`, gold `#B8956A`.
- Fonts: Playfair Display (serif, headlines) + Inter (sans, body/UI), loaded via `next/font/google`.
- 10 real, well-known beauty/personal-care products with accurate brand names (no invented brands/products) spanning all 5 categories: Skincare, Haircare, Makeup, Personal Care, Beauty Accessories.
- Product card imagery: elegant gradient/icon placeholder art (not real branded photography). Hero/About/Category imagery: real Unsplash stock photos via `next/image`.
- Contact form is client-only: validates name/email/message (phone optional), then opens a pre-filled `mailto:` link — no network call, no backend.
- Fully responsive (mobile/tablet/desktop), sticky header, smooth scroll, `prefers-reduced-motion`-aware animations.
- Every task ends with `npm run build` passing (zero TypeScript/build errors) before commit.

---

## File Structure

```
Landing page/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── app/
│   ├── layout.tsx        # fonts, metadata, <html>/<body>, imports globals.css
│   ├── globals.css        # Tailwind directives, smooth-scroll, reduced-motion base
│   └── page.tsx           # assembles all sections in order
├── lib/
│   ├── data.ts             # typed content: categories, products, testimonials, brand partners, site info
│   └── useScrollReveal.ts  # IntersectionObserver hook for fade/slide-in-on-scroll
└── components/
    ├── Header.tsx
    ├── MobileNav.tsx
    ├── Hero.tsx
    ├── About.tsx
    ├── Categories.tsx
    ├── ProductCard.tsx
    ├── ProductModal.tsx
    ├── Products.tsx
    ├── WhyChooseUs.tsx
    ├── Brands.tsx
    ├── Testimonials.tsx
    ├── Contact.tsx
    └── Footer.tsx
```

**Architecture note on filtering:** `Categories` section cards are display + anchor-link only (link to `#products`). `Products` section owns its own category-filter tab state independently — no state is lifted between the two sections. This satisfies the spec's "optional" category filtering without introducing cross-component state coupling.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.gitignore`
- Create: `app/layout.tsx` (minimal placeholder), `app/globals.css`, `app/page.tsx` (minimal placeholder)

**Interfaces:**
- Produces: Tailwind color tokens `cream`, `charcoal`, `rose`, `gold` usable as `bg-cream`, `text-charcoal`, etc. across all later tasks. Font CSS variables `--font-serif` / `--font-sans` (wired to `font-serif` / `font-sans` Tailwind classes) usable in all later component tasks.

- [ ] **Step 1: Initialize git and Next.js project**

```bash
git init
```

Create `.gitignore`:

```
node_modules
.next
out
.env*.local
npm-debug.log*
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "numevi-beauty",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.11.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

Run: `npm install`

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `next.config.js`** (allow Unsplash remote images)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create `tailwind.config.ts`** with brand palette/fonts

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F2',
        charcoal: '#231F20',
        rose: '#C98A93',
        gold: '#B8956A',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  background-color: #FAF6F2;
  color: #231F20;
}
```

- [ ] **Step 8: Create placeholder `app/layout.tsx`**

```tsx
import './globals.css';

export const metadata = {
  title: 'Numevi Beauty',
  description: 'Beauty, Elevated.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Create placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return <main className="bg-cream text-charcoal min-h-screen" />;
}
```

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: build succeeds with no TypeScript/config errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind project with brand tokens"
```

---

### Task 2: Data Layer

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Consumes: nothing (pure data module)
- Produces (used by every later component task):
  - `type Category = 'Skincare' | 'Haircare' | 'Makeup' | 'Personal Care' | 'Beauty Accessories'`
  - `interface Product { id: string; name: string; brand: string; category: Category; description: string; benefit: string; gradient: string }`
  - `interface CategoryInfo { name: Category; description: string; icon: string }`
  - `interface Testimonial { quote: string; name: string; role: string }`
  - `const categories: CategoryInfo[]`
  - `const products: Product[]` (exactly 10 entries)
  - `const testimonials: Testimonial[]` (exactly 3 entries)
  - `const brandPartners: string[]` (8 real brand names)
  - `const navLinks: { label: string; href: string }[]`
  - `const siteInfo: { name: string; tagline: string; email: string; phone: string; address: string; social: { label: string; href: string }[] }`

- [ ] **Step 1: Write `lib/data.ts`**

```ts
export type Category =
  | 'Skincare'
  | 'Haircare'
  | 'Makeup'
  | 'Personal Care'
  | 'Beauty Accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  benefit: string;
  gradient: string;
}

export interface CategoryInfo {
  name: Category;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const categories: CategoryInfo[] = [
  { name: 'Skincare', description: 'Cleansers, serums, and moisturizers for every skin type.', icon: '✦' },
  { name: 'Haircare', description: 'Shampoos, conditioners, and treatments for healthy hair.', icon: '❋' },
  { name: 'Makeup', description: 'Foundations, mascaras, and complexion essentials.', icon: '✧' },
  { name: 'Personal Care', description: 'Everyday essentials for skin and body wellness.', icon: '❀' },
  { name: 'Beauty Accessories', description: 'Tools and accessories that complete every routine.', icon: '◆' },
];

export const products: Product[] = [
  {
    id: 'cerave-moisturizing-cream',
    name: 'Moisturizing Cream',
    brand: 'CeraVe',
    category: 'Skincare',
    description: 'A rich, non-greasy daily face and body moisturizer formulated with three essential ceramides and hyaluronic acid.',
    benefit: 'Restores the protective skin barrier',
    gradient: 'from-rose-100 via-cream to-rose-200',
  },
  {
    id: 'lrp-effaclar-duo',
    name: 'Effaclar Duo+',
    brand: 'La Roche-Posay',
    category: 'Skincare',
    description: 'A dual-action daily treatment for blemish-prone skin, combining niacinamide and salicylic acid.',
    benefit: 'Reduces blemishes and post-acne marks',
    gradient: 'from-cream via-rose-100 to-gold/20',
  },
  {
    id: 'ordinary-niacinamide',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Skincare',
    description: 'A high-strength vitamin and mineral blemish serum designed to visibly balance sebum activity.',
    benefit: 'Targets the look of blemishes and congestion',
    gradient: 'from-charcoal/5 via-cream to-rose-100',
  },
  {
    id: 'cosrx-snail-mucin',
    name: 'Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Skincare',
    description: 'A lightweight essence with 96% snail secretion filtrate that hydrates and supports skin repair.',
    benefit: 'Deeply hydrates and soothes',
    gradient: 'from-gold/20 via-cream to-rose-100',
  },
  {
    id: 'bioderma-sensibio',
    name: 'Sensibio H2O Micellar Water',
    brand: 'Bioderma',
    category: 'Skincare',
    description: 'An iconic no-rinse cleansing water that removes makeup and impurities while respecting sensitive skin.',
    benefit: 'Gently cleanses without irritation',
    gradient: 'from-rose-100 via-cream to-charcoal/5',
  },
  {
    id: 'loreal-elvive-total-repair-5',
    name: 'Elvive Total Repair 5 Shampoo',
    brand: "L'Oréal Paris",
    category: 'Haircare',
    description: 'A repairing shampoo formulated with ceramide and protein for damaged, weakened hair.',
    benefit: 'Repairs 5 signs of hair damage',
    gradient: 'from-gold/20 via-cream to-rose-200',
  },
  {
    id: 'nivea-soft-cream',
    name: 'Soft Moisturizing Creme',
    brand: 'NIVEA',
    category: 'Personal Care',
    description: 'A lightweight, refreshing all-in-one cream for face, hands, and body with jojoba oil and vitamin E.',
    benefit: 'Absorbs quickly for all-day softness',
    gradient: 'from-cream via-rose-100 to-gold/20',
  },
  {
    id: 'maybelline-fit-me-foundation',
    name: 'Fit Me Matte + Poreless Foundation',
    brand: 'Maybelline New York',
    category: 'Makeup',
    description: 'A lightweight liquid foundation that matches skin tone and texture while controlling shine.',
    benefit: 'Natural, poreless matte finish',
    gradient: 'from-rose-200 via-cream to-gold/20',
  },
  {
    id: 'loreal-voluminous-lash-paradise',
    name: 'Voluminous Lash Paradise Mascara',
    brand: "L'Oréal Paris",
    category: 'Makeup',
    description: 'A volumizing mascara with a soft, feathery brush and lightweight formula for buildable lashes.',
    benefit: 'Dramatic volume without clumping',
    gradient: 'from-charcoal/10 via-cream to-rose-100',
  },
  {
    id: 'real-techniques-miracle-sponge',
    name: 'Miracle Complexion Sponge',
    brand: 'Real Techniques',
    category: 'Beauty Accessories',
    description: 'A latex-free makeup sponge with a uniquely shaped design for flawless foundation, concealer, and powder application.',
    benefit: 'Streak-free, seamless blending',
    gradient: 'from-gold/20 via-cream to-rose-200',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'Every order arrives exactly as described — authentic, well-packaged, and on time. Numevi has become our go-to distributor for the skincare lines our clients trust.',
    name: 'Amara Foster',
    role: 'Owner, The Glow Room Spa',
  },
  {
    quote: 'We evaluated several suppliers before partnering with Numevi Beauty. Their catalog quality and responsiveness put them well ahead of the rest.',
    name: 'Daniel Reyes',
    role: 'Buyer, Reyes Retail Group',
  },
  {
    quote: 'What stands out is the consistency. I know every product I discover through Numevi will be genuine and carefully vetted — that trust is hard to find.',
    name: 'Priya Nandakumar',
    role: 'Loyal Customer',
  },
];

export const brandPartners: string[] = [
  'CeraVe',
  'La Roche-Posay',
  'The Ordinary',
  'COSRX',
  'Bioderma',
  'Maybelline New York',
  "L'Oréal Paris",
  'NIVEA',
];

export const navLinks: { label: string; href: string }[] = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Brands', href: '#brands' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const siteInfo = {
  name: 'Numevi Beauty',
  tagline: 'Beauty, Elevated.',
  email: 'hello@numevibeauty.com',
  phone: '+1 (555) 019-2837',
  address: '148 Madison Avenue, Suite 700, New York, NY 10016',
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds; `lib/data.ts` type-checks with no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add typed site content data layer"
```

---

### Task 3: Layout, Fonts, and Scroll-Reveal Hook

**Files:**
- Modify: `app/layout.tsx`
- Create: `lib/useScrollReveal.ts`

**Interfaces:**
- Consumes: `siteInfo` from `lib/data.ts` (Task 2) for metadata title/description
- Produces: `useScrollReveal<T extends HTMLElement>(): { ref: React.RefObject<T>; visible: boolean }` — used by every section component (Tasks 5–13) to trigger fade/slide-in-on-scroll animation classes. Tailwind classes `font-serif` / `font-sans` now resolve to Playfair Display / Inter.

- [ ] **Step 1: Update `app/layout.tsx` with Google Fonts + metadata**

```tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { siteInfo } from '@/lib/data';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: `${siteInfo.name} — ${siteInfo.tagline}`,
  description:
    'Numevi Beauty introduces premium, authentic beauty and personal care products across skincare, haircare, makeup, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream text-charcoal">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Write `lib/useScrollReveal.ts`**

```ts
'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx lib/useScrollReveal.ts
git commit -m "feat: wire brand fonts, metadata, and scroll-reveal hook"
```

---

### Task 4: Header + MobileNav

**Files:**
- Create: `components/Header.tsx`, `components/MobileNav.tsx`

**Interfaces:**
- Consumes: `navLinks`, `siteInfo` from `lib/data.ts`
- Produces: `<Header />` — no props, self-contained. Rendered first in `app/page.tsx` (Task 14).

- [ ] **Step 1: Write `components/MobileNav.tsx`**

```tsx
'use client';

import { navLinks } from '@/lib/data';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-charcoal/40" onClick={onClose} />
      <nav
        className={`absolute right-0 top-0 h-full w-72 bg-cream shadow-xl p-8 flex flex-col gap-6 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button aria-label="Close menu" onClick={onClose} className="self-end text-2xl text-charcoal">
          &times;
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-serif text-xl text-charcoal hover:text-rose transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/Header.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { navLinks, siteInfo } from '@/lib/data';
import MobileNav from './MobileNav';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-shadow duration-300 bg-cream/95 backdrop-blur ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl tracking-wide text-charcoal">
          {siteInfo.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wider text-charcoal hover:text-rose transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-0.5 bg-charcoal" />
          <span className="block w-6 h-0.5 bg-charcoal" />
          <span className="block w-6 h-0.5 bg-charcoal" />
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Header.tsx components/MobileNav.tsx
git commit -m "feat: add sticky header with mobile nav overlay"
```

---

### Task 5: Hero Section

**Files:**
- Create: `components/Hero.tsx`

**Interfaces:**
- Consumes: `siteInfo` from `lib/data.ts`
- Produces: `<Hero />` — no props.

- [ ] **Step 1: Write `components/Hero.tsx`**

```tsx
import Image from 'next/image';
import { siteInfo } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=80"
        alt="Premium beauty and skincare products arranged elegantly"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 text-cream">
        <p className="uppercase tracking-[0.3em] text-sm mb-4 text-cream/80">{siteInfo.tagline}</p>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-3xl">
          Where Beauty Meets Trust
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream/90">
          Numevi Beauty introduces the world&apos;s most trusted skincare, haircare, and
          personal care brands to a new generation of customers and partners.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#products"
            className="px-8 py-4 bg-rose text-cream font-medium tracking-wide hover:bg-rose/90 transition-colors text-center"
          >
            Explore Our Products
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-cream/70 text-cream font-medium tracking-wide hover:bg-cream/10 transition-colors text-center"
          >
            About Our Company
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds. If the Unsplash photo id returns a 404 when checked in the browser (Task 14 verification), swap it for another `images.unsplash.com` beauty/skincare photo using the same query params.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add hero section"
```

---

### Task 6: About Section

**Files:**
- Create: `components/About.tsx`

**Interfaces:**
- Consumes: `useScrollReveal` from `lib/useScrollReveal.ts` (Task 3)
- Produces: `<About />` — no props.

- [ ] **Step 1: Write `components/About.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function About() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 md:py-32 bg-cream">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="relative h-96 md:h-[520px] order-2 md:order-1">
          <Image
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80"
            alt="Numevi Beauty product curation studio"
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <p className="uppercase tracking-[0.3em] text-sm text-rose mb-4">About Us</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            A Curated Bridge Between Brands and People
          </h2>
          <p className="text-charcoal/80 leading-relaxed mb-4">
            Numevi Beauty was founded on a simple belief: everyone deserves access to
            authentic, high-quality beauty and personal care products, backed by a company
            that stands behind every item it introduces.
          </p>
          <p className="text-charcoal/80 leading-relaxed mb-8">
            We work exclusively with vetted, reputable brands — carefully selecting each
            product for its quality, safety, and performance before it ever reaches our
            customers and partners.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-serif text-xl mb-1">Our Mission</h3>
              <p className="text-sm text-charcoal/70">
                Make trusted beauty accessible through authenticity and care.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-1">Our Values</h3>
              <p className="text-sm text-charcoal/70">
                Quality, innovation, and genuine customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add about section"
```

---

### Task 7: Categories Section

**Files:**
- Create: `components/Categories.tsx`

**Interfaces:**
- Consumes: `categories` from `lib/data.ts`, `useScrollReveal` from `lib/useScrollReveal.ts`
- Produces: `<Categories />` — no props. Links to `#products` only (no state passed to `Products`, per the Architecture note above).

- [ ] **Step 1: Write `components/Categories.tsx`**

```tsx
'use client';

import { categories } from '@/lib/data';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function Categories() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 bg-charcoal text-cream">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 md:px-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="uppercase tracking-[0.3em] text-sm text-gold mb-4 text-center">
          What We Offer
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Product Categories</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#products"
              className="group border border-cream/15 p-8 flex flex-col items-center text-center hover:border-rose hover:bg-cream/5 transition-colors"
            >
              <span className="text-3xl text-gold mb-4">{cat.icon}</span>
              <h3 className="font-serif text-lg mb-2">{cat.name}</h3>
              <p className="text-sm text-cream/60">{cat.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Categories.tsx
git commit -m "feat: add product categories section"
```

---

### Task 8: ProductCard, ProductModal, and Products Section

**Files:**
- Create: `components/ProductCard.tsx`, `components/ProductModal.tsx`, `components/Products.tsx`

**Interfaces:**
- Consumes: `products`, `categories`, `Product`, `Category` from `lib/data.ts`
- Produces:
  - `<ProductCard product={Product} onViewDetails={(p: Product) => void} />`
  - `<ProductModal product={Product | null} onClose={() => void} />`
  - `<Products />` — no props, owns filter (`activeCategory: Category | 'All'`) and modal (`selected: Product | null`) state internally.

- [ ] **Step 1: Write `components/ProductCard.tsx`**

```tsx
import type { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <div className="group bg-cream border border-charcoal/10 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className={`h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
        <span className="font-serif text-5xl text-charcoal/20 group-hover:text-charcoal/30 transition-colors">
          {product.brand.charAt(0)}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-wider text-rose mb-1">{product.category}</span>
        <h3 className="font-serif text-xl mb-1">{product.name}</h3>
        <p className="text-sm text-charcoal/60 mb-3">{product.brand}</p>
        <p className="text-sm text-charcoal/80 leading-relaxed mb-4 flex-1">{product.description}</p>
        <p className="text-xs text-gold font-medium mb-5">{product.benefit}</p>

        <button
          onClick={() => onViewDetails(product)}
          className="mt-auto self-start text-sm uppercase tracking-wider text-charcoal border-b border-charcoal/40 hover:border-rose hover:text-rose transition-colors pb-1"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/ProductModal.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import type { Product } from '@/lib/data';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-charcoal/60" onClick={onClose} />

      <div className="relative bg-cream max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className={`h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
          <span className="font-serif text-7xl text-charcoal/20">{product.brand.charAt(0)}</span>
        </div>

        <div className="p-8">
          <button
            ref={closeButtonRef}
            aria-label="Close product details"
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-charcoal bg-cream/90 w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream"
          >
            &times;
          </button>

          <span className="text-xs uppercase tracking-wider text-rose">{product.category}</span>
          <h2 id="product-modal-title" className="font-serif text-3xl mt-2 mb-1">
            {product.name}
          </h2>
          <p className="text-charcoal/60 mb-6">{product.brand}</p>
          <p className="text-charcoal/80 leading-relaxed mb-6">{product.description}</p>
          <p className="text-sm text-gold font-medium uppercase tracking-wider">Key Benefit</p>
          <p className="text-charcoal/90">{product.benefit}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `components/Products.tsx`**

```tsx
'use client';

import { useMemo, useState } from 'react';
import { categories, products, type Category, type Product } from '@/lib/data';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useScrollReveal } from '@/lib/useScrollReveal';

type Filter = Category | 'All';

export default function Products() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Product | null>(null);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const filtered = useMemo(
    () => (activeFilter === 'All' ? products : products.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );

  const filters: Filter[] = ['All', ...categories.map((c) => c.name)];

  return (
    <section id="products" className="py-24 md:py-32 bg-cream">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 md:px-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="uppercase tracking-[0.3em] text-sm text-rose mb-4 text-center">Our Collection</p>
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-10">Featured Products</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 text-sm uppercase tracking-wider border transition-colors ${
                activeFilter === f
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'border-charcoal/20 text-charcoal hover:border-rose hover:text-rose'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={setSelected} />
          ))}
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add components/ProductCard.tsx components/ProductModal.tsx components/Products.tsx
git commit -m "feat: add product grid with category filter and detail modal"
```

---

### Task 9: WhyChooseUs Section

**Files:**
- Create: `components/WhyChooseUs.tsx`

**Interfaces:**
- Consumes: `useScrollReveal` from `lib/useScrollReveal.ts`
- Produces: `<WhyChooseUs />` — no props.

- [ ] **Step 1: Write `components/WhyChooseUs.tsx`**

```tsx
'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';

const advantages = [
  { title: 'High-Quality Products', description: 'Every item meets rigorous quality standards before it reaches our catalog.' },
  { title: 'Authentic Products', description: '100% genuine products sourced directly from trusted, reputable brands.' },
  { title: 'Carefully Selected Brands', description: 'We partner only with brands that share our commitment to excellence.' },
  { title: 'Professional Customer Support', description: 'A knowledgeable team ready to guide customers and partners alike.' },
  { title: 'Reliable Distribution', description: 'Consistent, dependable delivery for businesses and individual customers.' },
];

export default function WhyChooseUs() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="why-us" className="py-24 md:py-32 bg-cream">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 md:px-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="uppercase tracking-[0.3em] text-sm text-rose mb-4 text-center">Why Numevi</p>
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Why Choose Us</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {advantages.map((adv, i) => (
            <div key={adv.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-rose/10 text-rose font-serif text-xl flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-serif text-lg mb-2">{adv.title}</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/WhyChooseUs.tsx
git commit -m "feat: add why-choose-us section"
```

---

### Task 10: Brands Section

**Files:**
- Create: `components/Brands.tsx`

**Interfaces:**
- Consumes: `brandPartners` from `lib/data.ts`
- Produces: `<Brands />` — no props.

- [ ] **Step 1: Write `components/Brands.tsx`**

```tsx
import { brandPartners } from '@/lib/data';

export default function Brands() {
  return (
    <section id="brands" className="py-20 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="uppercase tracking-[0.3em] text-sm text-gold mb-4 text-center">Trusted Partners</p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-14">Our Brands</h2>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
          {brandPartners.map((brand) => (
            <span
              key={brand}
              className="font-serif text-xl md:text-2xl text-cream/50 hover:text-cream transition-colors duration-300 cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Brands.tsx
git commit -m "feat: add brand partners section"
```

---

### Task 11: Testimonials Section

**Files:**
- Create: `components/Testimonials.tsx`

**Interfaces:**
- Consumes: `testimonials` from `lib/data.ts`, `useScrollReveal` from `lib/useScrollReveal.ts`
- Produces: `<Testimonials />` — no props.

- [ ] **Step 1: Write `components/Testimonials.tsx`**

```tsx
'use client';

import { testimonials } from '@/lib/data';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function Testimonials() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-cream">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 md:px-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="uppercase tracking-[0.3em] text-sm text-rose mb-4 text-center">Testimonials</p>
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">What People Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-white/60 border border-charcoal/10 p-8">
              <span className="font-serif text-5xl text-rose/40">&ldquo;</span>
              <blockquote className="text-charcoal/80 leading-relaxed -mt-4 mb-6">{t.quote}</blockquote>
              <figcaption>
                <p className="font-serif text-lg">{t.name}</p>
                <p className="text-sm text-charcoal/60">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: add testimonials section"
```

---

### Task 12: Contact Section

**Files:**
- Create: `components/Contact.tsx`

**Interfaces:**
- Consumes: `siteInfo` from `lib/data.ts`
- Produces: `<Contact />` — no props. Internal state: `{ name, email, phone, message }` form fields + `errors` map.

- [ ] **Step 1: Write `components/Contact.tsx`**

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { siteInfo } from '@/lib/data';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(state: FormState): FormErrors {
    const next: FormErrors = {};
    if (!state.name.trim()) next.name = 'Name is required.';
    if (!state.email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_RE.test(state.email)) next.email = 'Enter a valid email address.';
    if (!state.message.trim()) next.message = 'Message is required.';
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setSubmitted(false);
      return;
    }

    const subject = encodeURIComponent(`Business Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const inputClass =
    'w-full bg-transparent border-b border-charcoal/30 focus:border-rose outline-none py-3 text-charcoal placeholder:text-charcoal/40 transition-colors';

  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-gold mb-4">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Business Inquiries</h2>
          <p className="text-cream/70 leading-relaxed mb-10">
            Interested in becoming a distributor, partner, or simply want to learn more? Send us
            a message and our team will be in touch.
          </p>

          <div className="space-y-4 text-cream/80">
            <p><span className="text-gold">Email:</span> {siteInfo.email}</p>
            <p><span className="text-gold">Phone:</span> {siteInfo.phone}</p>
            <p><span className="text-gold">Address:</span> {siteInfo.address}</p>
          </div>

          <div className="flex gap-6 mt-8">
            {siteInfo.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm uppercase tracking-wider text-cream/70 hover:text-rose transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="bg-cream/5 p-8 md:p-10 border border-cream/10">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Name</label>
            <input id="name" type="text" className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <p className="text-rose text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Email</label>
            <input id="email" type="email" className={inputClass} value={form.email} onChange={(e) => update('email', e.target.value)} />
            {errors.email && <p className="text-rose text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Phone (optional)</label>
            <input id="phone" type="tel" className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Message</label>
            <textarea id="message" rows={4} className={inputClass} value={form.message} onChange={(e) => update('message', e.target.value)} />
            {errors.message && <p className="text-rose text-sm mt-1">{errors.message}</p>}
          </div>

          <button type="submit" className="w-full py-4 bg-rose text-cream uppercase tracking-wider font-medium hover:bg-rose/90 transition-colors">
            Send Inquiry
          </button>

          {submitted && (
            <p className="text-gold text-sm mt-4 text-center">Opening your email client to send this inquiry…</p>
          )}
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: add contact section with client-validated mailto form"
```

---

### Task 13: Footer

**Files:**
- Create: `components/Footer.tsx`

**Interfaces:**
- Consumes: `navLinks`, `categories`, `siteInfo` from `lib/data.ts`
- Produces: `<Footer />` — no props.

- [ ] **Step 1: Write `components/Footer.tsx`**

```tsx
import { navLinks, categories, siteInfo } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-serif text-2xl text-cream mb-3">{siteInfo.name}</p>
          <p className="text-sm leading-relaxed">
            Introducing premium, authentic beauty and personal care products with trust at
            every step.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm uppercase tracking-wider mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-rose transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.name}>
                <a href="#products" className="hover:text-rose transition-colors">{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>{siteInfo.email}</li>
            <li>{siteInfo.phone}</li>
            <li>{siteInfo.address}</li>
          </ul>
          <div className="flex gap-4 mt-4">
            {siteInfo.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm hover:text-rose transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-12 pt-6 border-t border-cream/10 text-xs text-cream/50">
        &copy; {year} {siteInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add footer"
```

---

### Task 14: Assemble Page + Full Verification Pass

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Header`, `Hero`, `About`, `Categories`, `Products`, `WhyChooseUs`, `Brands`, `Testimonials`, `Contact`, `Footer` (Tasks 4–13)
- Produces: final rendered `/` route.

- [ ] **Step 1: Write final `app/page.tsx`**

```tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import WhyChooseUs from '@/components/WhyChooseUs';
import Brands from '@/components/Brands';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-cream text-charcoal">
      <Header />
      <Hero />
      <About />
      <Categories />
      <Products />
      <WhyChooseUs />
      <Brands />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds with no TypeScript/build errors.

- [ ] **Step 3: Manual browser verification**

Run: `npm run dev`, open the preview tool at `http://localhost:3000`, and check:
- Desktop viewport: header stays sticky and gains shadow on scroll; all nav links smooth-scroll to their section; hero image loads (if 404, swap the Unsplash URL per Task 5's note); category filter buttons in Products correctly filter the grid; clicking "View Details" opens the modal with correct product data, closes on Esc/backdrop/× click, and does not scroll the page behind it; contact form shows inline errors when submitted empty, then triggers a `mailto:` link once valid; footer links all present.
- Tablet viewport (resize to ~768px): grids reflow to 2 columns, spacing remains balanced.
- Mobile viewport (resize to ~375px): hamburger menu opens the slide-in nav, closes on link click; all sections remain readable and usable single-column; buttons remain tappable size.
- Confirm `prefers-reduced-motion: reduce` (via browser devtools emulation) disables/shortens the scroll-reveal transitions.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full landing page"
```

---

## Self-Review Notes

- **Spec coverage:** Hero (Task 5), About (6), Categories (7), Featured Products with 10 real products + modal (8), Why Choose Us (9), Brands (10), Testimonials (11), Contact (12), Footer (13) all map to spec sections. No cart/checkout/payment/quantity UI anywhere (confirmed absent from every component). Responsive/sticky-nav/smooth-scroll/animations covered in Tasks 1, 3, 4, 14.
- **Placeholder scan:** all steps contain complete, runnable code; no TBD/TODO markers.
- **Type consistency:** `Product`, `Category`, `CategoryInfo`, `Testimonial` types defined once in Task 2 and consumed with matching field names throughout; `useScrollReveal` signature defined in Task 3 matches every call site in Tasks 6, 7, 8, 9, 11.
