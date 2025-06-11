import React, {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

import type {
  AdminStep,
  AdminStepStatus,
  NormalizationData,
  Question,
  SubscaleConfig,
} from "../types";

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
  lastSavedSurvey: RefObject<string>;
  subscaleConfig: SubscaleConfig;
  setSubscaleConfig: Dispatch<SetStateAction<SubscaleConfig>>;
  normalizationData: NormalizationData[];
  setNormalizationData: Dispatch<SetStateAction<NormalizationData[]>>;
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
  lastSavedSurvey: { current: "" },
  subscaleConfig: {
    question_ids: [],
    calculation_type: "sum",
  },
  setSubscaleConfig: () => {},
  normalizationData: [],
  setNormalizationData: () => {},
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
  const lastSavedSurvey = useRef<string>("");
  const [subscaleConfig, setSubscaleConfig] = useState<SubscaleConfig>({
    question_ids: [],
    calculation_type: "sum",
  });
  const [normalizationData, setNormalizationData] = useState<
    NormalizationData[]
  >([]);

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
        lastSavedSurvey,
        subscaleConfig,
        setSubscaleConfig,
        normalizationData,
        setNormalizationData,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => useContext(SurveyContext);

export default SurveyProvider;
