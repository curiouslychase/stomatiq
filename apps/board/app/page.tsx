import { getAllWorkItems } from '@/lib/work';
import { BoardView } from '@/components/BoardView';

export default function Home() {
  const workItems = getAllWorkItems();

  return (
    <div className="min-h-screen bg-gray-100">
      <BoardView workItems={workItems} />
    </div>
  );
}
