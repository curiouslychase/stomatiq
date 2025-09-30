import Link from "next/link";
import { getAllCoursesMeta } from "@/lib/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Deep dives and workshops on product, engineering, and AI.",
};

export default function CoursesPage() {
  const courses = getAllCoursesMeta();
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Courses</h1>
      <p className="mt-3 text-[15px] leading-7 text-foreground/70">
        Deep dives and workshops on product, engineering, and AI.
      </p>

      <div className="courses-grid relative mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-20 overflow-hidden">
        {courses.map((c) => (
          <Link
            key={c.slug}
            href={`/courses/${c.slug}`}
            className="group courses-item relative block px-8 py-8"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-xs uppercase tracking-wide text-foreground/60">
                {c.level || "Course"}
              </div>
              {typeof c.price === "number" ? (
                <div className="text-sm font-medium">${c.price}</div>
              ) : null}
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
              {c.title}
            </h2>
            {c.excerpt ? (
              <p className="mt-3 text-[15px] leading-7 text-foreground/70">
                {c.excerpt}
              </p>
            ) : null}
            <div className="mt-6 text-[15px] font-medium text-foreground/80">
              Learn more{" "}
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
