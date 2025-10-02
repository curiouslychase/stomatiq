"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, TrendingUp } from "lucide-react";

interface MovementPath {
  from: { x: number; y: number; label: string };
  to: { x: number; y: number; label: string };
  example: string;
  color: string;
}

const movements: MovementPath[] = [
  {
    from: { x: 25, y: 75, label: "Personal Stability" },
    to: { x: 75, y: 75, label: "Personal Disruption" },
    example: "Your stable workflow → rapid AI tool changes",
    color: "stroke-chart-5",
  },
  {
    from: { x: 25, y: 25, label: "Systemic Stability" },
    to: { x: 75, y: 25, label: "Systemic Volatility" },
    example: "Stable industry norms → AI-driven transformation",
    color: "stroke-chart-2",
  },
  {
    from: { x: 25, y: 75, label: "Personal Stability" },
    to: { x: 25, y: 25, label: "Systemic Stability" },
    example: "Personal skill → industry-wide standard",
    color: "stroke-chart-1",
  },
];

export default function QuadrantMovement() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const controls = useAnimationControls();

  const playAnimation = async () => {
    setIsPlaying(true);
    await controls.start({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    });
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    controls.set({ pathLength: 0, opacity: 0.3 });
    setIsPlaying(false);
  };

  useEffect(() => {
    resetAnimation();
  }, []);

  return (
    <div className="my-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-sm font-mono uppercase text-foreground/60 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10">
          <TrendingUp className="w-4 h-4" />
          The Meta-Pattern: Moving Up and Right
        </div>
      </div>

      <div className="relative w-full aspect-square max-w-2xl mx-auto bg-background-alt/40 rounded-2xl border border-foreground/10 p-8">
        {/* Quadrant Grid */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          aria-label="Quadrant movement visualization"
        >
          {/* Grid Lines */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />

          {/* Quadrant Backgrounds */}
          <rect x="0" y="50" width="50" height="50" className="fill-chart-5/5" />
          <rect x="50" y="50" width="50" height="50" className="fill-chart-1/5" />
          <rect x="0" y="0" width="50" height="50" className="fill-chart-2/5" />
          <rect x="50" y="0" width="50" height="50" className="fill-destructive/5" />

          {/* Quadrant Labels */}
          <text x="25" y="85" textAnchor="middle" className="fill-foreground/40 text-[3px] font-mono uppercase">
            Q1
          </text>
          <text x="75" y="85" textAnchor="middle" className="fill-foreground/40 text-[3px] font-mono uppercase">
            Q2
          </text>
          <text x="25" y="15" textAnchor="middle" className="fill-foreground/40 text-[3px] font-mono uppercase">
            Q3
          </text>
          <text x="75" y="15" textAnchor="middle" className="fill-foreground/40 text-[3px] font-mono uppercase">
            Q4
          </text>

          {/* Movement Arrows - The "Up and Right" Pattern */}
          {movements.map((movement, idx) => {
            const isSelected = selectedPath === idx;
            const isOtherSelected = selectedPath !== null && selectedPath !== idx;

            return (
              <g key={idx}>
                {/* Arrow Path */}
                <defs>
                  <marker
                    id={`arrowhead-${idx}`}
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3, 0 6"
                      className={movement.color.replace("stroke", "fill")}
                      opacity={isOtherSelected ? 0.2 : 1}
                    />
                  </marker>
                </defs>

                <motion.path
                  d={`M ${movement.from.x} ${movement.from.y} L ${movement.to.x} ${movement.to.y}`}
                  className={movement.color}
                  strokeWidth={isSelected ? "1.5" : "1"}
                  fill="none"
                  strokeDasharray="3,2"
                  markerEnd={`url(#arrowhead-${idx})`}
                  animate={controls}
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  opacity={isOtherSelected ? 0.2 : 1}
                />

                {/* Interactive Hit Area */}
                <path
                  d={`M ${movement.from.x} ${movement.from.y} L ${movement.to.x} ${movement.to.y}`}
                  stroke="transparent"
                  strokeWidth="8"
                  fill="none"
                  className="cursor-pointer"
                  onMouseEnter={() => setSelectedPath(idx)}
                  onMouseLeave={() => setSelectedPath(null)}
                />
              </g>
            );
          })}

          {/* Diagonal "Up and Right" Arrow */}
          <defs>
            <marker
              id="main-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="10"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 12 4, 0 8" className="fill-accent" />
            </marker>
          </defs>
          <motion.path
            d="M 15 85 L 85 15"
            className="stroke-accent"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,4"
            markerEnd="url(#main-arrow)"
            animate={controls}
            initial={{ pathLength: 0, opacity: 0.5 }}
          />
        </svg>

        {/* Axis Labels */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase text-foreground/60">
          Systemic Impact
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase text-foreground/60">
          Personal Impact
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono uppercase text-foreground/60">
          None
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono uppercase text-foreground/60">
          Volatile
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={isPlaying ? () => {} : playAnimation}
          disabled={isPlaying}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-mono text-sm uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPlaying ? "Playing animation" : "Play animation"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Playing
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Play
            </>
          )}
        </button>
        <button
          onClick={resetAnimation}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/10 text-foreground font-mono text-sm uppercase hover:bg-foreground/20 transition-colors"
          aria-label="Reset animation"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Selected Path Info */}
      {selectedPath !== null && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto p-4 rounded-lg bg-foreground/5 border border-foreground/10"
        >
          <p className="text-sm text-foreground/80 text-center">
            <span className="font-semibold">{movements[selectedPath].example}</span>
          </p>
        </motion.div>
      )}

      <p className="text-xs text-center text-foreground/60 font-mono max-w-lg mx-auto">
        AI is systematically pushing situations toward higher volatility (right) and broader impact (up).
        Hover over arrows to see specific transitions. Click play to animate the pattern.
      </p>
    </div>
  );
}
