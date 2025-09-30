import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  description: "Tokens and components that power the Stomatiq site.",
};

const tokens = [
  { name: "Background", varName: "--background", className: "bg-background" },
  { name: "Foreground", varName: "--foreground", className: "bg-foreground" },
  { name: "Linen", varName: "--linen", className: "bg-[rgb(var(--linen))]" },
  {
    name: "Space Cadet",
    varName: "--space-cadet",
    className: "bg-[rgb(var(--space-cadet))]",
  },
  {
    name: "Cool Gray",
    varName: "--cool-gray",
    className: "bg-[rgb(var(--cool-gray))]",
  },
  { name: "Night", varName: "--night", className: "bg-[rgb(var(--night))]" },
  { name: "Smoky", varName: "--smoky", className: "bg-[rgb(var(--smoky))]" },
  {
    name: "Sandy Brown",
    varName: "--sandy-brown",
    className: "bg-[rgb(var(--sandy-brown))]",
  },
];

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Design System</h1>
      <p className="mt-3 text-[15px] leading-7 text-foreground/70">
        Tokens and components that power this website. Switch themes from the
        header to see live updates.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Color Tokens</h2>
        <p className="mt-2 text-[15px] leading-7 text-foreground/70">
          These CSS variables are defined in <code>src/app/globals.css</code>{" "}
          and exposed via Tailwind using <code>@theme inline</code>.
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {tokens.map((t) => (
            <div
              key={t.varName}
              className="rounded-md border border-black/[.08] dark:border-white/[.12]"
            >
              <div className={`h-20 rounded-t-md ${t.className}`} />
              <div className="p-3 text-sm">
                <div className="font-medium">{t.name}</div>
                <div className="text-foreground/70">
                  {t.varName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
        <p className="mt-2 text-[15px] leading-7 text-foreground/70">
          Components are composed from tokens so they remain themeable and
          consistent.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium">
            Primary
          </button>
          <button className="rounded-md border border-black/[.12] dark:border-white/[.20] px-4 py-2 text-sm">
            Outline
          </button>
          <button className="rounded-full bg-[rgb(var(--sandy-brown))] text-black px-4 py-2 text-sm font-medium">
            Accent
          </button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Card</h2>
        <p className="mt-2 text-[15px] leading-7 text-foreground/70">
          Neutral surfaces with dashed separators, aligned with the courses
          layout.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-md border border-black/[.08] dark:border-white/[.12] p-5">
            <h3 className="text-xl font-semibold">Surface</h3>
            <p className="mt-2 text-[15px] leading-7 text-foreground/70">
              Uses <code>--background</code> and <code>--foreground</code>{" "}
              tokens.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-md bg-foreground text-background px-3 py-1.5 text-sm">
                Action
              </button>
              <button className="rounded-md border border-black/[.12] dark:border-white/[.20] px-3 py-1.5 text-sm">
                Secondary
              </button>
            </div>
          </div>

          <div className="rounded-md border border-black/[.08] dark:border-white/[.12] p-5">
            <h3 className="text-xl font-semibold">States</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-[rgb(var(--cool-gray))] text-background px-3 py-1 text-xs">
                Muted
              </span>
              <span className="rounded-full bg-[rgb(var(--sandy-brown))] text-black px-3 py-1 text-xs">
                Accent
              </span>
              <span className="rounded-full bg-[rgb(var(--night))] text-white px-3 py-1 text-xs">
                Elevated
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
