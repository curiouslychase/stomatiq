import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}"`,
    description: `All posts tagged with ${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Tag: {tag}
      </h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.slugAsParams}
            title={post.title}
            description={post.description}
            date={post.date}
            slug={post.slugAsParams}
            tags={post.tags}
          />
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts with this tag.</p>
        )}
      </div>
    </div>
  );
}
