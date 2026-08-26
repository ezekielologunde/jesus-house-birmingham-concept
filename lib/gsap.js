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
  const tick = (time) => {
    lenis.raf(time * 1000);
  };
  lenis.on("scroll", ST.update);
  g.ticker.add(tick);
  g.ticker.lagSmoothing(0);
  return () => {
    g.ticker.remove(tick);
  };
}
