"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/store/ProductCard";
import { formatPrice } from "@/lib/content/store";

// UI-only demo store: cart and checkout are plain useState (no persistence,
// no localStorage) and "checkout" simulates a Stripe test-mode confirm with
// a timeout, same no-network pattern as lib/useConceptForm. There is no
// Stripe account behind this — a real store would need one, which this
// concept build isn't authorized to set up on the church's behalf.
export function StoreExperience({ products }) {
  const [cart, setCart] = useState({});
  const [checkoutStatus, setCheckoutStatus] = useState("idle"); // idle | reviewing | submitting | success

  function addToCart(productId) {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  }

  function removeFromCart(productId) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function confirmOrder() {
    setCheckoutStatus("submitting");
    setTimeout(() => setCheckoutStatus("success"), 400);
  }

  function startNewOrder() {
    setCart({});
    setCheckoutStatus("idle");
  }

  const cartItems = Object.entries(cart)
    .map(([productId, quantity]) => ({
      product: products.find((p) => p.id === productId),
      quantity,
    }))
    .filter((item) => item.product);

  const totalCents = cartItems.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (checkoutStatus === "success") {
    return (
      <div className="rounded-lg border border-ink/10 p-8 max-w-md text-center">
        <p role="status" className="font-display text-2xl tracking-tight mb-2">
          Demo Order Confirmed
        </p>
        <p className="font-body text-sm text-ink/70 mb-1">
          This is a concept build — no real charge was made and no product will ship.
        </p>
        <p className="font-body text-xs text-ink/50 mb-6">
          A real store would process this through Stripe; this demo simulates that step only.
        </p>
        <button
          type="button"
          onClick={startNewOrder}
          className="rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200"
        >
          Start a New Demo Order
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 60}>
            <ProductCard
              product={product}
              quantityInCart={cart[product.id] ?? 0}
              onAdd={() => addToCart(product.id)}
            />
          </Reveal>
        ))}
      </div>

      {cartItems.length > 0 ? (
        <div className="mt-12 rounded-lg border border-ink/10 p-5 max-w-md ml-auto">
          <p className="font-body text-sm font-semibold mb-4">Cart ({itemCount})</p>
          <ul className="flex flex-col gap-2 mb-4">
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center justify-between text-sm font-body">
                <span>
                  {product.name} × {quantity}
                </span>
                <span className="flex items-center gap-3">
                  <span>{formatPrice(product.priceCents * quantity)}</span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-flame hover:underline"
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between font-body font-semibold border-t border-ink/10 pt-3 mb-4">
            <span>Total</span>
            <span>{formatPrice(totalCents)}</span>
          </div>

          {checkoutStatus === "idle" ? (
            <button
              type="button"
              onClick={() => setCheckoutStatus("reviewing")}
              className="w-full rounded-full bg-royal text-ivory px-5 py-2.5 text-sm font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200"
            >
              Checkout
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="font-body text-xs text-ink/50">
                Confirming simulates a Stripe test-mode checkout — no real payment form, no real
                charge.
              </p>
              <button
                type="button"
                onClick={confirmOrder}
                disabled={checkoutStatus === "submitting"}
                className="rounded-full bg-royal text-ivory px-5 py-2.5 text-sm font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200 disabled:opacity-60"
              >
                {checkoutStatus === "submitting" ? "Processing…" : "Confirm Demo Order"}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
