"use client";

import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function MagneticButton({ children, href, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8;
    const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 8;
    setOffset({ x, y });
    setHovered(true);
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-block",
        padding: "0.75rem 1.75rem",
        backgroundColor: "var(--color-accent)",
        color: "#fff",
        border: "1px solid var(--color-accent-hover)",
        borderRadius: "2px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontWeight: 500,
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        textDecoration: "none",
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${hovered ? 1.02 : 1})`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </a>
  );
}
