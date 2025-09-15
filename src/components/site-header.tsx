"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLockup } from "@/components/brand-lockup";

export function SiteHeader() {
  const pathname = usePathname();
  if (process.env.NODE_ENV === "production" && pathname === "/") {
    return null;
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[.08] dark:border-white/[.12] bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="mt-3 flex flex-col items-center">
          <BrandLockup variant="header" />
          <nav className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-black/80 dark:text-white/80">
            <Link href="/newsletter" className="hover:underline">
              Newsletter
            </Link>
            <Link href="/podcast" className="hover:underline">
              Podcast
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <Link href="/courses" className="hover:underline">
              Courses
            </Link>
            <Link href="/consulting" className="hover:underline">
              Consulting
            </Link>
            <Link href="/merch" className="hover:underline">
              Merch
            </Link>
            <Link href="/rss.xml" className="hover:underline" prefetch={false}>
              RSS
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
