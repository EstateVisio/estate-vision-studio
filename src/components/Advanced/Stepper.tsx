import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Step = {
  id: string;
  label: string;
  description: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepIndex: number) => void;
};

export const Stepper = ({ steps, currentStep, completedSteps, onStepClick }: StepperProps) => {
  return (
    <div className="w-full bg-background/50 border-b border-border/50 py-6">
      <div className="container">
        <div className="flex justify-center">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 px-4">
            {steps.map((step, index) => {
              const isComplete = completedSteps.includes(index);
              const isActive = currentStep === index;
              const isPreviousComplete = index === 0 || completedSteps.includes(index - 1);
              const isClickable = isComplete || isActive || isPreviousComplete;
              
              // Size: active step is 40px, others are 32px
              const circleSize = isActive ? 'w-10 h-10' : 'w-8 h-8';
              const numberSize = isActive ? 'text-base' : 'text-sm';

              return (
                <div key={step.id} className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center gap-2 min-w-[80px]">
                    <button
                      onClick={() => isClickable && onStepClick?.(index)}
                      disabled={!isClickable}
                      className={cn(
                        'rounded-full flex items-center justify-center transition-all duration-200 ease-in-out',
                        circleSize,
                        isComplete && !isActive && 'bg-freshGreen text-white shadow-md',
                        isActive && 'bg-primary text-primary-foreground shadow-glow scale-110',
                        !isComplete && !isActive && 'bg-muted/30 text-muted-foreground',
                        isClickable && 'cursor-pointer hover:opacity-80',
                        !isClickable && 'cursor-not-allowed opacity-40'
                      )}
                    >
                      {isComplete && !isActive ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span className={cn('font-bold', numberSize)}>
                          {index + 1}
                        </span>
                      )}
                    </button>
                    <div className="text-center">
                      <div className={cn(
                        'text-xs font-semibold tracking-wide',
                        isActive && 'text-primary',
                        isComplete && !isActive && 'text-freshGreen',
                        !isComplete && !isActive && 'text-muted-foreground'
                      )}>
                        {step.label}
                      </div>
                      <div className="text-[10px] text-muted-foreground hidden md:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'h-0.5 w-8 md:w-16 transition-colors duration-300',
                        completedSteps.includes(index + 1) || completedSteps.includes(index) 
                          ? 'bg-freshGreen' 
                          : 'bg-muted/30'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
