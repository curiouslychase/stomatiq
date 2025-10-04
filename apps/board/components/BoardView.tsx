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

  const activeItems = filteredItems.filter(item => item.folder === 'active');
  const doneItems = filteredItems.filter(item => item.folder === 'done');
  const cancelledItems = filteredItems.filter(item => item.folder === 'cancelled');

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
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Work Board</h1>
          <p className="text-sm text-gray-500 mt-1">
            {hasActiveFilters
              ? `Showing ${filteredItems.length} of ${workItems.length} items`
              : `Total items: ${workItems.length}`
            }
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          tags={availableTags}
          types={availableTypes}
          selectedTags={selectedTags}
          selectedTypes={selectedTypes}
          onToggleTag={toggleTag}
          onToggleType={toggleType}
          onClearAll={clearAllFilters}
        />

        <div className="flex gap-6 overflow-x-auto pb-4">
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
            color="bg-gray-200"
            onCardClick={setSelectedItem}
          />
        </div>
      </main>

      <WorkItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
