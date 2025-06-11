import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type AdminStep, type AdminStepStatus, type Question } from "../types";
import axios from "axios";

interface SurveyProviderProps {
  children: React.ReactNode;
}

interface SurveyContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  step: AdminStep;
  setStep: Dispatch<SetStateAction<AdminStep>>;
  stepStatus: AdminStepStatus;
  setStepStatus: Dispatch<SetStateAction<AdminStepStatus>>;
  survey: Question[];
  setSurvey: Dispatch<SetStateAction<Question[]>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  loadSurvey: () => Promise<void>;
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
  loadSurvey: async () => {},
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

  const loadSurvey = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/questions");
      setSurvey(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load survey");
    } finally {
      setLoading(false);
    }
  };

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
        loadSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => useContext(SurveyContext);

export default SurveyProvider;
