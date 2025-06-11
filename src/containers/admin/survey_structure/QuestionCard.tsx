import { Trash2, Plus } from "lucide-react";

import OptionInput from "./OptionInput";

import type { Question } from "../../../types";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  onDelete: (id: number) => void;
  onTextChange: (id: number, value: string) => void;
  onAddOption: (id: number) => void;
  onOptionChange: (
    questionId: number,
    optionIndex: number,
    field: "text" | "value",
    value: string
  ) => void;
  onDeleteOption: (questionId: number, optionIndex: number) => void;
}

const QuestionCard = ({
  question,
  questionIndex,
  onDelete,
  onTextChange,
  onAddOption,
  onOptionChange,
  onDeleteOption,
}: QuestionCardProps) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <div className="flex items-center justify-between mb-3">
      <label className="block text-sm font-medium text-gray-700">
        Question {questionIndex + 1}
      </label>
      <button
        onClick={() => onDelete(question.id)}
        className="text-red-600 hover:text-red-700"
        title="Delete Question"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>

    <input
      type="text"
      value={question.text}
      onChange={(e) => onTextChange(question.id, e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      placeholder="Enter question text"
    />

    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Answer Options
        </label>
        <button
          onClick={() => onAddOption(question.id)}
          className="text-red-600 text-sm cursor-pointer hover:text-red-700 flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          Add Option
        </button>
      </div>

      <div className="space-y-2">
        {question.options.map((option, optionIndex) => (
          <OptionInput
            key={optionIndex}
            option={option}
            optionIndex={optionIndex}
            questionId={question.id}
            totalOptions={question.options.length}
            onOptionChange={onOptionChange}
            onDeleteOption={onDeleteOption}
          />
        ))}
      </div>
    </div>
  </div>
);

export default QuestionCard;
