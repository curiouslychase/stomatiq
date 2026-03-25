import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
}

export function TagBadge({ tag, clickable = false }: TagBadgeProps) {
  const badge = (
    <Badge variant="secondary" className="text-xs">
      {tag}
    </Badge>
  );

  if (clickable) {
    return <Link href={`/tags/${tag}`}>{badge}</Link>;
  }

  return badge;
}
