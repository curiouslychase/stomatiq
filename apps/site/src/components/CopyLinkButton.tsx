"use client";

import { Check, ChevronDown, FileText, Link } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CopyButtonsProps {
  url: string;
  markdown: string;
  title: string;
}

const CHAT_OPTIONS = [
  { value: "discuss", label: "Discuss this article" },
  { value: "eli5", label: "ELI5 (Explain Like I'm 5)" },
  { value: "critique", label: "Critical analysis" },
  { value: "summary", label: "Summarize key points" },
] as const;

export function CopyButtons({ url, markdown }: CopyButtonsProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    } catch (err) {
      console.error("Failed to copy markdown:", err);
    }
  };

  const getPromptText = (optionValue: string) => {
    let promptPrefix = "";

    switch (optionValue) {
      case "eli5":
        promptPrefix =
          "Please read this article and explain it like I'm 5 years old";
        break;
      case "critique":
        promptPrefix =
          "Please read this article and provide a critical analysis, including strengths, weaknesses, and alternative perspectives";
        break;
      case "summary":
        promptPrefix = "Please read this article and summarize the key points";
        break;
      default:
        promptPrefix = "I'd like to discuss this article with you";
    }

    return `${promptPrefix}: ${url}`;
  };

  const getChatUrl = (optionValue: string) => {
    const prompt = getPromptText(optionValue);
    // Use encodeURIComponent then convert %20 to + for form-style encoding
    const encodedPrompt = encodeURIComponent(prompt).replace(/%20/g, "+");
    return `https://chatgpt.com/?q=${encodedPrompt}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={handleCopyLink}
          className="group relative flex items-center justify-center rounded-lg border border-foreground/20 bg-background p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Copy link to clipboard"
        >
          {copiedLink ? (
            <Check className="h-4 w-4" />
          ) : (
            <Link className="h-4 w-4" />
          )}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
            {copiedLink ? "Copied!" : "Copy Link"}
          </span>
        </button>
        <button
          onClick={handleCopyMarkdown}
          className="group relative flex items-center justify-center rounded-lg border border-foreground/20 bg-background p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Copy as markdown"
        >
          {copiedMarkdown ? (
            <Check className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
            {copiedMarkdown ? "Copied!" : "Copy as Markdown"}
          </span>
        </button>
        <div className="relative flex-1" ref={dropdownRef}>
          <div className="flex gap-0">
            <a
              href={getChatUrl("discuss")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-l-lg border border-r-0 border-foreground/20 bg-background px-4 py-2 text-sm font-medium uppercase tracking-[0.1em] !text-foreground/80 !no-underline transition-colors hover:bg-foreground/5 hover:!text-foreground"
              aria-label="Chat with ChatGPT"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
              </svg>
              <span>ChatGPT</span>
            </a>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center rounded-r-lg border border-foreground/20 bg-background px-2 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Select chat option"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-64 rounded-lg border border-foreground/20 bg-background shadow-lg">
              {CHAT_OPTIONS.map((option) => (
                <a
                  key={option.value}
                  href={getChatUrl(option.value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-left text-sm !text-foreground/80 !no-underline transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-foreground/5"
                >
                  {option.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
