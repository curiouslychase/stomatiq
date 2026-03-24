import type { Metadata } from "next";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { CategoryNav } from "@/components/category-nav";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all categories.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Categories</h1>
      <div className="grid gap-6">
        {categories.map((cat) => {
          const count = getPostsByCategory(cat).length;
          return (
            <div key={cat}>
              <CategoryNav categories={[cat]} />
              <p className="mt-1 text-sm text-muted-foreground">
                {count} {count === 1 ? "post" : "posts"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
