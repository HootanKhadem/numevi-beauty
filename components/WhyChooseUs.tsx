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
        <p className="uppercase tracking-[0.3em] text-sm text-rose mb-4 text-center">Why Kimbeca</p>
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
