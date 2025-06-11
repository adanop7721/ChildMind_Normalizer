import { useNavigate } from "react-router-dom";
import { Brain, Home } from "lucide-react";

import { useUserContext } from "../../context/UserProvider";

const UserHeader = () => {
  const navigate = useNavigate();
  const { step } = useUserContext();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Survey</h1>
              <p className="text-sm text-gray-600">
                Step {step === "profile" ? "1" : step === "answer" ? "2" : "3"}{" "}
                of 3:
                {step === "profile" && " Enter Profile"}
                {step === "answer" && " Answer Questions"}
                {step === "result" && " View Results"}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
