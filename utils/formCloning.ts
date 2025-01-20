import { FormTemplate } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

export function cloneForm(template: FormTemplate): FormTemplate {
  const clonedTemplate: FormTemplate = {
    ...template,
    id: uuidv4(),
    name: `${template.name} (Copy)`,
  };
  
  // Deep clone sections and components
  clonedTemplate.sections = template.sections.map(section => ({
    ...section,
    id: uuidv4(),
    components: section.components.map(component => ({
      ...component,
      id: uuidv4(),
    })),
  }));
  
  return clonedTemplate;
}

export function modifyForm(template: FormTemplate, modifications: Partial<FormTemplate>): FormTemplate {
  return {
    ...template,
    ...modifications,
  };
}

