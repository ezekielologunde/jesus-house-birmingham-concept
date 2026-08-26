import { ImageResponse } from "next/og";
import { siteInfo } from "@/lib/content/siteInfo";

export const alt = "Jesus House Birmingham — Unofficial Redesign Concept";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff6a00 0%, #a8380a 60%, #1c130a 100%)",
          color: "#fdf6ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            textAlign: "center",
            padding: "0 90px",
            lineHeight: 1.1,
          }}
        >
          {siteInfo.name}
        </div>
        <div style={{ fontSize: 34, marginTop: 26, opacity: 0.92 }}>{siteInfo.tagline}</div>
        <div
          style={{
            fontSize: 22,
            marginTop: 44,
            opacity: 0.7,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          Unofficial Redesign Concept
        </div>
      </div>
    ),
    { ...size }
  );
}
