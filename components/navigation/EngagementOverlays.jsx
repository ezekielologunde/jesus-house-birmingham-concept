"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { PrayerPrompt } from "@/components/navigation/PrayerPrompt";

export function EngagementOverlays() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <AnnouncementBar />
      <PrayerPrompt />
    </>
  );
}
