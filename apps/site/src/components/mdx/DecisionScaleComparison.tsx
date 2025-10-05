export default function DecisionScaleComparison() {
  const decisionLoad = [
    { label: "Week 1", decisions: 50, quality: 90 },
    { label: "Week 2", decisions: 100, quality: 80 },
    { label: "Week 3", decisions: 150, quality: 65 },
    { label: "Week 4", decisions: 200, quality: 45 }
  ];

  const frameworkModel = [
    { label: "Week 1", frameworks: 2, output: 40 },
    { label: "Week 2", frameworks: 3, output: 70 },
    { label: "Week 3", frameworks: 5, output: 110 },
    { label: "Week 4", frameworks: 6, output: 150 }
  ];

  return (
    <div data-mdx-component="DecisionScaleComparison" className="my-10 overflow-hidden rounded-3xl border border-foreground/10 bg-background-alt/40">
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">
        <span>Scaling Model Comparison</span>
        <span>4-Week Timeline</span>
      </div>
      <div className="grid gap-6 px-6 py-6 lg:grid-cols-2">
        {/* Decision-Based Model */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-red-400/60"></span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/60">
              Decision-Based (Degrading)
            </span>
          </div>
          <div className="space-y-3">
            {decisionLoad.map((week, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-baseline justify-between font-mono text-xs text-foreground/70">
                  <span>{week.label}</span>
                  <span>{week.decisions} decisions/week</span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-400/70 to-red-400/40"
                    style={{ width: `${week.quality}%` }}
                  />
                </div>
                <div className="text-right font-mono text-[0.65rem] text-foreground/50">
                  Quality: {week.quality}%
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-foreground/5 px-4 py-3 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/60">
              End State
            </div>
            <div className="mt-1 font-mono text-sm font-bold text-red-400/80">
              Burnout & Inconsistency
            </div>
          </div>
        </div>

        {/* Framework-Based Model */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400/60"></span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/60">
              Framework-Based (Scaling)
            </span>
          </div>
          <div className="space-y-3">
            {frameworkModel.map((week, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-baseline justify-between font-mono text-xs text-foreground/70">
                  <span>{week.label}</span>
                  <span>{week.frameworks} frameworks</span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400/70 to-emerald-400/90"
                    style={{ width: `${Math.min(100, (week.output / 150) * 100)}%` }}
                  />
                </div>
                <div className="text-right font-mono text-[0.65rem] text-foreground/50">
                  Output: {week.output} units/week
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-foreground/5 px-4 py-3 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/60">
              End State
            </div>
            <div className="mt-1 font-mono text-sm font-bold text-emerald-400/80">
              Sustained High Output
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
