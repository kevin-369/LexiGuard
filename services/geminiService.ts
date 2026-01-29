import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LexiGuardResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Define the schema for the JSON output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    document_analysis: {
      type: Type.OBJECT,
      properties: {
        summary: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A 3-bullet point executive summary in Plain English.",
        },
        tone_check: {
          type: Type.STRING,
          description: "Assessment of the document's tone (e.g., Aggressive, Neutral, Protective).",
        },
        complexity_score: {
          type: Type.NUMBER,
          description: "A score from 1-10 indicating how difficult the document is to understand.",
        },
      },
      required: ["summary", "tone_check", "complexity_score"],
    },
    risk_matrix: {
      type: Type.OBJECT,
      properties: {
        high_priority: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Critical risks requiring immediate attention.",
        },
        medium_priority: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Significant risks that should be managed.",
        },
        low_priority: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Minor risks or standard clauses.",
        },
      },
      required: ["high_priority", "medium_priority", "low_priority"],
    },
    action_chips: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          action: { type: Type.STRING },
        },
      },
      description: "3 immediate next steps for the client.",
    },
    governance_score: {
      type: Type.OBJECT,
      properties: {
        rating: {
          type: Type.NUMBER,
          description: "A score from 0-100 indicating alignment with ESG and corporate governance standards.",
        },
        esg_notes: {
          type: Type.STRING,
          description: "Specific notes on Environmental, Social, and Governance factors found.",
        },
      },
      required: ["rating", "esg_notes"],
    },
  },
  required: ["document_analysis", "risk_matrix", "action_chips", "governance_score"],
};

export const analyzeLegalDocument = async (text: string): Promise<LexiGuardResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are a Senior Legal Consultant & Corporate Governance Expert for LexiGuard.
    Your objective is to analyze legal documents (contracts, NDAs, compliance filings) and provide a structured "Plain English" summary.
    
    Contextual Expertise:
    - Specialist in East African and International Law frameworks.
    - Expert in ESG (Environmental, Social, and Governance) and EDGE-certified sustainability reporting.
    - Focused on risk mitigation, document accessibility (Lean UX), and regulatory compliance.

    Constraint Checklist & Confidence Score:
    1. Plain English Summary? Yes.
    2. Risk Assessment? Yes.
    3. Action Items? Yes.
    4. ESG Alignment? Yes.
    
    Output must be strict JSON. Do not provide legal advice; assume a standard AI disclaimer is displayed by the frontend.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `Analyze the following legal text:\n\n${text}` }],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: systemInstruction,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response generated from the model.");
    }

    return JSON.parse(resultText) as LexiGuardResponse;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};