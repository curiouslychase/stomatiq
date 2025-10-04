import RSS from 'rss';
import { getAllPostsMeta } from '@/lib/posts';

export async function GET() {
  const posts = getAllPostsMeta();

  const feed = new RSS({
    title: 'stomatiq - Blog Posts',
    description: 'Essays and updates on product, engineering, and AI at Stomatiq.',
    feed_url: 'https://stomatiq.com/rss/posts.xml',
    site_url: 'https://stomatiq.com',
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  posts.forEach((post) => {
    // Use category-based URL if available, fallback to newsletter
    const postUrl = post.categorySlug
      ? `https://stomatiq.com/${post.categorySlug}/${post.slug}/`
      : `https://stomatiq.com/newsletter/${post.slug}/`;

    feed.item({
      title: post.title,
      description: post.excerpt || post.description || '',
      url: postUrl,
      date: new Date(post.date),
      categories: post.tags || [],
      author: post.author,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
