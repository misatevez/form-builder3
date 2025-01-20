import { FormTemplate } from '../../types/form';

export const installationProgressReport: FormTemplate = {
  id: 'installation-progress-report',
  name: 'Reporte de avance de instalación',
  sections: [
    {
      id: 'details',
      title: 'Detalles',
      components: [
        { 
          id: 'managerName', 
          type: 'text', 
          label: 'Nombre del encargado'
        },
      ],
    },
    {
      id: 'completedWork',
      title: 'Trabajos realizados',
      description: 'Detalle los trabajos realizados para este reporte',
      components: [
        { 
          id: 'completedTasks', 
          type: 'textarea', 
          label: 'Tareas realizadas',
          placeholder: 'Detalle los trabajos realizados en este periodo'
        },
        {
          id: 'taskPhotos',
          type: 'photo',
          label: 'Fotos de tareas realizadas'
        },
      ],
    },
    {
      id: 'needsAndRequirements',
      title: 'Necesidades y Requerimientos',
      components: [
        { 
          id: 'needs', 
          type: 'textarea', 
          label: 'Necesidades o requerimientos'
        },
        {
          id: 'needPhotos',
          type: 'photo',
          label: 'Fotos de necesidad o requerimientos'
        },
      ],
    },
    {
      id: 'problemsAndIssues',
      title: 'Problemas o Inconvenientes',
      description: 'Describa los problemas o inconvenientes que se hayan presentado para este reporte',
      components: [
        { 
          id: 'problems', 
          type: 'textarea', 
          label: 'Problemas o inconvenientes encontrados',
          placeholder: 'Detalle la problemática y de ser posible proponer una solución al inconveniente'
        },
        {
          id: 'problemPhotos',
          type: 'photo',
          label: 'Fotos de problemas o inconvenientes'
        },
      ],
    },
  ],
};
