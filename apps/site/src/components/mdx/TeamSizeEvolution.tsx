"use client";

import { Users } from "lucide-react";

interface Era {
  period: string;
  teamSize: number;
  coordinationOverhead: number;
  timeToMarket: string;
  outputMultiplier: string;
  examples: string;
}

const eras: Era[] = [
  {
    period: "1990s",
    teamSize: 150,
    coordinationOverhead: 60,
    timeToMarket: "24 months",
    outputMultiplier: "1x",
    examples: "Traditional software companies",
  },
  {
    period: "2010s",
    teamSize: 50,
    coordinationOverhead: 40,
    timeToMarket: "12 months",
    outputMultiplier: "3x",
    examples: "Lean startups, agile teams",
  },
  {
    period: "2025",
    teamSize: 5,
    coordinationOverhead: 15,
    timeToMarket: "3 months",
    outputMultiplier: "15x",
    examples: "AI-augmented teams",
  },
  {
    period: "Future",
    teamSize: 1,
    coordinationOverhead: 5,
    timeToMarket: "1 month",
    outputMultiplier: "50x",
    examples: "Single-person companies",
  },
];

export default function TeamSizeEvolution() {
  return (
    <div data-mdx-component="TeamSizeEvolution" className="my-10 overflow-hidden rounded-xl border border-foreground/10 bg-background-alt/40">
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">
        <span>Team Size Evolution</span>
        <span>The Compression of Work</span>
      </div>

      <div className="p-6 space-y-6">
        {eras.map((era, idx) => (
          <div key={era.period} className="relative">
            {/* Timeline Connector */}
            {idx < eras.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-px bg-foreground/10 hidden sm:block" />
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Era Label */}
              <div className="flex items-center gap-3 sm:w-32 flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-purple-500 ring-4 ring-background-alt/40 relative z-10" />
                <div className="font-mono text-sm font-bold text-foreground">{era.period}</div>
              </div>

              {/* Content Card */}
              <div className="w-full sm:flex-1 rounded-xl border border-foreground/10 bg-background-alt/60 p-4 sm:p-5">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Team Size */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-foreground/60" />
                      <div className="text-xs font-mono uppercase text-foreground/60">
                        Team Size
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{era.teamSize}</div>
                    <div className="mt-2 flex gap-0.5">
                      {Array.from({ length: Math.min(era.teamSize, 20) }).map((_, i) => (
                        <div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-foreground/30"
                          style={{
                            opacity: 1 - (i / 20) * 0.5,
                          }}
                        />
                      ))}
                      {era.teamSize > 20 && (
                        <div className="text-xs text-foreground/40 ml-1">+{era.teamSize - 20}</div>
                      )}
                    </div>
                  </div>

                  {/* Coordination Overhead */}
                  <div>
                    <div className="text-xs font-mono uppercase text-foreground/60 mb-2">
                      Coordination
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {era.coordinationOverhead}%
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-foreground/10">
                      <div
                        className="h-full rounded-full bg-amber-500/60"
                        style={{ width: `${era.coordinationOverhead}%` }}
                      />
                    </div>
                  </div>

                  {/* Time to Market */}
                  <div>
                    <div className="text-xs font-mono uppercase text-foreground/60 mb-2">
                      Time to Market
                    </div>
                    <div className="text-2xl font-bold text-foreground">{era.timeToMarket}</div>
                  </div>

                  {/* Output Multiplier */}
                  <div>
                    <div className="text-xs font-mono uppercase text-foreground/60 mb-2">
                      Per-Person Output
                    </div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {era.outputMultiplier}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-foreground/10">
                  <div className="text-xs text-foreground/60">{era.examples}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-foreground/10 px-6 py-3 bg-background-alt/20">
        <p className="text-xs text-foreground/60">
          As AI absorbs execution overhead, teams shrink while output per person multiplies.
        </p>
      </div>
    </div>
  );
}
