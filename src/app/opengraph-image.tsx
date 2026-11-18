import { ImageResponse } from "next/og";

// Generates the 1200×630 preview image shown when the site is shared
// (WhatsApp, Instagram DMs, Facebook, LinkedIn, iMessage…).
// It's built ONCE at build time and saved as a normal PNG.

export const alt = "Harris Stylist — fashion designer and stylist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      // ImageResponse understands a subset of CSS — flexbox only, inline styles.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F1",
          border: "18px solid #FAF7F1",
          outline: "2px solid #B08D4F",
          outlineOffset: "-40px",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 999,
            border: "2px solid #B08D4F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            color: "#1C1915",
          }}
        >
          H
        </div>
        <div style={{ marginTop: 40, fontSize: 84, letterSpacing: 28, color: "#1C1915", paddingLeft: 28 }}>HARRIS</div>
        <div style={{ marginTop: 18, fontSize: 22, letterSpacing: 12, color: "#B08D4F" }}>
          FASHION DESIGNER · STYLIST
        </div>
        <div style={{ marginTop: 44, width: 80, height: 2, background: "#B08D4F" }} />
        <div style={{ marginTop: 34, fontSize: 28, color: "#6F675C" }}>Couture · Ready-to-wear · By appointment</div>
      </div>
    ),
    size,
  );
}