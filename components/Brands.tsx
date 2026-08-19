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
