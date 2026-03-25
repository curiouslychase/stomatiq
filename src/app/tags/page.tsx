import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all tags.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const count = getPostsByTag(tag).length;
          return (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                {tag} ({count})
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
