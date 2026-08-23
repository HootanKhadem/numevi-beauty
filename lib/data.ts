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
    quote: 'Every order arrives exactly as described — authentic, well-packaged, and on time. Kimbeca has become our go-to distributor for the skincare lines our clients trust.',
    name: 'Amara Foster',
    role: 'Owner, The Glow Room Spa',
  },
  {
    quote: 'We evaluated several suppliers before partnering with Kimbeca. Their catalog quality and responsiveness put them well ahead of the rest.',
    name: 'Daniel Reyes',
    role: 'Buyer, Reyes Retail Group',
  },
  {
    quote: 'What stands out is the consistency. I know every product I discover through Kimbeca will be genuine and carefully vetted — that trust is hard to find.',
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
  name: 'Kimbeca',
  tagline: 'Beauty, Elevated.',
  email: 'hello@kimbeca.com',
  phone: '+1 (555) 019-2837',
  address: '148 Madison Avenue, Suite 700, New York, NY 10016',
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};
