import { FormTemplate } from '../types/form';

const AUTOSAVE_INTERVAL = 60000; // 1 minute

export function setupAutosave(template: FormTemplate, data: { [key: string]: any }, onSave: (savedData: { [key: string]: any }) => void) {
  let timer: NodeJS.Timeout;
  let isDirty = false;

  const save = () => {
    if (isDirty) {
      const savedData = { ...data, _lastSaved: new Date().toISOString() };
      localStorage.setItem(`form_${template.id}_draft`, JSON.stringify(savedData));
      onSave(savedData);
      isDirty = false;
    }
  };

  const startTimer = () => {
    timer = setInterval(save, AUTOSAVE_INTERVAL);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const markDirty = () => {
    isDirty = true;
  };

  startTimer();

  return {
    markDirty,
    save,
    stopTimer,
  };
}

export function loadDraft(templateId: string): { [key: string]: any } | null {
  const savedData = localStorage.getItem(`form_${templateId}_draft`);
  return savedData ? JSON.parse(savedData) : null;
}
