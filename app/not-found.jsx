import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">This page doesn&rsquo;t exist</h1>
      <p className="font-body text-ink/70 mb-8">
        Let&rsquo;s get you back to somewhere real.
      </p>
      <Link href="/" className="rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold">
        Back to Home
      </Link>
    </main>
  );
}
