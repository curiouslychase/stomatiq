import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/posts";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export default function Home() {
  const posts = getAllPostsMeta();
  const [featured] = posts;
  const recentEssays = posts.slice(1, 6);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Post */}
          <section className="lg:col-span-7 px-4 lg:px-0">
            {featured && (
              <Link href={featured.categorySlug ? `/${featured.categorySlug}/${featured.slug}` : `/posts/${featured.slug}`} className="block group">
                <article className="space-y-6">
                  {featured.cover && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      <Image
                        src={featured.cover}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      {new Date(featured.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      IN {featured.category || "ESSAYS"}
                    </div>
                    <h1 className="text-5xl font-serif leading-tight group-hover:opacity-80 transition-opacity">
                      {featured.title}
                    </h1>
                    {featured.excerpt && (
                      <p className="text-xl leading-relaxed text-foreground/70">
                        {featured.excerpt}
                      </p>
                    )}
                    {featured.author && (
                      <div className="flex items-center gap-3 pt-2">
                        <span className="font-medium text-foreground/80">
                          {featured.author.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            )}
          </section>

          {/* Right Sidebar - Recent Essays */}
          <aside className="lg:col-span-5">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4 lg:px-0">
                <h2 className="text-sm font-semibold uppercase tracking-wider">
                  Recent Essays
                </h2>
                <Link href="/newsletter" className="text-foreground/60">
                  →
                </Link>
              </div>
              <div className="space-y-8 px-4 lg:px-0">
                {recentEssays.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.categorySlug ? `/${post.categorySlug}/${post.slug}` : `/posts/${post.slug}`}
                    className="block group"
                  >
                    <article className="grid grid-cols-1 sm:flex gap-4 items-start">
                      {(post.cover || post.thumbnail) && (
                        <div className="relative sm:w-20 sm:h-20 aspect-[16/10] sm:aspect-square sm:flex-shrink-0 overflow-hidden rounded-lg sm:rounded">
                          <Image
                            src={post.cover || post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <h3
                          className="text-sm font-bold leading-tight group-hover:opacity-80 transition-opacity uppercase"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-xs leading-relaxed text-foreground/60">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 max-w-2xl mx-auto px-4 lg:px-0">
          <NewsletterSubscribe
            heading="Subscribe to the newsletter"
            description="Get new essays and updates delivered occasionally."
            layout="stacked"
          />
        </div>
      </div>
    </main>
  );
}
