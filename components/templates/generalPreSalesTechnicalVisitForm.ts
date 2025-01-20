import { FormTemplate } from '../../types/form';

export const generalPreSalesTechnicalVisitForm: FormTemplate = {
  id: 'general-pre-sales-technical-visit-form',
  name: 'Visita Técnica Preventa General',
  sections: [
    {
      id: 'general-info',
      title: 'Generalidades',
      components: [
        {
          id: 'generalInfoTable',
          type: 'dynamicTable',
          label: 'Información General',
          columns: [
            { id: 'date', type: 'date', label: 'Fecha', validation: { required: true } },
            { id: 'greenergyManager', type: 'text', label: 'Encargado greenenergy®', validation: { required: true } },
            { id: 'siteManager', type: 'text', label: 'Contacto encargado en sitio' },
          ],
        },
      ],
    },
    {
      id: 'billing-meter',
      title: 'Medidor de Facturación',
      components: [
        {
          id: 'billingMeterTable',
          type: 'dynamicTable',
          label: 'Detalles del Medidor de Facturación',
          columns: [
            { id: 'meterNumber', type: 'text', label: 'Número de Medidor' },
            { id: 'meterType', type: 'text', label: 'Tipo de Medidor y Tipo de Lectura' },
            { id: 'operatingVoltage', type: 'text', label: 'Voltaje de Operación' },
            { id: 'electricDistributor', type: 'text', label: 'Distribuidora Eléctrica' },
            { id: 'transformerDetails', type: 'text', label: 'Transformador (KVA) y Tipo' },
            { id: 'meterAccessibility', type: 'text', label: 'Accesibilidad y Ubicación del Medidor' },
            { id: 'additionalComments', type: 'textarea', label: 'Comentarios Adicionales' },
          ],
        },
        {
          id: 'meterPhotos',
          type: 'photo',
          label: 'Fotografías Medidor',
          validation: { required: true },
        },
      ],
    },
    {
      id: 'main-circuit-breaker',
      title: 'Interruptor Principal',
      components: [
        {
          id: 'mainCircuitBreakerTable',
          type: 'dynamicTable',
          label: 'Detalles del Interruptor Principal',
          columns: [
            { id: 'location', type: 'text', label: 'Ubicación' },
            { id: 'brandModel', type: 'text', label: 'Marca y Modelo' },
            { id: 'ampacity', type: 'text', label: 'Ampacidad (A)' },
            { id: 'conductorMaterial', type: 'text', label: 'Material de Conductor (Cu/Al)' },
            { id: 'conductorSize', type: 'text', label: 'Tamaño de Conductor (AWG)' },
            { id: 'accessibilityStatus', type: 'text', label: 'Accesibilidad y Estatus' },
            { id: 'distanceMeterBreaker', type: 'text', label: 'Distancia entre Medidor-Interruptor (m)' },
            { id: 'additionalComments', type: 'textarea', label: 'Comentarios Adicionales' },
          ],
        },
        {
          id: 'mainBreakerPhotos',
          type: 'photo',
          label: 'Fotografía Interruptor Principal',
        },
      ],
    },
    {
      id: 'relevant-panels',
      title: 'Tableros Relevantes',
      description: 'En caso de haber diversos tableros de interés para el punto de interconexión, realice una entrada por cada tablero.',
      components: [
        {
          id: 'relevantPanelsTable',
          type: 'dynamicTable',
          label: 'Detalles de Tableros Relevantes',
          columns: [
            { id: 'brandModel', type: 'text', label: 'Marca y Modelo' },
            { id: 'ampacity', type: 'text', label: 'Ampacidad (A)' },
            { id: 'conductorMaterial', type: 'text', label: 'Material de Conductor (Cu/Al)' },
            { id: 'conductorSize', type: 'text', label: 'Tamaño de Conductor (AWG)' },
            { id: 'accessibilityStatus', type: 'text', label: 'Accesibilidad y Estatus' },
            { id: 'distanceMainBreaker', type: 'text', label: 'Distancia entre Interruptor Principal-Tablero Principal (m)' },
            { id: 'interconnectionRecommendation', type: 'text', label: '¿Se recomienda para Interconexión?  ¿Hay espacio para CT´s?' },
            { id: 'additionalComments', type: 'textarea', label: 'Comentarios Adicionales' },
          ],
        },
        {
          id: 'relevantPanelsPhotos',
          type: 'photo',
          label: 'Fotografía Tableros Relevantes',
        },
      ],
    },
    {
      id: 'interconnection-point',
      title: 'Punto de Interconexión',
      components: [
        {
          id: 'interconnectionDetails',
          type: 'textarea',
          label: 'Detalles y comentarios sobre las opciones para el punto de interconexión',
        },
        {
          id: 'interconnectionPointPhotos',
          type: 'photo',
          label: 'Fotografía Punto de Interconexión',
        },
      ],
    },
    {
      id: 'pv-panel-distribution',
      title: 'Distribución Paneles Fotovoltaicos',
      description: 'En caso de haber diversos techos/espacios para los módulos, registre una entrada por espacio.',
      components: [
        {
          id: 'pvPanelDistributionTable',
          type: 'dynamicTable',
          label: 'Detalles de Distribución de Paneles Fotovoltaicos',
          columns: [
            { id: 'location', type: 'text', label: 'Ubicación' },
            { id: 'roofType', type: 'text', label: 'Tipo Techo' },
            { id: 'roofCondition', type: 'text', label: 'Estado Techo' },
            { id: 'accessibility', type: 'text', label: 'Accesibilidad' },
            { id: 'availableOrientations', type: 'text', label: 'Orientaciones Disponibles' },
            { id: 'lifelineAnchors', type: 'text', label: 'Anclajes líneas de vida' },
            { id: 'obstacles', type: 'text', label: 'Obstáculos' },
            { id: 'comments', type: 'textarea', label: 'Comentarios' },
          ],
        },
        {
          id: 'roofAccessPhotos',
          type: 'photo',
          label: 'Fotografía de Ruta de Acceso al Techo',
        },
        {
          id: 'roofCoverPhotos',
          type: 'photo',
          label: 'Fotografías de Cubierta de Techo',
        },
      ],
    },
    {
      id: 'pv-equipment-distances',
      title: 'Distancias Equipos Fotovoltaicos',
      components: [
        {
          id: 'pvEquipmentDistancesTable',
          type: 'dynamicTable',
          label: 'Distancias entre Equipos Fotovoltaicos',
          columns: [
            { id: 'pvToRsd', type: 'text', label: 'FV - RSD (m)' },
            { id: 'rsdToInv', type: 'text', label: 'RSD - INV (m)' },
            { id: 'invToInvPanel', type: 'text', label: 'INV - TableroINV (m)' },
            { id: 'invPanelToGenMeter', type: 'text', label: 'TableroINV- Medidor Generación (m)' },
            { id: 'genMeterToInterconnection', type: 'text', label: 'Medidor Generación - PdI(m)' },
            { id: 'consumptionSmartMeter', type: 'text', label: 'Consumo /SmartMeter (m)' },
            { id: 'batteryToInterconnection', type: 'text', label: 'BAT - PdI' },
            { id: 'internetToInv', type: 'text', label: 'Internet-INV(m)' },
          ],
        },
      ],
    },
    {
      id: 'conduit-routes',
      title: 'Ruta Canalizaciones',
      description: 'Digite una entrada para cada canalización requerida. Ej: PV-INV, INV-Tablero, Tablero-Medidor, Batería-Tablero, etc.',
      components: [
        {
          id: 'conduitRoutesTable',
          type: 'dynamicTable',
          label: 'Detalles de Rutas de Canalizaciones',
          columns: [
            { id: 'serviceEntryDetails', type: 'text', label: 'Detalle acometida' },
            { id: 'locationPhotos', type: 'text', label: 'Ubicación. Fotografías' },
            { id: 'conduitSupportDetails', type: 'text', label: 'Detalle de soporte para canalización' },
            { id: 'obstaclesComplications', type: 'text', label: 'Obstáculos/Complicaciones. Fotografías' },
            { id: 'additionalDetails', type: 'textarea', label: 'Detalles adicionales' },
          ],
        },
        {
          id: 'conduitRoutesPhotos',
          type: 'photo',
          label: 'Fotografías de Ruta Canalizaciones',
        },
      ],
    },
    {
      id: 'inverter-space',
      title: 'Espacio para Inversores',
      description: 'Introduzca una entrada en caso de haber varios espacios u opciones',
      components: [
        {
          id: 'inverterSpaceTable',
          type: 'dynamicTable',
          label: 'Detalles de Espacio para Inversores',
          columns: [
            { id: 'location', type: 'text', label: 'Ubicación' },
            { id: 'dimensions', type: 'text', label: 'Medidas AxB' },
            { id: 'environment', type: 'text', label: 'Intemperie/Bajo techo' },
            { id: 'obstacles', type: 'text', label: 'Obstáculos' },
            { id: 'pvAccess', type: 'text', label: 'Acceso FV' },
            { id: 'invPanelLocation', type: 'text', label: 'Ubicación TableroINV' },
            { id: 'comments', type: 'textarea', label: 'Comentarios' },
          ],
        },
        {
          id: 'inverterSpacePhotos',
          type: 'photo',
          label: 'Fotos Espacio para Inversores',
        },
      ],
    },
    {
      id: 'transfer-and-emergency-plant',
      title: 'Transferencia y Planta de Emergencia',
      components: [
        {
          id: 'transferEmergencyPlantTable',
          type: 'dynamicTable',
          label: 'Detalles de Transferencia y Planta de Emergencia',
          columns: [
            { id: 'generatorBrandModel', type: 'text', label: 'Marca y Modelo Generador' },
            { id: 'generatorCapacity', type: 'text', label: 'Capacidad Generador (kW)' },
            { id: 'transferBrandModel', type: 'text', label: 'Marca y Modelo Trasferencia' },
            { id: 'transferCapacity', type: 'text', label: 'Capacidad Transferencia (kW)' },
            { id: 'backupDetails', type: 'text', label: '¿Qué respalda la Planta? ¿Señal Off Necesaria?' },
            { id: 'distanceToMainBreaker', type: 'text', label: 'Distancia Planta-Interruptor Principal (m)' },
            { id: 'suitableForPdi', type: 'text', label: '¿Apta para PDI?' },
            { id: 'additionalComments', type: 'textarea', label: 'Comentarios Adicionales' },
          ],
        },
        {
          id: 'generatorTransferPhotos',
          type: 'photo',
          label: 'Fotografías de Generador y Transferencia',
        },
      ],
    },
    {
      id: 'battery-space',
      title: 'Espacio Baterías',
      description: 'Ingrese una entrada para cada opción de espacio para ubicar las baterías/ESS',
      components: [
        {
          id: 'batterySpaceTable',
          type: 'dynamicTable',
          label: 'Detalles de Espacio para Baterías',
          columns: [
            { id: 'location', type: 'text', label: 'Ubicación' },
            { id: 'dimensions', type: 'text', label: 'Espacio Largo-Ancho-Alto' },
            { id: 'environment', type: 'text', label: 'Intemperie/BajoTecho' },
            { id: 'obstacles', type: 'text', label: 'Obstáculos' },
            { id: 'floorType', type: 'text', label: 'Tipo de suelo' },
            { id: 'distanceToPdi', type: 'text', label: 'Distancia a PdI' },
            { id: 'comments', type: 'textarea', label: 'Comentarios' },
          ],
        },
        {
          id: 'batterySpacePhotos',
          type: 'photo',
          label: 'Fotos espacio para Baterías',
        },
      ],
    },
    {
      id: 'additional-details',
      title: 'Detalles adicionales',
      components: [
        {
          id: 'electricalPlansAccess',
          type: 'checkbox',
          label: 'Acceso a planos eléctricos. Contacto',
        },
        {
          id: 'energyConsumptionRecords',
          type: 'checkbox',
          label: '¿Existen registros de consumo energético y variables eléctricas?',
        },
        {
          id: 'itManagerContact',
          type: 'checkbox',
          label: 'Contacto encargado de TI',
        },
        {
          id: 'safetyManagerContact',
          type: 'checkbox',
          label: 'Contacto encargado seguridad ocupacional',
        },
        {
          id: 'workspaceStorage',
          type: 'checkbox',
          label: 'Espacio para bodega equipo de trabajo. Prevista agua y electricidad',
        },
        {
          id: 'workersFacilities',
          type: 'checkbox',
          label: 'Comedor/baño para trabajadores',
        },
        {
          id: 'craneNecessity',
          type: 'checkbox',
          label: '¿Es necesario grúa para acceso de módulos? Espacio para grúa',
        },
        {
          id: 'recloserLocation',
          type: 'checkbox',
          label: 'Ubicación para recloser',
        },
      ],
    },
    {
      id: 'additional-photos',
      title: 'Fotografías Adicionales',
      components: [
        {
          id: 'additionalPhotos',
          type: 'photo',
          label: 'Fotografías Adicionales',
        },
      ],
    },
    {
      id: 'additional-comments',
      title: 'Comentarios Adicionales',
      components: [
        {
          id: 'additionalComments',
          type: 'textarea',
          label: 'Comentarios',
        },
      ],
    },
  ],
};
