import fs from "node:fs";
import path from "node:path";
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import LawCard from "@/components/mdx/LawCard";
import EquationCard from "@/components/mdx/EquationCard";
import IterationCard from "@/components/mdx/IterationCard";
import DomainCard from "@/components/mdx/DomainCard";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export type SpecSectionMeta = {
  slug: string;
  order: number;
  title: string;
  fileName: string;
};

export type SpecSection = SpecSectionMeta & {
  Content: React.ComponentType;
};

const specDirectory = resolveSpecDirectory();

function resolveSpecDirectory(): string {
  const candidates = [
    path.join(process.cwd(), "content", "ai-workflow-open-spec"),
    path.join(process.cwd(), "src", "content", "ai-workflow-open-spec"),
    path.join(process.cwd(), "..", "content", "ai-workflow-open-spec"),
    path.join(process.cwd(), "..", "src", "content", "ai-workflow-open-spec"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return candidates[0];
}

const excludedSlugs = new Set(["table-of-contents"]);

function isMarkdown(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return lower.endsWith(".md") || lower.endsWith(".mdx");
}

function parseFileName(fileName: string): {
  order: number;
  slug: string;
} | null {
  const match = fileName.match(/^(\d+)-(.*)\.(md|mdx)$/i);
  if (!match) return null;
  const [, orderPart, slugPart] = match;
  return { order: Number.parseInt(orderPart, 10), slug: slugPart };
}

function extractTitle(filePath: string): string {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^#\s+(.*)$/);
    if (match) {
      return match[1].trim();
    }
  }
  return path.basename(filePath, path.extname(filePath));
}

function loadEntries(): SpecSectionMeta[] {
  if (!fs.existsSync(specDirectory)) return [];
  return fs
    .readdirSync(specDirectory)
    .filter((fileName) => isMarkdown(fileName))
    .map((fileName) => {
      const parsed = parseFileName(fileName);
      if (!parsed) return null;
      if (excludedSlugs.has(parsed.slug)) return null;
      const filePath = path.join(specDirectory, fileName);
      const title = extractTitle(filePath);
      return {
        fileName,
        slug: parsed.slug,
        order: parsed.order,
        title,
      } satisfies SpecSectionMeta;
    })
    .filter((entry): entry is SpecSectionMeta => Boolean(entry))
    .sort((a, b) => a.order - b.order);
}

let cachedMeta: SpecSectionMeta[] | null = null;

function getMeta(): SpecSectionMeta[] {
  if (!cachedMeta) {
    cachedMeta = loadEntries();
  }
  return cachedMeta;
}

export function getAllSpecSectionsMeta(): SpecSectionMeta[] {
  return [...getMeta()];
}

export async function getSpecSection(
  slug: string,
): Promise<SpecSection | null> {
  const entry = getMeta().find((item) => item.slug === slug);
  if (!entry) return null;
  const filePath = path.join(specDirectory, entry.fileName);
  if (!fs.existsSync(filePath)) return null;

  // Read and compile MDX
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { default: Content } = await evaluate(fileContents, {
      ...runtime,
      development: process.env.NODE_ENV === 'development',
      baseUrl: import.meta.url,
      // @ts-expect-error - MDX component typing
      useMDXComponents: () => ({
        LawCard,
        EquationCard,
        IterationCard,
        DomainCard,
        NewsletterSubscribe,
      }),
    });

    return { ...entry, Content } satisfies SpecSection;
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error);
    return null;
  }
}

export function invalidateSpecCache(): void {
  cachedMeta = null;
}
