import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { Buffer } from "node:buffer";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getPostMeta, listPostSlugs } from "../../../lib/posts";

export async function getStaticPaths() {
  const slugs = listPostSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}

const fallbackCover = "/images/wave-001.png";
const width = 1200;
const height = 630;
const extensionToMime = new Map<string, string>([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
]);
type StyleMap = Record<string, string | number>;
type OgPrimitive = string | number | null | undefined;
type OgChild = OgNode | OgPrimitive;
type OgChildren = OgChild | OgChild[];
interface OgNode {
  type: string;
  props?: {
    style?: StyleMap;
    children?: OgChildren;
    [key: string]: unknown;
  };
}
type ImageElement = Parameters<typeof ImageResponse>[0];
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

async function fetchRemoteAsset(url: string) {
  const response = await fetch(url);
  if (!response.ok) return null;
  const arrayBuffer = await response.arrayBuffer();
  const mime = response.headers.get("content-type") ?? "image/png";
  return `data:${mime};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
}

async function resolveImageSource(src: string | undefined, origin: string) {
  if (!src) {
    return readPublicAsset(fallbackCover);
  }
  if (/^https?:/i.test(src)) {
    const remote = await fetchRemoteAsset(src);
    if (remote) return remote;
  }
  if (src.startsWith("/")) {
    try {
      return await readPublicAsset(src);
    } catch {
      // Ignore and fall through to origin-relative fetch
    }
  }
  const resolved = new URL(src, origin).toString();
  const remote = await fetchRemoteAsset(resolved);
  if (remote) return remote;
  try {
    return await readPublicAsset(fallbackCover);
  } catch {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP4BwQACfsD/QCvknAAAAAASUVORK5CYII=";
  }
}


function formatExcerpt(value: string | undefined) {
  if (!value) return "";
  const trimmed = value.trim();
  if (trimmed.length <= 220) return trimmed;
  return `${trimmed.slice(0, 217).trimEnd()}…`;
}

function createOgElement(title: string, excerpt: string, imageSrc: string) {
  const contentChildren: OgNode[] = [
    {
      type: "div",
      props: {
        style: {
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.05,
          maxWidth: "88%",
          backgroundColor: "rgba(5, 5, 9, 0.82)",
          padding: "22px 28px",
          boxShadow: "0 25px 80px rgba(5,5,9,0.45)",
          alignSelf: "flex-start",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          fontFamily:
            '"Space Mono", "Menlo", "Courier New", monospace',
        },
        children: title.toUpperCase(),
      },
    },
  ];
  if (excerpt) {
    contentChildren.push({
      type: "div",
      props: {
        style: {
          fontSize: 30,
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
        children: excerpt,
      },
    });
  }

  const logoElement: OgNode = {
    type: "div",
    props: {
      style: {
        position: "absolute",
        bottom: "56px",
        right: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "20px",
        color: "#f8fafc",
      },
      children: [
        {
          type: "svg",
          props: {
            viewBox: "0 0 1191 1178",
            width: 96,
            height: 96,
            fill: "none",
            style: {
              display: "block",
            },
            children: {
              type: "g",
              props: {
                fill: "currentColor",
                children: [
                  {
                    type: "ellipse",
                    props: {
                      cx: 159.468,
                      cy: 113.171,
                      rx: 159.468,
                      ry: 113.171,
                      transform: "matrix(1 0 0 -1 417 226.342)",
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 159.468,
                      cy: 113.171,
                      rx: 159.468,
                      ry: 113.171,
                      transform: "matrix(0 1 1 0 924.238 414.643)",
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 159.468,
                      cy: 113.171,
                      rx: 159.468,
                      ry: 113.171,
                      transform: "matrix(-1 0 0 1 735.937 921.88)",
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 159.468,
                      cy: 113.171,
                      rx: 159.468,
                      ry: 113.171,
                      transform: "matrix(0 -1 -1 0 228.7 733.579)",
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 575.757,
                      cy: 574.351,
                      rx: 128.757,
                      ry: 127.351,
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 308.178,
                      cy: 294.178,
                      rx: 128.481,
                      ry: 88.1456,
                      transform: "rotate(-45 308.178 294.178)",
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 841.281,
                      cy: 304.178,
                      rx: 128.481,
                      ry: 88.1456,
                      transform: "rotate(45 841.281 304.178)",
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 841.281,
                      cy: 827.281,
                      rx: 128.481,
                      ry: 88.1456,
                      transform: "rotate(135 841.281 827.281)",
                    },
                  },
                  {
                    type: "ellipse",
                    props: {
                      cx: 308.178,
                      cy: 837.281,
                      rx: 128.481,
                      ry: 88.1456,
                      transform: "rotate(-135 308.178 837.281)",
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  };

  const element: OgNode = {
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
                "linear-gradient(180deg, rgba(5,5,9,0.1) 0%, rgba(5,5,9,0.35) 40%, rgba(5,5,9,0.85) 100%)",
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
            children: contentChildren,
          },
        },
        logoElement,
      ],
    },
  };
  return element;
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

export const GET: APIRoute = async ({ params, request }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response("Not Found", { status: 404 });
  }
  const post = getPostMeta(String(slug));
  if (!post) {
    return new Response("Not Found", { status: 404 });
  }
  const origin = new URL(request.url).origin;
  const imageSrc = await resolveImageSource(post.cover, origin);
  const excerpt = formatExcerpt(post.excerpt ?? post.description);

  const element = createOgElement(post.title, excerpt, imageSrc);

  const { regular, bold } = await loadSpaceMono();
  return new ImageResponse(element as unknown as ImageElement, {
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
