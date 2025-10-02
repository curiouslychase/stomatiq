export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-8">
          <div className="rounded-md border border-black/[.08] dark:border-white/[.12] p-6">
            <h1 className="text-2xl font-semibold tracking-tight">stomatiq</h1>
            <p className="mt-3 text-[15px] leading-7 text-foreground/80">
              We're crafting something new. Check back shortly.
            </p>
          </div>
        </section>
        <aside className="lg:col-span-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">
            Recent Essays
          </h2>
          <div className="space-y-5">
            {/* Placeholder; posts migration will come later */}
          </div>
        </aside>
      </div>
    </main>
  );
}
