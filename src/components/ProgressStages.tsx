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
    <div className="bg-card rounded-2xl p-6 shadow-card max-w-md mx-auto">
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isComplete = stage.isComplete;
          
          return (
            <div
              key={stage.label}
              className={cn(
                "flex items-center gap-4 transition-all",
                isActive && "animate-pulse-glow"
              )}
            >
              <div className="flex-shrink-0">
                {isComplete ? (
                  <CheckCircle2 className="h-6 w-6 text-freshGreen" />
                ) : isActive ? (
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-muted" />
                )}
              </div>
              
              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isComplete ? "text-freshGreen" : isActive ? "text-primary" : "text-muted"
                  )}
                >
                  {stage.label}
                </p>
                
                {isActive && (
                  <div className="mt-2 bg-background rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {allComplete && (
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-freshGreen">Processing complete! 🎉</p>
        </div>
      )}
    </div>
  );
};
