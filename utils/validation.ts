export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'email' | 'phone' | 'custom';
  value?: any;
  message: string;
}

export function validateField(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value) return rule.message;
        break;
      case 'minLength':
        if (typeof value === 'string' && value.length < rule.value) return rule.message;
        break;
      case 'maxLength':
        if (typeof value === 'string' && value.length > rule.value) return rule.message;
        break;
      case 'min':
        if (typeof value === 'number' && value < rule.value) return rule.message;
        break;
      case 'max':
        if (typeof value === 'number' && value > rule.value) return rule.message;
        break;
      case 'pattern':
        if (typeof value === 'string' && !new RegExp(rule.value).test(value)) return rule.message;
        break;
      case 'email':
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return rule.message;
        break;
      case 'phone':
        if (typeof value === 'string' && !/^\+?[\d\s-()]+$/.test(value)) return rule.message;
        break;
      case 'custom':
        if (typeof rule.value === 'function' && !rule.value(value)) return rule.message;
        break;
    }
  }
  return null;
}
