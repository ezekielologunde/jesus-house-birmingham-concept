"use client";

import { useEffect, useState } from "react";
import { brandVariants } from "@/lib/content/branding";

// Module-level, not component state: every <BrandMark>-style consumer on the
// page (desktop header, mobile menu, footer) mounts in the same commit, so
// whichever one's effect runs first picks the variant and the rest read that
// same cached pick — keeping the logo/name consistent across one page view
// instead of each surface rotating independently. Resets on a fresh page load.
let cachedIndex = null;

export function useBrandVariant() {
  // Index 0 (the RCCG seal) is what server-rendered/no-JS output shows —
  // matching that on first client render avoids a hydration mismatch; the
  // effect below then swaps in the picked variant post-mount.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (cachedIndex === null) {
      cachedIndex = Math.floor(Math.random() * brandVariants.length);
    }
    setIndex(cachedIndex);
  }, []);

  return brandVariants[index];
}
