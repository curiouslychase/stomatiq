import { getAllPostsMeta } from "@/lib/posts";
import { HeroCard, SmallCard, SidebarList } from "@/components/post-cards";
import { ComingSection } from "@/components/coming-section";
import { BrandLockup } from "@/components/brand-lockup";

export default function Home() {
  if (process.env.NODE_ENV !== "production") {
    return (
      <ComingSection
        header={<BrandLockup variant="landing" href={undefined} />}
        description="We’re crafting something new. Check back shortly."
      >
        <p className="text-[15px] leading-7 text-foreground/80">
          At Stomatiq, we believe the future belongs to creators, solopreneurs,
          and visionary small teams who use intelligence—both human and
          artificial—not just to keep up, but to leap ahead. We are builders,
          not watchers. We don&apos;t just explain what&apos;s possible; we help
          you do what matters, shipping AI work-flows, tools, and products that
          pay you back quickly and reliably.
        </p>
        <p className="text-[15px] leading-7 text-foreground/80">
          Stomatiq is your partner in transforming &quot;I wonder if AI can do
          this&quot; into &quot;Here&apos;s how AI already does this for
          me.&quot; We cut through hype and complexity, crafting small,
          meaningful AI wins that stack up: atomic tools that save your time,
          automations that amplify your influence, courses that teach you
          skills, workshops that change your trajectory, consulting that moves
          the needle, and coaching that shapes the leader in you.
        </p>
        <p className="text-[15px] leading-7 text-foreground/80">
          We serve the creator-led, the curious, and the committed. If you want
          to build something real—products that ship, workflows that scale,
          value that compounds—you&apos;re in the right place. With an obsession
          for impact, we help you bridge the gap between tools and results,
          dreams and income, promise and proof.
        </p>
      </ComingSection>
    );
  }
  const posts = getAllPostsMeta();
  const [first, second, third, ...rest] = posts;
  const sidebar = rest.slice(0, 5);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-8">
          {first ? <HeroCard post={first} /> : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {second ? <SmallCard post={second} /> : null}
            {third ? <SmallCard post={third} /> : null}
          </div>
        </section>
        <aside className="lg:col-span-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">
            Recent Essays
          </h2>
          <SidebarList posts={sidebar} />
        </aside>
      </div>
    </main>
  );
}
