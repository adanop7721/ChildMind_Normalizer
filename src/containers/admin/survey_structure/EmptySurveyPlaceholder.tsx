import { Brain } from "lucide-react";

const EmptySurveyPlaceholder = () => (
  <div className="text-center py-8 text-gray-500">
    <Brain className="w-12 h-12 mx-auto mb-3 text-gray-400" />
    <p>No questions added yet. Click "Add Question" to get started.</p>
  </div>
);

export default EmptySurveyPlaceholder;
