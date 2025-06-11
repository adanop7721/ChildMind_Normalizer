import { Trash2 } from "lucide-react";

import type { QuestionOption } from "../../../types";

interface OptionInputProps {
  option: QuestionOption;
  optionIndex: number;
  questionId: number;
  totalOptions: number;
  onOptionChange: (
    questionId: number,
    optionIndex: number,
    field: "text" | "value",
    value: string
  ) => void;
  onDeleteOption: (questionId: number, optionIndex: number) => void;
}

const OptionInput = ({
  option,
  optionIndex,
  questionId,
  totalOptions,
  onOptionChange,
  onDeleteOption,
}: OptionInputProps) => (
  <div className="flex items-center space-x-2">
    <input
      type="text"
      value={option.text}
      onChange={(e) =>
        onOptionChange(questionId, optionIndex, "text", e.target.value)
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
          onOptionChange(questionId, optionIndex, "value", e.target.value)
        }
        className="w-16 border border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
    </div>
    {totalOptions > 1 && (
      <button
        onClick={() => onDeleteOption(questionId, optionIndex)}
        className="text-red-600 hover:text-red-700"
        title="Delete Option"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default OptionInput;
