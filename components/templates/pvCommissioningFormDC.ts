import { FormTemplate } from '../../types/form';

export const pvCommissioningFormDC: FormTemplate = {
  id: 'pv-commissioning-form-dc',
  name: 'Puesta de servicio FV: DC',
  sections: [
    {
      id: 'project-details',
      title: 'Detalle de Proyecto',
      components: [
        { id: 'serviceManager', type: 'text', label: 'Encargado de Puesta de Servicio', validation: { required: true } },
        { id: 'projectName', type: 'text', label: 'Nombre de Proyecto', validation: { required: true } },
        { id: 'location', type: 'text', label: 'Ubicación', placeholder: 'Provincia, Cantón' },
        { id: 'commissioningDate', type: 'date', label: 'Fecha y hora de puesta en servicio', validation: { required: true } },
        { id: 'installationManager', type: 'text', label: 'Encargado de instalación', placeholder: 'Misma persona que realiza la Puesta de Servicio' },
      ],
    },
    {
      id: 'technical-specs',
      title: 'Especificación técnica de proyecto',
      components: [
        { id: 'totalPvPower', type: 'number', label: 'Potencia fotovoltaica total instalada (kWp)' },
        { id: 'modulePower', type: 'number', label: 'Potencia individual de módulo FV (W)', validation: { required: true } },
        { id: 'totalModules', type: 'number', label: 'Cantidad total de módulos', validation: { required: true } },
        { 
          id: 'inverterBrand', 
          type: 'select', 
          label: 'Marca de inversores', 
          options: ['Fronius', 'SMA', 'Huawei', 'SolarEdge'],
          validation: { required: true } 
        },
        { id: 'inverterDetails', type: 'text', label: 'Cantidad de inversores y modelo de cada inversor', validation: { required: true }, placeholder: 'Ej: 9x Symo24.0 + 2x Symo15.0' },
      ],
    },
    {
      id: 'checklist',
      title: 'Lista de chequeo',
      description: 'Tome fotografías de cada uno de los puntos. Adjuntar al final del reporte.',
      components: [
        { id: 'structureInstalled', type: 'checkbox', label: 'Estructura debidamente instalada e impermebilizada. Tomar fotografía' },
        { id: 'structureGrounded', type: 'checkbox', label: 'Estructura puesta a tierra por fila. Tomar fotografía' },
        { id: 'pvConduitGrounded', type: 'checkbox', label: 'Canalización FV puesta a tierra. Tomar fotografía' },
        { id: 'pvConduitLabeled', type: 'checkbox', label: 'Canalización FV etiquetada. Tomar fotografía' },
        { id: 'rsdInstalled', type: 'checkbox', label: 'RSD instalados y etiquetados. Tomar fotografía' },
        { id: 'rsdCombinerLabeled', type: 'checkbox', label: 'Etiquetado en RSD/Combinadora y cableado de filas. Tomar fotografía' },
        { id: 'rsdControlLabeled', type: 'checkbox', label: 'Etiquetado cableado control RSD. Tomar fotografía' },
        { id: 'inverterCableLabeled', type: 'checkbox', label: 'Etiquetado cable filas/control en Inversor. Tomar fotografía' },
        { id: 'maintenanceAisles', type: 'checkbox', label: 'Pasillos de mantenimiento adecuados. Tomar fotografía' },
        { id: 'obstructionCheck', type: 'checkbox', label: 'Revisión de posibles obstáculos/sombras. Tomar fotografía panoramica o completa' },
        { id: 'expansionSpace', type: 'checkbox', label: 'Espacio para expansión de cada modulo. Tomar fotografía' },
        { id: 'inverterCableStripped', type: 'checkbox', label: 'Cableado en inversor pelado apropiadamente. Tomar fotografías.' },
        { id: 'dcPolarityVerified', type: 'checkbox', label: 'Cableado DC en inversor con polaridad verificada.' },
        { id: 'pvCableLabeled', type: 'checkbox', label: 'Cableado FV en inversor individualmente etiquetado. Tome fotografías.' },
        { id: 'pvCableTorqued', type: 'checkbox', label: 'Cableado FV en inversor con torque apropiado y marcado. Tomar Fotografías.' },
      ],
    },
    {
      id: 'row-voltage-measurement',
      title: 'Medición tensión +& - de filas',
      description: 'Poner la medición de tensión entre el positivo y negativo de cada fila. Esto se debe hacer a nivel de fila, antes de alguna caja combinadora.',
      components: [
        {
          id: 'rowVoltageTable',
          type: 'dynamicTable',
          label: 'Medición tensión +& - de filas',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'string' },
            { id: 'inverterModel', label: 'Modelo Inversor', type: 'string' },
            { id: 'row1Voltage', label: '1+ 1-', type: 'number' },
            { id: 'row2Voltage', label: '2+ 2-', type: 'number' },
            { id: 'row3Voltage', label: '3+ 3-', type: 'number' },
            { id: 'row4Voltage', label: '4+ 4-', type: 'number' },
          ],
        },
      ],
    },
    {
      id: 'ground-voltage-measurement',
      title: 'Medición tensión contra Tierra Filas',
      description: 'Medir la tensión de cada fila, tanto positivo y negativo, contra tierra. Esto se debe hacer antes de alguna caja combinadora.',
      components: [
        {
          id: 'groundVoltageTable',
          type: 'dynamicTable',
          label: 'Medición tensión contra Tierra Filas',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'string' },
            { id: 'row1PosGround', label: '1+ T', type: 'number' },
            { id: 'row1NegGround', label: '1- T', type: 'number' },
            { id: 'row2PosGround', label: '2+ T', type: 'number' },
            { id: 'row2NegGround', label: '2- T', type: 'number' },
            { id: 'row3PosGround', label: '3+ T', type: 'number' },
            { id: 'row3NegGround', label: '3- T', type: 'number' },
            { id: 'row4PosGround', label: '4+ T', type: 'number' },
            { id: 'row4NegGround', label: '4- T', type: 'number' },
          ],
        },
      ],
    },
    {
      id: 'pv-rsd-insulation-test',
      title: 'Prueba de Aislamiento FV-RSD',
      description: 'Se debe medir el aislamiento de cada fila antes del RSD (entre módulos y RSD). Digite el valor en MΩ. En caso de que el medidor muestre en giga ohmios (GΩ), digite el valor medido, y ponga una G luego. También puede convertir el valor en MΩ (multiplicar por 1000). Ejemplo: Mide 2.2GΩ Valor reportado: 2.2G ó 2200',
      components: [
        {
          id: 'pvRsdInsulationTable',
          type: 'dynamicTable',
          label: 'Prueba de Aislamiento FV-RSD',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'number' },
            { id: 'row1PosGround', label: '1+ T', type: 'string' },
            { id: 'row1NegGround', label: '1- T', type: 'string' },
            { id: 'row2PosGround', label: '2+ T', type: 'string' },
            { id: 'row2NegGround', label: '2- T', type: 'string' },
            { id: 'row3PosGround', label: '3+ T', type: 'string' },
            { id: 'row3NegGround', label: '3- T', type: 'string' },
            { id: 'row4PosGround', label: '4+ T', type: 'string' },
            { id: 'row4NegGround', label: '4- T', type: 'string' },
          ],
        },
      ],
    },
    {
      id: 'rsd-combiner-insulation-test',
      title: 'Prueba de aislamiento RSD-Combinadora',
      description: 'Se debe medir el aislamiento de cada fila después del RSD (entre RSD y Combinadora). Debe desconectar los cables en ambos puntos. Digite el valor en MΩ. En caso de que el medidor muestre en giga ohmios (GΩ), digite el valor medido, y ponga una G luego. También puede convertir el valor en MΩ (multiplicar por 1000). Ejemplo: Mide 2.2GΩ Valor reportado: 2.2G ó 2200',
      components: [
        {
          id: 'rsdCombinerInsulationTable',
          type: 'dynamicTable',
          label: 'Prueba de aislamiento RSD-Combinadora',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'number' },
            { id: 'row1PosGround', label: '1+ T', type: 'string' },
            { id: 'row1NegGround', label: '1- T', type: 'string' },
            { id: 'row2PosGround', label: '2+ T', type: 'string' },
            { id: 'row2NegGround', label: '2- T', type: 'string' },
            { id: 'row3PosGround', label: '3+ T', type: 'string' },
            { id: 'row3NegGround', label: '3- T', type: 'string' },
            { id: 'row4PosGround', label: '4+ T', type: 'string' },
            { id: 'row4NegGround', label: '4- T', type: 'string' },
          ],
        },
      ],
    },
    {
      id: 'combiner-inverter-insulation-test',
      title: 'Prueba de aislamiento Combinadora-Inversores',
      description: 'Se debe medir el aislamiento de cada fila después de la combinadora (entre Combinadora e Inversores). Debe desconectar los cables en ambos puntos. Digite el valor en MΩ. En caso de que el medidor muestre en giga ohmios (GΩ), digite el valor medido, y ponga una G luego. También puede convertir el valor en MΩ (multiplicar por 1000). Ejemplo: Mide 2.2GΩ Valor reportado: 2.2G ó 2200',
      components: [
        {
          id: 'combinerInverterInsulationTable',
          type: 'dynamicTable',
          label: 'Prueba de aislamiento Combinadora-Inversores',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'string' },
            { id: 'row1PosGround', label: '1+ T', type: 'string' },
            { id: 'row1NegGround', label: '1- T', type: 'string' },
            { id: 'row2PosGround', label: '2+ T', type: 'string' },
            { id: 'row2NegGround', label: '2- T', type: 'string' },
            { id: 'row3PosGround', label: '3+ T', type: 'string' },
            { id: 'row3NegGround', label: '3- T', type: 'string' },
            { id: 'row4PosGround', label: '4+ T', type: 'string' },
            { id: 'row4NegGround', label: '4- T', type: 'string' },
          ],
        },
      ],
    },
    {
      id: 'pv-array-photos',
      title: 'Fotos arreglo fotovoltaico',
      description: 'Adjunte fotos del arreglo fotovoltaico en general. Lo más panorámico posible.',
      components: [
        { id: 'pvArrayPhotos', type: 'photo', label: 'Fotos arreglo fotovoltaico' },
      ],
    },
    {
      id: 'pv-structure-photos',
      title: 'Fotos estructura fotovoltaica',
      description: 'Adjunte fotos de los módulos instalados, la estructura instalada, la estructura puesta a tierra, pasillo entre paños y foto panorámica o completa de la instalación.',
      components: [
        { id: 'pvStructurePhotos', type: 'photo', label: 'Fotos estructura fotovoltaica' },
      ],
    },
    {
      id: 'rsd-combiner-photos',
      title: 'Fotos RSD/Combinadora',
      description: 'Adjunte fotos de los RSD y/o caja combinadora, con sus respectivos cableados, etiquetado en el RSD y etiquetado en el respectivo cableado.',
      components: [
        { id: 'rsdCombinerPhotos', type: 'photo', label: 'Fotos RSD/Combinadora' },
      ],
    },
    {
      id: 'conduit-photos',
      title: 'Fotos canalización',
      description: 'Adjunte fotos de las respectivas canalizaciones de los módulos y hacia los inversores, con su respectivo etiquetado.',
      components: [
        { id: 'conduitPhotos', type: 'photo', label: 'Fotos canalización' },
      ],
    },
    {
      id: 'inverter-dc-photos',
      title: 'Fotografías DC Inversor',
      description: 'Adjuntar fotografías del cableado FV en el inversor, con su etiquetado, marcas de torque y pelado de cable.',
      components: [
        { id: 'inverterDcPhotos', type: 'photo', label: 'Fotografías DC Inversor' },
      ],
    },
    {
      id: 'comments',
      title: 'Comentarios',
      components: [
        { 
          id: 'generalComments', 
          type: 'textarea', 
          label: 'Comentarios generales de la puesta de servicio'
        },
      ],
    },
  ],
};

