interface EquationCardProps {
  label: string;
  equation: string;
  dotClass?: string;
  dotText: string;
}

export default function EquationCard({
  label,
  equation,
  dotClass = "bg-foreground/50",
  dotText
}: EquationCardProps) {
  return (
    <div className="flex flex-col rounded-3xl border border-foreground/12 bg-background-alt/50 p-6">
      <span className="text-[0.65rem] font-mono uppercase tracking-[0.14em] text-foreground/60">
        {label}
      </span>
      <span className="mt-4 inline-flex items-center rounded-2xl border border-foreground/15 bg-background-alt px-6 py-4 text-center font-mono text-base font-bold uppercase tracking-[0.08em] text-foreground">
        {equation}
      </span>
      <div className="mt-4 flex items-center gap-2 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-foreground/50">
        <span className={`inline-flex h-2 w-2 rounded-full ${dotClass}`}></span>
        <span>{dotText}</span>
      </div>
    </div>
  );
}
