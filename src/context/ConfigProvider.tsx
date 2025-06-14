import React, {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type FC,
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

interface ConfigProviderProps {
  children: React.ReactNode;
}

interface ConfigContextType {
  survey: Question[];
  setSurvey: Dispatch<SetStateAction<Question[]>>;
  subscaleConfig: SubscaleConfig;
  setSubscaleConfig: Dispatch<SetStateAction<SubscaleConfig>>;
  normalizationData: NormalizationData[];
  setNormalizationData: Dispatch<SetStateAction<NormalizationData[]>>;
  step: AdminStep;
  setStep: Dispatch<SetStateAction<AdminStep>>;
  stepStatus: AdminStepStatus;
  setStepStatus: Dispatch<SetStateAction<AdminStepStatus>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  lastSavedSurvey: RefObject<string>;
}

const ConfigContext = createContext<ConfigContextType>({
  survey: [],
  setSurvey: () => {},
  subscaleConfig: {
    question_ids: [],
    calculation_type: "sum",
  },
  setSubscaleConfig: () => {},
  normalizationData: [],
  setNormalizationData: () => {},
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
});

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
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
    <ConfigContext.Provider
      value={{
        survey,
        setSurvey,
        subscaleConfig,
        setSubscaleConfig,
        normalizationData,
        setNormalizationData,
        step,
        setStep,
        stepStatus,
        setStepStatus,
        loading,
        setLoading,
        error,
        setError,
        lastSavedSurvey,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => useContext(ConfigContext);

export default ConfigProvider;
