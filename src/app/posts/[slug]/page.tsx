import { notFound } from "next/navigation";
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

  if (!post) {
    notFound();
  }

  const { Content, title, date, author, category, readingMinutes } = post;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 space-y-4">
        <div className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {category || "ESSAY"} · {readingMinutes} min read
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {author && (
          <div className="text-foreground/70">
            by <span className="font-medium">{author}</span>
          </div>
        )}
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <Content />
      </div>
    </article>
  );
}
