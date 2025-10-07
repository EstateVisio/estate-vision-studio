import { ObjectTag } from '@/types/estate';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type ObjectChipsProps = {
  objects: ObjectTag[];
  selectedObjects: string[];
  onToggle: (objectName: string) => void;
};

export const ObjectChips = ({ objects, selectedObjects, onToggle }: ObjectChipsProps) => {
  // Get unique objects sorted by confidence
  const uniqueObjects = Array.from(
    new Map(objects.map(obj => [obj.name, obj])).values()
  ).sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-card-foreground">
          Filter by Objects
        </h3>
        <p className="text-xs text-muted">
          {selectedObjects.length} selected
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {uniqueObjects.map(obj => {
          const isSelected = selectedObjects.includes(obj.name);
          
          return (
            <Badge
              key={obj.name}
              variant={isSelected ? 'default' : 'outline'}
              className={cn(
                "cursor-pointer transition-all hover:scale-105",
                isSelected && "shadow-glow"
              )}
              onClick={() => onToggle(obj.name)}
            >
              {isSelected && <Check className="h-3 w-3 mr-1" />}
              {obj.name}
              <span className="ml-1.5 text-xs opacity-70">
                {Math.round(obj.confidence * 100)}%
              </span>
            </Badge>
          );
        })}
      </div>

      {selectedObjects.length > 0 && (
        <button
          onClick={() => selectedObjects.forEach(onToggle)}
          className="text-xs text-primary hover:underline"
        >
          Clear selection
        </button>
      )}
    </div>
  );
};
