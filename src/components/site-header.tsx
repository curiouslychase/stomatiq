"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "#hero", num: "01", label: "Intro" },
  { href: "#philosophy", num: "02", label: "Philosophy" },
  { href: "#services", num: "03", label: "Services" },
  { href: "#about", num: "04", label: "About" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6">
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "var(--color-text)" }}>
          <Logo size={32} />
          <span style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 500,
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}>
            STOMATIQ
          </span>
        </a>

        <nav className="hidden md:flex" style={{ alignItems: "center", gap: "6px" }}>
          {navLinks.map(({ href, num, label }, i) => (
            <span key={href} style={{ display: "flex", alignItems: "center" }}>
              <a href={href} className="nav-link">
                <span style={{ color: "var(--color-text-muted)", marginRight: "4px" }}>{num}</span>
                {label}
              </a>
              {i < navLinks.length - 1 && (
                <span style={{ margin: "0 8px", color: "var(--color-text-muted)", fontSize: "0.75rem" }}>&middot;</span>
              )}
            </span>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
