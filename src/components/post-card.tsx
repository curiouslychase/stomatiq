import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TagBadge } from "@/components/tag-badge";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}

export function PostCard({ title, description, date, slug, tags }: PostCardProps) {
  return (
    <Card className="transition-colors hover:bg-muted/50">
      <Link href={`/blog/${slug}`}>
        <CardHeader>
          <time className="text-sm text-muted-foreground">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
