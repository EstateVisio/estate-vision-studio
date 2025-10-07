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
        "relative bg-card rounded-2xl p-6 cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:shadow-glow hover:scale-[1.03] hover:-translate-y-1",
        "border-2",
        isSelected
          ? "border-primary shadow-glow animate-glow-pulse scale-[1.02]"
          : "border-transparent hover:border-primary/30"
      )}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce-soft">
          <Check className="h-5 w-5 text-primary-foreground animate-scale-in" />
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
                "h-1.5 rounded-full flex-1 transition-all duration-500",
                isSelected ? "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" : "bg-muted"
              )}
              style={{
                transitionDelay: isSelected ? `${i * 0.05}s` : '0s',
                animation: isSelected ? 'pulse 2s ease-in-out infinite' : 'none',
                animationDelay: isSelected ? `${i * 0.15}s` : '0s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
