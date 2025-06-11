import { http } from "msw";

import { questions } from "./data/surveyQuestions";
import { normalizationData } from "./data/normalizationData";
import { subscaleConfig } from "./data/subscaleConfig";

import type { NormalizationData, Question, SubscaleConfig } from "../types";

let questionsStore = [...questions];
let subscaleConfigStore = { ...subscaleConfig };
let normalizationStore = [...normalizationData];

export const handlers = [
  // Questions CRUD
  http.get("/api/questions", () => {
    return Response.json(questionsStore);
  }),

  http.post("/api/questions", async ({ request }) => {
    const body = (await request.json()) as Question[];
    questionsStore = [...body];
    return Response.json(questionsStore, { status: 200 });
  }),

  // Subscale Config CRUD
  http.get("/api/subscale", () => {
    return Response.json(subscaleConfigStore);
  }),

  http.post("/api/subscale", async ({ request }) => {
    const body = (await request.json()) as SubscaleConfig;
    subscaleConfigStore = { ...body };
    return Response.json(subscaleConfigStore, { status: 200 });
  }),

  // NormalizationData CRUD
  http.get("/api/normalization", () => {
    return Response.json(normalizationStore);
  }),

  http.post("/api/normalization", async ({ request }) => {
    const body = (await request.json()) as Omit<NormalizationData, "id">;
    const newNorm = { ...body, id: Date.now() };
    normalizationStore.push(newNorm);
    return Response.json(normalizationStore, { status: 201 });
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
