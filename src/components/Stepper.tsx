import { useState } from "react";
import { Brain, Settings, BarChart3, CheckCircle } from "lucide-react";

import SurveyStructure from "../containers/admin/survey_structure/SurveyStructure";
import StepperIcon from "./StepperIcon";

import { useSurveyContext } from "../context/SurveyProvider";

import type { AdminStep } from "../types";
import SubscaleConfig from "../containers/admin/subscale_config/SubscaleConfig";
import UnsavedDialog from "./UnsavedDialog";
import NormalizationTable from "../containers/admin/NormalizationTable";

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
    text: "text-green-600",
    border: "border-green-600",
    bg: "bg-green-50",
    icon: {
      questions: <CheckCircle className="w-5 h-5" />,
      subscale: <CheckCircle className="w-5 h-5" />,
      normalization: <CheckCircle className="w-5 h-5" />,
    },
  },
  enabled: {
    text: "text-blue-400",
    border: "border-blue-300",
    bg: "bg-blue-50",
    icon: {
      questions: <Brain className="w-5 h-5" />,
      subscale: <Settings className="w-5 h-5" />,
      normalization: <BarChart3 className="w-5 h-5" />,
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
  const {
    survey,
    setSurvey,
    step,
    setStep,
    stepStatus,
    setStepStatus,
    lastSavedSurvey,
  } = useSurveyContext();

  const [pendingStep, setPendingStep] = useState<AdminStep | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const hasUnsavedChanges = () =>
    JSON.stringify(survey) !== lastSavedSurvey.current;

  const handleStepClick = (key: AdminStep) => {
    if (step === "questions" && hasUnsavedChanges()) {
      setPendingStep(key);
      setShowUnsavedModal(true);
      return;
    }
    setStep(key);
    if (key === "subscale") {
      setStepStatus({
        questions: "completed",
        subscale: "current",
        normalization: "enabled",
      });
    } else if (key === "questions") {
      setStepStatus({
        questions: "current",
        subscale: "enabled",
        normalization: "disabled",
      });
    } else if (key === "normalization") {
      setStepStatus({
        questions: "completed",
        subscale: "completed",
        normalization: "current",
      });
    }
  };

  const handleAbandon = () => {
    setShowUnsavedModal(false);
    if (pendingStep) {
      if (step === "questions" && lastSavedSurvey.current) {
        setSurvey(JSON.parse(lastSavedSurvey.current));
        localStorage.setItem("surveyDraft", lastSavedSurvey.current);
      }
      setStep(pendingStep);
      if (pendingStep === "subscale") {
        setStepStatus({
          questions: "completed",
          subscale: "current",
          normalization: "enabled",
        });
      }
      setPendingStep(null);
    }
  };

  const handleSaveAndNavigate = async () => {
    setShowUnsavedModal(false);
    if (pendingStep) {
      setStep(pendingStep);
      if (pendingStep === "subscale") {
        setStepStatus({
          questions: "completed",
          subscale: "current",
          normalization: "enabled",
        });
      } else if (pendingStep === "normalization") {
        setStepStatus({
          questions: "completed",
          subscale: "completed",
          normalization: "current",
        });
      }
      setPendingStep(null);
    }
  };

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
                    handleStepClick(key);
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {step === "questions" && <SurveyStructure />}
          {step === "subscale" && <SubscaleConfig />}
          {step === "normalization" && <NormalizationTable />}
        </div>
      </div>
      <UnsavedDialog
        isOpen={showUnsavedModal}
        onClose={() => setShowUnsavedModal(false)}
        onAbandon={handleAbandon}
        onSaveAndNavigate={handleSaveAndNavigate}
      />
    </>
  );
};

export default Stepper;
