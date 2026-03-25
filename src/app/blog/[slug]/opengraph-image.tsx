import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Blog post cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Blog Post";
  const description = post?.description ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            marginBottom: 16,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    ),
    { ...size }
  );
}
