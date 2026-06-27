import { GoogleGenAI } from "@google/genai";

let gemini: GoogleGenAI | null = null;

export function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not loaded.");
  }

  if (!gemini) {
    gemini = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return gemini;
}