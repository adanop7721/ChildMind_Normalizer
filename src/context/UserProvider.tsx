import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";

import type {
  UserStep,
  UserStepStatus,
  NormalizationData,
  Question,
  SubscaleConfig,
  UserProfile,
  Answer,
  Result,
} from "../types";
import axios from "axios";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  survey: Question[];
  subscaleConfig: SubscaleConfig;
  normalizationData: NormalizationData[];
  profile: UserProfile;
  setProfile: Dispatch<SetStateAction<UserProfile>>;
  answer: Answer[];
  setAnswer: Dispatch<SetStateAction<Answer[]>>;
  result: Result | null;
  setResult: Dispatch<SetStateAction<Result | null>>;
  step: UserStep;
  setStep: Dispatch<SetStateAction<UserStep>>;
  stepStatus: UserStepStatus;
  setStepStatus: Dispatch<SetStateAction<UserStepStatus>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType>({
  survey: [],
  subscaleConfig: {
    question_ids: [],
    calculation_type: "sum",
  },
  normalizationData: [],
  profile: {
    age: 15,
    gender: "M",
  },
  setProfile: () => {},
  answer: [],
  setAnswer: () => {},
  result: null,
  setResult: () => {},
  step: "profile",
  setStep: () => {},
  stepStatus: {
    profile: "current",
    answer: "disabled",
    result: "disabled",
  },
  setStepStatus: () => {},
  loading: true,
  setLoading: () => {},
  error: null,
  setError: () => {},
});

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [survey, setSurvey] = useState<Question[]>([]);
  const [subscaleConfig, setSubscaleConfig] = useState<SubscaleConfig>({
    question_ids: [],
    calculation_type: "sum",
  });
  const [normalizationData, setNormalizationData] = useState<
    NormalizationData[]
  >([]);
  const [profile, setProfile] = useState<UserProfile>({
    age: 15,
    gender: "M",
  });
  const [answer, setAnswer] = useState<Answer[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [step, setStep] = useState<UserStep>("profile");
  const [stepStatus, setStepStatus] = useState<UserStepStatus>({
    profile: "current",
    answer: "disabled",
    result: "disabled",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSurvey = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/questions");
      const data: Question[] = response.data;
      setSurvey(data);
    } catch (error: any) {
      setError(error.message || "Error fetching survey");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscaleConfig = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/subscale");
      const data: SubscaleConfig = response.data;
      setSubscaleConfig(data);
      if (data.question_ids.length === 0) {
        throw new Error("No questions configured for subscale");
      }
    } catch (error: any) {
      setError(error.message || "Error fetching subscale configuration");
    } finally {
      setLoading(false);
    }
  };

  const fetchNormalizationData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/normalization");
      const data: NormalizationData[] = response.data;
      setNormalizationData(data);
    } catch (error: any) {
      setError(error.message || "Error fetching normalization data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurvey();
    fetchSubscaleConfig();
    fetchNormalizationData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        survey,
        subscaleConfig,
        normalizationData,
        profile,
        setProfile,
        answer,
        setAnswer,
        result,
        setResult,
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
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
