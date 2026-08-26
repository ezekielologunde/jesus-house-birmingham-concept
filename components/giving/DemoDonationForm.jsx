"use client";

import { useState } from "react";

const PRESETS = [25, 50, 100];

// Simulates a Stripe test-mode donation checkout — no card fields (deliberately,
// so nothing here could be mistaken for a real payment form), no network call,
// no real money moves. Kept visually separate from the real giving methods
// above it on the Giving page.
export function DemoDonationForm() {
  const [amount, setAmount] = useState(PRESETS[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  function handleSubmit(event) {
    event.preventDefault();
    if (!effectiveAmount) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 400);
  }

  function reset() {
    setStatus("idle");
    setCustomAmount("");
    setAmount(PRESETS[0]);
  }

  if (status === "success") {
    return (
      <div className="bg-royal/5 border border-royal/20 rounded-lg p-5">
        <p role="status" className="font-body text-royal font-semibold mb-1">
          Demo donation of ${effectiveAmount} &ldquo;confirmed.&rdquo;
        </p>
        <p className="font-body text-sm text-ink/60 mb-4">
          This is a demo only — no real donation was processed and no money moved. To give for
          real, visit the church&rsquo;s official site.
        </p>
        <button type="button" onClick={reset} className="text-sm font-body text-royal underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-royal/5 border border-royal/20 rounded-lg p-5">
      <p className="font-body text-sm font-semibold mb-1">Try the Demo Giving Flow</p>
      <p className="font-body text-xs text-ink/50 mb-4">
        Not real — this simulates a Stripe test-mode checkout so you can see how online giving
        would work. No payment form, no real charge.
      </p>
      <form onSubmit={handleSubmit} method="dialog" noValidate className="flex flex-col gap-3">
        <div className="flex gap-2 flex-wrap items-center">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setAmount(preset);
                setCustomAmount("");
              }}
              className={
                amount === preset && !customAmount
                  ? "rounded-full bg-royal text-ivory px-4 py-2 text-sm font-body font-semibold"
                  : "rounded-full border border-ink/20 px-4 py-2 text-sm font-body font-semibold hover:border-ink/40 transition-colors duration-200"
              }
            >
              ${preset}
            </button>
          ))}
          <input
            type="number"
            min="1"
            placeholder="Custom"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            aria-label="Custom amount"
            className="w-24 border border-ink/20 rounded-full px-4 py-2 text-sm outline-none focus:border-ink/40"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting" || !effectiveAmount}
          className="self-start rounded-full bg-royal text-ivory px-5 py-2.5 text-sm font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200 disabled:opacity-60"
        >
          {status === "submitting" ? "Processing…" : `Simulate $${effectiveAmount || 0} Donation`}
        </button>
      </form>
    </div>
  );
}
