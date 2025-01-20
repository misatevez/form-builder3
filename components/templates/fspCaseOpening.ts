import { FormTemplate } from '../../types/form';

export const fspCaseOpening: FormTemplate = {
  id: 'fsp-case-opening',
  name: 'Apertura de caso FSP',
  sections: [
    {
      id: 'project-info',
      title: 'Información del proyecto',
      components: [
        { id: 'project-name', type: 'text', label: 'Nombre del proyecto', validation: { required: true } },
        { id: 'project-location', type: 'text', label: 'Ubicación del proyecto', validation: { required: true }, placeholder: 'Distrito, Cantón y Provincia' },
        { id: 'review-date', type: 'date', label: 'Fecha de revisión', validation: { required: true } },
      ],
    },
    {
      id: 'equipment-info',
      title: 'Información del equipo',
      components: [
        { id: 'inverter-model', type: 'text', label: 'Modelo del inversor', validation: { required: true }, placeholder: 'Primo, Symo, Galvo.' },
        { id: 'inverter-power', type: 'number', label: 'Potencia del inversor', validation: { required: true } },
        { id: 'inverter-serial', type: 'text', label: 'Serie del inversor', validation: { required: true } },
        { id: 'datalogger-id', type: 'text', label: 'ID del Datalogger', validation: { required: true } },
        { id: 'error-codes', type: 'text', label: 'Código(s) error' },
        { id: 'error-description', type: 'textarea', label: 'Descripción del error', validation: { required: true }, placeholder: 'Indicar el error identificado y pruebas realizadas' },
      ],
    },
    {
      id: 'claim-items',
      title: 'Artículos en reclamación',
      components: [
        {
          id: 'claim-items-table',
          type: 'dynamicTable',
          label: 'Artículos en reclamación',
          columns: [
            { id: 'item-number', type: 'text', label: 'Número de artículo', validation: { required: true } },
            { id: 'item-description', type: 'text', label: 'Descripción de la pieza', validation: { required: true } },
          ],
        },
      ],
    },
    {
      id: 'inverter-data',
      title: 'Datos del inversor',
      description: 'Datos históricos del inversor, estas deben ser congruentes con las unidades de medición.',
      components: [
        {
          id: 'inverter-data-table',
          type: 'dynamicTable',
          label: 'Datos del inversor',
          columns: [
            { id: 'energy-supplied', type: 'number', label: 'Energía suministrada (MWh)', validation: { required: true } },
            { id: 'max-output-power', type: 'number', label: 'Máxima potencia de salida (W)', validation: { required: true } },
            { id: 'max-grid-voltage', type: 'number', label: 'Máxima tensión de red (Vac)', validation: { required: true } },
            { id: 'max-solar-voltage', type: 'number', label: 'Máxima tensión solar (Vdc)', validation: { required: true } },
            { id: 'service-hours', type: 'number', label: 'Horas de servicio', validation: { required: true } },
            { id: 'isolation-resistance', type: 'number', label: 'Resistencia de aislamiento (MOhm)', validation: { required: true } },
          ],
        },
      ],
    },
    {
      id: 'installation-info',
      title: 'Información de la instalación',
      description: 'Mediciones de la instalación, estas deben ser congruentes con las unidades de medición.',
      components: [
        {
          id: 'installation-data-table',
          type: 'dynamicTable',
          label: 'Información de la instalación',
          columns: [
            { id: 'voltage-f1-f2', type: 'number', label: 'Tensión F1-F2 (Vac)', validation: { required: true } },
            { id: 'voltage-f1-f3', type: 'number', label: 'Tensión F1-F3 (Vac)' },
            { id: 'voltage-f2-f3', type: 'number', label: 'Tensión F2-F3 (Vac)' },
            { id: 'voltage-f1-t', type: 'number', label: 'Tensión F1-T (Vac)', validation: { required: true } },
            { id: 'voltage-f2-t', type: 'number', label: 'Tensión F2-T (Vac)', validation: { required: true } },
            { id: 'voltage-f3-t', type: 'number', label: 'Tensión F3-T (Vac)' },
            { id: 'voltage-f1-n', type: 'number', label: 'Tensión F1-N (Vac)', validation: { required: true } },
            { id: 'voltage-f2-n', type: 'number', label: 'Tensión F2-N (Vac)', validation: { required: true } },
            { id: 'voltage-f3-n', type: 'number', label: 'Tensión F3-N (Vac)' },
          ],
        },
      ],
    },
    {
      id: 'dc-measurements',
      title: 'Mediciones en corriente continua',
      description: '+ = Positivo\n- = Negativo\nT= Tierra',
      components: [
        {
          id: 'dc-measurements-table',
          type: 'dynamicTable',
          label: 'Mediciones en corriente continua',
          columns: [
            { id: 'row-number', type: 'number', label: '# de fila' },
            { id: 'voltage-pos-neg', type: 'number', label: '+/- (V)' },
            { id: 'voltage-pos-ground', type: 'number', label: '+/T (V)' },
            { id: 'voltage-neg-ground', type: 'number', label: '-/T (V)' },
            { id: 'isolation-pos', type: 'number', label: 'Aislamiento + (MOhm)' },
            { id: 'isolation-neg', type: 'number', label: 'Aislamiento - (MOhm)' },
          ],
        },
      ],
    },
    {
      id: 'photos',
      title: 'Fotos',
      description: 'Fotografías de la falla/condiciones del equipo al momento de su revisión',
      components: [
        { id: 'photos-upload', type: 'photo', label: 'Fotos' },
      ],
    },
    {
      id: 'client-signature',
      title: 'Firma del cliente',
      components: [
        { id: 'client-signature', type: 'signature', label: 'Firma del cliente', validation: { required: true } },
      ],
    },
    {
      id: 'responsible-signature',
      title: 'Firma personal responsable',
      components: [
        { id: 'responsible-signature', type: 'signature', label: 'Firma personal responsable' },
      ],
    },
  ],
};

