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
    <div className="w-full">
      {/* Centered Step Progress Bar */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-3 max-w-4xl w-full justify-center">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            const isComplete = completedSteps.includes(index);
            const isPreviousComplete = index === 0 || completedSteps.includes(index - 1);
            const isClickable = isComplete || isActive || isPreviousComplete;
            const showLine = index < steps.length - 1;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center gap-3 relative">
                  {/* Step Circle - Only larger when ACTIVE */}
                  <button
                    onClick={() => isClickable && onStepClick?.(index)}
                    disabled={!isClickable}
                    className={cn(
                      "rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out",
                      isActive
                        ? "w-16 h-16 bg-primary border-primary shadow-[0_0_40px_hsl(var(--primary)/0.5)] scale-125 animate-glow-pulse"
                        : isComplete
                        ? "w-14 h-14 bg-freshGreen border-freshGreen shadow-glow"
                        : "w-12 h-12 bg-card border-border",
                      isClickable && "cursor-pointer hover:scale-110 hover:shadow-glow",
                      !isClickable && "cursor-not-allowed opacity-40"
                    )}
                  >
                    {isComplete && !isActive ? (
                      <CheckCircle2 className="h-6 w-6 text-card" />
                    ) : (
                      <span
                        className={cn(
                          "text-base font-bold",
                          isActive ? "text-primary-foreground" : isComplete ? "text-card" : "text-muted"
                        )}
                      >
                        {index + 1}
                      </span>
                    )}
                  </button>

                  {/* Step Label */}
                  <div className="text-center hidden md:block">
                    <p
                      className={cn(
                        "text-sm font-semibold tracking-wide",
                        isActive
                          ? "text-primary"
                          : isComplete
                          ? "text-freshGreen"
                          : "text-muted"
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-muted/70 mt-1 max-w-[100px]">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line with glow */}
                {showLine && (
                  <div className="w-16 h-1 mx-3 relative">
                    <div className="absolute inset-0 bg-border rounded-full" />
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full transition-all duration-700 ease-out",
                        isComplete ? "w-full bg-freshGreen shadow-[0_0_12px_hsl(var(--fresh-green)/0.7)]" : "w-0"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Current Step */}
      <div className="md:hidden text-center mb-6 animate-fade-in">
        <p className="text-base font-semibold text-primary tracking-wide">
          {steps[currentStep].label}
        </p>
        <p className="text-sm text-muted/70 mt-1">
          {steps[currentStep].description}
        </p>
      </div>
    </div>
  );
};
