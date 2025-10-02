import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllSpecSectionsMeta, getSpecSection } from '@/lib/spec';

export const dynamic = 'force-static';

const heroDescription = "A common language for weaving together modular programmatic steps with agentic intelligence.";

export async function generateStaticParams() {
  const sections = getAllSpecSectionsMeta();
  return sections.map((section) => ({
    slug: section.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = await getSpecSection(slug);

  if (!section) {
    return {
      title: 'Section Not Found',
    };
  }

  const pageTitle = `AI Workflow Open Spec – ${section.title}`;
  const ogImage = `/api/og/${slug}.png`;

  return {
    title: `${pageTitle} | stomatiq`,
    description: heroDescription,
    openGraph: {
      title: pageTitle,
      description: heroDescription,
      images: [ogImage],
      type: 'article',
    },
  };
}

export default async function SpecSectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = await getSpecSection(slug);

  if (!section) {
    redirect('/ai-workflow-open-spec/');
  }

  const sections = getAllSpecSectionsMeta();
  const { Content } = section;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row lg:px-0">
      <article className="prose-wrapper flex-1">
        <header>
          <div className="relative overflow-hidden rounded-3xl bg-foreground/80 pb-10 pt-40 text-white">
            <Image
              src="/images/wave-001.png"
              alt=""
              fill
              className="pointer-events-none object-cover opacity-100"
              loading="lazy"
              aria-hidden="true"
            />
            <div className="relative space-y-4 px-4">
              <h1 className="p-4 bg-black/80 inline-block text-5xl font-mono uppercase">
                AI Workflow Open Spec
              </h1>
              <p className="px-4 py-2 bg-black/80 inline-block text-[16px] leading-7 text-white/90 italic">
                {heroDescription}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 flex flex-col-reverse lg:flex-row gap-10">
          <aside className="lg:w-72 lg:flex-shrink-0 lg:sticky lg:top-24 self-start">
            <h2 className="text-sm font-semibold uppercase text-foreground/60">
              Specification Sections
            </h2>
            <ol className="mt-4 space-y-2 text-sm !list-none !pl-0">
              {sections.map((item, index) => (
                <li key={item.slug}>
                  <Link
                    href={`/ai-workflow-open-spec/${item.slug}/`}
                    className={`flex items-center gap-4 rounded-md px-4 py-2 transition hover:bg-foreground/5 ${item.slug === section.slug ? 'bg-foreground/10 font-semibold' : 'bg-transparent'}`}
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-foreground/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-5 text-left">
                      {item.title.replace(/^\s*\d+\.\s*/, '')}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>

          <div>
            <div
              className="spec-content space-y-6 text-[15px] leading-7 text-foreground/80 [&_strong]:text-foreground"
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
