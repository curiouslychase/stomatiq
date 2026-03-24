"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

function getResolvedTheme(theme: Theme): "dark" | "light" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("stomatiq-theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("stomatiq-theme", theme);
    document.documentElement.setAttribute("data-theme", getResolvedTheme(theme));

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        document.documentElement.setAttribute("data-theme", getResolvedTheme("system"));
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const iconColor = (t: Theme) => t === theme ? "var(--color-accent)" : "var(--color-text-muted)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {/* Moon (dark) */}
      <button
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        style={{ padding: "6px", background: "none", border: "none", cursor: "pointer", display: "flex" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor("dark")} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
      {/* Sun (light) */}
      <button
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        style={{ padding: "6px", background: "none", border: "none", cursor: "pointer", display: "flex" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor("light")} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </button>
      {/* Monitor (system) */}
      <button
        onClick={() => setTheme("system")}
        aria-label="System theme"
        style={{ padding: "6px", background: "none", border: "none", cursor: "pointer", display: "flex" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor("system")} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </button>
    </div>
  );
}
