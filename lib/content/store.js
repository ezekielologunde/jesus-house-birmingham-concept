// Demo product catalog for the Phase 4 store concept. Deliberately generic
// ("Concept ___") placeholder items with gradient swatches, not photos —
// this is a UI-only demo (no Stripe account, no real charge, nothing
// ships), so there's no real merchandise to depict.
export const storeProducts = [
  {
    id: "devotional-journal",
    name: "Concept Devotional Journal",
    priceCents: 1200,
    description: "A guided daily devotional journal.",
    swatch: "from-flame to-royal",
  },
  {
    id: "hoodie",
    name: "Concept Hoodie",
    priceCents: 3500,
    description: "Comfortable pullover hoodie.",
    swatch: "from-gold to-flame",
  },
  {
    id: "mug",
    name: "Concept Coffee Mug",
    priceCents: 1500,
    description: "Ceramic mug for Sunday mornings.",
    swatch: "from-royal to-midnight",
  },
  {
    id: "tote-bag",
    name: "Concept Tote Bag",
    priceCents: 1800,
    description: "Canvas tote bag.",
    swatch: "from-flame to-midnight",
  },
];

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
