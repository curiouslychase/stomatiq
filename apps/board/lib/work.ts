import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface WorkItem {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  assignee: string | null;
  tags: string[];
  created: string;
  started: string | null;
  finished: string | null;
  related: string[];
  content: string;
  folder: string;
  filename: string;
}

const workDirectory = path.join(process.cwd(), '../../work');

export function getAllWorkItems(): WorkItem[] {
  const folders = ['active', 'done', 'cancelled'];
  const workItems: WorkItem[] = [];

  folders.forEach((folder) => {
    const folderPath = path.join(workDirectory, folder);

    if (!fs.existsSync(folderPath)) {
      return;
    }

    const files = fs.readdirSync(folderPath);

    files.forEach((filename) => {
      if (filename.endsWith('.md')) {
        const filePath = path.join(folderPath, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        workItems.push({
          id: data.id || filename.replace('.md', ''),
          title: data.title || 'Untitled',
          type: data.type || 'unknown',
          status: data.status || 'unknown',
          priority: data.priority || 'medium',
          assignee: data.assignee || null,
          tags: data.tags || [],
          created: data.created || '',
          started: data.started || null,
          finished: data.finished || null,
          related: data.related || [],
          content,
          folder,
          filename,
        });
      }
    });
  });

  return workItems;
}

export function getWorkItemsByFolder(folder: string): WorkItem[] {
  const allItems = getAllWorkItems();
  return allItems.filter((item) => item.folder === folder);
}

export function getWorkItemsByStatus(status: string): WorkItem[] {
  const allItems = getAllWorkItems();
  return allItems.filter((item) => item.status === status);
}
