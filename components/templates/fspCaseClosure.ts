import { FormTemplate } from '../../types/form';

export const fspCaseClosure: FormTemplate = {
  id: 'fsp-case-closure',
  name: 'Cierre de caso FSP',
  sections: [
    {
      id: 'service-data',
      title: 'Datos del servicio',
      components: [
        { id: 'project-name', type: 'text', label: 'Nombre del proyecto', validation: { required: true } },
        { id: 'date', type: 'date', label: 'Fecha', validation: { required: true } },
        { id: 'greenenergy-manager', type: 'text', label: 'Encargado greenenergy', validation: { required: true } },
        { id: 'service-case-number', type: 'text', label: 'Número de caso de servicio' },
        { id: 'inverter-serial', type: 'text', label: 'Número de serie del inversor', validation: { required: true } },
        { 
          id: 'inverter-model', 
          type: 'select', 
          label: 'Modelo del inversor', 
          options: ['Primo', 'Symo', 'Galvo', 'CL', 'IG'],
          validation: { required: true } 
        },
        { 
          id: 'service-description', 
          type: 'textarea', 
          label: 'Descripción de los servicios efectuados.', 
          validation: { required: true } 
        },
      ],
    },
    {
      id: 'damaged-items',
      title: 'Artículos dañados',
      components: [
        {
          id: 'damaged-items-table',
          type: 'dynamicTable',
          label: 'Artículos dañados',
          columns: [
            { id: 'part-number', type: 'text', label: 'Número de parte del artículo', validation: { required: true } },
            { id: 'part-description', type: 'text', label: 'Descripción de la pieza', validation: { required: true } },
          ],
        },
      ],
    },
    {
      id: 'before-replacement-photos',
      title: 'Fotos antes del reemplazo',
      components: [
        { 
          id: 'before-photos', 
          type: 'photo', 
          label: 'Fotos antes del reemplazo', 
          validation: { required: true, min: 2 } 
        },
      ],
    },
    {
      id: 'after-replacement-photos',
      title: 'Fotos después del reemplazo',
      components: [
        { 
          id: 'after-photos', 
          type: 'photo', 
          label: 'Fotos después del reemplazo', 
          validation: { required: true, min: 2 } 
        },
      ],
    },
    {
      id: 'manager-signature',
      title: 'Firma del encargado',
      components: [
        { 
          id: 'manager-signature', 
          type: 'signature', 
          label: 'Firma del encargado', 
          validation: { required: true } 
        },
      ],
    },
    {
      id: 'client-signature',
      title: 'Firma del cliente',
      components: [
        { 
          id: 'client-signature', 
          type: 'signature', 
          label: 'Firma del cliente', 
          validation: { required: true } 
        },
      ],
    },
  ],
};

