'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';
import { X } from 'lucide-react';

interface FiltersProps {
  tags: { name: string; count: number }[];
  types: { name: string; count: number }[];
  selectedTags: Set<string>;
  selectedTypes: Set<string>;
  onToggleTag: (tag: string) => void;
  onToggleType: (type: string) => void;
  onClearAll: () => void;
}

export function Filters({
  tags,
  types,
  selectedTags,
  selectedTypes,
  onToggleTag,
  onToggleType,
  onClearAll,
}: FiltersProps) {
  const hasActiveFilters = selectedTags.size > 0 || selectedTypes.size > 0;

  const typeOptions = types.map(({ name, count }) => ({
    label: name.charAt(0).toUpperCase() + name.slice(1),
    value: name,
    count,
  }));

  const tagOptions = tags.map(({ name, count }) => ({
    label: name,
    value: name,
    count,
  }));

  const handleTypeChange = (selected: string[]) => {
    const currentTypes = Array.from(selectedTypes);

    // Find removed types
    currentTypes.forEach((type) => {
      if (!selected.includes(type)) {
        onToggleType(type);
      }
    });

    // Find added types
    selected.forEach((type) => {
      if (!currentTypes.includes(type)) {
        onToggleType(type);
      }
    });
  };

  const handleTagChange = (selected: string[]) => {
    const currentTags = Array.from(selectedTags);

    // Find removed tags
    currentTags.forEach((tag) => {
      if (!selected.includes(tag)) {
        onToggleTag(tag);
      }
    });

    // Find added tags
    selected.forEach((tag) => {
      if (!currentTags.includes(tag)) {
        onToggleTag(tag);
      }
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-auto p-1 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Type Filter */}
        {types.length > 0 && (
          <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
            <label className="text-sm font-medium text-muted-foreground pt-2">
              Type
            </label>
            <MultiSelect
              options={typeOptions}
              selected={Array.from(selectedTypes)}
              onChange={handleTypeChange}
              placeholder="Select type..."
              emptyText="No types found."
            />
          </div>
        )}

        {/* Tag Filter */}
        {tags.length > 0 && (
          <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
            <label className="text-sm font-medium text-muted-foreground pt-2">
              Tags
            </label>
            <MultiSelect
              options={tagOptions}
              selected={Array.from(selectedTags)}
              onChange={handleTagChange}
              placeholder="Select tags..."
              emptyText="No tags found."
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
