import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

export type SpecSectionMeta = {
  slug: string;
  order: number;
  title: string;
  fileName: string;
};

export type SpecSection = SpecSectionMeta & {
  contentHtml: string;
};

const specDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "ai-workflow-open-spec",
);

function isMarkdown(fileName: string): boolean {
  return fileName.toLowerCase().endsWith(".md");
}

function parseFileName(fileName: string): {
  order: number;
  slug: string;
} | null {
  const match = fileName.match(/^(\d+)-(.*)\.md$/i);
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
  const markdown = fs.readFileSync(filePath, "utf8");
  const processed = await remark().use(html).process(markdown);
  const contentHtml = processed.toString();
  return { ...entry, contentHtml } satisfies SpecSection;
}

export function invalidateSpecCache(): void {
  cachedMeta = null;
}
