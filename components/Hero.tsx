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
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 text-cream">
        <p className="uppercase tracking-[0.3em] text-sm mb-4 text-cream/80">{siteInfo.tagline}</p>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-3xl">
          Where Beauty Meets Trust
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream/90">
          Kimbeca introduces the world&apos;s most trusted skincare, haircare, and
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
