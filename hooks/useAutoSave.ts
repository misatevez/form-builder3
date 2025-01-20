import { useEffect, useRef } from 'react';
import { FormTemplate, FormData } from '../types/form';
import { formService } from '../services/FormService';

export function useAutoSave(template: FormTemplate, data: FormData) {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      formService.saveForm(template, data);
      console.log('Form auto-saved');
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [template, data]);
}
