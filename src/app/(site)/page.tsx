import { getAllPostsMeta } from "@/lib/posts";
import { HeroCard, SmallCard, SidebarList } from "@/components/post-cards";

export default function SiteHome() {
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
