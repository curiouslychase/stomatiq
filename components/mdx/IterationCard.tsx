interface IterationCardProps {
  label: string;
  title: string;
  value: string;
  barWidth?: string;
  barClass?: string;
  description: string;
  badgeClass?: string;
}

export default function IterationCard({
  label,
  title,
  value,
  barWidth = "100%",
  barClass = "bg-foreground",
  description,
  badgeClass = "text-foreground/50"
}: IterationCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-foreground/8 bg-background-alt/70 p-5">
      <span className={`text-[0.7rem] font-mono uppercase tracking-[0.14em] ${badgeClass}`}>
        {label}
      </span>
      <div className="mt-4 flex items-baseline justify-between font-mono text-sm uppercase tracking-[0.08em] text-foreground">
        <span>{title}</span>
        <span className="text-lg font-bold">{value}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-foreground/10">
        <div className={`h-full rounded-full ${barClass}`} style={{ width: barWidth }}></div>
      </div>
      <p className="mt-4 text-xs leading-5 text-foreground/60">{description}</p>
    </div>
  );
}
