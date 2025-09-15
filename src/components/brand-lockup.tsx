"use client";

import Link from "next/link";
import { StomaticLogo } from "@/components/stomatic-logo";

type BrandLockupProps = {
  variant?: "header" | "landing";
  href?: string;
  className?: string;
};

export function BrandLockup({
  variant = "header",
  href = "/",
  className,
}: BrandLockupProps) {
  const isHeader = variant === "header";
  const logoSize = isHeader ? 40 : 64;
  const textClass = isHeader
    ? "text-5xl font-semibold tracking-tight leading-none -translate-y-[5px]"
    : "text-5xl sm:text-6xl font-semibold tracking-tight leading-none  -translate-y-[7px]";

  const content = (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <div className={`h-[${logoSize}px] w-[${logoSize}px] shrink-0 -my-2`}>
        <StomaticLogo size={logoSize} className="block h-full w-full" />
      </div>
      <span className={textClass}>stomatiq</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2">
        {content}
      </Link>
    );
  }

  return content;
}
