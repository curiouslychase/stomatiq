import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function stripJSXAndHTML(content: string): string {
  let cleaned = content;

  // Remove JSX/HTML blocks (multi-line elements like <div>...</div>)
  // This handles self-closing and paired tags
  cleaned = cleaned.replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, '\n');

  // Remove self-closing JSX/HTML tags
  cleaned = cleaned.replace(/<[^>]+\/>/g, '');

  // Remove opening tags that weren't caught
  cleaned = cleaned.replace(/<[^>]+>/g, '');

  // Remove JSX comments
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // Clean up multiple blank lines (more than 2 consecutive newlines)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Remove lines that are only whitespace
  cleaned = cleaned.split('\n').filter(line => line.trim().length > 0 || line === '').join('\n');

  // Clean up multiple blank lines again after filtering
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Trim whitespace from each line while preserving structure
  cleaned = cleaned.split('\n').map(line => line.trimEnd()).join('\n');

  // Trim overall content
  cleaned = cleaned.trim();

  return cleaned;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const fullPathMd = path.join(postsDirectory, `${slug}.md`);
  const fullPathMdx = path.join(postsDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;

  if (!fullPath || !fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);

  // Strip JSX/HTML to get clean markdown
  const cleanMarkdown = stripJSXAndHTML(content);

  // Add title as H1 at the top if it exists
  const title = data.title ? `# ${data.title}\n\n` : '';
  const markdownWithTitle = title + cleanMarkdown;

  return NextResponse.json({ markdown: markdownWithTitle });
}
