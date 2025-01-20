import { FormTemplate } from '../../types/form';

export const roofCoverReceptionForm: FormTemplate = {
  id: 'roof-cover-reception-form',
  name: 'Recepción de cubierta de techo',
  sections: [
    {
      id: 'project-info',
      title: 'Información de Proyecto',
      components: [
        { id: 'projectName', type: 'text', label: 'Nombre de Proyecto' },
        { id: 'contactName', type: 'text', label: 'Nombre de contacto de referencia' },
        { id: 'greenergyManager', type: 'text', label: 'Nombre de encargado greenenergy®' },
      ],
    },
    {
      id: 'roof-cover-status',
      title: 'Estado de Cubierta de Techo',
      components: [
        { 
          id: 'roofSheetDetails', 
          type: 'textarea', 
          label: 'Detalle de láminas de techo' 
        },
        { 
          id: 'roofSheetPhotos', 
          type: 'photo', 
          label: 'Fotos de láminas de techo' 
        },
        { 
          id: 'ridgeDetails', 
          type: 'textarea', 
          label: 'Detalle de Cumbrera/Monitor' 
        },
        { 
          id: 'ridgePhotos', 
          type: 'photo', 
          label: 'Fotos de Cumbrera' 
        },
        { 
          id: 'roofSupportDetails', 
          type: 'textarea', 
          label: 'Detalle de clavadores/soportes de techo' 
        },
        { 
          id: 'roofSupportPhotos', 
          type: 'photo', 
          label: 'Fotografía de soportes de techo (de ser posible)' 
        },
        { 
          id: 'roofObstaclesDetails', 
          type: 'textarea', 
          label: 'Detalle de equipos, obstáculos y elementos sobre cubierta' 
        },
        { 
          id: 'roofObstaclesPhotos', 
          type: 'photo', 
          label: 'Fotografía de equipos/obstáculos sobre cubierta' 
        },
        { 
          id: 'gutterDetails', 
          type: 'textarea', 
          label: 'Detalle de canoas/bajantes de cubierta' 
        },
        { 
          id: 'gutterPhotos', 
          type: 'photo', 
          label: 'Fotografía de canoas/bajantes' 
        },
        { 
          id: 'anchorPointDetails', 
          type: 'textarea', 
          label: 'Detalle de puntos de anclaje y seguridad para trabajar sobre techo' 
        },
        { 
          id: 'anchorPointPhotos', 
          type: 'photo', 
          label: 'Fotografía de puntos de anclaje' 
        },
        { 
          id: 'roofAccessDetails', 
          type: 'textarea', 
          label: 'Detalle de acceso a cubierta de techo' 
        },
        { 
          id: 'roofAccessPhotos', 
          type: 'photo', 
          label: 'Fotografía de acceso a cubierta de techo' 
        },
        { 
          id: 'additionalRequirements', 
          type: 'textarea', 
          label: 'Detalle de requerimientos adicionales para trabajar sobre la cubierta' 
        },
        { 
          id: 'additionalPhotos', 
          type: 'photo', 
          label: 'Fotografías adicionales' 
        },
      ],
    },
  ],
};
