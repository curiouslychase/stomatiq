"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StomaticLogo from "./StomaticLogo";
import NewsletterSubscribe from "./NewsletterSubscribe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-4 z-40 w-screen px-4 md:px-6">
        <div className="relative w-full rounded-lg max-w-6xl mx-auto border border-foreground/[.06] bg-background">
          <div className="px-4 py-2 md:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="md:h-[40px] md:w-[40px] h-[48px] w-[48px] shrink-0 -my-2">
                  <StomaticLogo className="block h-full w-full" />
                </div>
                <span
                  className="text-2xl sm:text-3xl font-semibold tracking-tight leading-none md:block hidden -mt-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  stomatiq
                </span>
              </Link>

              {/* Desktop nav */}
              <nav
                className="hidden md:flex items-center gap-6 text-[13px] uppercase text-foreground/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <Link href="/aboutique" className="hover:underline">
                  About
                </Link>
                <Link href="/newsletter" className="hover:underline">
                  Newsletter
                </Link>
                <Button
                  onClick={() => setSubscribeOpen(true)}
                  className="uppercase font-bold cursor-pointer"
                  size="lg"
                >
                  Subscribe
                </Button>
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden inline-flex items-center justify-center px-3 py-2 text-sm text-foreground/80"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Open menu"
              >
                <span className="sr-only">Menu</span>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="h-full md:hidden fixed inset-0 z-50 bg-[rgb(var(--overlay))] backdrop-blur min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div className="mx-auto h-full w-full max-w-2xl px-3 py-3">
            <div className="flex h-10 items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="h-[32px] w-[32px] shrink-0">
                  <StomaticLogo className="block h-full w-full" />
                </div>
                <span
                  className="text-xl font-semibold tracking-tight leading-none"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  stomatiq
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-3 py-2 text-sm"
                aria-label="Close menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav
              className="mt-8 flex flex-col gap-6 text-base uppercase text-foreground/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <Link
                href="/aboutique"
                className="hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/newsletter"
                className="hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Newsletter
              </Link>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSubscribeOpen(true);
                }}
                size="lg"
                className="uppercase font-bold w-fit cursor-pointer"
              >
                Subscribe
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Subscribe modal */}
      <Dialog open={subscribeOpen} onOpenChange={setSubscribeOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Subscribe to newsletter
            </DialogTitle>
          </DialogHeader>
          <NewsletterSubscribe
            variant="article"
            className="border-0 shadow-none p-0"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
