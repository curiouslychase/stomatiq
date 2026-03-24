"use client";

import { useEffect, useRef } from "react";

interface DotDividerProps {
  className?: string;
  animate?: boolean;
}

export function DotDivider({ className = "", animate = false }: DotDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <div
      ref={ref}
      className={`${animate ? "dot-divider-animate" : ""} ${className}`}
      style={{
        width: "100%",
        height: "2px",
        background: "repeating-linear-gradient(to right, var(--color-border) 0px, var(--color-border) 2px, transparent 2px, transparent 8px)",
      }}
    />
  );
}
