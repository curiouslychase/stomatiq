import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getAllSpecSectionsMeta } from "../../../lib/spec";

const width = 1200;
const height = 630;
const backgroundImage = "/images/wave-001.png";
const tagline =
  "A common language for weaving together modular programmatic steps with agentic intelligence.";

const extensionToMime = new Map<string, string>([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
]);
const spaceMonoRegularPath = path.join(
  process.cwd(),
  "node_modules",
  "@fontsource",
  "space-mono",
  "files",
  "space-mono-latin-400-normal.woff"
);
const spaceMonoBoldPath = path.join(
  process.cwd(),
  "node_modules",
  "@fontsource",
  "space-mono",
  "files",
  "space-mono-latin-700-normal.woff"
);
let spaceMonoRegular: ArrayBuffer | null = null;
let spaceMonoBold: ArrayBuffer | null = null;

async function readPublicAsset(relativePath: string) {
  const filePath = path.join(
    process.cwd(),
    "public",
    relativePath.replace(/^\/+/, "")
  );
  const data = await fs.readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = extensionToMime.get(ext) ?? "image/png";
  return `data:${mime};base64,${data.toString("base64")}`;
}

function getSectionMeta(slug: string) {
  return getAllSpecSectionsMeta().find((entry) => entry.slug === slug) ?? null;
}

function createOgElement(title: string, imageSrc: string) {
  const upperTitle = title.toUpperCase();
  return {
    type: "div",
    props: {
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        backgroundColor: "#050509",
        color: "#f8fafc",
        fontFamily: '"Geist", "Geist Sans", "Helvetica Neue", Arial, sans-serif',
      },
      children: [
        {
          type: "img",
          props: {
            src: imageSrc,
            alt: "",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,5,9,0.15) 0%, rgba(5,5,9,0.35) 40%, rgba(5,5,9,0.85) 100%)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "relative",
              padding: "56px 72px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 28,
                    textTransform: "uppercase",
                    letterSpacing: "0.4em",
                    color: "rgba(248,250,252,0.76)",
                    backgroundColor: "rgba(5, 5, 9, 0.76)",
                    padding: "12px 20px",
                    alignSelf: "flex-start",
                  },
                  children: "AI Workflow Open Spec",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 64,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    maxWidth: "86%",
                    backgroundColor: "rgba(5, 5, 9, 0.82)",
                    padding: "22px 28px",
                    boxShadow: "0 25px 80px rgba(5,5,9,0.45)",
                    alignSelf: "flex-start",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontFamily:
                      '"Space Mono", "Menlo", "Courier New", monospace',
                  },
                  children: upperTitle,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 28,
                    lineHeight: 1.35,
                    color: "rgba(248,250,252,0.87)",
                    maxWidth: "78%",
                    backgroundColor: "rgba(5, 5, 9, 0.76)",
                    padding: "20px 26px",
                    alignSelf: "flex-start",
                    fontFamily:
                      '"Space Mono", "Menlo", "Courier New", monospace',
                    fontWeight: 400,
                  },
                  children: tagline,
                },
              },
            ],
          },
        },
      ],
    },
  } as const;
}

async function loadSpaceMono() {
  if (!spaceMonoRegular) {
    try {
      const data = await fs.readFile(spaceMonoRegularPath);
      spaceMonoRegular = data.buffer.slice(
        data.byteOffset,
        data.byteOffset + data.byteLength
      );
    } catch {
      spaceMonoRegular = null;
    }
  }
  if (!spaceMonoBold) {
    try {
      const data = await fs.readFile(spaceMonoBoldPath);
      spaceMonoBold = data.buffer.slice(
        data.byteOffset,
        data.byteOffset + data.byteLength
      );
    } catch {
      spaceMonoBold = null;
    }
  }
  return { regular: spaceMonoRegular, bold: spaceMonoBold } as const;
}

export async function getStaticPaths() {
  return getAllSpecSectionsMeta().map((section) => ({
    params: { slug: section.slug },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response("Not Found", { status: 404 });
  }
  const section = getSectionMeta(String(slug));
  if (!section) {
    return new Response("Not Found", { status: 404 });
  }
  const imageSrc = await readPublicAsset(backgroundImage);
  const element = createOgElement(section.title, imageSrc);

  const { regular, bold } = await loadSpaceMono();

  return new ImageResponse(element as any, {
    width,
    height,
    fonts:
      regular && bold
        ? [
            {
              name: "Space Mono",
              data: bold,
              weight: 700,
              style: "normal",
            },
            {
              name: "Space Mono",
              data: regular,
              weight: 400,
              style: "normal",
            },
          ]
        : undefined,
  });
};
