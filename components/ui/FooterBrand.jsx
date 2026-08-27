"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { useBrandVariant } from "@/lib/useBrandVariant";

export function FooterBrand() {
  const brand = useBrandVariant();
  return (
    <>
      <BrandLogo logo={brand.logo} className="w-9 h-9 mb-3" />
      <p className="font-body text-xs leading-tight tracking-[0.04em] text-gold uppercase mb-1 max-w-[14rem]">
        {brand.motto}
      </p>
      <p className="font-display text-lg mb-2">{brand.name}</p>
    </>
  );
}
