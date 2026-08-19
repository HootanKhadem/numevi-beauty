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
