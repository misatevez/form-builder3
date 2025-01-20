import { FormTemplate } from '../../types/form';

export const pvPreSalesTechnicalVisitForm: FormTemplate = {
  id: 'pv-pre-sales-technical-visit-form',
  name: 'Visita Técnica Preventa Proyectos PV',
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
            { id: 'commercialActivity', type: 'text', label: 'Actividad Comercial' },
            { id: 'consumptionSchedule', type: 'text', label: 'Horario de Consumo' },
          ],
        },
      ],
    },
    {
      id: 'general-photos',
      title: 'Fotografías Generales',
      components: [
        {
          id: 'generalPhotos',
          type: 'photo',
          label: 'Fotografías Generales',
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
            { id: 'brandModel', type: 'text', label: 'Marca y Modelo' },
            { id: 'ampacity', type: 'text', label: 'Ampacidad (A)' },
            { id: 'conductorMaterial', type: 'text', label: 'Material de Conductor (Cu/Al)' },
            { id: 'conductorSize', type: 'text', label: 'Tamaño de Conductor (AWG)' },
            { id: 'accessibilityStatus', type: 'text', label: 'Accesibilidad y Estatus' },
            { id: 'distanceMeterBreaker', type: 'text', label: 'Distancia entre Medidor-Interruptor (m)' },
            { id: 'interconnectionRecommendation', type: 'text', label: '¿Se recomienda para Interconexión?  ¿Hay espacio para CT´s?' },
            { id: 'additionalComments', type: 'textarea', label: 'Comentarios Adicionales' },
          ],
        },
      ],
    },
    {
      id: 'main-panel',
      title: 'Tablero Principal',
      components: [
        {
          id: 'mainPanelTable',
          type: 'dynamicTable',
          label: 'Detalles del Tablero Principal',
          columns: [
            { id: 'brandModel', type: 'text', label: 'Marca y Modelo' },
            { id: 'ampacity', type: 'text', label: 'Ampacidad (A)' },
            { id: 'conductorMaterial', type: 'text', label: 'Material de Conductor (Cu/Al)' },
            { id: 'conductorSize', type: 'text', label: 'Tamaño de Conductor (AWG)' },
            { id: 'accessibilityStatus', type: 'text', label: 'Accesibilidad y Estatus' },
            { id: 'distanceMainBreakerPanel', type: 'text', label: 'Distancia entre Interruptor Principal-Tablero Principal (m)' },
            { id: 'interconnectionRecommendation', type: 'text', label: '¿Se recomienda para Interconexión?  ¿Hay espacio para CT´s?' },
            { id: 'additionalComments', type: 'textarea', label: 'Comentarios Adicionales' },
          ],
        },
      ],
    },
    {
      id: 'emergency-plant',
      title: 'Planta de Emergencia',
      components: [
        {
          id: 'emergencyPlantTable',
          type: 'dynamicTable',
          label: 'Detalles de la Planta de Emergencia',
          columns: [
            { id: 'transferBrandModel', type: 'text', label: 'Marca y Modelo de Transferencia' },
            { id: 'transferAmpacity', type: 'text', label: 'Ampacidad Transferencia (A)' },
            { id: 'generatorBrandModel', type: 'text', label: 'Marca y Modelo del Generador' },
            { id: 'generatorCapacity', type: 'text', label: 'Capacidad del Generador (kW)' },
            { id: 'backupDetails', type: 'text', label: '¿Qué respalda la Planta de Emergencia?' },
            { id: 'pvSystemOffSignal', type: 'text', label: '¿Es necesario señal Off para sistema PV?' },
            { id: 'accessibilityStatus', type: 'text', label: 'Accesibilidad y Estatus' },
            { id: 'interconnectionRecommendation', type: 'text', label: '¿Se recomienda para Interconexión?  ¿Hay espacio para CT´s?' },
            { id: 'distanceTransferMainBreaker', type: 'text', label: 'Distancia entre Transferencia-Interruptor Principal (m)' },
          ],
        },
      ],
    },
    {
      id: 'pv-panel-distribution',
      title: 'Distribución Paneles Fotovoltaicos',
      components: [
        {
          id: 'pvPanelDistributionTable',
          type: 'dynamicTable',
          label: 'Detalles de Distribución de Paneles Fotovoltaicos',
          columns: [
            { id: 'location', type: 'text', label: 'Ubicación (techo, estructura, suelo, carport)' },
            { id: 'roofTypeAndSupports', type: 'text', label: 'Tipo de Techo y Clavadores' },
            { id: 'roofStatus', type: 'text', label: 'Estatus del Techo' },
            { id: 'accessibilityHeightInclination', type: 'text', label: 'Accesibilidad/Altura(m)/Inclinación del Techo' },
            { id: 'availableOrientations', type: 'text', label: 'Orientaciones Disponibles' },
            { id: 'additionalComments', type: 'textarea', label: 'Comentarios Adicionales' },
          ],
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
            { id: 'solarModuleToRsd', type: 'text', label: 'Distancia Módulo Solar - RSD (m)' },
            { id: 'rsdToInverter', type: 'text', label: 'Distancia RSD - Inversor (m)' },
            { id: 'inverterToSolarPanel', type: 'text', label: 'Distancia Inversor - Tablero Solar (m)' },
            { id: 'solarPanelToGenerationMeter', type: 'text', label: 'Distancia Tablero Solar - Medidor Generación (m)' },
            { id: 'generationMeterToInterconnection', type: 'text', label: 'Distancia Medidor Generación - Punto de Interconexión (m)' },
            { id: 'consumptionSmartMeter', type: 'text', label: 'Distancia Medidor de Consumo Smart Meter (m)' },
            { id: 'internetToInverters', type: 'text', label: 'Distancia Internet - Inversores (m)' },
          ],
        },
      ],
    },
    {
      id: 'general-comments',
      title: 'Comentarios Generales',
      components: [
        {
          id: 'extraCosts',
          type: 'checkbox',
          label: 'Costos Extras',
        },
        {
          id: 'importantInformation',
          type: 'textarea',
          label: 'Información Importante',
        },
      ],
    },
    {
      id: 'test-section',
      title: 'PRUEBA',
      components: [
        {
          id: 'selfConsumption',
          type: 'checkbox',
          label: 'Autoconsumo',
        },
        {
          id: 'interconnected',
          type: 'checkbox',
          label: 'Interconectado',
        },
        {
          id: 'testField',
          type: 'text',
          label: 'Prueba',
        },
      ],
    },
  ],
};
