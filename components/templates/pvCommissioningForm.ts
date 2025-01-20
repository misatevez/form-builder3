import { FormTemplate } from '../../types/form';

export const pvCommissioningForm: FormTemplate = {
  id: 'pv-commissioning-form',
  name: 'Puesta de servicio FV: AC',
  sections: [
    {
      id: 'project-details',
      title: 'Detalle de Proyecto',
      components: [
        { id: 'serviceManager', type: 'text', label: 'Encargado de Puesta de Servicio', validation: { required: true } },
        { id: 'projectName', type: 'text', label: 'Nombre de Proyecto', validation: { required: true } },
        { id: 'location', type: 'text', label: 'Ubicación', placeholder: 'Provincia, Cantón' },
        { id: 'commissioningDate', type: 'date', label: 'Fecha y hora de puesta en servicio', validation: { required: true } },
        { id: 'installationManager', type: 'text', label: 'Encargado de instalación' },
      ],
    },
    {
      id: 'technical-specs',
      title: 'Especificación técnica de proyecto',
      components: [
        { id: 'totalPvPower', type: 'number', label: 'Potencia fotovoltaica total instalada (kWp)' },
        { id: 'panelPower', type: 'number', label: 'Potencia individual de paneles solares (W)' },
        { 
          id: 'inverterBrand', 
          type: 'select', 
          label: 'Marca de inversores', 
          options: ['Fronius', 'SMA', 'Huawei', 'SolarEdge'],
          validation: { required: true } 
        },
        { id: 'inverterDetails', type: 'text', label: 'Cantidad de inversores y modelo de cada inversor', validation: { required: true } },
      ],
    },
    {
      id: 'system-type',
      title: 'Tipo de sistema',
      description: 'Marque la casilla que indica el tipo de sistema instalado',
      components: [
        { id: 'gridConnected', type: 'checkbox', label: 'Generación distribuida (interconectado a la red eléctrica)' },
        { id: 'netZero', type: 'checkbox', label: 'Net0 (Autoconsumo puro, sin entrega a la red)' },
        { id: 'backupWithGrid', type: 'checkbox', label: 'Respaldo con generación distribuida (Con baterías y cargas respaldadas, e interacción con la red eléctrica)' },
        { id: 'backupNetZero', type: 'checkbox', label: 'Respaldo con Net0 (Con baterías y cargas respaldadas, pero SIN generación distribuida)' },
        { id: 'offGrid', type: 'checkbox', label: 'Sistema aislado (100% fuera de la red eléctrica)' },
        { id: 'microgrid', type: 'checkbox', label: 'Microred eléctrica (combinación de solar+baterías+generador+red eléctrica)' },
        { id: 'otherSystemType', type: 'checkbox', label: 'Otro' },
        { id: 'otherSystemTypeDetails', type: 'text', label: 'Especifique qué tipo de sistema es' },
      ],
    },
    {
      id: 'checklist',
      title: 'Lista de chequeo',
      components: [
        { id: 'invertersInstalled', type: 'checkbox', label: 'Inversores firmemente instalados' },
        { id: 'inverterSpacing', type: 'checkbox', label: 'Espaciado de inversores. Detalle distancia entre inversores. Tome Fotografías' },
        { id: 'ventilation', type: 'checkbox', label: 'Ventilación libre de obstrucciones' },
        { id: 'acWiring', type: 'checkbox', label: 'Canalización AC apropiada. Tome fotografías.' },
        { id: 'acWiringInverter', type: 'checkbox', label: 'Cableado AC en inversor instalado apropiadamente. Tome Fotografías' },
        { id: 'acWiringTorque', type: 'checkbox', label: 'Cableado AC en inversor con torque apropiado y marca de torque. Tome fotografías' },
        { id: 'acWiringLabeled', type: 'checkbox', label: 'Cableado AC debidamente etiquetado y con código de color correcto. Tome fotografías.' },
        { id: 'communicationWiring', type: 'checkbox', label: 'Canalización de comunicación entre inversores apropiada. Tome fotografías.' },
        { id: 'communicationWiringInstalled', type: 'checkbox', label: 'Cableado comunicación entre inversores apropiadamente instalado. Tome fotografías.' },
        { id: 'inverterBreakers', type: 'checkbox', label: 'Cada inversor cuenta con su propio interruptor AC. Detalle la capacidad. Fotografías.' },
        { id: 'masterInverterInternet', type: 'checkbox', label: 'Inv. Master cuenta con suministro de internet. LAN o Wifi?' },
        { id: 'pvPanelMainBreaker', type: 'checkbox', label: 'Tablero FV cuenta con interruptor principal. Detalle capacidad. Tome fotografías.' },
        { id: 'smartMeterProtection', type: 'checkbox', label: 'SmartMeter cuenta con protecciones adecuadas y cable escudado. Tome fotografías.' },
        { id: 'smartMeterInstalled', type: 'checkbox', label: 'SmartMeter se encuentra apropiadamente instalado. Adjunte fotografías.' },
        { id: 'independentSmartMeterWiring', type: 'checkbox', label: 'Canalización independiente de medición/comunicación del SmartMeter' },
        { id: 'interconnectionPoint', type: 'checkbox', label: 'PdI apropiadamente instalado y etiquetado. Tome Fotografías.' },
        { id: 'pvSystemGrounded', type: 'checkbox', label: 'Sistema FV aterrizado a la malla de tierra principal' },
        { id: 'generationMeter', type: 'checkbox', label: 'Sistema cuenta con medidor de generación. Tomar fotografías.' },
        { id: 'mainBreakerAtMeter', type: 'checkbox', label: 'Interruptor principal junto al medidor de generación. Detalle capacidad y tome fotografías.' },
        { id: 'pvPanelWithInverters', type: 'checkbox', label: 'Tablero fotovoltaico junto a los inversores. Tome fotografías.' },
        { id: 'pvPanelGroundNeutral', type: 'checkbox', label: 'Tablero fotovoltaico cuenta con barra tierra y neutro. Tome fotografías.' },
        { id: 'rsdLabelMainBreaker', type: 'checkbox', label: 'Etiquetado RSD en Interruptor Principal del tablero FV. Tome fotografías.' },
        { id: 'invertersLabeled', type: 'checkbox', label: 'Cada Inv. e interruptor debidamente etiquetado' },
        { id: 'acWiringSized', type: 'checkbox', label: 'Cableados AC dimensionados apropiadamente. Detalle calibre.' },
        { id: 'acWiringToInterconnection', type: 'checkbox', label: 'Canalización AC hacia PdI instalada apropiadamente. Detalle tamaño y tipo. Tome fotografías.' },
      ],
    },
    {
      id: 'ac-cable-caliber',
      title: 'Calibre cables AC de inversores',
      description: 'Detalle el calibre de cable de cada inversor',
      components: [
        {
          id: 'acCableTable',
          type: 'dynamicTable',
          label: 'Calibre cables AC',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'number' },
            { id: 'calibreF1', label: 'Calibre F1', type: 'text' },
            { id: 'calibreF2', label: 'Calibre F2', type: 'text' },
            { id: 'calibreF3', label: 'Calibre F3', type: 'text' },
            { id: 'calibreNeutro', label: 'Calibre Neutro', type: 'text' },
            { id: 'calibreTierra', label: 'Calibre Tierra', type: 'text' },
          ],
        },
      ],
    },
    {
      id: 'phase-voltage-measurement',
      title: 'Medición tensión fases',
      description: 'Poner la medición de tensión entre las respectivas fases que correspondan',
      components: [
        {
          id: 'phaseVoltageTable',
          type: 'dynamicTable',
          label: 'Medición tensión fases',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'number' },
            { id: 'inverterModel', label: 'Modelo Inversor', type: 'text' },
            { id: 'f1f2', label: 'F1 - F2', type: 'number' },
            { id: 'f1f3', label: 'F1 - F3', type: 'number' },
            { id: 'f2f3', label: 'F2 - F3', type: 'number' },
            { id: 'f1n', label: 'F1 - N', type: 'number' },
            { id: 'f2n', label: 'F2 - N', type: 'number' },
            { id: 'f3n', label: 'F3 - N', type: 'number' },
          ],
        },
      ],
    },
    {
      id: 'insulation-test',
      title: 'Prueba de Aislamiento',
      description: 'Se debe medir el aislamiento de fase contra tierra',
      components: [
        {
          id: 'insulationTestTable',
          type: 'dynamicTable',
          label: 'Prueba de Aislamiento',
          columns: [
            { id: 'inverterNumber', label: '# de Inversor', type: 'number' },
            { id: 'f1t', label: 'F1 - T', type: 'number' },
            { id: 'f2t', label: 'F2 - T', type: 'number' },
            { id: 'f3t', label: 'F3 - T', type: 'number' },
            { id: 'nt', label: 'N - T', type: 'number' },
          ],
        },
      ],
    },
    {
      id: 'observation-photos',
      title: 'Fotos observaciones',
      description: 'Adjunte fotos de las observaciones realizadas',
      components: [
        { id: 'observationPhotos', type: 'photo', label: 'Fotos observaciones' },
      ],
    },
    {
      id: 'inverter-installation-photos',
      title: 'Fotos instalación de inversores',
      description: 'Fotos que muestren la totalidad de los inversores instalados. Capture detalles que considere importantes',
      components: [
        { id: 'inverterInstallationPhotos', type: 'photo', label: 'Fotos instalación de inversores' },
      ],
    },
    {
      id: 'pv-panel-photos',
      title: 'Fotos tablero fotovoltaico',
      description: 'Foto del tablero, los breakers, barras, etiquetado, etc',
      components: [
        { id: 'pvPanelPhotos', type: 'photo', label: 'Fotos tablero fotovoltaico' },
      ],
    },
    {
      id: 'generation-meter-photos',
      title: 'Fotos del medidor generación',
      components: [
        { id: 'generationMeterPhotos', type: 'photo', label: 'Fotos del medidor generación' },
      ],
    },
    {
      id: 'interconnection-point-photos',
      title: 'Foto punto de interconexión',
      components: [
        { id: 'interconnectionPointPhotos', type: 'photo', label: 'Foto punto de interconexión' },
      ],
    },
    {
      id: 'ac-wiring-photos',
      title: 'Fotos de canalización AC',
      description: 'Adjunte fotos de la canalización AC tanto de inversores al tablero principal, como del tablero principal al Punto de Interconexión.',
      components: [
        { id: 'acWiringPhotos', type: 'photo', label: 'Fotos de canalización AC' },
      ],
    },
    {
      id: 'monitoring-system-photos',
      title: 'Fotos de monitores',
      description: 'Adjunte fotos de la instalación del sistema de monitoreo. Smartmeter, protecciones, canalización y donas.',
      components: [
        { id: 'monitoringSystemPhotos', type: 'photo', label: 'Fotos de monitores' },
      ],
    },
    {
      id: 'comments',
      title: 'Comentarios',
      components: [
        { 
          id: 'generalComments', 
          type: 'textarea', 
          label: 'Comentarios generales de la puesta en marcha'
        },
      ],
    },
  ],
};
