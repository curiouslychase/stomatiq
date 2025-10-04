'use client';

import { useState, useMemo } from 'react';
import { WorkItem } from '@/lib/work';
import { BoardColumn } from './BoardColumn';
import { WorkItemModal } from './WorkItemModal';
import { Filters } from './Filters';

interface BoardViewProps {
  workItems: WorkItem[];
}

export function BoardView({ workItems }: BoardViewProps) {
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  // Extract all unique tags with counts
  const availableTags = useMemo(() => {
    const tagCounts = new Map<string, number>();

    workItems.forEach(item => {
      item.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [workItems]);

  // Extract all unique types with counts
  const availableTypes = useMemo(() => {
    const typeCounts = new Map<string, number>();

    workItems.forEach(item => {
      typeCounts.set(item.type, (typeCounts.get(item.type) || 0) + 1);
    });

    return Array.from(typeCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [workItems]);

  // Filter items based on selected tags and types
  const filteredItems = useMemo(() => {
    let items = workItems;

    if (selectedTags.size > 0) {
      items = items.filter(item =>
        item.tags.some(tag => selectedTags.has(tag))
      );
    }

    if (selectedTypes.size > 0) {
      items = items.filter(item => selectedTypes.has(item.type));
    }

    return items;
  }, [workItems, selectedTags, selectedTypes]);

  const backlogItems = filteredItems.filter(item => item.folder === '00-backlog');
  const upNextItems = filteredItems.filter(item => item.folder === '01-up next');
  const activeItems = filteredItems.filter(item => item.folder === '02-active');
  const cancelledItems = filteredItems.filter(item => item.folder === '03-cancelled');
  const doneItems = filteredItems.filter(item => item.folder === '04-done');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const clearAllFilters = () => {
    setSelectedTags(new Set());
    setSelectedTypes(new Set());
  };

  const hasActiveFilters = selectedTags.size > 0 || selectedTypes.size > 0;

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Work Board</h1>
          <p className="text-sm text-gray-500 mt-1">
            {hasActiveFilters
              ? `Showing ${filteredItems.length} of ${workItems.length} items`
              : `Total items: ${workItems.length}`
            }
          </p>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col overflow-hidden w-full">
        <div className="flex-shrink-0 mb-6">
          <Filters
            tags={availableTags}
            types={availableTypes}
            selectedTags={selectedTags}
            selectedTypes={selectedTypes}
            onToggleTag={toggleTag}
            onToggleType={toggleType}
            onClearAll={clearAllFilters}
          />
        </div>

        <div className="flex gap-6 overflow-x-auto flex-1">
          <BoardColumn
            title="Backlog"
            items={backlogItems}
            color="bg-gray-100"
            onCardClick={setSelectedItem}
          />
          <BoardColumn
            title="Up Next"
            items={upNextItems}
            color="bg-purple-100"
            onCardClick={setSelectedItem}
          />
          <BoardColumn
            title="Active"
            items={activeItems}
            color="bg-blue-100"
            onCardClick={setSelectedItem}
          />
          <BoardColumn
            title="Done"
            items={doneItems}
            color="bg-green-100"
            onCardClick={setSelectedItem}
          />
          <BoardColumn
            title="Cancelled"
            items={cancelledItems}
            color="bg-orange-100"
            onCardClick={setSelectedItem}
          />
        </div>
      </main>

      <WorkItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
