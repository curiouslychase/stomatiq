import Link from 'next/link';
import { getAllCoursesMeta } from '@/lib/courses';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const formatPrice = (value: number | undefined) =>
  typeof value === 'number' ? currencyFormatter.format(value) : null;

export const metadata = {
  title: 'Courses | stomatiq',
};

export default function CoursesPage() {
  const courses = getAllCoursesMeta();

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Courses</h1>
      <p className="mt-3 text-[15px] leading-7 text-foreground/70">
        Deep dives and workshops on product, engineering, and AI.
      </p>

      {courses.length ? (
        <div className="courses-grid relative mt-10 grid grid-cols-1 gap-x-0 gap-y-20 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const price = formatPrice(course.price);
            return (
              <article
                key={course.slug}
                className="courses-item relative group flex h-full flex-col rounded-xl border border-foreground/10 bg-background p-6 transition hover:border-foreground/20"
              >
                <Link
                  href={`/courses/${course.slug}/`}
                  className="flex h-full flex-col no-underline"
                >
                  <div className="text-xs uppercase tracking-wide text-foreground/60">
                    {[course.level, course.duration]
                      .filter(Boolean)
                      .join(' • ')}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight">
                    {course.title}
                  </h2>
                  {course.excerpt && (
                    <p className="mt-3 text-sm leading-6 text-foreground/70">
                      {course.excerpt}
                    </p>
                  )}
                  {course.tags?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-foreground/5 px-3 py-1 text-xs uppercase tracking-wide text-foreground/70"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-auto pt-6 text-sm font-medium text-foreground">
                    <span className="inline-flex items-center">
                      {price ? `${price}` : 'Free'}
                      <svg
                        className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-10 text-sm text-foreground/60">Courses coming soon.</p>
      )}
    </main>
  );
}
