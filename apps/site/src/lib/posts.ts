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
import TradeoffMatrix from "../components/mdx/TradeoffMatrix";
import FederatedArchitecture from "../components/mdx/FederatedArchitecture";
import TeamSizeEvolution from "../components/mdx/TeamSizeEvolution";
import InstitutionalLag from "../components/mdx/InstitutionalLag";
import BottleneckShift from "../components/mdx/BottleneckShift";
import QuadrantTooltip from "../components/mdx/QuadrantTooltip";

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
  rawMarkdown?: string;
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

function stripJSXAndHTML(content: string): string {
  let cleaned = content;

  // Map specific JSX components to readable text
  const componentMappings: Record<string, (match: string) => string> = {
    QuadrantTooltip: (match: string) => {
      const quadrantMatch = match.match(/quadrant=\{(\d+)\}/);
      if (quadrantMatch) {
        const quadrantNum = quadrantMatch[1];
        const quadrantNames: Record<string, string> = {
          '1': 'Q1 (Personal Stability)',
          '2': 'Q2 (Personal Disruption)',
          '3': 'Q3 (Systemic Stability)',
          '4': 'Q4 (Systemic Volatility)',
        };
        return quadrantNames[quadrantNum] || `Q${quadrantNum}`;
      }
      return '';
    },
  };

  // Replace known JSX components with their text equivalents
  for (const [componentName, mapper] of Object.entries(componentMappings)) {
    const regex = new RegExp(`<${componentName}[^>]*\\/?>`, 'g');
    cleaned = cleaned.replace(regex, (match) => mapper(match));
  }

  // Remove JSX/HTML blocks (multi-line elements like <div>...</div>)
  cleaned = cleaned.replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, '\n');

  // Remove remaining self-closing JSX/HTML tags
  cleaned = cleaned.replace(/<[^>]+\/>/g, '');

  // Remove remaining opening tags that weren't caught
  cleaned = cleaned.replace(/<[^>]+>/g, '');

  // Remove JSX comments
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // Clean up multiple blank lines (more than 2 consecutive newlines)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Remove lines that are only whitespace
  cleaned = cleaned.split('\n').filter(line => line.trim().length > 0 || line === '').join('\n');

  // Clean up multiple blank lines again after filtering
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Trim whitespace from each line while preserving structure
  cleaned = cleaned.split('\n').map(line => line.trimEnd()).join('\n');

  // Trim overall content
  cleaned = cleaned.trim();

  return cleaned;
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
        TradeoffMatrix,
        FederatedArchitecture,
        TeamSizeEvolution,
        InstitutionalLag,
        BottleneckShift,
        QuadrantTooltip,
      }),
    });

    const words = cleanedContent.split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.round(words / 200));

    // Prepare raw markdown without JSX/HTML
    const cleanMarkdown = stripJSXAndHTML(content);
    const title = data.title ? `# ${data.title}\n\n` : '';
    const rawMarkdown = title + cleanMarkdown;

    return { ...meta, readingMinutes, Content, rawMarkdown };
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error);
    return null;
  }
}

function shouldDisplayPost(post: PostMeta): boolean {
  // If DISPLAY_FUTURE_POSTS is set to "true", show all posts
  if (process.env.DISPLAY_FUTURE_POSTS === "true") {
    return true;
  }

  // Otherwise, filter out posts with future dates
  const postDate = new Date(post.date);
  const now = new Date();
  return postDate <= now;
}

export function getAllPostsMeta(): PostMeta[] {
  return listPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is PostMeta => Boolean(m))
    .filter(shouldDisplayPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFuturePostsMeta(): PostMeta[] {
  const now = new Date();
  return listPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is PostMeta => Boolean(m))
    .filter((post) => {
      const postDate = new Date(post.date);
      return postDate > now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
