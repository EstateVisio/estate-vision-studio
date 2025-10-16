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
    <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-card-foreground tracking-wide">
          Montage Order
        </h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2 hover:bg-primary/10">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {orderedClips.map((clip, index) => (
          <div
            key={clip.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl",
              "bg-background/60 hover:bg-background hover:scale-[1.02] hover:shadow-md",
              "transition-all duration-300 cursor-move active:scale-95 border border-border/50"
            )}
          >
            <GripVertical className="h-5 w-5 text-muted flex-shrink-0" />
            
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="text-base font-bold text-primary">
                {index + 1}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate tracking-wide">
                {clip.caption}
              </p>
              <p className="text-xs text-foreground/70 font-medium">
                {clip.durationSec}s
                {clip.version > 1 && ` • v${clip.version}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-foreground/70 font-medium">
          Total duration: <span className="font-bold text-primary text-base">
            {orderedClips.reduce((sum, c) => sum + c.durationSec, 0)}s
          </span>
        </p>
      </div>
    </div>
  );
};
