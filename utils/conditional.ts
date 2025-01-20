import { ConditionalRules } from '../types/form';

export function evaluateConditional(data: { [key: string]: any }, rules?: ConditionalRules): boolean {
  if (!rules) return true;

  const { show, enable } = rules;

  if (show) {
    for (const [field, value] of Object.entries(show)) {
      if (data[field] !== value) return false;
    }
  }

  if (enable) {
    for (const [field, value] of Object.entries(enable)) {
      if (data[field] !== value) return false;
    }
  }

  return true;
}
