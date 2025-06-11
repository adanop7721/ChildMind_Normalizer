import { useNavigate } from "react-router-dom";
import { BarChart3, Brain, Home } from "lucide-react";

import Button from "../../../components/Button";

import { useUserContext } from "../../../context/UserProvider";

const Result = () => {
  const navigate = useNavigate();
  const { subscaleConfig, result, profile, setStep, setStepStatus } =
    useUserContext();

  const handleBack = () => {
    setStep("answer");
    setStepStatus({
      profile: "completed",
      answer: "current",
      result: "enabled",
    });
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">Your Results</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Thank you for completing the survey. Here are your results:
      </p>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Your Profile</h4>
        <div className="text-sm text-gray-600">
          <p>
            Age: <strong>{profile.age}</strong>
          </p>
          <p>
            Gender:{" "}
            <strong>{profile.gender === "M" ? "Male" : "Female"}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Raw Score
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {result?.raw_score}
          </p>
          <p className="text-sm text-blue-600 mt-2">
            <strong>{subscaleConfig.calculation_type.toUpperCase()}</strong> of
            your responses
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Normalized Score
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {result?.normalized_score ? result?.normalized_score : "N/A"}
          </p>
          <p className="text-sm text-green-600 mt-2">
            {result?.normalized_score
              ? "Adjusted for age and gender"
              : "Not available"}
          </p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <Button
            variant="back"
            icon={<Brain className="w-4 h-4" />}
            onClick={handleBack}
          >
            Back to Profile
          </Button>
          <Button
            variant="secondary"
            icon={<Home className="w-4 h-4" />}
            onClick={handleHome}
          >
            Finish and Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
