# Numevi Beauty — Landing Page Design Spec

Date: 2026-08-19

## Purpose

Single-page marketing/brand website for a beauty and personal care products company. NOT an e-commerce site: no cart, checkout, payment, or purchasing flow anywhere. Goal: introduce the company, showcase product categories and 10 real named products (informational only), build trust with customers/distributors/partners, and drive contact/business inquiries.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS for styling
- No backend/database — all content is static typed data in `lib/data.ts`
- No automated test framework (static marketing page); verification is `npm run build` + manual cross-viewport browser check

## Brand Identity

- Name: **Numevi Beauty**, tagline "Beauty, Elevated."
- Palette: ivory/cream base `#FAF6F2`, charcoal text `#231F20`, rose/blush accent `#C98A93`, muted gold highlight `#B8956A`
- Typography: Playfair Display (serif, headlines) + Inter or Manrope (sans, body/UI), via Google Fonts
- Imagery: Unsplash stock photography for hero/about/category visuals (beauty/skincare themed, royalty-free). Product cards use elegant placeholder art (soft gradient + minimal category icon) rather than real branded product photography (not freely licensed) — product name/brand/category/description text stays factually accurate.

## Page Structure (single route `/`)

Sticky `Header` (logo, smooth-scroll nav links, mobile hamburger menu) →
`Hero` (full-bleed image, headline, subcopy, primary CTA "Explore Our Products" → #products, secondary CTA "About Our Company" → #about) →
`About` (intro, mission/values, image) →
`Categories` (Skincare, Haircare, Makeup, Personal Care, Beauty Accessories — icon cards, optionally filter Products) →
`Products` (grid of 10 `ProductCard`s; each has image, name, brand, category badge, short description, key benefit, "View Details" button opening `ProductModal`; optional client-side category filter) →
`WhyChooseUs` (4–5 advantage cards: High-Quality Products, Authentic Products, Carefully Selected Brands, Professional Customer Support, Reliable Distribution) →
`Brands` (partner/brand wordmark strip: CeraVe, La Roche-Posay, The Ordinary, COSRX, Bioderma, Maybelline, L'Oréal, NIVEA — grayscale-to-color hover) →
`Testimonials` (3 realistic customer/business testimonials on product quality/service) →
`Contact` (form: name, email, phone, message, "Send Inquiry" button; plus company email/phone/address/social links) →
`Footer` (logo, blurb, nav links, category links, contact info, social icons, copyright)

## Product Data

10 real, well-known beauty/personal care products with accurate names/brands and realistic (showcase-only, non-purchasable) descriptions, spanning the 5 categories. Brands drawn from real companies (e.g. CeraVe, La Roche-Posay, The Ordinary, COSRX, Bioderma, Maybelline, L'Oréal, NIVEA) — no invented brands/products.

## Interactivity

- Smooth scroll (CSS `scroll-behavior` + anchor links), sticky header with scroll shadow
- Mobile nav: slide-in/overlay, closes on link click
- Product category filter: client-side state, no reload
- Product modal: focus-trapped, closes on Esc/backdrop/click, body-scroll-lock while open
- Subtle scroll-reveal animations (CSS + IntersectionObserver), respecting `prefers-reduced-motion`

## Contact Form Behavior

Client-side only, no backend:
- Required fields: name, email (format-validated), message. Phone optional.
- Inline validation errors block submission until valid.
- On valid submit: builds a `mailto:` link (subject + body pre-filled from field values), opens it, shows a confirmation state ("opening your email client"). No network call.

## Explicit Restrictions

No shopping cart, checkout, online payment, order management, product purchasing, quantity selection, or any e-commerce functionality anywhere on the site. "View Details" is informational only.

## Verification Plan

1. `npm run build` — must succeed with no TypeScript/build errors
2. Manual browser check (desktop/tablet/mobile viewports): nav (sticky + mobile menu), smooth scroll, category filter, product modal open/close, contact form validation + mailto trigger, scroll animations, hover states
