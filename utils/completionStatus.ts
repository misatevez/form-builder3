import { FormTemplate, FormComponent } from '../types/form';

export function calculateCompletionStatus(template: FormTemplate, data: { [key: string]: any }): number {
  const totalFields = template.sections.reduce((acc, section) => acc + section.components.length, 0);
  const completedFields = template.sections.reduce((acc, section) => {
    return acc + section.components.filter(component => isFieldComplete(component, data[component.id])).length;
  }, 0);
  
  return (completedFields / totalFields) * 100;
}

function isFieldComplete(component: FormComponent, value: any): boolean {
  if (component.validation?.required && !value) {
    return false;
  }
  
  switch (component.type) {
    case 'text':
    case 'email':
    case 'textarea':
      return !!value;
    case 'number':
      return value !== undefined && value !== null;
    case 'checkbox':
      return value === true;
    case 'select':
    case 'radio':
      return !!value;
    case 'date':
    case 'time':
      return !!value;
    case 'file':
      return value && value.length > 0;
    default:
      return true;
  }
}
