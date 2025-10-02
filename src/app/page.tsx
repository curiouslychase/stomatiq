import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/posts";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export default function Home() {
  const posts = getAllPostsMeta();
  const [featured, ...otherPosts] = posts;
  const sidebarPosts = otherPosts.slice(0, 2);
  const recentEssays = posts.slice(0, 4);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1600px] px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Smaller Posts */}
          <aside className="lg:col-span-3 space-y-8">
            {sidebarPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block group"
              >
                <article className="space-y-4">
                  {post.cover && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      IN {post.category || "ESSAYS"}
                    </div>
                    <h2 className="text-xl font-serif leading-tight group-hover:opacity-80 transition-opacity">
                      {post.title}
                    </h2>
                    {post.author && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-foreground/80">
                          {post.author.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </aside>

          {/* Center - Featured Post */}
          <section className="lg:col-span-6">
            {featured && (
              <Link href={`/posts/${featured.slug}`} className="block group">
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
          <aside className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider">
                  Recent Essays
                </h2>
                <Link href="/newsletter" className="text-foreground/60">
                  →
                </Link>
              </div>
              <div className="space-y-8">
                {recentEssays.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block group"
                  >
                    <article className="flex gap-4">
                      {post.thumbnail && (
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <h3 className="text-base font-serif leading-tight group-hover:opacity-80 transition-opacity">
                          {post.title}
                        </h3>
                        {post.author && (
                          <div className="text-xs font-medium text-foreground/60">
                            {post.author.toUpperCase()}
                          </div>
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
        <div className="mt-16 max-w-2xl mx-auto">
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
