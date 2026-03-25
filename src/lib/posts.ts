import { posts } from "#content";

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slugAsParams === slug);
}

export function getPostsByTag(tag: string) {
  return getPublishedPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string) {
  return getPublishedPosts().filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getAllTags() {
  const tags = getPublishedPosts().flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export function getAllCategories() {
  const cats = getPublishedPosts()
    .map((post) => post.category)
    .filter(Boolean) as string[];
  return [...new Set(cats)].sort();
}
