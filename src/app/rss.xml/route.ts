import { getAllPostsMeta, getPost } from "@/lib/posts";
import RSS from "rss";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const feed = new RSS({
    title: "Stomatiq Blog",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
  });

  const metas = getAllPostsMeta();
  for (const meta of metas) {
    const full = await getPost(meta.slug);
    if (!full) continue;
    feed.item({
      title: full.title,
      url: `${siteUrl}/posts/${full.slug}`,
      date: new Date(full.date),
      description: full.excerpt || "",
      guid: full.slug,
    });
  }

  const xml = feed.xml({ indent: true });
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
