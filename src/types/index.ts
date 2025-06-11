export interface QuestionOption {
  text: string;
  value: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface NormalizationData {
  id: number;
  age: number;
  gender: string;
  raw_score: number;
  normalized_score: number;
}
