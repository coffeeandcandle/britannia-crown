import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded 1200×630 share card used by every opengraph-image route.
const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function renderOg({ kicker, title, italic }: { kicker: string; title: string; italic?: string }) {
  const [serif, serifItalic, sans] = await Promise.all([
    font("CormorantGaramond-Medium.ttf"),
    font("CormorantGaramond-MediumItalic.ttf"),
    font("Jost-Medium.ttf"),
  ]);
  const titleSize = title.length + (italic?.length ?? 0) > 60 ? 66 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #4A0E29 0%, #38091f 100%)",
          color: "#ffffff",
          fontFamily: "Jost",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="54" height="44" viewBox="0 0 200 160">
            <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill="#E8C89C" />
            <rect x="15" y="120" width="170" height="26" fill="#E8C89C" rx="3" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Cormorant", fontSize: 30, letterSpacing: 4, color: "#E8C89C" }}>BRITANNIA CROWN</span>
            <span style={{ fontSize: 13, letterSpacing: 4, color: "rgba(232,200,156,0.6)" }}>EDUCATION CONSULTANTS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 20, letterSpacing: 6, color: "#E8C89C", textTransform: "uppercase", marginBottom: 22 }}>{kicker}</span>
          <span style={{ fontFamily: "Cormorant", fontSize: titleSize, lineHeight: 1.05, maxWidth: 1000 }}>{title}</span>
          {italic && (
            <span style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: titleSize, lineHeight: 1.05, color: "#E8C89C", maxWidth: 1000 }}>
              {italic}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(232,200,156,0.3)",
            paddingTop: 24,
            fontSize: 19,
            letterSpacing: 2,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span>UK-trained educators · Personally matched</span>
          <span>britanniacrown.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 500 },
        { name: "Cormorant", data: serifItalic, style: "italic", weight: 500 },
        { name: "Jost", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
