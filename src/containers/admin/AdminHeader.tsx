import { useNavigate } from "react-router-dom";
import { Home, Settings } from "lucide-react";

import { useConfigContext } from "../../context/ConfigProvider";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { step } = useConfigContext();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Settings className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Survey Administration
              </h1>
              <p className="text-sm text-gray-600">
                Step{" "}
                {step === "questions" ? "1" : step === "subscale" ? "2" : "3"}{" "}
                of 3:
                {step === "questions" && " Configure Questions"}
                {step === "subscale" && " Setup Subscale"}
                {step === "normalization" && " Manage Normalization Data"}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
