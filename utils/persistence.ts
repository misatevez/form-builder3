export function saveFormTemplate(template: FormTemplate) {
  localStorage.setItem(`form_template_${template.id}`, JSON.stringify(template));
}

export function loadFormTemplate(templateId: string): FormTemplate | null {
  const savedTemplate = localStorage.getItem(`form_template_${templateId}`);
  return savedTemplate ? JSON.parse(savedTemplate) : null;
}

export function saveFormData(templateId: string, data: { [key: string]: any }) {
  localStorage.setItem(`form_data_${templateId}`, JSON.stringify(data));
}

export function loadFormData(templateId: string): { [key: string]: any } | null {
  const savedData = localStorage.getItem(`form_data_${templateId}`);
  return savedData ? JSON.parse(savedData) : null;
}

