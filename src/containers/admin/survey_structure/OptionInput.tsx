import { Trash2 } from "lucide-react";

import ButtonIcon from "../../../components/ButtonIcon";

import { useConfigContext } from "../../../context/ConfigProvider";

import type { QuestionOption } from "../../../types";

interface OptionInputProps {
  option: QuestionOption;
  optionIndex: number;
  questionId: number;
  totalOptions: number;
}

const OptionInput = ({
  option,
  optionIndex,
  questionId,
  totalOptions,
}: OptionInputProps) => {
  const { survey, setSurvey } = useConfigContext();

  const handleOptionChange = (
    questionId: number,
    optionIndex: number,
    field: "text" | "value",
    value: string
  ) => {
    if (survey) {
      const updatedQuestions = survey.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.map((option, index) => {
              if (index === optionIndex) {
                return { ...option, [field]: value };
              }
              return option;
            }),
          };
        }
        return question;
      });
      setSurvey(updatedQuestions);
    }
  };

  const handleDeleteOption = (questionId: number, optionIndex: number) => {
    if (survey) {
      const updatedQuestions = survey.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.filter(
              (_, index) => index !== optionIndex
            ),
          };
        }
        return question;
      });
      setSurvey(updatedQuestions);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={option.text}
        onChange={(e) =>
          handleOptionChange(questionId, optionIndex, "text", e.target.value)
        }
        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        placeholder="Option text"
      />
      <div className="flex items-center space-x-1">
        <span className="text-sm text-gray-600">Points:</span>
        <input
          type="text"
          value={option.value}
          onChange={(e) =>
            handleOptionChange(questionId, optionIndex, "value", e.target.value)
          }
          className="w-16 border border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>
      {totalOptions > 1 && (
        <ButtonIcon
          icon={<Trash2 className="w-4 h-4" />}
          color="red"
          onClick={() => handleDeleteOption(questionId, optionIndex)}
          title="Delete Question"
        />
      )}
    </div>
  );
};

export default OptionInput;
