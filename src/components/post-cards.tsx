import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function HeroCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-black/[.08] dark:border-white/[.12] bg-black/5 dark:bg-white/5">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        ) : null}
      </div>
      <div className="mt-3">
        <div className="text-xs uppercase tracking-wide text-foreground/60">
          {post.category || ""}
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight group-hover:underline">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="mt-1 text-sm text-foreground/70">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export function SmallCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="grid grid-cols-[96px_1fr] gap-3 group"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded border border-black/[.08] dark:border-white/[.12] bg-black/5 dark:bg-white/5">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : null}
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wide text-foreground/60">
          {post.category || ""}
        </div>
        <h3 className="text-sm font-medium group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-1 text-xs text-foreground/60">
          {new Date(post.date).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export function SidebarList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="space-y-5">
      {posts.map((p) => (
        <SmallCard key={p.slug} post={p} />
      ))}
    </div>
  );
}
