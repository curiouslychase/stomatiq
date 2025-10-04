import Link from "next/link";
import Image from "next/image";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { getAllPostsMeta } from "@/lib/posts";

export const dynamic = "force-static";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatDate = (value: string) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed);
};

export default function NewsletterPage() {
  const posts = getAllPostsMeta();

  return (
    <main>
      <div className="mx-auto flex max-w-5xl flex-col py-7 lg:py-12">
        <header className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-extrabold font-mono uppercase">
            Newsletter
          </span>
          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
            Essays and updates on product, engineering, and AI at Stomatiq.
          </p>
          <NewsletterSubscribe className="mt-8" />
        </header>

        {posts.length ? (
          <ul className="mt-12 divide-y divide-white/10 border-t border-white/10">
            {posts.map((post) => (
              <li key={post.slug} className="px-4 sm:px-6 lg:px-8">
                <Link
                  href={`/${post.categorySlug ?? 'posts'}/${post.slug}/`}
                  className="group grid gap-6 py-10 no-underline transition sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative sm:mx-0">
                    {post.cover ? (
                      <Image
                        src={post.cover}
                        alt={post.title}
                        width={140}
                        height={160}
                        className="h-full w-full max-h-[160px] rounded-md object-cover shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                      />
                    ) : (
                      <div className="flex h-[120px] w-full items-center justify-center rounded-md border border-white/20 bg-white/5 text-xs uppercase text-foreground/40">
                        No Cover
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 text-xs uppercase text-foreground/50">
                      <time>{formatDate(post.date)}</time>
                    </div>
                    <h2 className="mt-1 text-2xl font-semibold transition font-serif">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-[15px] leading-7 text-foreground/70">
                        {post.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                      {post.authorAvatar && (
                        <Image
                          src={post.authorAvatar}
                          alt={post.author ?? post.title}
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                      )}
                      <div className="flex flex-col">
                        {post.author && (
                          <span className="text-sm font-medium uppercase text-foreground">
                            {post.author}
                          </span>
                        )}
                        {post.authorBio && (
                          <span className="text-xs uppercase text-foreground/50">
                            {post.authorBio}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-sm text-foreground/60">
            No posts published yet.
          </p>
        )}
      </div>
    </main>
  );
}
