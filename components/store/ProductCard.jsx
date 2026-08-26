import { formatPrice } from "@/lib/content/store";

export function ProductCard({ product, quantityInCart, onAdd }) {
  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <div className={`aspect-square bg-gradient-to-br ${product.swatch}`} />
      <div className="flex flex-col grow p-4">
        <p className="font-body font-semibold">{product.name}</p>
        <p className="font-body text-sm text-ink/60 mb-3">{product.description}</p>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <p className="font-display text-lg text-royal">{formatPrice(product.priceCents)}</p>
          <button
            type="button"
            onClick={onAdd}
            className="rounded-full bg-royal text-ivory px-4 py-2 text-sm font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200"
          >
            {quantityInCart > 0 ? `Add another (${quantityInCart})` : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
