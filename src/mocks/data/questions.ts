import type { Question } from "../../types";

export const questions: Question[] = [
  {
    id: 1,
    text: "Question 1",
    options: [
      { text: "A", value: 1 },
      { text: "B", value: 2 },
      { text: "C", value: 3 },
      { text: "D", value: 4 },
    ],
  },
  {
    id: 2,
    text: "Question 2",
    options: [
      { text: "A", value: 3 },
      { text: "B", value: 1 },
      { text: "C", value: 7 },
      { text: "D", value: 10 },
    ],
  },
];
