"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const themes = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const active = theme === "system" ? systemTheme : resolvedTheme;

  return (
    <div className="relative">
      <select
        aria-label="Theme"
        className="text-sm rounded-md border px-2 py-1 bg-background"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
