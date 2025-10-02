import Link from 'next/link';
import StomaticLogo from './StomaticLogo';
import ThemeToggle from './ThemeToggle';

export default function SiteFooter() {
  return (
    <footer className="w-screen p-6 mt-auto">
      <div className="relative bg-background rounded-2xl border border-foreground/[.08] max-w-6xl mx-auto">
        <div className="absolute left-6 bottom-6">
          <div className="h-[40px] w-[40px] text-foreground/90">
            <StomaticLogo className="block h-full w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 items-start">
          <div className="hidden md:block md:col-span-2"></div>
          <div className="flex flex-col items-end gap-4 md:col-start-3">
            <nav
              className="grid w-full justify-items-end gap-y-3 text-[11px] uppercase text-foreground/70 md:w-auto md:text-xs md:grid-cols-2 md:gap-y-2 md:gap-x-6 mb-5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <div className="flex flex-col gap-2 md:items-end">
                <Link href="/aboutique" className="hover:text-foreground">Aboutique</Link>
                <Link href="/newsletter" className="hover:text-foreground">Newsletter</Link>
                <Link href="/podcast" className="hover:text-foreground">Podcast</Link>
                <Link href="/products" className="hover:text-foreground">Products</Link>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <Link href="/courses" className="hover:text-foreground">Courses</Link>
                <Link href="/consulting" className="hover:text-foreground">Consulting</Link>
                <Link href="/rss.xml" className="hover:text-foreground" prefetch={false}>RSS</Link>
              </div>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
