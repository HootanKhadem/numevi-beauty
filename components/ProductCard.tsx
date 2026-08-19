import type { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <div className="group bg-cream border border-charcoal/10 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className={`h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
        <span className="font-serif text-5xl text-charcoal/20 group-hover:text-charcoal/30 transition-colors">
          {product.brand.charAt(0)}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-wider text-rose mb-1">{product.category}</span>
        <h3 className="font-serif text-xl mb-1">{product.name}</h3>
        <p className="text-sm text-charcoal/60 mb-3">{product.brand}</p>
        <p className="text-sm text-charcoal/80 leading-relaxed mb-4 flex-1">{product.description}</p>
        <p className="text-xs text-gold font-medium mb-5">{product.benefit}</p>

        <button
          onClick={() => onViewDetails(product)}
          className="mt-auto self-start text-sm uppercase tracking-wider text-charcoal border-b border-charcoal/40 hover:border-rose hover:text-rose transition-colors pb-1"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
