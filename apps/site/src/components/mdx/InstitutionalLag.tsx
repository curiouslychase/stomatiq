"use client";

import { useState } from "react";

interface Institution {
  name: string;
  adaptation: number;
  lagYears: string;
  example: string;
}

const institutions: Institution[] = [
  {
    name: "AI Capability",
    adaptation: 95,
    lagYears: "Current",
    example: "Models can generate code, design, and content at production quality",
  },
  {
    name: "Market Pricing",
    adaptation: 60,
    lagYears: "~2 years behind",
    example: "Some VCs value lean teams, but most still focus on headcount growth",
  },
  {
    name: "Education System",
    adaptation: 35,
    lagYears: "~5 years behind",
    example: "Curricula still teach collaboration for large teams, not AI orchestration",
  },
  {
    name: "Regulatory Framework",
    adaptation: 15,
    lagYears: "~8 years behind",
    example: "Employment law assumes traditional employer-employee relationships",
  },
  {
    name: "Tax Code",
    adaptation: 10,
    lagYears: "~10 years behind",
    example: "Tax structures optimized for W2 payroll, not lean solo builders",
  },
];

export default function InstitutionalLag() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div data-mdx-component="InstitutionalLag" className="my-10 overflow-hidden rounded-xl border border-foreground/10 bg-background-alt/40">
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">
        <span>Institutional Adaptation Gap</span>
        <span>Technology vs Society</span>
      </div>

      <div className="p-6 space-y-4">
        {institutions.map((institution, idx) => {
          const isHovered = hoveredIndex === idx;
          const barColor =
            institution.adaptation >= 70
              ? "bg-emerald-500/80"
              : institution.adaptation >= 40
              ? "bg-amber-500/80"
              : "bg-red-500/80";

          return (
            <div
              key={institution.name}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <div className="font-mono text-sm font-semibold text-foreground">
                    {institution.name}
                  </div>
                  <div className="font-mono text-xs text-foreground/50">{institution.lagYears}</div>
                </div>
                <div className="font-mono text-lg font-bold text-foreground">
                  {institution.adaptation}%
                </div>
              </div>

              <div className="relative h-3 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                  style={{ width: `${institution.adaptation}%` }}
                />
              </div>

              {isHovered && (
                <div className="absolute left-0 right-0 mt-2 p-3 rounded-lg bg-background-alt border border-foreground/20 shadow-lg z-10">
                  <div className="text-xs text-foreground/80">{institution.example}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-foreground/10 px-6 py-3 bg-background-alt/20">
        <p className="text-xs text-foreground/60">
          Hover over each bar to see specific examples of how institutions lag behind AI capability.
        </p>
      </div>
    </div>
  );
}
