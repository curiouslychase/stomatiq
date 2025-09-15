import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt?: string;
  date: string; // ISO
  tags?: string[];
  cover?: string; // optional static path or remote URL
  author?: string;
  authorAvatar?: string;
  authorBio?: string;
  category?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
  readingMinutes: number;
};

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

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
  const title = String(data.title ?? slug);
  const date = String(data.date ?? new Date().toISOString());
  const excerpt = data.excerpt ? String(data.excerpt) : undefined;
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : undefined;
  const cover = data.cover ? String(data.cover) : undefined;
  const author = data.author ? String(data.author) : undefined;
  const category = data.category ? String(data.category) : undefined;
  return { slug, title, date, excerpt, tags, cover, author, category };
}

export async function getPost(slug: string): Promise<Post | null> {
  const fullPathMd = path.join(postsDirectory, `${slug}.md`);
  const fullPathMdx = path.join(postsDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  if (!fullPath || !fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  const meta = getPostMeta(slug);
  if (!meta) return null;
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  return { ...meta, contentHtml, readingMinutes };
}

export function getAllPostsMeta(): PostMeta[] {
  return listPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
