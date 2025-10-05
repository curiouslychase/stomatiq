interface LawCardProps {
  index: string;
  year: string;
  title: string;
  description: string;
}

export default function LawCard({
  index,
  year,
  title,
  description,
}: LawCardProps) {
  return (
    <div data-mdx-component="LawCard" className="group relative overflow-hidden rounded-2xl border border-foreground/12 bg-background-alt/60 shadow-sm p-6">
      <div className="flex items-center justify-between text-xs font-mono uppercase text-foreground/60">
        <span>Law {index}</span>
        <span>{year}</span>
      </div>
      <div className="mt-4 text-base font-semibold font-mono uppercase tracking-[0.08em] text-foreground">
        {title}
      </div>
      <p className="mt-5 text-base leading-7 text-foreground/80 !font-sans">
        {description}
      </p>
    </div>
  );
}
