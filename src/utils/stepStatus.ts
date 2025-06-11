import type { AdminStep, AdminStepStatus } from "../types";

export const getStepStatus = (
  currentStep: AdminStep,
  completedSteps: AdminStep[] = []
): AdminStepStatus => {
  return {
    questions:
      currentStep === "questions"
        ? "current"
        : completedSteps.includes("questions")
        ? "completed"
        : currentStep === "subscale" || currentStep === "normalization"
        ? "enabled"
        : "disabled",
    subscale:
      currentStep === "subscale"
        ? "current"
        : completedSteps.includes("subscale")
        ? "completed"
        : currentStep === "normalization"
        ? "enabled"
        : "disabled",
    normalization:
      currentStep === "normalization"
        ? "current"
        : completedSteps.includes("subscale")
        ? "enabled"
        : "disabled",
  };
};
