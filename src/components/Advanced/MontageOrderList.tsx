import { Clip } from '@/types/estate';
import { Button } from '@/components/ui/button';
import { GripVertical, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type MontageOrderListProps = {
  clips: Clip[];
  order: string[];
  onReorder: (newOrder: string[]) => void;
  onReset: () => void;
};

export const MontageOrderList = ({
  clips,
  order,
  onReorder,
  onReset,
}: MontageOrderListProps) => {
  const orderedClips = order
    .map(id => clips.find(c => c.id === id))
    .filter(Boolean) as Clip[];

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex || isNaN(dragIndex)) return;

    const newOrder = [...order];
    const [draggedId] = newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, draggedId);
    onReorder(newOrder);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Montage Order
        </h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        {orderedClips.map((clip, index) => (
          <div
            key={clip.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl",
              "bg-background hover:bg-background/80 hover:scale-[1.02] hover:shadow-md",
              "transition-all duration-200 cursor-move active:scale-95"
            )}
          >
            <GripVertical className="h-4 w-4 text-muted flex-shrink-0" />
            
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-primary">
                {index + 1}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {clip.caption}
              </p>
              <p className="text-xs text-foreground/70">
                {clip.durationSec}s
                {clip.version > 1 && ` • v${clip.version}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-foreground/70">
          Total duration: <span className="font-semibold text-foreground">
            {orderedClips.reduce((sum, c) => sum + c.durationSec, 0)}s
          </span>
        </p>
      </div>
    </div>
  );
};
