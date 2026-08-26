import { MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { siteInfo } from "@/lib/content/siteInfo";

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteInfo.address)}`;

export function DirectionsSpotlight() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-royal via-royal to-midnight px-6 py-20">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-flame/20 blur-3xl pointer-events-none"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="font-body text-xs font-bold tracking-[0.25em] uppercase text-gold">
            Join Us This Sunday
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-ivory mt-3 mb-6">
            We&rsquo;d Love to Have You
          </h2>
          <div className="flex flex-col items-center gap-2 mb-8">
            <p className="flex items-center gap-2 font-body text-ivory/80">
              <MapPin size={16} strokeWidth={2} aria-hidden />
              {siteInfo.address}
            </p>
            <a
              href={`tel:+1${siteInfo.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 font-body text-ivory/80 hover:text-ivory transition-colors duration-200"
            >
              <Phone size={16} strokeWidth={2} aria-hidden />
              {siteInfo.phone}
            </a>
          </div>
          <Magnetic strength={0.35}>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ivory text-royal font-body font-bold px-7 py-3.5 rounded-full shadow-cta hover:shadow-cta-hover transition-shadow duration-200"
            >
              Get Directions
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
