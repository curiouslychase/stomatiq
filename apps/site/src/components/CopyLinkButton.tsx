'use client';

import { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

interface CopyButtonsProps {
  url: string;
  slug: string;
}

export function CopyButtons({ url, slug }: CopyButtonsProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      const response = await fetch(`/api/posts/${slug}/markdown`);
      if (!response.ok) throw new Error('Failed to fetch markdown');
      const data = await response.json();
      await navigator.clipboard.writeText(data.markdown);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    } catch (err) {
      console.error('Failed to copy markdown:', err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-background px-4 py-2 text-sm font-medium uppercase tracking-[0.1em] text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
        aria-label="Copy link to clipboard"
      >
        {copiedLink ? (
          <>
            <Check className="h-4 w-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>Copy Link</span>
          </>
        )}
      </button>
      <button
        onClick={handleCopyMarkdown}
        className="flex items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-background px-4 py-2 text-sm font-medium uppercase tracking-[0.1em] text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
        aria-label="Copy as markdown"
      >
        {copiedMarkdown ? (
          <>
            <Check className="h-4 w-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <FileText className="h-4 w-4" />
            <span>Copy as Markdown</span>
          </>
        )}
      </button>
    </div>
  );
}
