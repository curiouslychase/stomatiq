import { notFound } from "next/navigation";
import Image from "next/image";
import { getPost, getAllPostsMeta } from "@/lib/posts";
import { CopyButtons } from "@/components/CopyLinkButton";

export const dynamic = "force-static";
export const revalidate = false;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatDate = (value: string) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed);
};

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts
    .filter((post) => post.categorySlug)
    .map((post) => ({
      category: post.categorySlug,
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const pageTitle = `${post.title} – Newsletter`;
  const description =
    post.excerpt ??
    "Essays and updates on product, engineering, and AI at Stomatiq.";
  const ogImage = `/api/og/${post.slug}.png`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      images: [ogImage],
      type: "article",
    },
  };
}

export default async function CategoryPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPost(slug);

  if (!post || (post.categorySlug && post.categorySlug !== category)) {
    notFound();
  }

  const { Content } = post;
  const heroDescription =
    post.excerpt ??
    "Essays and updates on product, engineering, and AI at Stomatiq.";

  return (
    <main className="mx-auto max-w-6xl py-10">
      <article className="space-y-12">
        <header className="space-y-8 px-4 md:px-0">
          <div className="relative overflow-hidden rounded-3xl bg-foreground/80 pb-10 pt-40 text-white">
            <Image
              src={post.cover ?? "/images/wave-001.png"}
              alt=""
              fill
              className="pointer-events-none object-cover"
              loading="lazy"
              aria-hidden="true"
            />
            <div className="relative space-y-4 px-6 md:px-10">
              <h1 className="bg-black/80 p-4 text-4xl font-mono uppercase md:text-5xl w-fit">
                {post.title}
              </h1>
              <p className="italic max-w-2xl bg-black/80 px-4 py-3 text-[16px] leading-7 text-white/90 w-fit">
                {heroDescription}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 flex flex-col-reverse gap-10 lg:flex-row px-4 md:px-0">
          <aside className="space-y-4 self-start rounded-2xl border border-foreground/10 bg-background-alt/40 p-6 shadow-sm lg:sticky lg:top-30 lg:w-72 lg:flex-shrink-0">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Post Details
              </h2>
              <dl className="space-y-4 text-sm text-foreground/80">
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                    Published
                  </dt>
                  <dd>{formatDate(post.date)}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                    Reading Time
                  </dt>
                  <dd>{post.readingMinutes} min</dd>
                </div>
                {post.category && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                      Category
                    </dt>
                    <dd>{post.category}</dd>
                  </div>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                      Tags
                    </dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-foreground/15 px-3 py-1"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {post.author && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                      Author
                    </dt>
                    <dd>
                      <div className="flex items-center gap-3 text-sm text-foreground/80">
                        {post.authorAvatar && (
                          <Image
                            src={post.authorAvatar}
                            alt={post.author}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">
                            {post.author}
                          </p>
                          {post.authorBio && (
                            <p className="text-xs leading-5 text-foreground/60">
                              {post.authorBio}
                            </p>
                          )}
                        </div>
                      </div>
                    </dd>
                  </div>
                )}
                <div className="flex flex-col gap-1 pt-2">
                  <dt className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                    Share
                  </dt>
                  <dd>
                    <CopyButtons
                      url={`https://stomatiq.com/${category}/${slug}`}
                      markdown={post.rawMarkdown ?? ""}
                      title={post.title}
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="prose-wrapper w-full space-y-6 text-lg leading-8 text-foreground/80 [&_strong]:text-foreground lg:flex-1">
            <div
              className="space-y-6 font-serif text-foreground"
              data-heading-scope
            >
              <Content />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
