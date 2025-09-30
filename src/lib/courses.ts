import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type CourseMeta = {
  slug: string;
  title: string;
  excerpt?: string;
  date: string; // ISO
  tags?: string[];
  cover?: string; // optional static path or remote URL
  level?: string; // beginner, intermediate, advanced
  duration?: string; // e.g., "2.5h"
  price?: number; // in USD
};

export type Course = CourseMeta & {
  contentHtml: string;
  readingMinutes: number;
};

const coursesDirectory = path.join(process.cwd(), "src", "content", "courses");

export function listCourseSlugs(): string[] {
  if (!fs.existsSync(coursesDirectory)) return [];
  return fs
    .readdirSync(coursesDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/i, ""));
}

export function getCourseMeta(slug: string): CourseMeta | null {
  const fullPathMd = path.join(coursesDirectory, `${slug}.md`);
  const fullPathMdx = path.join(coursesDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  if (!fullPath || !fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const title = String(data.title ?? slug);
  const date = String(data.date ?? new Date().toISOString());
  const excerpt = data.excerpt ? String(data.excerpt) : undefined;
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : undefined;
  const cover = data.cover ? String(data.cover) : undefined;
  const level = data.level ? String(data.level) : undefined;
  const duration = data.duration ? String(data.duration) : undefined;
  const price = typeof data.price === "number" ? data.price : undefined;
  return { slug, title, date, excerpt, tags, cover, level, duration, price };
}

export async function getCourse(slug: string): Promise<Course | null> {
  const fullPathMd = path.join(coursesDirectory, `${slug}.md`);
  const fullPathMdx = path.join(coursesDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  if (!fullPath || !fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  const meta = getCourseMeta(slug);
  if (!meta) return null;
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  return { ...meta, contentHtml, readingMinutes };
}

export function getAllCoursesMeta(): CourseMeta[] {
  return listCourseSlugs()
    .map((slug) => getCourseMeta(slug))
    .filter((m): m is CourseMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}







