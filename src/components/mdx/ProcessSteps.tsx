interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="my-10 space-y-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-background-alt/40 p-6 transition-all hover:border-foreground/20 hover:bg-background-alt/60"
        >
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-foreground/15 bg-background-alt font-mono text-xl font-bold text-foreground">
              {step.number}
            </div>
            <div className="flex-1">
              <h4 className="mb-2 font-mono text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-foreground/70">
                {step.description}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="absolute bottom-0 left-[3.75rem] h-4 w-[2px] bg-gradient-to-b from-foreground/20 to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
}
