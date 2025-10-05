"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";

interface Quadrant {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  examples: string[];
  strategy: string;
  color: string;
  position: { x: number; y: number };
}

const quadrants: Quadrant[] = [
  {
    id: 1,
    title: "Personal Stability",
    subtitle: "Low Change, Affects Me",
    description: "The comfortable zone. Your world is relatively stable.",
    examples: [
      "Learning a new software tool",
      "Refining your workflow",
      "Updating a valuable skill",
      "Adapting to a new manager",
    ],
    strategy: "Optimize and refine",
    color: "bg-chart-5/10 dark:bg-chart-5/20 border-chart-5/30",
    position: { x: 0, y: 1 },
  },
  {
    id: 2,
    title: "Personal Disruption",
    subtitle: "Volatile Change, Affects Me",
    description:
      "Rapid changes hitting you directly, demanding immediate adaptation.",
    examples: [
      "Your role is being partially automated",
      "A key skill is suddenly obsolete",
      "New AI tools change how you work",
      "Your industry is in flux",
    ],
    strategy: "Adapt quickly, build resilience",
    color: "bg-chart-1/10 dark:bg-chart-1/20 border-chart-1/30",
    position: { x: 1, y: 1 },
  },
  {
    id: 3,
    title: "Systemic Stability",
    subtitle: "Low Change, Affects the System",
    description:
      "Established institutions and stable industries that affect everyone.",
    examples: [
      "Regulatory frameworks",
      "Professional certifications",
      "Stable economic models",
      "Institutional knowledge",
    ],
    strategy: "Play the long game",
    color: "bg-chart-2/10 dark:bg-chart-2/20 border-chart-2/30",
    position: { x: 0, y: 0 },
  },
  {
    id: 4,
    title: "Systemic Volatility",
    subtitle: "Volatile Change, Affects the System",
    description:
      "Rapid systemic shifts reshaping entire industries and economies.",
    examples: [
      "AI transforming job categories",
      "New economic models emerging",
      "Societal restructuring",
      "Industry rules being rewritten",
    ],
    strategy: "Think in ecosystems, shape the transition",
    color: "bg-destructive/10 dark:bg-destructive/20 border-destructive/30",
    position: { x: 1, y: 0 },
  },
];

export default function ChangeImpactMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<number | null>(null);
  const [hoveredQuadrant, setHoveredQuadrant] = useState<number | null>(null);

  const activeQuadrant = selectedQuadrant ?? hoveredQuadrant;

  return (
    <div className="my-12 space-y-6">
      <div className="relative w-full aspect-square max-w-3xl mx-auto">
        {/* Axis Labels */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-mono uppercase text-foreground/60 flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4" />
          Change: Volatile
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-mono uppercase text-foreground/60">
          Change: None
        </div>
        <div className="absolute top-1/2 -left-16 -translate-y-1/2 -rotate-90 text-sm font-mono uppercase text-foreground/60 whitespace-nowrap">
          Affects Me
        </div>
        <div className="absolute top-1/2 -right-25 -translate-y-1/2 -rotate-90 text-sm font-mono uppercase text-foreground/60 whitespace-nowrap">
          Affects the System
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
          {quadrants.map((quadrant) => {
            const isActive = activeQuadrant === quadrant.id;
            const isOtherActive =
              activeQuadrant !== null && activeQuadrant !== quadrant.id;

            return (
              <motion.button
                key={quadrant.id}
                className={`relative rounded-xl border-2 p-6 text-left transition-all ${quadrant.color} ${
                  isOtherActive ? "opacity-40" : "opacity-100"
                }`}
                style={{
                  gridColumn: quadrant.position.x + 1,
                  gridRow: 2 - quadrant.position.y,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredQuadrant(quadrant.id)}
                onMouseLeave={() => setHoveredQuadrant(null)}
                onClick={() =>
                  setSelectedQuadrant(
                    selectedQuadrant === quadrant.id ? null : quadrant.id
                  )
                }
                aria-label={`Quadrant ${quadrant.id}: ${quadrant.title}`}
              >
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-foreground/50">
                    Q{quadrant.id}
                  </div>
                  <h3 className="font-mono font-bold text-base uppercase tracking-wide text-foreground">
                    {quadrant.title}
                  </h3>
                  <p className="text-xs font-mono text-foreground/70">
                    {quadrant.subtitle}
                  </p>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 rounded-xl bg-background-alt border-2 border-foreground/20 p-4 z-10 overflow-auto"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-mono uppercase text-foreground/50 mb-1">
                            Q{quadrant.id}
                          </div>
                          <h3 className="font-mono font-bold text-sm uppercase text-foreground">
                            {quadrant.title}
                          </h3>
                        </div>
                        <Maximize2 className="w-4 h-4 text-foreground/50" />
                      </div>
                      <p className="text-xs leading-relaxed text-foreground/80">
                        {quadrant.description}
                      </p>
                      <div className="pt-2 border-t border-foreground/10">
                        <div className="text-xs font-mono uppercase text-foreground/60 mb-2">
                          Examples:
                        </div>
                        <ul className="space-y-1.5">
                          {quadrant.examples.map((example, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-foreground/70 flex items-start gap-2"
                            >
                              <span className="text-foreground/40 mt-0.5">
                                •
                              </span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t border-foreground/10">
                        <div className="text-xs font-mono uppercase text-foreground/60 mb-1">
                          Strategy:
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {quadrant.strategy}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Center Crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-full h-px bg-foreground/10" />
          <div className="absolute w-px h-full bg-foreground/10" />
        </div>
      </div>

      <p className="text-sm text-center text-foreground/60 font-mono">
        Click or hover on any quadrant to explore examples and strategies
      </p>
    </div>
  );
}
