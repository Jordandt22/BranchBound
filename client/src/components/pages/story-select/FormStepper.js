import React from "react";

// Components
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperTitle,
  StepperDescription,
} from "@/components/ui/stepper";

function FormStepper({ currentStep }) {
  return (
    <div className="w-full max-w-6xl mb-8 md:mb-12 px-2 md:px-4">
      <Stepper currentStep={currentStep}>
        <StepperItem step={1}>
          <StepperContent>
            <StepperIndicator step={1} />
            <StepperTitle step={1}>Story Settings</StepperTitle>
            <StepperDescription step={1}>
              Configure your story
            </StepperDescription>
          </StepperContent>
        </StepperItem>

        <StepperSeparator className="mx-7.5" isCompleted={currentStep > 1} />

        <StepperItem step={2}>
          <StepperContent>
            <StepperIndicator step={2} />
            <StepperTitle step={2}>Character Selection</StepperTitle>
            <StepperDescription step={2}>
              Choose your character
            </StepperDescription>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  );
}

export default FormStepper;
