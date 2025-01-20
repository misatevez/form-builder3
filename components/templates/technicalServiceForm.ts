import { FormTemplate } from '../../types/form';

export const technicalServiceForm: FormTemplate = {
  id: 'technical-service-form',
  name: 'Servicio técnico',
  sections: [
    {
      id: 'general-info',
      title: 'Servicio técnico',
      components: [
        { id: 'date', type: 'date', label: 'Fecha', validation: { required: true } },
        { id: 'projectName', type: 'text', label: 'Nombre del proyecto', validation: { required: true } },
        { id: 'location', type: 'text', label: 'Ubicación', validation: { required: true } },
        { id: 'greenergyManager', type: 'text', label: 'Encargado greenenergy', validation: { required: true } },
        { 
          id: 'serviceType', 
          type: 'select', 
          label: 'Tipo de servicio', 
          validation: { required: true },
          options: ['Mantenimiento preventivo', 'Mantenimiento correctivo', 'Instalación', 'Otro']
        },
        { 
          id: 'generalDescription', 
          type: 'textarea', 
          label: 'Descripción general', 
          validation: { required: true } 
        },
      ],
    },
    {
      id: 'equipment',
      title: 'Equipo',
      description: 'Indicar serie y fabricante en caso de ser equipo fotovoltaico, de otro modo, solo indicar el equipo instalado con su debida descripción.',
      components: [
        {
          id: 'equipmentTable',
          type: 'dynamicTable',
          label: 'Equipo',
          columns: [
            { id: 'equipmentType', type: 'text', label: 'Tipo de equipo', validation: { required: true } },
            { id: 'serialNumber', type: 'text', label: 'Número de serie' },
            { id: 'manufacturer', type: 'text', label: 'Fabricante', validation: { required: true } },
            { id: 'description', type: 'text', label: 'Descripción', validation: { required: true } },
          ],
        },
      ],
    },
    {
      id: 'ac-installation-data',
      title: 'Datos de la instalación AC',
      components: [
        {
          id: 'acDataTable',
          type: 'dynamicTable',
          label: 'Datos de la instalación AC',
          columns: [
            { id: 'f1f2', type: 'number', label: 'F1-F2', validation: { required: true } },
            { id: 'f2f3', type: 'number', label: 'F2-F3' },
            { id: 'f1f3', type: 'number', label: 'F1-F3' },
            { id: 'f1n', type: 'number', label: 'F1-N', validation: { required: true } },
            { id: 'f2n', type: 'number', label: 'F2-N', validation: { required: true } },
            { id: 'f3n', type: 'number', label: 'F3-N' },
            { id: 'f1t', type: 'number', label: 'F1-T', validation: { required: true } },
            { id: 'f2t', type: 'number', label: 'F2-T', validation: { required: true } },
            { id: 'f3t', type: 'number', label: 'F3-T' },
          ],
        },
      ],
    },
    {
      id: 'dc-installation-data',
      title: 'Datos de la instalación DC',
      components: [
        {
          id: 'dcDataTable',
          type: 'dynamicTable',
          label: 'Datos de la instalación DC',
          columns: [
            { id: 'inverterNumber', type: 'number', label: '# de inversor', validation: { required: true } },
            { id: 'rowNumber', type: 'text', label: '# de fila', validation: { required: true } },
            { id: 'voltagePosNeg', type: 'number', label: 'Tensión + y - [V]', validation: { required: true } },
            { id: 'voltagePosGround', type: 'number', label: 'Tensión + y Tierra [V]', validation: { required: true } },
            { id: 'voltageNegGround', type: 'number', label: 'Tensión - y Tierra [V]', validation: { required: true } },
            { id: 'insulationPos', type: 'number', label: 'Aislamiento + [MOhm]', validation: { required: true } },
            { id: 'insulationNeg', type: 'number', label: 'Aislamiento - [MOhm]', validation: { required: true } },
          ],
        },
      ],
    },
    {
      id: 'service-photos',
      title: 'Fotos del servicio',
      components: [
        { 
          id: 'servicePhotos', 
          type: 'photo', 
          label: 'Fotos del servicio', 
          validation: { required: true, min: 3 } 
        },
      ],
    },
    {
      id: 'greenenergy-signature',
      title: 'Firma representante greenenergy',
      components: [
        { 
          id: 'greenergySignature', 
          type: 'signature', 
          label: 'Firma representante greenenergy', 
          validation: { required: true } 
        },
      ],
    },
    {
      id: 'client-signature',
      title: 'Firma representante cliente',
      components: [
        { 
          id: 'clientSignature', 
          type: 'signature', 
          label: 'Firma representante cliente', 
          validation: { required: true } 
        },
      ],
    },
  ],
};

