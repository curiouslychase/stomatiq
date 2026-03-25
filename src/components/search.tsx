"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/post-card";

interface SearchablePost {
  title: string;
  description: string;
  date: string;
  slugAsParams: string;
  tags: string[];
}

interface SearchProps {
  posts: SearchablePost[];
}

export function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
      }),
    [posts]
  );

  const results = query
    ? fuse.search(query).map((r) => r.item)
    : posts;

  return (
    <div>
      <Input
        type="search"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-8 max-w-sm"
      />
      <div className="grid gap-4">
        {results.map((post) => (
          <PostCard
            key={post.slugAsParams}
            title={post.title}
            description={post.description}
            date={post.date}
            slug={post.slugAsParams}
            tags={post.tags}
          />
        ))}
        {results.length === 0 && (
          <p className="text-muted-foreground">No posts found.</p>
        )}
      </div>
    </div>
  );
}
