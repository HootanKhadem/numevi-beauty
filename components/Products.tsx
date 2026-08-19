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
