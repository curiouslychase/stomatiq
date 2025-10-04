'use client';

import { WorkItem } from '@/lib/work';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';

interface WorkItemModalProps {
  item: WorkItem | null;
  onClose: () => void;
}

export function WorkItemModal({ item, onClose }: WorkItemModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (item) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <Badge variant="secondary" className="capitalize">
                {item.type}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-mono">{item.id}</span>
              <span className="capitalize">Priority: {item.priority}</span>
              <span>Status: {item.status}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Metadata */}
          <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
            {item.created && (
              <div>
                <span className="font-semibold">Created:</span>{' '}
                {new Date(item.created).toLocaleDateString()}
              </div>
            )}
            {item.started && (
              <div>
                <span className="font-semibold">Started:</span>{' '}
                {new Date(item.started).toLocaleDateString()}
              </div>
            )}
            {item.finished && (
              <div>
                <span className="font-semibold">Finished:</span>{' '}
                {new Date(item.finished).toLocaleDateString()}
              </div>
            )}
            {item.assignee && (
              <div>
                <span className="font-semibold">Assignee:</span> {item.assignee}
              </div>
            )}
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="mb-6">
              <div className="font-semibold text-sm mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related items */}
          {item.related.length > 0 && (
            <div className="mb-6">
              <div className="font-semibold text-sm mb-2">Related</div>
              <div className="flex flex-wrap gap-2">
                {item.related.map((relatedId) => (
                  <Badge key={relatedId} variant="secondary" className="font-mono">
                    {relatedId}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Markdown content */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded">
              {item.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
