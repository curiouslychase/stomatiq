"use client";

import { Users, Lightbulb, Shield, Heart } from "lucide-react";

interface TradeoffItem {
  category: string;
  icon: React.ReactNode;
  traditional: string;
  leanChallenge: string;
  leanSolution: string;
}

const tradeoffs: TradeoffItem[] = [
  {
    category: "Mentorship",
    icon: <Users className="w-5 h-5" />,
    traditional: "Organic apprenticeship",
    leanChallenge: "Fewer learning opportunities",
    leanSolution: "Intentional communities & open source",
  },
  {
    category: "Serendipity",
    icon: <Lightbulb className="w-5 h-5" />,
    traditional: "Water cooler moments",
    leanChallenge: "No accidental innovations",
    leanSolution: "Demo days & work-in-progress sharing",
  },
  {
    category: "Accountability",
    icon: <Shield className="w-5 h-5" />,
    traditional: "Team pushback",
    leanChallenge: "Echo chamber risk",
    leanSolution: "Trusted advisor networks",
  },
  {
    category: "Purpose",
    icon: <Heart className="w-5 h-5" />,
    traditional: "Shared struggle",
    leanChallenge: "Existential isolation",
    leanSolution: "Build in public, peer communities",
  },
];

export default function TradeoffMatrix() {
  return (
    <div data-mdx-component="TradeoffMatrix" className="my-10 overflow-hidden rounded-xl border border-foreground/10 bg-background-alt/40">
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">
        <span>Tradeoff Analysis</span>
        <span>Traditional vs Lean Teams</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-px bg-foreground/5 border-b border-foreground/10">
            <div className="bg-background-alt/40 px-4 py-3">
              <div className="font-mono text-xs uppercase tracking-wide text-foreground/60">
                Dimension
              </div>
            </div>
            <div className="bg-background-alt/40 px-4 py-3">
              <div className="font-mono text-xs uppercase tracking-wide text-emerald-600/80 dark:text-emerald-400/80">
                Traditional Teams
              </div>
            </div>
            <div className="bg-background-alt/40 px-4 py-3">
              <div className="font-mono text-xs uppercase tracking-wide text-amber-600/80 dark:text-amber-400/80">
                Lean Challenge
              </div>
            </div>
            <div className="bg-background-alt/40 px-4 py-3">
              <div className="font-mono text-xs uppercase tracking-wide text-purple-600/80 dark:text-purple-400/80">
                Lean Solution
              </div>
            </div>
          </div>

          {/* Data Rows */}
          {tradeoffs.map((item, idx) => (
            <div
              key={item.category}
              className={`grid grid-cols-4 gap-px bg-foreground/5 ${
                idx === tradeoffs.length - 1 ? "" : "border-b border-foreground/5"
              }`}
            >
              <div className="bg-background-alt/40 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="text-foreground/60">{item.icon}</div>
                  <div className="font-mono text-sm font-semibold text-foreground">
                    {item.category}
                  </div>
                </div>
              </div>
              <div className="bg-emerald-500/5 dark:bg-emerald-500/10 px-4 py-4">
                <div className="text-sm text-foreground/80">{item.traditional}</div>
              </div>
              <div className="bg-amber-500/5 dark:bg-amber-500/10 px-4 py-4">
                <div className="text-sm text-foreground/80">{item.leanChallenge}</div>
              </div>
              <div className="bg-purple-500/5 dark:bg-purple-500/10 px-4 py-4">
                <div className="text-sm text-foreground/80">{item.leanSolution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-foreground/10 px-6 py-3 bg-background-alt/20">
        <p className="text-xs text-foreground/60">
          Lean teams face real challenges but can preserve what matters through intentional design.
        </p>
      </div>
    </div>
  );
}
