import { ProcessingStage } from '@/types/estate';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProgressStagesProps = {
  stages: ProcessingStage[];
};

export const ProgressStages = ({ stages }: ProgressStagesProps) => {
  const currentStageIndex = stages.findIndex(s => !s.isComplete);
  const allComplete = stages.every(s => s.isComplete);

  return (
    <div className="bg-card rounded-2xl p-8 shadow-intense max-w-xl mx-auto animate-fade-in">
      <div className="space-y-6">
        {stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isComplete = stage.isComplete;
          
          return (
            <div
              key={stage.label}
              className={cn(
                "flex items-center gap-5 transition-all duration-500",
                isActive && "animate-pulse-glow"
              )}
            >
              <div className="flex-shrink-0">
                {isComplete ? (
                  <CheckCircle2 className="h-8 w-8 text-freshGreen animate-bounce-soft" />
                ) : isActive ? (
                  <div className="relative">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full border-2 border-muted transition-all duration-500" />
                )}
              </div>
              
              <div className="flex-1">
                <p
                  className={cn(
                    "text-base font-semibold transition-colors tracking-wide",
                    isComplete ? "text-freshGreen" : isActive ? "text-primary" : "text-muted"
                  )}
                >
                  {stage.label}
                </p>
                
                {isActive && (
                  <div className="mt-3 bg-background rounded-full h-2.5 overflow-hidden relative shadow-inner">
                    <div
                      className="h-full bg-primary transition-all duration-700 rounded-full relative overflow-hidden shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
                      style={{ width: `${stage.progress}%` }}
                    >
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
                        style={{ backgroundSize: '200% 100%' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {allComplete && (
        <div className="mt-8 text-center animate-bounce-soft">
          <p className="text-lg font-bold text-primary">Processing complete! 🎬</p>
        </div>
      )}
    </div>
  );
};
