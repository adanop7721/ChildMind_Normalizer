import type { CalculationType, Question } from "../types";

export const getScoreRange = (
  survey: Question[],
  questionIds: number[],
  calculationType: CalculationType
) => {
  const selectedQuestions = survey.filter((q) => questionIds.includes(q.id));
  const maxValues = selectedQuestions.map((q) =>
    q.options && q.options.length > 0
      ? Math.max(...q.options.map((opt) => opt.value))
      : 0
  );
  const minValues = selectedQuestions.map((q) =>
    q.options && q.options.length > 0
      ? Math.min(...q.options.map((opt) => opt.value))
      : 0
  );
  const sumMax = maxValues.reduce((acc, val) => acc + val, 0);
  const sumMin = minValues.reduce((acc, val) => acc + val, 0);

  if (calculationType === "average") {
    return {
      min:
        selectedQuestions.length > 0
          ? (sumMin / selectedQuestions.length).toFixed(2)
          : 0,
      max:
        selectedQuestions.length > 0
          ? (sumMax / selectedQuestions.length).toFixed(2)
          : 0,
      label: "Average scale",
    };
  }
  return {
    min: sumMin,
    max: sumMax,
    label: "Total points",
  };
};
