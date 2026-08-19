'use client';

import { navLinks } from '@/lib/data';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-charcoal/40" onClick={onClose} />
      <nav
        className={`absolute right-0 top-0 h-full w-72 bg-cream shadow-xl p-8 flex flex-col gap-6 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button aria-label="Close menu" onClick={onClose} className="self-end text-2xl text-charcoal">
          &times;
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-serif text-xl text-charcoal hover:text-rose transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
