import type { MetadataRoute } from "next";
import { getPublishedPosts, getAllTags, getAllCategories } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  const postUrls = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slugAsParams}`,
    lastModified: new Date(post.updated ?? post.date),
  }));

  const tagUrls = tags.map((tag) => ({
    url: `${siteConfig.url}/tags/${tag}`,
    lastModified: new Date(),
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${siteConfig.url}/categories/${cat.toLowerCase()}`,
    lastModified: new Date(),
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    { url: `${siteConfig.url}/tags`, lastModified: new Date() },
    { url: `${siteConfig.url}/categories`, lastModified: new Date() },
    ...postUrls,
    ...tagUrls,
    ...categoryUrls,
  ];
}
