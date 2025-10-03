import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import LawCard from "../components/mdx/LawCard";
import EquationCard from "../components/mdx/EquationCard";
import IterationCard from "../components/mdx/IterationCard";
import DomainCard from "../components/mdx/DomainCard";
import ChangeImpactMatrix from "../components/mdx/ChangeImpactMatrix";
import QuadrantMovement from "../components/mdx/QuadrantMovement";
import DiagnosticFlow from "../components/mdx/DiagnosticFlow";
import FrameworkCard from "../components/mdx/FrameworkCard";
import ProcessSteps from "../components/mdx/ProcessSteps";
import DecisionScaleComparison from "../components/mdx/DecisionScaleComparison";

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
  categorySlug?: string;
};

export type Post = PostMeta & {
  readingMinutes: number;
  Content: React.ComponentType;
};

// Posts are in the parent src/content/posts directory
const postsDirectory = path.join(process.cwd(), "content", "posts");

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    : (cover ?? undefined);
  const author = data.author ? String(data.author) : undefined;
  const authorAvatar = data.authorAvatar
    ? String(data.authorAvatar)
    : undefined;
  const authorBio = data.authorBio ? String(data.authorBio) : undefined;
  const category = data.category ? String(data.category) : undefined;
  const categorySlug = category ? categoryToSlug(category) : undefined;
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
    categorySlug,
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
  console.log(fullPath);
  if (!fullPath || !fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = toPostMeta(slug, data);

  // Replace class= with className= in JSX/HTML elements
  const cleanedContent = content.replace(/\bclass=/g, "className=");

  // Compile MDX to React component
  try {
    const { default: Content } = await evaluate(cleanedContent, {
      ...runtime,
      development: process.env.NODE_ENV === "development",
      baseUrl: import.meta.url,
      useMDXComponents: () => ({
        LawCard,
        EquationCard,
        IterationCard,
        DomainCard,
        ChangeImpactMatrix,
        QuadrantMovement,
        DiagnosticFlow,
        FrameworkCard,
        ProcessSteps,
        DecisionScaleComparison,
      }),
    });

    const words = cleanedContent.split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.round(words / 200));

    return { ...meta, readingMinutes, Content };
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error);
    return null;
  }
}

export function getAllPostsMeta(): PostMeta[] {
  return listPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
