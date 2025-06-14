export type AdminStep = "questions" | "subscale" | "normalization";

export type UserStep = "profile" | "answer" | "result";

export type stepStatus = "current" | "completed" | "enabled" | "disabled";

export interface AdminStepStatus {
  questions: stepStatus;
  subscale: stepStatus;
  normalization: stepStatus;
}

export interface UserStepStatus {
  profile: stepStatus;
  answer: stepStatus;
  result: stepStatus;
}

export interface QuestionOption {
  text: string;
  value: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export type CalculationType = "sum" | "average";

export interface SubscaleConfig {
  question_ids: number[];
  calculation_type: CalculationType;
}

export interface NormalizationData {
  id: number;
  age: number;
  gender: string;
  raw_score: number;
  normalized_score: number;
}

export interface UserProfile {
  age: number;
  gender: string;
}

export interface Answer {
  question_id: number;
  value: number;
}

export interface Result {
  raw_score: number;
  normalized_score: number | boolean;
}
