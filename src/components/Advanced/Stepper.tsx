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
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isComplete = completedSteps.includes(index);
          const isClickable = isComplete || isActive;
          const showLine = index < steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 relative">
                {/* Step Circle */}
                <button
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isComplete
                      ? "bg-freshGreen border-freshGreen"
                      : isActive
                      ? "bg-primary border-primary animate-pulse-glow shadow-[0_0_20px_hsl(var(--primary)/0.5)] scale-125"
                      : "bg-card border-muted",
                    isClickable && "cursor-pointer hover:scale-110 hover:shadow-glow",
                    !isClickable && "cursor-not-allowed opacity-50"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-card" />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isActive ? "text-card" : "text-muted"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </button>

                {/* Step Label */}
                <div className="text-center hidden sm:block">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      isComplete
                        ? "text-freshGreen"
                        : isActive
                        ? "text-primary"
                        : "text-muted"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted mt-1 max-w-[100px]">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              {showLine && (
                <div className="flex-1 h-0.5 mx-2 relative">
                  <div className="absolute inset-0 bg-muted" />
                  <div
                    className={cn(
                      "absolute inset-0 bg-primary transition-all duration-700 ease-out",
                      isComplete ? "w-full shadow-[0_0_8px_hsl(var(--primary)/0.6)]" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Current Step */}
      <div className="sm:hidden text-center mb-6">
        <p className="text-sm font-medium text-primary">
          {steps[currentStep].label}
        </p>
        <p className="text-xs text-muted mt-1">
          {steps[currentStep].description}
        </p>
      </div>
    </div>
  );
};
