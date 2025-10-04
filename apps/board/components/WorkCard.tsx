import { WorkItem } from '@/lib/work';
import { Badge } from '@/components/ui/badge';

interface WorkCardProps {
  item: WorkItem;
  onClick?: () => void;
}

const priorityColors = {
  high: 'border-red-500',
  medium: 'border-yellow-500',
  low: 'border-blue-500',
};

export function WorkCard({ item, onClick }: WorkCardProps) {
  const priorityColor = priorityColors[item.priority as keyof typeof priorityColors] || 'border-gray-500';

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${priorityColor} hover:shadow-md transition-shadow cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
        <Badge variant="secondary" className="whitespace-nowrap capitalize text-xs">
          {item.type}
        </Badge>
      </div>

      <div className="text-xs text-gray-500 mb-2">
        {item.id}
      </div>

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-gray-500">
              +{item.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="capitalize">{item.priority}</span>
        {item.created && (
          <span>{new Date(item.created).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}
