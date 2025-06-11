import { useNavigate } from "react-router-dom";
import {
  Brain,
  BarChart3,
  CheckCircle,
  User,
  LoaderCircleIcon,
} from "lucide-react";

import Profile from "./profile/Profile";
import Answer from "./answer/Answer";
import Result from "./result/Result";
import StepperIcon from "../../components/StepperIcon";
import ErrorMessage from "../../components/ErrorMessage";

import { useUserContext } from "../../context/UserProvider";

import type { UserStep } from "../../types";

const colorMap = {
  current: {
    text: "text-green-600",
    border: "border-green-600",
    bg: "bg-green-50",
    icon: {
      profile: <User className="w-5 h-5" />,
      answer: <Brain className="w-5 h-5" />,
      result: <BarChart3 className="w-5 h-5" />,
    },
  },
  completed: {
    text: "text-green-600",
    border: "border-green-600",
    bg: "bg-green-50",
    icon: {
      profile: <CheckCircle className="w-5 h-5" />,
      answer: <CheckCircle className="w-5 h-5" />,
      result: <CheckCircle className="w-5 h-5" />,
    },
  },
  enabled: {
    text: "text-blue-400",
    border: "border-blue-300",
    bg: "bg-blue-50",
    icon: {
      profile: <User className="w-5 h-5" />,
      answer: <Brain className="w-5 h-5" />,
      result: <BarChart3 className="w-5 h-5" />,
    },
  },
  disabled: {
    text: "text-gray-400",
    border: "border-gray-300",
    bg: "bg-white",
    icon: {
      profile: <User className="w-5 h-5" />,
      answer: <Brain className="w-5 h-5" />,
      result: <BarChart3 className="w-5 h-5" />,
    },
  },
};

const stepKeys: UserStep[] = ["profile", "answer", "result"];

const UserStepper = () => {
  const navigate = useNavigate();

  const { step, setStep, stepStatus, setStepStatus, error, loading } =
    useUserContext();

  const handleStepClick = (key: UserStep) => {
    if (stepStatus[key] === "disabled") return;

    setStep(key);

    if (key === "profile") {
      setStepStatus({
        profile: "current",
        answer: "enabled",
        result: "disabled",
      });
    } else if (key === "answer") {
      setStepStatus({
        profile: "completed",
        answer: "current",
        result: "enabled",
      });
    } else if (key === "result") {
      setStepStatus({
        profile: "completed",
        answer: "completed",
        result: "current",
      });
    }
  };

  if (loading) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center">
        <LoaderCircleIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center">
        <ErrorMessage
          message={error}
          label="Go to Admin Configuration"
          onRetry={() => navigate("/admin")}
        />
      </div>
    );
  }

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
          {step === "profile" && <Profile />}
          {step === "answer" && <Answer />}
          {step === "result" && <Result />}
        </div>
      </div>
    </>
  );
};

export default UserStepper;
