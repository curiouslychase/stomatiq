import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCourse, listCourseSlugs } from '@/lib/courses';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export async function generateStaticParams() {
  const slugs = listCourseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.title} – Course | stomatiq`,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const { Content } = course;
  const priceDisplay = typeof course.price === 'number' ? priceFormatter.format(course.price) : null;

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-0 py-10">
      <article className="space-y-12">
        <header className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl bg-foreground/80 pb-10 pt-40 text-white">
            <Image
              src={course.cover ?? '/images/wave-001.png'}
              alt=""
              fill
              className="pointer-events-none object-cover"
              loading="lazy"
              aria-hidden="true"
            />
            <div className="relative space-y-4 px-6 md:px-10">
              <h1 className="bg-black/80 p-4 text-4xl font-mono uppercase tracking-[0.2em] md:text-5xl w-fit">
                {course.title}
              </h1>
              {course.excerpt && (
                <p className="italic max-w-2xl bg-black/80 px-4 py-3 text-[16px] leading-7 text-white/90 w-fit">
                  {course.excerpt}
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="mt-8 flex flex-col-reverse gap-10 lg:flex-row">
          <aside className="space-y-4 self-start rounded-2xl border border-foreground/10 bg-background-alt/40 p-6 shadow-sm lg:sticky lg:top-24 lg:w-72 lg:flex-shrink-0">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Course Details
              </h2>
              <dl className="space-y-4 text-sm text-foreground/80">
                {course.level && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                      Level
                    </dt>
                    <dd>{course.level}</dd>
                  </div>
                )}
                {course.duration && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                      Duration
                    </dt>
                    <dd>{course.duration}</dd>
                  </div>
                )}
                {priceDisplay && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                      Price
                    </dt>
                    <dd>{priceDisplay}</dd>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                    Reading Time
                  </dt>
                  <dd>{course.readingMinutes} min</dd>
                </div>
                {course.tags && course.tags.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                      Tags
                    </dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                        {course.tags.map((tag) => (
                          <li key={tag} className="rounded-full border border-foreground/15 px-3 py-1">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>

          <div className="prose-wrapper mx-auto max-w-3xl space-y-6 text-[15px] leading-7 text-foreground/80 [&_strong]:text-foreground lg:mx-0 lg:flex-1">
            <div
              className="space-y-6 font-serif text-foreground"
              data-heading-scope
              data-heading-variant="mono"
            >
              <Content />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
