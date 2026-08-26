"use client";

export default function Error({ reset }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
        Something went wrong
      </h1>
      <p className="font-body text-ink/70 mb-8 max-w-md">
        This is a concept build — an error here doesn&rsquo;t affect anything real. Try
        again, or head back home.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200"
        >
          Try Again
        </button>
        <a
          href="/"
          className="rounded-full border border-ink/20 text-ink px-6 py-3 font-body font-semibold hover:border-ink/40 transition-colors duration-200"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
