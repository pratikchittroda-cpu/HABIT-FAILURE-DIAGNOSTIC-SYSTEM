import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosticResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are a Habit Failure Diagnostic System.
You do NOT motivate.
You diagnose WHY habits fail using behavioral science.

Rules:
- Never blame discipline or laziness.
- Identify root causes: environment, reward loops, energy, identity mismatch.
- Explain failure mechanisms clearly (e.g., "High friction in starting phase," "Lack of immediate reward," "Cognitive overload").
- Suggest only small structural fixes, not willpower advice.
- Tone: Clinical, objective, analytical, concise. No exclamation marks. No "You can do it!"

Output MUST be a JSON object matching the requested schema.
`;

export const runDiagnostic = async (habitDescription: string): Promise<DiagnosticResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing from environment.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Diagnose this failed habit attempt: "${habitDescription}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            habitSummary: {
              type: Type.STRING,
              description: "A concise, objective summary of the attempted habit.",
            },
            failureTriggers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific moments or conditions where the habit breaks down.",
            },
            psychologicalCause: {
              type: Type.STRING,
              description: "The behavioral science explanation (e.g., decision fatigue, identity conflict).",
            },
            environmentalCause: {
              type: Type.STRING,
              description: "Physical or contextual barriers identified.",
            },
            structuralAdjustment: {
              type: Type.STRING,
              description: "ONE precise, non-willpower based change to the system.",
            },
          },
          required: ["habitSummary", "failureTriggers", "psychologicalCause", "environmentalCause", "structuralAdjustment"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data received from diagnostic core.");
    }

    return JSON.parse(text) as DiagnosticResult;
  } catch (error) {
    console.error("Diagnostic failed:", error);
    throw error;
  }
};