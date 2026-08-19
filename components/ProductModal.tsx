'use client';

import { useEffect, useRef } from 'react';
import type { Product } from '@/lib/data';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-charcoal/60" onClick={onClose} />

      <div className="relative bg-cream max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className={`h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
          <span className="font-serif text-7xl text-charcoal/20">{product.brand.charAt(0)}</span>
        </div>

        <div className="p-8">
          <button
            ref={closeButtonRef}
            aria-label="Close product details"
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-charcoal bg-cream/90 w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream"
          >
            &times;
          </button>

          <span className="text-xs uppercase tracking-wider text-rose">{product.category}</span>
          <h2 id="product-modal-title" className="font-serif text-3xl mt-2 mb-1">
            {product.name}
          </h2>
          <p className="text-charcoal/60 mb-6">{product.brand}</p>
          <p className="text-charcoal/80 leading-relaxed mb-6">{product.description}</p>
          <p className="text-sm text-gold font-medium uppercase tracking-wider">Key Benefit</p>
          <p className="text-charcoal/90">{product.benefit}</p>
        </div>
      </div>
    </div>
  );
}
