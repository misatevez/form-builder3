// Nuevo hook para validación
import { useState, useCallback } from 'react';
import { FormTemplate, FormData } from '../types';

export function useFormValidation(template: FormTemplate) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((fieldId: string, value: any) => {
    // Implementar validación de campo
  }, []);

  const validateForm = useCallback((data: FormData) => {
    // Implementar validación de formulario completo
  }, [template]);

  return {
    errors,
    validateField,
    validateForm
  };
}
