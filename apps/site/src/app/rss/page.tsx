import Link from 'next/link';

export const metadata = {
  title: 'RSS Feeds | stomatiq',
  description: 'Subscribe to stomatiq content via RSS feeds.',
};

const feeds = [
  {
    title: 'Blog Posts',
    url: '/rss/posts.xml',
    description: 'Essays and updates on product, engineering, and AI at Stomatiq.',
  },
  {
    title: 'Courses',
    url: '/rss/courses.xml',
    description: 'Deep dives and workshops on product, engineering, and AI.',
  },
  {
    title: 'AI Workflow Open Spec',
    url: '/rss/workflow.xml',
    description: 'A common language for weaving together modular programmatic steps with agentic intelligence.',
  },
];

export default function RSSPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">RSS Feeds</h1>
      <p className="mt-3 text-[15px] leading-7 text-foreground/70">
        Subscribe to stomatiq content updates via RSS. Choose from the feeds below to stay updated on new posts, courses, and AI workflow spec changes.
      </p>

      <div className="mt-10 space-y-6">
        {feeds.map((feed) => (
          <article
            key={feed.url}
            className="rounded-xl border border-foreground/10 bg-background p-6 transition hover:border-foreground/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  {feed.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {feed.description}
                </p>
                <Link
                  href={feed.url}
                  className="mt-4 inline-flex items-center text-sm font-medium text-foreground hover:text-foreground/80"
                >
                  Subscribe
                  <svg
                    className="ml-2 h-4 w-4"
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
                </Link>
              </div>
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-foreground/40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-foreground/10 bg-background-alt/40 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
          How to use RSS
        </h3>
        <p className="mt-3 text-sm leading-6 text-foreground/70">
          RSS (Really Simple Syndication) allows you to subscribe to content updates and read them in your favorite RSS reader. Popular RSS readers include{' '}
          <a
            href="https://feedly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline hover:text-foreground/80"
          >
            Feedly
          </a>
          ,{' '}
          <a
            href="https://www.inoreader.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline hover:text-foreground/80"
          >
            Inoreader
          </a>
          , and{' '}
          <a
            href="https://netnewswire.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline hover:text-foreground/80"
          >
            NetNewsWire
          </a>
          .
        </p>
      </div>
    </main>
  );
}
