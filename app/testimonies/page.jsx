import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { NumberedList } from "@/components/ui/NumberedList";

export const metadata = {
  title: "Testimonies | Jesus House Birmingham (Unofficial Concept)",
};

const HOW_IT_WOULD_WORK = [
  {
    id: "share",
    title: "Share",
    description:
      "Tell us what God has done in your life — in your own words, however big or small.",
  },
  {
    id: "review",
    title: "Review",
    description: "Every submission would be reviewed before anything is shared publicly.",
  },
  {
    id: "encourage",
    title: "Encourage Others",
    description:
      "With your permission, your story could be featured to encourage someone else.",
  },
];

export default function Testimonies() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-2xl mx-auto text-center">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Share Your Testimony</h1>
        <p className="font-body text-ink/80 mb-12 max-w-xl mx-auto">
          This concept build doesn&rsquo;t include real member testimonies — we won&rsquo;t
          invent quotes and attribute them to a real congregation. On the real site, this is
          where the community&rsquo;s own stories would go.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-4">
          How Sharing Would Work
        </h2>
        <div className="text-left mb-12">
          <NumberedList items={HOW_IT_WOULD_WORK} />
        </div>
      </Reveal>

      <Reveal delay={160}>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200"
        >
          Get in Touch to Share Yours
        </Link>
      </Reveal>
    </main>
  );
}
