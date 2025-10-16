import { TransitionPreset } from '@/types/estate';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type TransitionCardProps = {
  preset: TransitionPreset;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  title?: string; // optional localized title to display instead of preset value
};

export const TransitionCard = ({
  preset,
  description,
  isSelected,
  onSelect,
  title,
}: TransitionCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative bg-card rounded-2xl p-8 cursor-pointer",
        "transition-all duration-500 ease-out",
        "hover:shadow-intense hover:scale-105 hover:-translate-y-2",
        "border-2 shadow-card",
        isSelected
          ? "border-primary shadow-intense animate-glow-pulse scale-105"
          : "border-transparent hover:border-primary/40"
      )}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-5 right-5 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-intense animate-bounce-soft">
          <Check className="h-6 w-6 text-primary-foreground animate-scale-in" />
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-card-foreground pr-12 tracking-wide">
          {title ?? preset}
        </h3>
        <p className="text-base text-muted leading-relaxed font-medium">
          {description}
        </p>

        {/* Visual Indicator - Cinematic bars */}
        <div className="pt-4 flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 rounded-full flex-1 transition-all duration-700",
                isSelected ? "bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]" : "bg-muted/50"
              )}
              style={{
                transitionDelay: isSelected ? `${i * 0.08}s` : '0s',
                animation: isSelected ? 'pulse 2s ease-in-out infinite' : 'none',
                animationDelay: isSelected ? `${i * 0.2}s` : '0s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
