import Image from "next/image";
import { getPost, listPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  return listPostSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return null;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {post.cover ? (
        <div className="relative mb-8 aspect-[16/5] w-full overflow-hidden rounded-md border border-black/[.08] dark:border-white/[.12] bg-black/5 dark:bg-white/5">
          <Image
            src={post.cover}
            alt="Cover"
            fill
            className="object-cover"
            sizes="(min-width:1024px) 896px, 100vw"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <aside className="order-2 lg:order-1 text-sm text-black/70 dark:text-white/70">
          {post.authorAvatar ? (
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-black/[.08] dark:border-white/[.12]">
              <Image
                src={post.authorAvatar}
                alt={post.author || "Author"}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
          ) : null}
          <div className="mt-3 font-medium text-black dark:text-white">
            {post.author}
          </div>
          {post.category ? (
            <div className="text-xs uppercase tracking-wide mt-1">
              {post.category}
            </div>
          ) : null}
          <div className="mt-3 text-xs">
            {new Date(post.date).toLocaleDateString()} · {post.readingMinutes}{" "}
            min read
          </div>
          {post.authorBio ? (
            <p className="mt-4 leading-6">{post.authorBio}</p>
          ) : null}
        </aside>

        <article className="order-1 lg:order-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-3 text-lg text-black/70 dark:text-white/70">
              {post.excerpt}
            </p>
          ) : null}
          <div
            className="mt-8 leading-8 text-[17px] text-black/80 dark:text-white/80"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </main>
  );
}
