import { FormTemplate } from '../../types/form';

export const projectDeliveryForm: FormTemplate = {
  id: 'project-delivery-form',
  name: 'Entrega de proyecto',
  sections: [
    {
      id: 'project-info',
      title: 'Información del proyecto',
      components: [
        { id: 'owner-name', type: 'text', label: 'Nombre del propietario' },
        { id: 'project-name', type: 'text', label: 'Nombre del proyecto', validation: { required: true } },
        { id: 'project-location', type: 'text', label: 'Ubicación del proyecto', validation: { required: true } },
        { id: 'delivery-date', type: 'date', label: 'Fecha de entrega', validation: { required: true } },
        { id: 'peak-solar-power', type: 'number', label: 'Potencia pico Solar (kWp)', validation: { required: true } },
        { id: 'total-inverter-power', type: 'number', label: 'Potencia total Inversores (kW)', validation: { required: true } },
        { id: 'storage-capacity', type: 'number', label: 'Capacidad Almacenamiento (kWh)', validation: { required: true } },
      ],
    },
    {
      id: 'installed-equipment',
      title: 'Equipo instalado',
      components: [
        {
          id: 'equipment-table',
          type: 'dynamicTable',
          label: 'Equipo instalado',
          columns: [
            { id: 'equipment', type: 'text', label: 'Equipo', validation: { required: true } },
            { id: 'manufacturer', type: 'text', label: 'Fabricante', validation: { required: true } },
            { id: 'nominal-capacity', type: 'text', label: 'Capacidad Nominal' },
            { id: 'serial-number', type: 'text', label: 'Número de serie' },
          ],
        },
      ],
    },
    {
      id: 'pv-modules',
      title: 'Equipo Instalado',
      description: 'Información módulos fotovoltaicos',
      components: [
        { id: 'pv-brand', type: 'text', label: 'Marca de los módulos fotovoltaicos', validation: { required: true } },
        { id: 'pv-power', type: 'number', label: 'Potencia individual de los módulos', validation: { required: true } },
        { id: 'pv-quantity', type: 'number', label: 'Cantidad de módulos instalados', validation: { required: true } },
      ],
    },
    {
      id: 'project-status',
      title: 'Status proyecto',
      description: 'En caso de existir daños se deben anexar fotos, sin ellas este reporte no tiene validez.',
      components: [
        { id: 'modules-progress', type: 'text', label: '¿Avance de instalación de módulos? (%)', validation: { required: true } },
        { id: 'inverters-progress', type: 'text', label: '¿Avance de instalación de inversores? (%)', validation: { required: true } },
        { id: 'storage-progress', type: 'text', label: '¿Avance de instalación de almacenamiento? (%)', validation: { required: true }, placeholder: 'Si no aplica indicar N/A' },
        { id: 'dc-wiring-progress', type: 'text', label: '¿Avance de instalación de cableado DC? (%)', validation: { required: true } },
        { id: 'ac-wiring-progress', type: 'text', label: '¿Avance instalación de cableado AC? (%)', validation: { required: true } },
        { 
          id: 'project-type', 
          type: 'select', 
          label: '¿Tipo de proyecto?', 
          options: ['Conectado a la red', 'Net-zero', 'Aislado', 'Híbrido'],
          validation: { required: true } 
        },
        { id: 'system-operating', type: 'checkbox', label: '¿El sistema se encuentra operando?' },
        { id: 'operating-status', type: 'text', label: 'Estado de entrega', placeholder: 'Net0, interconectado, aislado, híbrido, apagado' },
        { id: 'total-progress', type: 'number', label: '¿Avance total del proyecto? (%)', validation: { required: true } },
        { id: 'generation-meter', type: 'text', label: '¿Número de medidor de generación?' },
        { id: 'consumption-meter', type: 'text', label: '¿Número de medidor de consumo?' },
        { id: 'smartmeter', type: 'checkbox', label: '¿El sistema posee smartmeter?' },
        { id: 'monitored', type: 'checkbox', label: '¿El sistema queda monitoreado?' },
        { id: 'rapid-shutdown', type: 'checkbox', label: '¿El sistema posee Rapid shut down?' },
        { id: 'scope-compliance', type: 'textarea', label: '¿Cumple con los alcances previstos?', validation: { required: true } },
        { id: 'client-access', type: 'checkbox', label: '¿El cliente queda con acceso al sistema de monitoreo y documentos digitales?' },
        { id: 'pending-items', type: 'textarea', label: '¿Pendientes?', validation: { required: true } },
        { id: 'comments', type: 'textarea', label: 'Comentarios' },
      ],
    },
    {
      id: 'pv-module-photos',
      title: 'Fotos módulos fotovoltaicos',
      description: 'Ingresar fotos de la instalación de los módulos fotovoltaicos, estado final del techo, aterrizaje y estructura de fijación.',
      components: [
        { id: 'pv-photos', type: 'photo', label: 'Fotos módulos fotovoltaicos', validation: { required: true, min: 3 } },
      ],
    },
    {
      id: 'equipment-photos',
      title: 'Fotos equipo fotovoltaico instalado',
      description: 'Agregar fotos de los equipos instalados: Rapid shut down, inversores, batería, controlador de carga.',
      components: [
        { id: 'equipment-photos', type: 'photo', label: 'Fotos equipo fotovoltaico instalado', validation: { required: true, min: 3 } },
      ],
    },
    {
      id: 'meter-photos',
      title: 'Fotos medidores',
      description: 'Adjuntar fotos del medidor de consumo y medidor de generación, en caso de que no estén instalados, mostrar las bases de ambos medidores. Si el sistema es Netzero o aislado, omitir este punto.',
      components: [
        { id: 'meter-photos', type: 'photo', label: 'Fotos medidores' },
      ],
    },
    {
      id: 'installed-equipment-photos',
      title: 'Fotos Equipos instalados',
      description: 'Adjuntar fotos de los equipos instalados, inversores, controladores, equipos de medición, tableros relevantes, etc.',
      components: [
        { id: 'installed-equipment-photos', type: 'photo', label: 'Fotos Equipos instalados' },
      ],
    },
    {
      id: 'storage-system-photos',
      title: 'Fotos sistema Almacenamiento',
      description: 'Adjuntar fotos del sistema de almacenamiento',
      components: [
        { id: 'storage-system-photos', type: 'photo', label: 'Fotos sistema Almacenamiento' },
      ],
    },
    {
      id: 'company-signature',
      title: 'Representante greenenergy®',
      description: 'Al firmar, ambas partes aceptan lo contenido en este documento.',
      components: [
        { id: 'company-signature', type: 'signature', label: 'Firma del representante de greenenergy®', validation: { required: true } },
      ],
    },
    {
      id: 'client-signature',
      title: 'Representante cliente',
      description: 'Al firmar, ambas partes aceptan lo contenido en este documento.',
      components: [
        { id: 'client-signature', type: 'signature', label: 'Firma del representante del cliente', validation: { required: true } },
      ],
    },
  ],
};
