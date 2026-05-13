import { useState, useCallback } from 'react';

export const useFormStep = (totalSteps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const progress = (currentStep / (totalSteps - 1)) * 100;

  return {
    currentStep,
    nextStep,
    prevStep,
    progress,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
  };
};
