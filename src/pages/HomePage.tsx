import { useNavigate } from "react-router-dom";
import { Settings, User, Brain, BarChart3 } from "lucide-react";

import HomeCard from "../components/HomeCard";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-4">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Survey & Normalization System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform for creating, configuring, and taking
            surveys with normalization scoring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <HomeCard
            icon={<Settings className="w-8 h-8" />}
            title="Administrator"
            description="Configure survey questions, subscales, and normalization tables. Set up the complete survey system for users to take."
            features={[
              {
                icon: <Brain className="w-4 h-4" />,
                label: "Configure Questions",
              },
              {
                icon: <Settings className="w-4 h-4" />,
                label: "Setup Subscale",
              },
              {
                icon: <BarChart3 className="w-4 h-4" />,
                label: "Manage Normalization",
              },
            ]}
            buttonText="Admin Configuration"
            color="red"
            onClick={() => navigate("/admin")}
          />
          <HomeCard
            icon={<User className="w-8 h-8 text-green-600" />}
            title="Survey Participant"
            description="Take the survey and receive your results. Complete your profile and answer survey questions to get your normalized scores."
            features={[
              {
                icon: <User className="w-4 h-4" />,
                label: "Enter Profile Information",
              },
              {
                icon: <Brain className="w-4 h-4" />,
                label: "Answer Survey Questions",
              },
              {
                icon: <BarChart3 className="w-4 h-4" />,
                label: "View Results",
              },
            ]}
            buttonText="Take Survey"
            color="green"
            onClick={() => navigate("/survey")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
