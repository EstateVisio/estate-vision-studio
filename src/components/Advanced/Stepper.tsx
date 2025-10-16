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
    <div className="w-full pt-14 pb-8 overflow-visible">
      <div className="container overflow-visible">
        <div className="flex justify-center pt-2 pb-2 overflow-visible">
          <div className="px-4 pb-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-4 md:gap-8 overflow-visible">
            {steps.map((step, index) => {
              const isComplete = completedSteps.includes(index);
              const isActive = currentStep === index;
              const isPreviousComplete = index === 0 || completedSteps.includes(index - 1);
              const isClickable = isComplete || isActive || isPreviousComplete;
              
              // Size: active step is 56px, others are 48px
              const circleSize = isActive ? 'w-14 h-14' : 'w-12 h-12';
              const numberSize = isActive ? 'text-xl' : 'text-lg';

              return (
                <div key={step.id} className="flex items-center gap-4 md:gap-8">
                  <div className="flex flex-col items-center gap-3 min-w-[100px]">
                    <button
                      onClick={() => isClickable && onStepClick?.(index)}
                      disabled={!isClickable}
                      className={cn(
                        // Anchor scaling to top to avoid visual cut-off
                        'rounded-full flex items-center justify-center transition-all duration-200 ease-in-out origin-top translate-y-0',
                        circleSize,
                        isComplete && !isActive && 'bg-freshGreen text-white shadow-md',
                        // Slight downward nudge when active so scaled circle + glow have breathing room
                        isActive && 'bg-primary text-primary-foreground shadow-glow scale-110 translate-y-2',
                        !isComplete && !isActive && 'bg-muted/30 text-muted-foreground',
                        isClickable && 'cursor-pointer hover:opacity-80',
                        !isClickable && 'cursor-not-allowed opacity-40'
                      )}
                    >
                      {isComplete && !isActive ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <span className={cn('font-bold', numberSize)}>
                          {index + 1}
                        </span>
                      )}
                    </button>
                    <div className="text-center">
                      <div className={cn(
                        'text-sm font-semibold tracking-wide',
                        isActive && 'text-primary',
                        isComplete && !isActive && 'text-freshGreen',
                        !isComplete && !isActive && 'text-muted-foreground'
                      )}>
                        {step.label}
                      </div>
                      <div className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'h-1 w-12 md:w-20 transition-colors duration-300',
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
    </div>
  );
};
