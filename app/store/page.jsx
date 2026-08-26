import { Reveal } from "@/components/ui/Reveal";
import { StoreExperience } from "@/components/store/StoreExperience";
import { storeProducts } from "@/lib/content/store";

export const metadata = {
  title: "Store | Jesus House Birmingham (Unofficial Concept)",
  description: "Browse the demo store for this Jesus House Birmingham concept build — sample products only.",
};

export default function Store() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">Store</h1>
        <p className="font-body text-sm text-ink/60 mb-12">
          Demo store for this concept build — sample products only. Checkout is simulated; no
          real charge is ever made and nothing ships.
        </p>
      </Reveal>
      <StoreExperience products={storeProducts} />
    </main>
  );
}
