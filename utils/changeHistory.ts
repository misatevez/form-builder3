import { FormTemplate } from '../types/form';

export interface ChangeHistoryEntry {
  timestamp: string;
  changes: { [key: string]: any };
}

export function addToChangeHistory(template: FormTemplate, changes: { [key: string]: any }) {
  const historyKey = `form_${template.id}_history`;
  const existingHistory: ChangeHistoryEntry[] = JSON.parse(localStorage.getItem(historyKey) || '[]');
  
  const newEntry: ChangeHistoryEntry = {
    timestamp: new Date().toISOString(),
    changes,
  };
  
  existingHistory.push(newEntry);
  
  // Limit history to last 50 changes
  if (existingHistory.length > 50) {
    existingHistory.shift();
  }
  
  localStorage.setItem(historyKey, JSON.stringify(existingHistory));
}

export function getChangeHistory(templateId: string): ChangeHistoryEntry[] {
  const historyKey = `form_${templateId}_history`;
  return JSON.parse(localStorage.getItem(historyKey) || '[]');
}
