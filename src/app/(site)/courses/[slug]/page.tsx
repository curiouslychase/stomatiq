import Image from "next/image";
import Link from "next/link";
import { getCourse, listCourseSlugs } from "@/lib/courses";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return listCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "Course" };
  return {
    title: course.title,
    description: course.excerpt || undefined,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return null;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {course.cover ? (
        <div className="relative mb-8 aspect-[16/5] w-full overflow-hidden rounded-md border border-black/[.08] dark:border-white/[.12] bg-black/5 dark:bg-white/5">
          <Image
            src={course.cover}
            alt="Cover"
            fill
            className="object-cover"
            sizes="(min-width:1024px) 896px, 100vw"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <aside className="order-2 lg:order-1 text-sm text-foreground/70">
          <div className="mt-3 text-xs">
            {new Date(course.date).toLocaleDateString()} ·{" "}
            {course.readingMinutes} min read
          </div>
          {course.level ? (
            <div className="mt-2 text-xs uppercase tracking-wide">
              {course.level}
            </div>
          ) : null}
          {course.duration ? (
            <div className="mt-1">Duration: {course.duration}</div>
          ) : null}
          {typeof course.price === "number" ? (
            <div className="mt-1 font-medium">Price: ${course.price}</div>
          ) : null}
          <div className="mt-6">
            <Link
              href="#enroll"
              className="inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 text-sm font-medium"
            >
              Enroll Now
            </Link>
          </div>
        </aside>

        <article className="order-1 lg:order-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            {course.title}
          </h1>
          {course.excerpt ? (
            <p className="mt-3 text-lg text-foreground/70">
              {course.excerpt}
            </p>
          ) : null}
          <div
            className="prose-wrapper mt-8 leading-8 text-[17px] text-foreground/80"
            dangerouslySetInnerHTML={{ __html: course.contentHtml }}
          />
          <div id="enroll" className="mt-10">
            <Link
              href="#"
              className="inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-base font-medium"
            >
              Enroll Now
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
