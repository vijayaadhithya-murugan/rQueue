
import type { Category, Urgency } from './types';

export const CATEGORIES: Category[] = [
  'Bug Report',
  'Feature Request',
  'Billing Inquiry',
  'Technical Support',
  'Other'
];

export const URGENCY_LEVELS: Urgency[] = [
  'P1 - Critical',
  'P2 - High',
  'P3 - Medium',
  'P4 - Low'
];

export const URGENCY_STYLES: Record<Urgency, string> = {
  'P1 - Critical': 'bg-red-500/20 text-red-300 border border-red-500/30',
  'P2 - High': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  'P3 - Medium': 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  'P4 - Low': 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
};

export const CONFIDENCE_STYLES: Record<string, string> = {
  'High': 'text-green-400',
  'Medium': 'text-yellow-400',
  'Low': 'text-orange-400',
};
