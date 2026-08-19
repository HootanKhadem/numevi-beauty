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
