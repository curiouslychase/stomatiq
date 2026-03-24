import type { Metadata } from "next";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: cat.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} posts`,
    description: `All posts in the ${category} category.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const displayName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        {displayName}
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
          <p className="text-muted-foreground">No posts in this category.</p>
        )}
      </div>
    </div>
  );
}
