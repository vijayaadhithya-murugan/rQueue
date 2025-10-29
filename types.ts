
export interface RawTicket {
  id: string;
  subject: string;
  body: string;
  createdAt: string; // ISO 8601 date string
}

export type Category = 'Bug Report' | 'Feature Request' | 'Billing Inquiry' | 'Technical Support' | 'Other';
export type Urgency = 'P1 - Critical' | 'P2 - High' | 'P3 - Medium' | 'P4 - Low';
export type Confidence = 'High' | 'Medium' | 'Low';

export interface TriageResult {
  id: string;
  category: Category;
  urgency: Urgency;
  suggestedAssignee: string; // e.g., 'Frontend Team', 'DevOps', 'Billing Dept.'
  confidence: Confidence;
  reasoning: string;
}
