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
            <figure key={t.name} className="bg-cream/60 border border-charcoal/10 p-8">
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
