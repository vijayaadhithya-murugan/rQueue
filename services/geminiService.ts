import { GoogleGenAI, Type } from "@google/genai";
import type { RawTicket, TriageResult } from '../types';
import { CATEGORIES, URGENCY_LEVELS } from '../constants';
import { getApiKey } from './apiKeyService';

const API_KEY = getApiKey();
const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      category: {
        type: Type.STRING,
        enum: CATEGORIES
      },
      urgency: {
        type: Type.STRING,
        enum: URGENCY_LEVELS
      },
      suggestedAssignee: {
        type: Type.STRING,
        description: "The team or role best suited to handle this ticket (e.g., 'Frontend Team', 'Backend Team', 'DevOps', 'Billing Department')."
      },
      confidence: {
        type: Type.STRING,
        enum: ['High', 'Medium', 'Low'],
        description: "The model's confidence in its triage assessment."
      },
      reasoning: {
        type: Type.STRING,
        description: "A brief, one-sentence explanation for the chosen category and urgency."
      },
    },
    required: ['id', 'category', 'urgency', 'suggestedAssignee', 'confidence', 'reasoning']
  }
};


export const triageTickets = async (tickets: RawTicket[]): Promise<TriageResult[]> => {
  const currentDate = new Date().toISOString();

  const prompt = `
    You are the "Ticket Triage Genie," an expert AI assistant for a software company.
    Your task is to analyze a batch of support tickets and return a structured JSON array with your triage assessment for each one.
    The current date is ${currentDate}. Consider the ticket's 'createdAt' date to determine its age. Older, unresolved tickets might require higher urgency.

    Triage Rules:
    1.  **Categorization**: Assign one of the following categories: ${CATEGORIES.join(', ')}.
    2.  **Urgency**: Assign one of the following urgency levels:
        -   **P1 - Critical**: System is down, major outage, security breach, data loss. Keywords: "down", "outage", "critical", "urgent", "can't log in", "security".
        -   **P2 - High**: Core functionality is broken or severely impaired for many users. No workaround available. Keywords: "broken", "error", "failing", "cannot use".
        -   **P3 - Medium**: Minor feature is not working, or a workaround exists. General questions about functionality. Keywords: "issue", "problem", "question", "doesn't work as expected".
        -   **P4 - Low**: Cosmetic issue, typo, "how-to" question, or a feature suggestion. Keywords: "suggestion", "idea", "typo", "cosmetic", "request".
    3.  **Suggested Assignee**: Based on the content, suggest the most relevant team. Examples: 'Frontend Team', 'Backend Team', 'DevOps', 'Billing Department', 'Customer Support'.
    4.  **Confidence**: Rate your confidence in the triage. Be critical in your assessment.
        -   **High**: Use 'High' only when the ticket's content aligns perfectly with a single category and urgency, with clear keywords.
        -   **Medium**: Use 'Medium' if the ticket is slightly ambiguous, could plausibly fit into two categories, or if the urgency is borderline between two levels.
        -   **Low**: Use 'Low' if the ticket is very vague, lacks essential details to make a proper assessment, or is written in a confusing way.
    5.  **Reasoning**: Provide a very brief, one-sentence explanation for your choices.

    Analyze the following tickets and provide your triage results in the specified JSON format.
    
    Tickets Data:
    ${JSON.stringify(tickets, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4,
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as TriageResult[];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to process tickets with Gemini API.");
  }
};