import { http } from "msw";
import { questions } from "./data/surveyQuestions";
import { normalizationData } from "./data/normalizationData";
import type { NormalizationData, Question } from "../types";

let questionsStore = [...questions];
let normalizationStore = [...normalizationData];

export const handlers = [
  // Questions CRUD
  http.get("/api/questions", () => {
    return Response.json(questionsStore);
  }),

  http.post("/api/questions", async ({ request }) => {
    const body = (await request.json()) as Omit<Question, "id">;
    const newQuestion = { ...body, id: Date.now() };
    questionsStore.push(newQuestion);
    return Response.json(newQuestion, { status: 201 });
  }),

  http.put("/api/questions/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<Question, "id">;
    questionsStore = questionsStore.map((q) =>
      q.id === id ? { ...q, ...body } : q
    );
    const updated = questionsStore.find((q) => q.id === id);
    return Response.json(updated);
  }),

  http.delete("/api/questions/:id", ({ params }) => {
    const id = Number(params.id);
    questionsStore = questionsStore.filter((q) => q.id !== id);
    return new Response(null, { status: 204 });
  }),

  // NormalizationData CRUD
  http.get("/api/normalization", () => {
    return Response.json(normalizationStore);
  }),

  http.post("/api/normalization", async ({ request }) => {
    const body = (await request.json()) as Omit<NormalizationData, "id">;
    const newNorm = { ...body, id: Date.now() };
    normalizationStore.push(newNorm);
    return Response.json(newNorm, { status: 201 });
  }),

  http.put("/api/normalization/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<NormalizationData, "id">;
    normalizationStore = normalizationStore.map((n) =>
      n.id === id ? { ...n, ...body } : n
    );
    const updated = normalizationStore.find((n) => n.id === id);
    return Response.json(updated);
  }),

  http.delete("/api/normalization/:id", ({ params }) => {
    const id = Number(params.id);
    normalizationStore = normalizationStore.filter((n) => n.id !== id);
    return new Response(null, { status: 204 });
  }),
];
