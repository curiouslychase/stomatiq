import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MarkdownInstance } from "astro";

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
  readingMinutes: number;
  Content: MarkdownInstance<Record<string, unknown>>["Content"];
};

const coursesDirectory = path.join(process.cwd(), "src", "content", "courses");

const courseModules = import.meta.glob<
  MarkdownInstance<Record<string, unknown>>
>("../content/courses/*.{md,mdx}");

function resolveCourseModule(slug: string) {
  return (
    courseModules[`../content/courses/${slug}.mdx`] ??
    courseModules[`../content/courses/${slug}.md`]
  );
}

function toCourseMeta(
  slug: string,
  data: Record<string, unknown>,
): CourseMeta {
  const title = String(data.title ?? slug);
  const date = String(data.date ?? new Date().toISOString());
  const excerpt = data.excerpt ? String(data.excerpt) : undefined;
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag))
    : undefined;
  const cover = data.cover ? String(data.cover) : undefined;
  const level = data.level ? String(data.level) : undefined;
  const duration = data.duration ? String(data.duration) : undefined;
  const price = typeof data.price === "number" ? data.price : undefined;
  return {
    slug,
    title,
    date,
    excerpt,
    tags,
    cover,
    level,
    duration,
    price,
  } satisfies CourseMeta;
}

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
  return toCourseMeta(slug, data);
}

export async function getCourse(slug: string): Promise<Course | null> {
  const fullPathMd = path.join(coursesDirectory, `${slug}.md`);
  const fullPathMdx = path.join(coursesDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  if (!fullPath || !fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = toCourseMeta(slug, data);
  const loader = resolveCourseModule(slug);
  if (!loader) return null;
  const module = await loader();
  const { Content } = module;
  if (!Content) return null;
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  return { ...meta, readingMinutes, Content };
}

export function getAllCoursesMeta(): CourseMeta[] {
  return listCourseSlugs()
    .map((slug) => getCourseMeta(slug))
    .filter((m): m is CourseMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}







