import RSS from 'rss';
import { getAllPostsMeta } from '@/lib/posts';

export async function GET() {
  const posts = getAllPostsMeta();

  const feed = new RSS({
    title: 'stomatiq',
    description: 'Essays and updates on product, engineering, and AI at Stomatiq.',
    feed_url: 'https://stomatiq.com/rss.xml',
    site_url: 'https://stomatiq.com',
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt || post.description || '',
      url: `https://stomatiq.com/newsletter/${post.slug}/`,
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
