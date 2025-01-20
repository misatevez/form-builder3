import { FormTemplate } from '../../types/form';

export const surveyForm: FormTemplate = {
  id: 'survey-form',
  name: 'Encuesta de Satisfacción',
  sections: [
    {
      id: 'personal-info',
      title: 'Información Personal',
      components: [
        { id: 'name', type: 'text', label: 'Nombre' },
        { id: 'age', type: 'number', label: 'Edad' },
      ],
    },
    {
      id: 'feedback',
      title: 'Retroalimentación',
      components: [
        { id: 'rating', type: 'rating', label: 'Calificación General' },
        { id: 'comments', type: 'textarea', label: 'Comentarios' },
        { id: 'improvements', type: 'text', label: 'Sugerencias de Mejora' },
      ],
    },
  ],
};

