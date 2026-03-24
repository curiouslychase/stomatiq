import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CategoryNavProps {
  categories: string[];
  active?: string;
}

export function CategoryNav({ categories, active }: CategoryNavProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link key={cat} href={`/categories/${cat.toLowerCase()}`}>
          <Badge
            variant={active?.toLowerCase() === cat.toLowerCase() ? "default" : "outline"}
          >
            {cat}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
