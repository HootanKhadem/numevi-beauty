'use client';

import { useEffect, useState } from 'react';
import { navLinks, siteInfo } from '@/lib/data';
import MobileNav from './MobileNav';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-shadow duration-300 bg-cream/95 backdrop-blur ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl tracking-wide text-charcoal">
          {siteInfo.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wider text-charcoal hover:text-rose transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-0.5 bg-charcoal" />
          <span className="block w-6 h-0.5 bg-charcoal" />
          <span className="block w-6 h-0.5 bg-charcoal" />
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
