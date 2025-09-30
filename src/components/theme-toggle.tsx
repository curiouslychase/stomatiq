"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { IconType } from "react-icons";
import { BiSolidLeaf } from "react-icons/bi";

type ThemeOption = {
  id: string;
  label: string;
  icon?: IconType;
};

const themes: ThemeOption[] = [
  { id: "light", label: "Linen" },
  { id: "dark", label: "Space Cadet" },
  { id: "vibe", label: "Vibe", icon: BiSolidLeaf },
  { id: "system", label: "System" },
];

export function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const active = theme === "system" ? systemTheme : resolvedTheme;

  const activeTheme = themes.find((t) => t.id === active);

  return (
    <div className="relative flex items-center gap-2">
      {activeTheme?.icon ? (
        <activeTheme.icon className="h-4 w-4" aria-hidden />
      ) : null}
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
