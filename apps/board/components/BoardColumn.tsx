import { WorkItem } from '@/lib/work';
import { WorkCard } from './WorkCard';

interface BoardColumnProps {
  title: string;
  items: WorkItem[];
  color?: string;
  onCardClick?: (item: WorkItem) => void;
}

export function BoardColumn({ title, items, color = 'bg-gray-100', onCardClick }: BoardColumnProps) {
  return (
    <div className="flex flex-col min-w-80 max-w-sm h-full">
      <div className={`${color} rounded-t-lg px-4 py-3 flex-shrink-0`}>
        <h2 className="font-bold text-lg flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal bg-white bg-opacity-50 px-2 py-1 rounded">
            {items.length}
          </span>
        </h2>
      </div>
      <div className="flex-1 bg-gray-50 rounded-b-lg p-4 space-y-3 overflow-y-auto min-h-0">
        {items.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No items</p>
        ) : (
          items.map((item) => (
            <WorkCard
              key={`${item.folder}-${item.filename}`}
              item={item}
              onClick={() => onCardClick?.(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}
