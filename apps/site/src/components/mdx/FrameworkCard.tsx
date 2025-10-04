interface FrameworkCardProps {
  title: string;
  decision: string;
  oldWay: string;
  frameworkWay: string;
  children?: React.ReactNode;
}

export default function FrameworkCard({
  title,
  decision,
  oldWay,
  frameworkWay,
  children
}: FrameworkCardProps) {
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-foreground/10 bg-background-alt/40">
      <div className="border-b border-foreground/10 px-6 py-4">
        <h4 className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-foreground">
          {title}
        </h4>
      </div>
      <div className="space-y-6 px-6 py-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-foreground/40"></span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/60">
              The Decision
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">{decision}</p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-red-400/60"></span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/60">
              The Old Way
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/70">{oldWay}</p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400/60"></span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/60">
              The Framework Way
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">{frameworkWay}</p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}
