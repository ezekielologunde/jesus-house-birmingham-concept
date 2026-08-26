import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function syncScrollTriggerWithLenis(lenis) {
  const { ScrollTrigger: ST, gsap: g } = getGsap();
  lenis.on("scroll", ST.update);
  g.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  g.ticker.lagSmoothing(0);
}
