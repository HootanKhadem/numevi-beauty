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
