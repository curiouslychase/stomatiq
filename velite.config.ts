import rehypePrettyCode from "rehype-pretty-code";
import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug("posts"),
      description: s.string().max(999),
      date: s.isodate(),
      updated: s.isodate().optional(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
      category: s.string().optional(),
      author: s.string().default("Stomatiq"),
      image: s.string().optional(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      toc: s.toc(),
      content: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
      permalink: `/blog/${data.slug}`,
    })),
});

const categories = defineCollection({
  name: "Category",
  pattern: "categories/categories.yml",
  schema: s.object({
    name: s.string(),
    slug: s.slug("categories"),
    description: s.string().optional(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, categories },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode as never,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
        },
      ],
    ],
  },
});
