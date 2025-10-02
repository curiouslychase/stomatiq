import { redirect } from 'next/navigation';
import { getAllSpecSectionsMeta } from '@/lib/spec';

export const metadata = {
  title: 'AI Workflow Open Spec | stomatiq',
};

export default function AIWorkflowOpenSpecPage() {
  const sections = getAllSpecSectionsMeta();

  if (sections.length) {
    redirect(`/ai-workflow-open-spec/${sections[0].slug}/`);
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
