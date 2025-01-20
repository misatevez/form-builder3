// Servicios de API centralizados
import { FormTemplate, FormData } from '../types';

export const api = {
  async saveForm(template: FormTemplate, data: FormData): Promise<void> {
    // Implementar lógica de guardado
    console.log('Saving form:', template, data);
  },

  async loadForm(id: string): Promise<FormTemplate> {
    // Implementar lógica de carga
    throw new Error('Not implemented');
  },

  async exportForm(template: FormTemplate, format: 'pdf' | 'excel' | 'json'): Promise<Blob> {
    // Implementar lógica de exportación
    throw new Error('Not implemented');
  }
};
