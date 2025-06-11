import { useSurveyContext } from "../../../context/SurveyProvider";

const QuestionsSelector = () => {
  const { survey, subscaleConfig, setSubscaleConfig } = useSurveyContext();

  const handleCheckboxChange = (questionId: number, checked: boolean) => {
    setSubscaleConfig((prev) => ({
      ...prev,
      question_ids: checked
        ? [...prev.question_ids, questionId]
        : prev.question_ids.filter((id) => id !== questionId),
    }));
  };

  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 mb-3">
        Select Questions to Include
      </h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {survey.map((question, index) => (
          <label
            key={question.id}
            className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={subscaleConfig.question_ids.includes(question.id)}
              onChange={(e) =>
                handleCheckboxChange(question.id, e.target.checked)
              }
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                Question {index + 1}
              </p>
              <p className="text-sm text-gray-600">{question.text}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionsSelector;
