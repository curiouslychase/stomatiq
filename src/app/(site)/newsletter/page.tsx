import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default function PostsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
      <ul className="mt-6 space-y-6">
        {getAllPostsMeta().map((post) => (
          <li key={post.slug} className="group">
            <Link href={`/posts/${post.slug}`} className="block">
              <h2 className="text-lg font-medium group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-foreground/70">
                {post.excerpt}
              </p>
              <p className="mt-1 text-xs text-foreground/50">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

