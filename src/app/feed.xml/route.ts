import { Feed } from "feed";
import { getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  const posts = getPublishedPosts();

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    author: {
      name: siteConfig.author,
      link: siteConfig.url,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slugAsParams}`,
      link: `${siteConfig.url}/blog/${post.slugAsParams}`,
      description: post.description,
      date: new Date(post.date),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
