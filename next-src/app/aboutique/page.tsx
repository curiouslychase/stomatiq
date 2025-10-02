import Image from 'next/image';

export const metadata = {
  title: 'Aboutique | stomatiq',
};

export default function AboutiquePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 space-y-12">
      <section className="space-y-4">
        <p
          className="text-sm uppercase tracking-[0.3em] text-foreground/60"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Meet stomatiq
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Aboutique
        </h1>
        <p className="text-[15px] leading-7 text-foreground/70 max-w-3xl">
          Stomatiq is a consulting company dedicated to helping problem solvers
          leverage AI to design scalable solutions. Instead of focusing on AI as a
          novelty or personal productivity tool, Stomatiq equips people who want
          to tackle real problems—whether for communities, customers, or
          industries—with the frameworks and systems to deliver impact at scale.
        </p>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Vision</h2>
          <p className="text-[15px] leading-7 text-foreground/70">
            AI isn't just a tool for personal efficiency; it's a platform for
            solving problems at scale. By automating routine complexity and making
            advanced workflows accessible, Stomatiq frees problem solvers to focus
            on context, creativity, and human judgment—where they add the most
            value.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Why Now</h2>
          <p className="text-[15px] leading-7 text-foreground/70">
            The AI era has unlocked unprecedented capacity for individuals to act
            at scale. But most problem solvers lack the frameworks and workflows
            to turn AI's raw power into reliable, value-creating systems. Stomatiq
            fills that gap—helping them move from ideas to scalable solutions.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            What Stomatiq Does
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-foreground/70 max-w-3xl">
            Stomatiq partners with teams to design declarative, flexible
            automations that connect AI with the right tools, data, and decision
            points to scale meaningful solutions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-foreground/[.08] bg-background/60 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold tracking-tight">
              Problem Framing with AI
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-foreground/70">
              Helping clients define problems in ways that make them solvable with
              AI-powered workflows.
            </p>
          </div>
          <div className="rounded-2xl border border-foreground/[.08] bg-background/60 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold tracking-tight">
              Workflow &amp; System Design
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-foreground/70">
              Building declarative, flexible automations that connect AI with the
              tools and data required to scale solutions.
            </p>
          </div>
          <div className="rounded-2xl border border-foreground/[.08] bg-background/60 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold tracking-tight">
              Enablement for Problem Solvers
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-foreground/70">
              Empowering consultants, innovators, and entrepreneurs to use AI as
              their lever for broader impact.
            </p>
          </div>
          <div className="rounded-2xl border border-foreground/[.08] bg-background/60 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold tracking-tight">
              Education &amp; Patterns
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-foreground/70">
              Sharing repeatable playbooks that help problem solvers move quickly
              from idea to working solution.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Who It's For</h2>
        <ul className="space-y-3 text-[15px] leading-7 text-foreground/70">
          <li>
            Consultants who want to expand their toolkit with scalable AI
            solutions.
          </li>
          <li>
            Entrepreneurs and innovators solving niche or underserved problems.
          </li>
          <li>
            Operators inside small businesses or organizations looking to amplify
            their problem-solving capacity.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
          <div className="space-y-4">
            <p
              className="text-sm uppercase tracking-[0.25em] text-foreground/60"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Founder
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">Chase Adams</h2>
            <p className="text-[15px] leading-7 text-foreground/70">
              Chase Adams is the founder of Stomatiq, where he helps problem solvers harness AI to design scalable
              solutions. He is also the cofounder of Plumb, a no-code platform for AI automation that empowers consultants
              and workflow creators to build powerful automations for their clients without writing code.
            </p>
            <p className="text-[15px] leading-7 text-foreground/70">
              Before starting Plumb, Chase built his career at the intersection of technology, consulting, and product
              development. He has worked across early-stage startups and fast-moving teams, consistently focused on
              helping people simplify complexity through better systems and tools. That perspective shaped his approach to
              Stomatiq: that AI isn't meant to replace human insight, but to give problem solvers leverage to act at scale.
            </p>
            <p className="text-[15px] leading-7 text-foreground/70">
              Today, Chase combines hands-on technical expertise with a clear sense of human-centered design, equipping
              entrepreneurs, consultants, and innovators with the frameworks and systems needed to turn ideas into
              scalable impact.
            </p>
          </div>
          <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl border border-foreground/[.08] bg-background/60">
            <Image
              src="/chase-adams.png"
              alt="Portrait of Chase Adams"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
