"use client";

import { useState } from "react";
import { CornerFrame } from "@/components/ui/corner-frame";
import { HalftoneZone } from "@/components/ui/halftone-zone";

const services = [
  {
    number: "01",
    name: "10x Diagnostic",
    duration: "Half-day, on-site or remote",
    description: "I map your team\u2019s workflows and find where you\u2019re leaving 10x on the table. You leave with a ranked opportunity map: the three highest-leverage workflows to redesign, scored by effort and exponential payoff. No 50-page deck. Just clarity on where the multiplier is hiding.",
  },
  {
    number: "02",
    name: "Exponential Design Sprint",
    duration: "2 weeks",
    description: "We take the top opportunity and redesign the workflow from zero\u2014as if AI existed when you built it. End-to-end: how it works, what it replaces, how your team interacts with it, and what 10x actually looks like day-to-day. You go from \u2018we should use AI\u2019 to \u2018here\u2019s exactly how we 10x this.\u2019",
  },
  {
    number: "03",
    name: "Full Implementation",
    duration: "30\u201360 days, embedded",
    description: "I embed with your team and we build the exponential workflow together. Code, tools, training, iteration\u2014based on real usage, not theory. Your team learns the system as we ship it. By day 60, the workflow is live, your team owns it, and the compound gains are already stacking.",
  },
];

/* Coverage sizes: small → medium → large as you go up the value chain */
const coverageSizes = ["30%", "60%", "92%"];

function CoverageGrid({ size }: { size: string }) {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" fill="none" stroke="currentColor" strokeWidth={0.5}>
      {/* Background grid */}
      {Array.from({ length: 9 }, (_, i) => {
        const pos = 20 + i * 20;
        return (
          <g key={i} opacity={0.25}>
            <line x1={pos} y1="20" x2={pos} y2="180" />
            <line x1="20" y1={pos} x2="180" y2={pos} />
          </g>
        );
      })}
      {/* Center dot */}
      <circle cx="100" cy="100" r="2" fill="currentColor" stroke="none" opacity={0.4} />
      {/* Coverage rectangle — animated via CSS */}
      <rect
        x="100" y="100"
        width={size} height={size}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--color-accent-muted)"
        style={{
          transform: `translate(-${parseFloat(size) / 2}%, -${parseFloat(size) / 2}%)`,
          transformOrigin: "100px 100px",
          transition: "all 0.5s ease",
          /* We'll use actual pixel values below */
        }}
      />
    </svg>
  );
}

export function ServiceAccordion() {
  const [active, setActive] = useState(0);

  /* Convert percentage to pixel values within the 160px usable area (20-180 range) */
  const pct = parseFloat(coverageSizes[active]) / 100;
  const boxSize = 160 * pct;
  const offset = 100 - boxSize / 2;

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
      {/* Accordion */}
      <div style={{ backgroundColor: "var(--color-bg-card)", borderRadius: "2px", border: "1px solid var(--color-border)" }}>
        {services.map((s, i) => (
          <div
            key={s.name}
            style={{
              borderLeft: i === active ? "2px solid var(--color-accent)" : "2px solid transparent",
              borderBottom: i < services.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <button
              onClick={() => setActive(i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.25rem 1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text)",
                fontFamily: "inherit",
              }}
            >
              <span style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.8rem",
                  color: "var(--color-text-muted)",
                }}>{s.number}</span>
                <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>{s.name}</span>
              </span>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1rem",
                color: "var(--color-text-muted)",
              }}>
                {i === active ? "\u2212" : "+"}
              </span>
            </button>
            <div
              style={{
                maxHeight: i === active ? "400px" : "0",
                overflow: "hidden",
                opacity: i === active ? 1 : 0,
                transition: "max-height 0.3s ease, opacity 0.3s ease",
              }}
            >
              <div style={{ padding: "0 1.5rem 1.25rem" }}>
                <p style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--color-accent)",
                  marginBottom: "0.5rem",
                }}>
                  {s.duration}
                </p>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {s.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Illustration area — hidden on mobile */}
      <div className="hidden md:block" style={{ backgroundColor: "var(--color-bg-card)", borderRadius: "2px", border: "1px solid var(--color-border)" }}>
        <HalftoneZone className="h-full">
          <CornerFrame className="h-full">
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minHeight: "280px",
              color: "var(--color-text)",
            }}>
              <svg viewBox="0 0 200 200" width="200" height="200" fill="none" stroke="currentColor" strokeWidth={0.5}>
                {/* Background grid lines */}
                {Array.from({ length: 9 }, (_, i) => {
                  const pos = 20 + i * 20;
                  return (
                    <g key={i} opacity={0.2}>
                      <line x1={pos} y1="20" x2={pos} y2="180" />
                      <line x1="20" y1={pos} x2="180" y2={pos} />
                    </g>
                  );
                })}
                {/* Center dot */}
                <circle cx="100" cy="100" r="2.5" fill="currentColor" stroke="none" opacity={0.35} />
                {/* Expanding coverage rectangle */}
                <rect
                  x={offset}
                  y={offset}
                  width={boxSize}
                  height={boxSize}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="var(--color-accent-muted)"
                  style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                />
                {/* Crosshair lines through center */}
                <line x1="100" y1="20" x2="100" y2="180" strokeWidth="1" opacity={0.15} />
                <line x1="20" y1="100" x2="180" y2="100" strokeWidth="1" opacity={0.15} />
              </svg>
            </div>
          </CornerFrame>
        </HalftoneZone>
      </div>
    </div>
  );
}
