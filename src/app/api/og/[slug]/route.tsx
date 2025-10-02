import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { getPostMeta } from "@/lib/posts";
import { getAllSpecSectionsMeta } from "@/lib/spec";

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

const REGULAR_FONT_PATH =
  "@fontsource/space-mono/files/space-mono-latin-400-normal.woff";
const BOLD_FONT_PATH =
  "@fontsource/space-mono/files/space-mono-latin-700-normal.woff";

let cachedRegularFont: ArrayBuffer | null = null;
let cachedBoldFont: ArrayBuffer | null = null;

const require = createRequire(import.meta.url);

const MIME_BY_EXTENSION: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

async function loadFont(relativePath: string): Promise<ArrayBuffer | null> {
  try {
    const resolved = require.resolve(relativePath);
    const data = await fs.readFile(resolved);
    const buffer = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength
    );
    return buffer instanceof ArrayBuffer ? buffer : null;
  } catch {
    return null;
  }
}

async function getRegularFont(): Promise<ArrayBuffer | null> {
  if (!cachedRegularFont) {
    cachedRegularFont = await loadFont(REGULAR_FONT_PATH);
  }
  return cachedRegularFont;
}

async function getBoldFont(): Promise<ArrayBuffer | null> {
  if (!cachedBoldFont) {
    cachedBoldFont = await loadFont(BOLD_FONT_PATH);
  }
  return cachedBoldFont;
}

async function resolveBackgroundImage(
  coverSource: string,
  request: Request
): Promise<string> {
  if (!coverSource) return coverSource;
  if (coverSource.startsWith("data:")) return coverSource;

  const tryReadFile = async (filePath: string) => {
    try {
      const data = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const mimeType = MIME_BY_EXTENSION[ext] ?? "image/png";
      const base64 = Buffer.from(data).toString("base64");
      return `data:${mimeType};base64,${base64}`;
    } catch {
      return null;
    }
  };

  if (coverSource.startsWith("/")) {
    const publicPath = path.join(
      process.cwd(),
      "public",
      coverSource.replace(/^\//, "")
    );
    const asData = await tryReadFile(publicPath);
    if (asData) return asData;
  }

  try {
    const url = new URL(coverSource, request.url);
    // Attempt to read from filesystem again if url points to same host and is local asset
    if (
      url.origin === new URL(request.url).origin &&
      url.pathname.startsWith("/")
    ) {
      const localPath = path.join(
        process.cwd(),
        "public",
        url.pathname.replace(/^\//, "")
      );
      const asData = await tryReadFile(localPath);
      if (asData) return asData;
    }

    const response = await fetch(url);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const ext = path.extname(url.pathname).toLowerCase();
      const mimeType =
        MIME_BY_EXTENSION[ext] ??
        response.headers.get("content-type") ??
        "image/png";
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      return `data:${mimeType};base64,${base64}`;
    }
  } catch {
    // ignore failures and fall through
  }

  return coverSource;
}

function Logo() {
  return (
    <svg
      viewBox="0 0 1191 1178"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse
          cx="159.468"
          cy="113.171"
          rx="159.468"
          ry="113.171"
          transform="matrix(1 0 0 -1 417 226.342)"
        />
        <ellipse
          cx="159.468"
          cy="113.171"
          rx="159.468"
          ry="113.171"
          transform="matrix(0 1 1 0 924.238 414.643)"
        />
        <ellipse
          cx="159.468"
          cy="113.171"
          rx="159.468"
          ry="113.171"
          transform="matrix(-1 0 0 1 735.937 921.88)"
        />
        <ellipse
          cx="159.468"
          cy="113.171"
          rx="159.468"
          ry="113.171"
          transform="matrix(0 -1 -1 0 228.7 733.579)"
        />
        <ellipse cx="575.757" cy="574.351" rx="128.757" ry="127.351" />
        <ellipse
          cx="308.178"
          cy="294.178"
          rx="128.481"
          ry="88.1456"
          transform="rotate(-45 308.178 294.178)"
        />
        <ellipse
          cx="841.281"
          cy="304.178"
          rx="128.481"
          ry="88.1456"
          transform="rotate(45 841.281 304.178)"
        />
        <ellipse
          cx="841.281"
          cy="827.281"
          rx="128.481"
          ry="88.1456"
          transform="rotate(135 841.281 827.281)"
        />
        <ellipse
          cx="308.178"
          cy="837.281"
          rx="128.481"
          ry="88.1456"
          transform="rotate(-135 308.178 837.281)"
        />
      </g>
    </svg>
  );
}

function normalizeSlug(raw: string): string {
  return raw.replace(/\.png$/i, "");
}

type ParamsContext = { params: { slug: string } | Promise<{ slug: string }> };

export async function GET(request: Request, context: ParamsContext) {
  const rawParams = await Promise.resolve(context.params);
  const slugParam = Array.isArray(rawParams.slug)
    ? rawParams.slug[0]
    : rawParams.slug;
  const slug = normalizeSlug(slugParam ?? "");

  if (!slug) {
    return new NextResponse("Not Found", { status: 404 });
  }
  const post = getPostMeta(slug);
  const specMeta = getAllSpecSectionsMeta().find(
    (section) => section.slug === slug
  );

  if (!post && !specMeta) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const [regularFont, boldFont] = await Promise.all([
    getRegularFont(),
    getBoldFont(),
  ]);

  const title = (post?.title ?? specMeta?.title ?? slug).toUpperCase();
  const description =
    post?.description ??
    post?.excerpt ??
    "A common language for weaving modular workflows with agentic intelligence.";
  const coverSource = post?.cover ?? post?.thumbnail ?? "/images/wave-001.png";
  const backgroundImage = await resolveBackgroundImage(coverSource, request);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          color: "#f8fafc",
          fontFamily: '"Space Mono", "Geist Mono", monospace',
          overflow: "hidden",
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "72px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              alignItems: "flex-start",
            }}
          >
            <h1
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.72)",
                padding: "28px 32px",
                display: "flex",
                fontSize: 64,
                lineHeight: 1.08,
                fontWeight: 400,
                margin: 0,
                fontFamily: '"Space Mono", "Geist Mono", monospace',
                letterSpacing: 4,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.68)",
                padding: "24px 32px",
                display: "flex",
                maxWidth: "70%",
                fontSize: 24,
                lineHeight: 1.4,
                margin: 0,
                color: "rgba(226, 232, 240, 0.92)",
                fontFamily: '"Space Mono", "Geist Mono", monospace',
              }}
            >
              {description}
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 48,
              right: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              color: "#f8fafc",
              padding: 12,
            }}
          >
            <Logo />
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        ...(regularFont
          ? [{ name: "Space Mono", data: regularFont, weight: 400 as const }]
          : []),
        ...(boldFont
          ? [{ name: "Space Mono", data: boldFont, weight: 700 as const }]
          : []),
      ],
    }
  );
}
