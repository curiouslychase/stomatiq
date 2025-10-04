import RSS from 'rss';
import { getAllCoursesMeta } from '@/lib/courses';

export async function GET() {
  const courses = getAllCoursesMeta();

  const feed = new RSS({
    title: 'stomatiq - Courses',
    description: 'Deep dives and workshops on product, engineering, and AI.',
    feed_url: 'https://stomatiq.com/rss/courses.xml',
    site_url: 'https://stomatiq.com',
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  courses.forEach((course) => {
    const courseUrl = `https://stomatiq.com/courses/${course.slug}/`;

    feed.item({
      title: course.title,
      description: course.excerpt || '',
      url: courseUrl,
      date: new Date(course.date),
      categories: course.tags || [],
      custom_elements: [
        ...(course.level ? [{ level: course.level }] : []),
        ...(course.duration ? [{ duration: course.duration }] : []),
        ...(typeof course.price === 'number' ? [{ price: `$${course.price}` }] : []),
      ],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
