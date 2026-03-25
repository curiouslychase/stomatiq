import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { Search } from "@/components/search";

export const metadata: Metadata = {
  title: "Blog",
  description: "All blog posts.",
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const searchablePosts = posts.map(({ title, description, date, slugAsParams, tags }) => ({
    title,
    description,
    date,
    slugAsParams,
    tags,
  }));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
      <Search posts={searchablePosts} />
    </div>
  );
}
