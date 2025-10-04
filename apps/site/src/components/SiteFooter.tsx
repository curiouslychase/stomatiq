import Link from "next/link";
import StomaticLogo from "./StomaticLogo";
import ThemeToggle from "./ThemeToggle";
import NewsletterSubscribe from "./NewsletterSubscribe";

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
          <div className="hidden md:block md:col-span-2 pl-2">
            <div className="max-w-md space-y-3">
              <p className="text-xs text-foreground/60 uppercase tracking-wider">
                Essays & updates, occasionally
              </p>
              <NewsletterSubscribe
                heading=""
                description=""
                placeholder="email"
                buttonLabel="→"
                className=""
                formClassName=""
                layout="inline"
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 md:col-start-3">
            <nav
              className="flex flex-col gap-2 items-end text-[11px] uppercase text-foreground/70 md:text-xs mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <Link href="/newsletter" className="hover:text-foreground">
                Newsletter
              </Link>
              <Link href="/rss/posts.xml" className="hover:text-foreground">
                RSS
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
