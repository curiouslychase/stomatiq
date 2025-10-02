interface DomainCardProps {
  index: string;
  title: string;
  items: string[];
}

export default function DomainCard({ index, title, items }: DomainCardProps) {
  return (
    <div className="relative flex flex-col rounded-3xl border border-foreground/10 bg-background-alt/70 px-7 py-8 md:pl-16">
      <span className="text-xs font-mono uppercase tracking-[0.16em] text-foreground/60">
        Domain {index}
      </span>
      <span className="mt-4 text-xl font-semibold uppercase tracking-[0.08em] text-foreground">
        {title}
      </span>
      <ul className="mt-6 space-y-3 text-sm leading-7 text-foreground/75">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 inline-flex h-1.5 w-1.5 rounded-full bg-foreground/50"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <span className="absolute left-8 top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-foreground md:block"></span>
    </div>
  );
}
