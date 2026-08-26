import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Testimonies | Jesus House Birmingham (Unofficial Concept)",
};

export default function Testimonies() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-2xl mx-auto text-center">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Share Your Testimony</h1>
        <p className="font-body text-ink/80 mb-8">
          This concept build doesn&rsquo;t include real member testimonies — we won&rsquo;t
          invent quotes and attribute them to a real congregation. On the real site, this is
          where the community&rsquo;s own stories would go.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold"
        >
          Get in Touch to Share Yours
        </Link>
      </Reveal>
    </main>
  );
}
