import { Brain, User } from "lucide-react";

import InputField from "../../../components/InputField";
import SelectionField from "../../../components/SelectionField";
import Button from "../../../components/Button";

import { useUserContext } from "../../../context/UserProvider";

const Profile = () => {
  const { profile, setProfile, setStep, setStepStatus } = useUserContext();

  const handleNextStep = () => {
    setStep("answer");
    setStepStatus({
      profile: "completed",
      answer: "current",
      result: "disabled",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <div className="flex items-center space-x-2 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">Enter Your Profile</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Please provide your basic information to get started with the survey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
        <InputField
          label="Age"
          type="number"
          min={1}
          max={99}
          value={profile.age}
          onChange={(e) => {
            setProfile((prev) => ({ ...prev, age: Number(e.target.value) }));
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <SelectionField
          label="Gender"
          value={profile.gender}
          onChange={(e) =>
            setProfile((prev) => ({
              ...prev,
              gender: e.target.value as "M" | "F",
            }))
          }
          options={[
            { value: "M", label: "Male" },
            { value: "F", label: "Female" },
          ]}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-end">
        <Button
          variant="secondary"
          icon={<Brain className="w-4 h-4" />}
          onClick={handleNextStep}
        >
          Next: Answer questions
        </Button>
      </div>
    </div>
  );
};

export default Profile;
