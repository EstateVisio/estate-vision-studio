import { TransitionPreset } from '@/types/estate';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type TransitionCardProps = {
  preset: TransitionPreset;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const TransitionCard = ({
  preset,
  description,
  isSelected,
  onSelect,
}: TransitionCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative bg-card rounded-2xl p-6 cursor-pointer transition-all",
        "hover:shadow-glow hover:scale-[1.02]",
        "border-2",
        isSelected
          ? "border-primary shadow-glow"
          : "border-transparent hover:border-primary/30"
      )}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <Check className="h-5 w-5 text-primary-foreground" />
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-card-foreground pr-10">
          {preset}
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          {description}
        </p>

        {/* Visual Indicator */}
        <div className="pt-3 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full flex-1 transition-all",
                isSelected ? "bg-primary" : "bg-muted"
              )}
              style={{
                animationDelay: isSelected ? `${i * 0.1}s` : '0s',
                animation: isSelected ? 'pulse 1.5s ease-in-out infinite' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
