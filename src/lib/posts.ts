import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MarkdownInstance } from "astro";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  date: string; // ISO
  tags?: string[];
  cover?: string; // optional static path or remote URL
  thumbnail?: string; // optional static path or remote URL
  author?: string;
  authorAvatar?: string;
  authorBio?: string;
  category?: string;
};

export type Post = PostMeta & {
  readingMinutes: number;
  Content: MarkdownInstance<Record<string, unknown>>["Content"];
};

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

const postModules = import.meta.glob<MarkdownInstance<Record<string, unknown>>>(
  "../content/posts/*.{md,mdx}"
);

function resolvePostModule(slug: string) {
  return (
    postModules[`../content/posts/${slug}.mdx`] ??
    postModules[`../content/posts/${slug}.md`]
  );
}

function toPostMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const title = String(data.title ?? slug);
  const date = String(data.date ?? new Date().toISOString());
  const excerpt = data.excerpt ? String(data.excerpt) : undefined;
  const description = data.description ? String(data.description) : undefined;
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag))
    : undefined;
  const cover = data.cover ? String(data.cover) : undefined;
  const thumbnail = data.thumbnail
    ? String(data.thumbnail)
    : cover ?? undefined;
  const author = data.author ? String(data.author) : undefined;
  const authorAvatar = data.authorAvatar
    ? String(data.authorAvatar)
    : undefined;
  const authorBio = data.authorBio ? String(data.authorBio) : undefined;
  const category = data.category ? String(data.category) : undefined;
  return {
    slug,
    title,
    date,
    excerpt,
    description,
    tags,
    cover,
    thumbnail,
    author,
    authorAvatar,
    authorBio,
    category,
  } satisfies PostMeta;
}

export function listPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/i, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  const fullPathMd = path.join(postsDirectory, `${slug}.md`);
  const fullPathMdx = path.join(postsDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  if (!fullPath || !fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return toPostMeta(slug, data);
}

export async function getPost(slug: string): Promise<Post | null> {
  const fullPathMd = path.join(postsDirectory, `${slug}.md`);
  const fullPathMdx = path.join(postsDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  if (!fullPath || !fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = toPostMeta(slug, data);
  const loader = resolvePostModule(slug);
  if (!loader) return null;
  const module = await loader();
  const { Content } = module;
  if (!Content) return null;
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  return { ...meta, readingMinutes, Content };
}

export function getAllPostsMeta(): PostMeta[] {
  return listPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
