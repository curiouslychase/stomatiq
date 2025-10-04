import RSS from 'rss';
import { getAllSpecSectionsMeta } from '@/lib/spec';
import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  const sections = getAllSpecSectionsMeta();

  const feed = new RSS({
    title: 'stomatiq - AI Workflow Open Spec',
    description: 'A common language for weaving together modular programmatic steps with agentic intelligence.',
    feed_url: 'https://stomatiq.com/rss/workflow.xml',
    site_url: 'https://stomatiq.com',
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  const specDirectory = path.join(process.cwd(), 'content', 'ai-workflow-open-spec');

  sections.forEach((section) => {
    const sectionUrl = `https://stomatiq.com/ai-workflow-open-spec/${section.slug}/`;

    // Try to get file modification time for more accurate dates
    let pubDate = new Date();
    try {
      const filePath = path.join(specDirectory, section.fileName);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        pubDate = stats.mtime;
      }
    } catch (error) {
      // Fallback to current date if we can't read file stats
      console.error(`Could not get file stats for ${section.fileName}:`, error);
    }

    feed.item({
      title: section.title,
      description: `Section ${section.order}: ${section.title}`,
      url: sectionUrl,
      date: pubDate,
      guid: sectionUrl,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
