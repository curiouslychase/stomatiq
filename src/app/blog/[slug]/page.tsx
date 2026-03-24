import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPosts, getPostBySlug } from "@/lib/posts";
import { MDXContent } from "@/components/mdx-content";
import { TagBadge } from "@/components/tag-badge";
import { siteConfig } from "@/lib/site-config";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({ slug: post.slugAsParams }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slugAsParams}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <time className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {post.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} clickable />
            ))}
          </div>
        )}
      </header>
      <MDXContent code={post.content} />
    </article>
  );
}
