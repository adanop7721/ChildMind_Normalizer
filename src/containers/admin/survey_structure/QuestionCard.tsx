import { useState } from "react";
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";

import OptionInput from "./OptionInput";
import ButtonIcon from "../../../components/ButtonIcon";

import { useSurveyContext } from "../../../context/SurveyProvider";
import type { Question } from "../../../types";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
}

const QuestionCard = ({ question, questionIndex }: QuestionCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const { survey, setSurvey } = useSurveyContext();

  const handleDeleteQuestion = (questionId: number) => {
    setSurvey(survey.filter((question) => question.id !== questionId));
  };

  const handleQuestionChange = (questionId: number, value: string) => {
    const updatedQuestions = survey.map((question) => {
      if (question.id === questionId) {
        return { ...question, text: value };
      }
      return question;
    });
    setSurvey(updatedQuestions);
  };

  const handleAddOption = (questionId: number) => {
    if (survey) {
      const updatedQuestions = survey.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: [
              ...question.options,
              { text: "New option", value: question.options.length },
            ],
          };
        }
        return question;
      });
      setSurvey(updatedQuestions);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Question {questionIndex + 1}
        </label>
        <ButtonIcon
          icon={<Trash2 className="w-4 h-4" />}
          color="red"
          onClick={() => handleDeleteQuestion(question.id)}
          title="Delete Question"
        />
      </div>

      <input
        type="text"
        value={question.text}
        onChange={(e) => handleQuestionChange(question.id, e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        placeholder="Enter question text"
      />

      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            className="text-sm font-medium text-gray-700 focus:outline-none flex items-center"
            onClick={() => setShowOptions((prev) => !prev)}
          >
            Answer Options{" "}
            {showOptions ? (
              <ChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <ChevronUp className="w-4 h-4 mr-1" />
            )}
          </button>
          {showOptions && (
            <ButtonIcon
              icon={
                <span className="flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Option</span>
                </span>
              }
              color="red"
              onClick={() => handleAddOption(question.id)}
              title="Add Option"
            />
          )}
        </div>

        {showOptions && (
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <OptionInput
                key={optionIndex}
                option={option}
                optionIndex={optionIndex}
                questionId={question.id}
                totalOptions={question.options.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
