import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, Brain, LoaderCircleIcon, Save } from "lucide-react";

import QuestionCard from "./QuestionCard";
import EmptySurveyPlaceholder from "./EmptySurveyPlaceholder";
import Button from "../../../components/Button";
import UnsavedDialog from "../../../components/UnsavedDialog";
import ErrorMessage from "../../../components/ErrorMessage";

import { useSurveyContext } from "../../../context/SurveyProvider";
import { getStepStatus } from "../../../utils/stepStatus";

const SurveyStructure = () => {
  const [saving, setSaving] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const {
    survey,
    setSurvey,
    setStep,
    setStepStatus,
    loading,
    setLoading,
    error,
    setError,
    lastSavedSurvey,
  } = useSurveyContext();

  const loadSurvey = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/questions");
      setSurvey(res.data);
      lastSavedSurvey.current = JSON.stringify(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load survey");
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    if (survey) {
      const newQuestion = {
        id: Date.now(),
        text: "New question",
        options: [
          { text: "A", value: 5 },
          { text: "B", value: 10 },
          { text: "C", value: 7 },
          { text: "D", value: 6 },
        ],
      };
      setSurvey([...survey, newQuestion]);
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (survey) {
      setSurvey(survey.filter((question) => question.id !== questionId));
    }
  };

  const handleQuestionChange = (
    questionId: number,
    field: "text",
    value: string
  ) => {
    if (survey) {
      const updatedQuestions = survey.map((question) => {
        if (question.id === questionId) {
          return { ...question, [field]: value };
        }
        return question;
      });
      setSurvey(updatedQuestions);
    }
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

  const handleSaveSurvey = async () => {
    if (survey) {
      setSaving(true);
      setError(null);
      try {
        const res = await axios.post("/api/questions", survey);
        setSurvey(res.data);
        lastSavedSurvey.current = JSON.stringify(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to save survey");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleNextStep = () => {
    if (JSON.stringify(survey) !== lastSavedSurvey.current) {
      setShowUnsavedModal(true);
      return;
    }
    setStep("subscale");
    setStepStatus(getStepStatus("subscale", ["questions"]));
  };

  const handleAbandon = () => {
    if (lastSavedSurvey.current) {
      setSurvey(JSON.parse(lastSavedSurvey.current));
      localStorage.setItem("surveyDraft", lastSavedSurvey.current);
    }
    setShowUnsavedModal(false);
    setStep("subscale");
    setStepStatus(getStepStatus("subscale", ["questions"]));
  };

  const handleSaveAndNavigate = async () => {
    await handleSaveSurvey();
    setShowUnsavedModal(false);
    setStep("subscale");
    setStepStatus(getStepStatus("subscale", ["questions"]));
  };

  // Save draft on every change
  useEffect(() => {
    if (survey && survey.length > 0) {
      localStorage.setItem("surveyDraft", JSON.stringify(survey));
    } else {
      localStorage.removeItem("surveyDraft");
    }
  }, [survey]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("surveyDraft");
    if (draft && draft.length !== 0) {
      setSurvey(JSON.parse(draft));
      lastSavedSurvey.current = draft;
    } else {
      loadSurvey();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoaderCircleIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Survey Questions
        </h2>
        <p className="text-gray-600">
          Create and configure the questions for your survey. Each question
          should have multiple choice options with point values.
        </p>
      </div>
      <div className="flex items-center justify mb-4">
        <Button
          variant="danger"
          icon={<Brain className="w-4 h-4" />}
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </div>

      <div className="space-y-6">
        {survey.length === 0 ? (
          <EmptySurveyPlaceholder />
        ) : (
          survey.map((question, questionIndex) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionIndex={questionIndex}
              onDelete={handleDeleteQuestion}
              onTextChange={(id, value) =>
                handleQuestionChange(id, "text", value)
              }
              onAddOption={handleAddOption}
              onOptionChange={handleOptionChange}
              onDeleteOption={handleDeleteOption}
            />
          ))
        )}
      </div>

      {survey.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
          <Button
            variant="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSaveSurvey}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Survey"}
          </Button>
          <Button
            variant="secondary"
            icon={<BarChart3 className="w-4 h-4" />}
            onClick={handleNextStep}
          >
            Next: Configure Subscale
          </Button>
        </div>
      )}

      <UnsavedDialog
        isOpen={showUnsavedModal}
        onClose={() => setShowUnsavedModal(false)}
        onAbandon={handleAbandon}
        onSaveAndNavigate={handleSaveAndNavigate}
      />
    </div>
  );
};

export default SurveyStructure;
