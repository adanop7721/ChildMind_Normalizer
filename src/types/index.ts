export type AdminStep = "questions" | "subscale" | "normalization";

export type stepStatus = "current" | "completed" | "enabled" | "disabled";

export interface AdminStepStatus {
  questions: stepStatus;
  subscale: stepStatus;
  normalization: stepStatus;
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
