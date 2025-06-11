import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { AdminStep, AdminStepStatus, Question } from "../types";

interface SurveyProviderProps {
  children: React.ReactNode;
}

interface SurveyContextType {
  survey: Question[];
  setSurvey: Dispatch<SetStateAction<Question[]>>;
  step: AdminStep;
  setStep: Dispatch<SetStateAction<AdminStep>>;
  stepStatus: AdminStepStatus;
  setStepStatus: Dispatch<SetStateAction<AdminStepStatus>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

const SurveyContext = createContext<SurveyContextType>({
  survey: [],
  setSurvey: () => {},
  step: "questions",
  setStep: () => {},
  stepStatus: {
    questions: "current",
    subscale: "disabled",
    normalization: "disabled",
  },
  setStepStatus: () => {},
  loading: true,
  setLoading: () => {},
  error: null,
  setError: () => {},
});

const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [survey, setSurvey] = useState<Question[]>([]);
  const [step, setStep] = useState<AdminStep>("questions");
  const [stepStatus, setStepStatus] = useState<AdminStepStatus>({
    questions: "current",
    subscale: "disabled",
    normalization: "disabled",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <SurveyContext.Provider
      value={{
        survey,
        setSurvey,
        step,
        setStep,
        stepStatus,
        setStepStatus,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => useContext(SurveyContext);

export default SurveyProvider;
