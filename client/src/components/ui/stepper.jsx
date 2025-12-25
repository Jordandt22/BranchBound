import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const StepperContext = React.createContext({
  currentStep: 1,
});

const Stepper = React.forwardRef(
  ({ className, currentStep = 1, children, ...props }, ref) => {
    return (
      <StepperContext.Provider value={{ currentStep }}>
        <div
          ref={ref}
          className={cn("flex items-center justify-center w-full", className)}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = "Stepper";

const StepperItem = React.forwardRef(
  ({ className, step, isCompleted, children, ...props }, ref) => {
    const { currentStep } = React.useContext(StepperContext);
    const isActive = step === currentStep;
    const isPast = step < currentStep || isCompleted;

    return (
      <div ref={ref} className={cn("flex items-center", className)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              step,
              currentStep,
              isCompleted: isPast,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
StepperItem.displayName = "StepperItem";

const StepperIndicator = React.forwardRef(
  ({ className, step, currentStep, isCompleted }, ref) => {
    const context = React.useContext(StepperContext);
    const activeStep = currentStep ?? context?.currentStep ?? 1;
    const isActive = step === activeStep;
    const isPast = step < activeStep || isCompleted;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300",
          isPast
            ? "bg-accent-primary border-accent-primary text-white"
            : isActive
            ? "bg-transparent border-accent-primary text-accent-primary"
            : "bg-transparent border-gray-700 text-gray-500",
          className
        )}
      >
        {isPast && !isActive ? (
          <Check className="w-4 h-4 md:w-5 md:h-5" />
        ) : (
          <span className="font-semibold text-sm md:text-base">{step}</span>
        )}
      </div>
    );
  }
);
StepperIndicator.displayName = "StepperIndicator";

const StepperSeparator = React.forwardRef(({ className, isCompleted }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "h-0.5 w-12 md:w-24 transition-all duration-300",
        isCompleted ? "bg-accent-primary" : "bg-gray-700",
        className
      )}
    />
  );
});
StepperSeparator.displayName = "StepperSeparator";

const StepperContent = React.forwardRef(
  ({ className, children, step, currentStep, isCompleted, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              step,
              currentStep,
              isCompleted,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
StepperContent.displayName = "StepperContent";

const StepperTitle = React.forwardRef(
  ({ className, step, currentStep, isCompleted, children }, ref) => {
    const context = React.useContext(StepperContext);
    const activeStep = currentStep ?? context?.currentStep ?? 1;
    const isActive = step === activeStep;
    const isPast = step < activeStep || isCompleted;

    return (
      <span
        ref={ref}
        className={cn(
          "text-xs md:text-sm font-semibold transition-colors duration-300 mt-2",
          isPast || isActive ? "text-white" : "text-gray-500",
          className
        )}
      >
        {children}
      </span>
    );
  }
);
StepperTitle.displayName = "StepperTitle";

const StepperDescription = React.forwardRef(
  ({ className, step, currentStep, isCompleted, children }, ref) => {
    const context = React.useContext(StepperContext);
    const activeStep = currentStep ?? context?.currentStep ?? 1;
    const isActive = step === activeStep;
    const isPast = step < activeStep || isCompleted;

    return (
      <span
        ref={ref}
        className={cn(
          "text-[10px] md:text-xs mt-0.5 md:mt-1 transition-colors duration-300 hidden md:block",
          isPast || isActive ? "text-text-secondary" : "text-gray-600",
          className
        )}
      >
        {children}
      </span>
    );
  }
);
StepperDescription.displayName = "StepperDescription";

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperTitle,
  StepperDescription,
};
