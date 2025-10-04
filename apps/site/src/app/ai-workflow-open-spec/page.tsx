import { redirect } from 'next/navigation';
import { getAllSpecSectionsMeta } from '@/lib/spec';

export const dynamic = 'force-static';

const INTRO_SLUG = 'introduction';

const heroDescription = "A common language for weaving together modular programmatic steps with agentic intelligence.";

export const metadata = {
  title: 'AI Workflow Open Spec | stomatiq',
  description: heroDescription,
  openGraph: {
    title: 'AI Workflow Open Spec',
    description: heroDescription,
    images: ['/api/og/introduction.png'],
    type: 'article',
  },
};

export default function AIWorkflowOpenSpecPage() {
  const sections = getAllSpecSectionsMeta();

  if (sections.some((section) => section.slug === INTRO_SLUG)) {
    redirect(`/ai-workflow-open-spec/${INTRO_SLUG}`);
  }

  if (sections.length) {
    redirect(`/ai-workflow-open-spec/${sections[0].slug}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-5xl uppercase">AI Workflow Open Spec</h1>
      <p className="mt-3 text-[15px] leading-7 text-foreground/70">
        Specification content is not available.
      </p>
    </main>
  );
}
