import type { ChangeEvent } from "react";
import { BarChart3, Brain, User } from "lucide-react";

import Button from "../../../components/Button";
import RadioField from "../../../components/RadioField";

import { useUserContext } from "../../../context/UserProvider";

const Answer = () => {
  const {
    survey,
    subscaleConfig,
    normalizationData,
    profile,
    answer,
    setAnswer,
    setResult,
    setStep,
    setStepStatus,
  } = useUserContext();

  const handleAddOrChangeAnswer = (
    questionId: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (answer.filter((a) => a.question_id === questionId).length > 0) {
      const newAnswer = answer.map((a) => {
        if (a.question_id === questionId) {
          return {
            ...a,
            value: Number(e.target.value),
          };
        } else {
          return a;
        }
      });

      setAnswer(newAnswer);
    } else {
      setAnswer((prev) => [
        ...prev,
        {
          question_id: questionId,
          value: Number(e.target.value),
        },
      ]);
    }
  };

  const handleBack = () => {
    setStep("profile");
    setStepStatus({
      profile: "current",
      answer: "enabled",
      result: "disabled",
    });
  };

  const getNormalizedScore = (rawScore: number): number | boolean => {
    const normalizationTemplate = normalizationData.filter(
      (n) =>
        n.age == profile.age &&
        n.gender == profile.gender &&
        n.raw_score == rawScore
    );
    if (normalizationTemplate.length > 0) {
      return normalizationTemplate[0].normalized_score;
    } else {
      return false;
    }
  };

  const calculateSubscale = () => {
    let scoreSum = 0;
    subscaleConfig.question_ids.forEach((id) => {
      const ans = answer.find((a) => a.question_id === id);
      if (ans) {
        scoreSum += ans.value;
      }
    });

    if (subscaleConfig.calculation_type === "average") {
      const rawScore = scoreSum / subscaleConfig.question_ids.length;
      setResult({
        raw_score: rawScore,
        normalized_score: getNormalizedScore(rawScore),
      });
    } else {
      setResult({
        raw_score: scoreSum,
        normalized_score: getNormalizedScore(scoreSum),
      });
    }
  };

  const handleCalculateAndNavigate = () => {
    calculateSubscale();
    setStep("result");
    setStepStatus({
      profile: "completed",
      answer: "completed",
      result: "current",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">Survey Questions</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Please answer each question below by selecting the option that best
        describes you. Your responses will be used to calculate your subscale
        score and provide a personalized result.
      </p>

      <div className="space-y-6 max-h-[500px] overflow-y-auto">
        {survey.map((question, index) => (
          <div
            key={question.id}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <h3 className="text-lg font-medium mb-4">
              {index + 1}. {question.text}
            </h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <RadioField
                  key={optionIndex}
                  name={`question-${question.id}`}
                  value={option.value}
                  checked={
                    answer.find((a) => a.question_id === question.id)?.value ===
                    option.value
                  }
                  label={option.text}
                  onChange={(e) => handleAddOrChangeAnswer(question.id, e)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <Button
            variant="back"
            icon={<User className="w-4 h-4" />}
            onClick={handleBack}
          >
            Back to Profile
          </Button>
          <Button
            variant="secondary"
            icon={<BarChart3 className="w-4 h-4" />}
            disabled={survey.length !== answer.length}
            onClick={handleCalculateAndNavigate}
          >
            {survey.length === answer.length
              ? "Next: Calculate Subscale"
              : "Please answer all questions"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
