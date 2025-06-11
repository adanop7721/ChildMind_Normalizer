import { Brain, Settings, BarChart3, CheckCircle } from "lucide-react";

import SurveyStructure from "../containers/admin/survey_structure/SurveyStructure";
import StepperIcon from "./StepperIcon";

import { useSurveyContext } from "../context/SurveyProvider";

import type { AdminStep } from "../types";

const colorMap = {
  current: {
    text: "text-green-600",
    border: "border-green-600",
    bg: "bg-green-50",
    icon: {
      questions: <Brain className="w-5 h-5" />,
      subscale: <Settings className="w-5 h-5" />,
      normalization: <BarChart3 className="w-5 h-5" />,
    },
  },
  completed: {
    text: "text-blue-600",
    border: "border-blue-600",
    bg: "bg-blue-50",
    icon: {
      questions: <CheckCircle className="w-5 h-5" />,
      subscale: <CheckCircle className="w-5 h-5" />,
      normalization: <CheckCircle className="w-5 h-5" />,
    },
  },
  disabled: {
    text: "text-gray-400",
    border: "border-gray-300",
    bg: "bg-white",
    icon: {
      questions: <Brain className="w-5 h-5" />,
      subscale: <Settings className="w-5 h-5" />,
      normalization: <BarChart3 className="w-5 h-5" />,
    },
  },
};

const stepKeys: AdminStep[] = ["questions", "subscale", "normalization"];

const Stepper = () => {
  const { step, setStep, stepStatus, setStepStatus } = useSurveyContext();

  return (
    <>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            {stepKeys.map((key) => (
              <StepperIcon
                key={key}
                icon={colorMap[stepStatus[key]].icon[key]}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                disabled={stepStatus[key] === "disabled"}
                textClass={colorMap[stepStatus[key]].text}
                borderClass={colorMap[stepStatus[key]].border}
                bgClass={colorMap[stepStatus[key]].bg}
                onClick={() => {
                  if (stepStatus[key] !== "disabled") {
                    setStep(key);
                    setStepStatus((prev) => ({
                      ...prev,
                      [key]: "current",
                    }));
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {step === "questions" && <SurveyStructure />}
        </div>
      </div>
    </>
  );
};

export default Stepper;
