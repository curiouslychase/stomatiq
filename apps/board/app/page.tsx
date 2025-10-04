import { getAllWorkItems } from '@/lib/work';
import { BoardView } from '@/components/BoardView';

export default function Home() {
  const workItems = getAllWorkItems();

  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <BoardView workItems={workItems} />
    </div>
  );
}
