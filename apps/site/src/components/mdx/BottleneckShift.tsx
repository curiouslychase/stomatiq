"use client";

import { useState } from "react";
import { User, Users } from "lucide-react";

export default function BottleneckShift() {
  const [teamSize, setTeamSize] = useState(8);

  // Calculate complexity
  const traditionalComplexity = (teamSize * (teamSize - 1)) / 2; // n(n-1)/2 connections
  const aiAugmentedComplexity = teamSize; // linear connections

  return (
    <div data-mdx-component="BottleneckShift" className="my-10 overflow-hidden rounded-xl border border-foreground/10 bg-background-alt/40">
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">
        <span>The Bottleneck Shift</span>
        <span>Coordination → Orchestration</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Slider Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-mono text-foreground/70">Team Size</label>
            <span className="font-mono text-lg font-bold text-foreground">{teamSize}</span>
          </div>
          <input
            type="range"
            min="2"
            max="15"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full h-2 rounded-full bg-foreground/10 appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Comparison Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Traditional Teams */}
          <div className="rounded-xl border border-foreground/10 bg-background-alt/60 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div className="font-mono text-sm font-bold uppercase text-foreground">
                Traditional Teams
              </div>
            </div>

            {/* Network Visualization */}
            <div className="relative h-40 rounded-lg bg-foreground/5 mb-4 flex items-center justify-center overflow-hidden">
              {/* Messy network of connections */}
              <svg className="absolute inset-0 w-full h-full">
                {Array.from({ length: teamSize }).map((_, i) =>
                  Array.from({ length: teamSize }).map((_, j) => {
                    if (i >= j) return null;
                    const x1 = ((i + 1) / (teamSize + 1)) * 100;
                    const y1 = 50 + Math.sin(i * 0.8) * 30;
                    const x2 = ((j + 1) / (teamSize + 1)) * 100;
                    const y2 = 50 + Math.sin(j * 0.8) * 30;
                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="currentColor"
                        className="text-amber-500/20"
                        strokeWidth="1"
                      />
                    );
                  })
                )}
              </svg>
              <div className="relative z-10 flex gap-1 items-center justify-center flex-wrap max-w-[90%]">
                {Array.from({ length: teamSize }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full bg-amber-500/60 flex items-center justify-center"
                  >
                    <User className="w-3 h-3 text-white" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">Connections</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  {traditionalComplexity}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">Complexity</span>
                <span className="font-mono font-bold text-foreground">O(n²)</span>
              </div>
              <div className="mt-3 pt-3 border-t border-foreground/10">
                <p className="text-xs text-foreground/60">
                  Every person must coordinate with every other person. Complexity grows exponentially.
                </p>
              </div>
            </div>
          </div>

          {/* AI-Augmented */}
          <div className="rounded-xl border border-foreground/10 bg-background-alt/60 p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div className="font-mono text-sm font-bold uppercase text-foreground">
                AI-Augmented
              </div>
            </div>

            {/* Hub and Spoke Visualization */}
            <div className="relative h-40 rounded-lg bg-foreground/5 mb-4 flex items-center justify-center overflow-hidden">
              {/* Clean hub-and-spoke */}
              <svg className="absolute inset-0 w-full h-full">
                {Array.from({ length: teamSize }).map((_, i) => {
                  const angle = (i / teamSize) * 2 * Math.PI - Math.PI / 2;
                  const radius = 35;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="currentColor"
                      className="text-emerald-500/30"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
              {/* Central human */}
              <div className="absolute h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center z-10">
                <User className="w-5 h-5 text-white" />
              </div>
              {/* AI collaborators in a circle */}
              {Array.from({ length: teamSize }).map((_, i) => {
                const angle = (i / teamSize) * 2 * Math.PI - Math.PI / 2;
                const radius = 35;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <div
                    key={i}
                    className="absolute h-5 w-5 rounded-full bg-emerald-500/40 flex items-center justify-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-300" />
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">Connections</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {aiAugmentedComplexity}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">Complexity</span>
                <span className="font-mono font-bold text-foreground">O(n)</span>
              </div>
              <div className="mt-3 pt-3 border-t border-foreground/10">
                <p className="text-xs text-foreground/60">
                  One person orchestrates AI collaborators. Complexity stays linear.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complexity Comparison */}
        <div className="rounded-xl border border-foreground/10 bg-purple-500/5 dark:bg-purple-500/10 p-4">
          <div className="text-xs font-mono uppercase text-foreground/60 mb-2">
            Efficiency Advantage
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {traditionalComplexity > 0
                ? `${(traditionalComplexity / aiAugmentedComplexity).toFixed(1)}x`
                : "—"}
            </span>
            <span className="text-sm text-foreground/70">
              fewer coordination points with AI orchestration
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/10 px-6 py-3 bg-background-alt/20">
        <p className="text-xs text-foreground/60">
          Adjust team size to see how coordination complexity grows quadratically while orchestration stays linear.
        </p>
      </div>
    </div>
  );
}
