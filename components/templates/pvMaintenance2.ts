import { FormTemplate } from '../../types/form';

export const pvMaintenance2: FormTemplate = {
  id: 'pv-maintenance-2',
  name: 'Boleta de Mantenimiento Preventivo PV 2.0',
  sections: [
    {
      id: 'general-info',
      title: 'Información General',
      components: [
        { id: 'owner-name', type: 'text', label: 'Nombre de propietario', validation: { required: true } },
        { id: 'contact', type: 'text', label: 'Contacto', validation: { required: true } },
        { id: 'phone', type: 'text', label: 'Teléfono', validation: { required: true } },
        { id: 'project-name', type: 'text', label: 'Nombre del proyecto', validation: { required: true } },
        { id: 'date', type: 'date', label: 'Fecha', validation: { required: true } },
        { id: 'location', type: 'text', label: 'Ubicación', validation: { required: true }, placeholder: 'Provincia, Cantón, Distrito' },
        { id: 'maintenance-manager', type: 'text', label: 'Encargado del mantenimiento', validation: { required: true } },
      ],
    },
    {
      id: 'safety',
      title: 'Seguridad',
      description: 'NO PROCEDER EN CASO DE EXISTIR RIESGO CONTRA LA SEGURIDAD PERSONAL',
      components: [
        { id: 'safety-equipment', type: 'checkbox', label: '¿Posee el equipo de seguridad para realizar la inspección?' },
        { id: 'system-generating', type: 'checkbox', label: '¿El sistema está generando?' },
        { id: 'inverter-error', type: 'checkbox', label: '¿El inversor está indicando algún mensaje de error?' },
        { id: 'error-message', type: 'text', label: 'En caso de presentar error, indicar el número de estado e inversor' },
      ],
    },
    {
      id: 'building-info',
      title: '1. Información del edificio',
      components: [
        { id: 'system-type', type: 'select', label: 'Tipo de sistema', options: ['Conectado a la red', 'Netzero', 'Aislado','Hibrido','Microred'], validation: { required: true } },
        { id: 'surface-state', type: 'text', label: 'Estado/material de la superficie', validation: { required: true } },
        { id: 'surface-photos', type: 'photo', label: 'Fotos material de la superficie', validation: { required: true, min: 2 } },
        { id: 'interconnection-point', type: 'text', label: 'Ubicación del punto de interconexión', validation: { required: true } },
        { id: 'interconnection-photos', type: 'photo', label: 'Fotos punto de interconexión', validation: { required: true, min: 2 } },
      ],
    },
    {
      id: 'pv-modules',
      title: '2. Módulos FV',
      components: [
        { id: 'module-brand', type: 'text', label: 'Marca y modelo de los módulos', validation: { required: true } },
        { id: 'module-power', type: 'number', label: 'Potencia por módulo en Watts [W]', validation: { required: true } },
        { id: 'module-quantity', type: 'number', label: 'Cantidad de módulos', validation: { required: true } },
        { id: 'module-initial-state', type: 'select', label: 'Estado inicial de los módulos', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'module-initial-photos', type: 'photo', label: 'Fotos estado inicial de los módulos', validation: { required: true, min: 5 } },
        { id: 'module-damage', type: 'checkbox', label: 'Daños encontrados' },
        { id: 'module-damage-description', type: 'textarea', label: 'Indicar el daño y adjuntar fotos' },
        { id: 'module-damage-photos', type: 'photo', label: 'Fotos de los daños identificados' },
        { id: 'module-cleaning', type: 'checkbox', label: 'Se realizó limpieza de módulos (Adjuntar fotos)' },
        { id: 'module-final-photos', type: 'photo', label: 'Fotos estado final de los módulos, marcos y aterrizaje', validation: { required: true, min: 5 } },
        { id: 'frame-state', type: 'select', label: 'Estado de los marcos de los arreglos', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'frame-photos', type: 'photo', label: 'Estado de los marcos de los arreglos (Fotos)', validation: { required: true, min: 3 } },
        { id: 'grounding-state', type: 'select', label: 'Estado del aterrizaje de los arreglos', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'grounding-photos', type: 'photo', label: 'Estado del aterrizaje de los arreglos (Fotos)', validation: { required: true, min: 3 } },
      ],
    },
    {
      id: 'inverters',
      title: '3. Inversores',
      components: [
        { id: 'inverter-brand', type: 'text', label: 'Marca y modelo de los inversores', validation: { required: true } },
        { id: 'inverter-quantity', type: 'number', label: 'Cantidad de inversores', validation: { required: true } },
        { id: 'solarweb-config', type: 'checkbox', label: 'Solarweb está configurado con cliente, instalador y greenenergy (Adjuntar captura)' },
        { id: 'solarweb-screenshot', type: 'photo', label: 'Monitoreo Solar Web' },
        { id: 'internet-connection', type: 'select', label: 'Internet es brindado al inversor vía', options: ['Cableado', 'Wifi', 'Ninguno'] },
        { id: 'internet-state', type: 'select', label: 'Estado de conexión a internet', options: ['Excelente', 'Intermedio', 'Malo'] },
        { id: 'network-config', type: 'text', label: 'Configuración de red (IP)' },
        { id: 'inverter-phases', type: 'number', label: 'Número de fases del inversor', validation: { required: true } },
        { id: 'fastening-inspection', type: 'checkbox', label: 'Inspección de sujeciones (Adjuntar fotos)' },
        { id: 'inverter-initial-photos', type: 'photo', label: 'Foto de inversores antes del mantenimiento (interior y exterior)', validation: { required: true, min: 5 } },
        { id: 'inverter-cleaning', type: 'checkbox', label: 'Limpieza interior y exterior' },
        { id: 'inverter-cleaning-photos', type: 'photo', label: 'Limpieza interior y exterior (Adjuntar fotos)', validation: { required: true, min: 5 } },
        { id: 'filter-initial-state', type: 'photo', label: 'Estado inicial de los filtros (fotos)', validation: { required: true, min: 3 } },
        { id: 'filter-cleaning', type: 'checkbox', label: 'Limpieza de filtros' },
        { id: 'filter-cleaning-photos', type: 'photo', label: 'Limpieza de filtros (Adjuntar fotos)', validation: { required: true, min: 3 } },
        { id: 'connection-initial-photos', type: 'photo', label: 'Bornes AC y DC, puntos de conexión y cableado antes del mantenimiento', validation: { required: true, min: 5 } },
        { id: 'connection-tightening', type: 'checkbox', label: 'Apriete de bornes y conexiones AC y DC' },
        { id: 'mechanical-tightening', type: 'checkbox', label: 'Apriete de sujeciones mecánicas' },
        { id: 'wiring-state', type: 'select', label: 'Estado del cableado y conexiones', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'connection-final-photos', type: 'photo', label: 'Bornes AC y DC, puntos de conexión y cableado después del mantenimiento', validation: { required: true, min: 3 } },
        { id: 'fan-state', type: 'select', label: 'Estado de los ventiladores', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'fan-initial-photos', type: 'photo', label: 'Estado de los ventiladores antes del mantenimiento', validation: { required: true, min: 3 } },
        { id: 'fan-final-photos', type: 'photo', label: 'Estado de los ventiladores después del mantenimiento', validation: { required: true, min: 3 } },
        { id: 'inverter-mesh', type: 'checkbox', label: '¿El inversor posee malla?' },
        { id: 'inverter-mesh-state', type: 'text', label: 'Indicar el estado' },
        { id: 'mesh-change', type: 'checkbox', label: '¿Se realizó el cambio de malla?' },
        { id: 'mesh-photos', type: 'photo', label: 'Cambio o limpieza de mallas (Adjuntar fotos)' },
        { id: 'fuse-location', type: 'select', label: 'Inversores poseen fusibles:', options: ['Dentro del inversor', 'en Caja Fusiblera', 'Rapidshutdown', 'no posee'], validation: { required: true } },
        { id: 'fuse-photos', type: 'photo', label: 'Fusibles de los inversores (Adjuntar fotos)' },
        { id: 'inverter-exposed', type: 'checkbox', label: 'Inversor(es) expuesto(s) al Sol' },
        { id: 'inverter-humidity', type: 'checkbox', label: 'Inversor presenta humedad en el interior (Adjuntar fotos)' },
        { id: 'panel-humidity', type: 'checkbox', label: 'El tablero presenta humedad en el interior (Adjuntar fotos)' },
        { id: 'junction-box-humidity', type: 'checkbox', label: 'Las cajas de paso y conduletas presentan humedad en el interior (Adjuntar fotos)' },
        { id: 'humidity-signs-photos', type: 'photo', label: 'Signos de humedad' },
        { id: 'water-filtration-fix', type: 'checkbox', label: 'Se corrigieron los problemas de filtración de agua (Adjuntar fotos)' },
        { id: 'water-filtration-fix-description', type: 'text', label: 'Si no aplica dejar N/A' },
        { id: 'water-filtration-fix-photos', type: 'photo', label: 'Corrección de filtraciones de humedad' },
        { id: 'polyurethane-foam', type: 'checkbox', label: 'Inversor posee espuma de poliuretano (Si no, rellenar tuberías)' },
        { id: 'polyurethane-foam-photos', type: 'photo', label: 'Relleno con espuma de poliuretano (adjuntar fotos)' },
        { id: 'maintenance-label', type: 'checkbox', label: 'Colocar etiqueta de mantenimiento' },
        { id: 'rearm-test', type: 'checkbox', label: 'Prueba de rearme' },
        { id: 'inverter-final-photos', type: 'photo', label: 'Fotos de inversores después del mantenimiento', validation: { required: true, min: 5 } },
      ],
    },
    {
      id: 'inverter-data',
      title: '3.1 Datos de los inversores',
      description: 'Información histórica obtenida de los registros del inversor',
      components: [
        {
          id: 'inverter-data-table',
          type: 'dynamicTable',
          label: 'Datos de los inversores',
          columns: [
            { id: 'inverter-number', type: 'number', label: '# de inversor', validation: { required: true } },
            { id: 'nominal-power', type: 'number', label: 'Potencia nominal [kW]', validation: { required: true } },
            { id: 'max-ac-voltage', type: 'number', label: 'Máxima tensión L-L o L-N CA [V]', validation: { required: true } },
            { id: 'max-dc-voltage', type: 'number', label: 'Máxima tensión fotovoltaica CC [V]', validation: { required: true } },
            { id: 'max-power', type: 'number', label: 'Máxima potencia [W]', validation: { required: true } },
            { id: 'service-hours', type: 'number', label: 'Horas de servicio', validation: { required: true } },
            { id: 'historical-energy', type: 'number', label: 'Energía histórica [kWh]', validation: { required: true } },
            { id: 'isolation', type: 'number', label: 'Aislamiento [MOhm]', validation: { required: true } },
          ],
        },
      ],
    },
    {
      id: 'ac-measurements-1',
      title: '3.2.1 Tabla de mediciones en corriente alterna [V]',
      description: 'F = Fase\nN = Neutro\nT = Tierra',
      components: [
        {
          id: 'ac-measurements-table-1',
          type: 'dynamicTable',
          label: 'Mediciones en corriente alterna [V]',
          columns: [
            { id: 'inverter-number', type: 'number', label: '# de inversor', validation: { required: true } },
            { id: 'f1-f2', type: 'number', label: 'F1-F2', validation: { required: true } },
            { id: 'f2-f3', type: 'number', label: 'F2-F3' },
            { id: 'f1-f3', type: 'number', label: 'F1-F3' },
            { id: 'f1-n', type: 'number', label: 'F1-N', validation: { required: true } },
            { id: 'f2-n', type: 'number', label: 'F2-N', validation: { required: true } },
            { id: 'f3-n', type: 'number', label: 'F3-N' },
          ],
        },
      ],
    },
    {
      id: 'ac-measurements-2',
      title: '3.2.2 Tabla de mediciones en corriente alterna [V]',
      description: 'F = Fase\nN = Neutro\nT = Tierra',
      components: [
        {
          id: 'ac-measurements-table-2',
          type: 'dynamicTable',
          label: 'Mediciones en corriente alterna [V]',
          columns: [
            { id: 'inverter-number', type: 'number', label: '# de inversor', validation: { required: true } },
            { id: 'f1-t', type: 'number', label: 'F1-T', validation: { required: true } },
            { id: 'f2-t', type: 'number', label: 'F2-T', validation: { required: true } },
            { id: 'f3-t', type: 'number', label: 'F3-T' },
            { id: 'n-t', type: 'number', label: 'N-T' },
          ],
        },
      ],
    },
    {
      id: 'dc-measurements',
      title: '3.3 Tabla de mediciones en corriente continua',
      description: '+ = Positivo\n- = Negativo\nT = Tierra',
      components: [
        {
          id: 'dc-measurements-table',
          type: 'dynamicTable',
          label: 'Mediciones en corriente continua',
          columns: [
            { id: 'inverter-number', type: 'number', label: '# de inversor', validation: { required: true } },
            { id: 'row-number', type: 'number', label: '# de fila', validation: { required: true } },
            { id: 'pos-neg', type: 'number', label: '+ / - [V]', validation: { required: true } },
            { id: 'pos-ground', type: 'number', label: '+ / T [V]', validation: { required: true } },
            { id: 'neg-ground', type: 'number', label: '- / T [V]', validation: { required: true } },
            { id: 'pos-isolation', type: 'number', label: 'Aislamiento + [MOhm]', validation: { required: true } },
            { id: 'neg-isolation', type: 'number', label: 'Aislamiento - [MOhm]', validation: { required: true } },
          ],
        },
      ],
    },
    {
      id: 'structure-and-roof',
      title: '4. Estructura y techo',
      components: [
        { id: 'initial-structure-state', type: 'select', label: 'Estado inicial de la estructura de fijación', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'initial-structure-photos', type: 'photo', label: 'Fotos iniciales estructura de fijación y techo' },
        { id: 'material-cleaning', type: 'checkbox', label: 'Limpieza de materiales mayores acumulados en puntos de sujeción' },
        { id: 'material-cleaning-photos', type: 'photo', label: 'Fotos limpieza de materiales mayores acumulados' },
        { id: 'damage-signs', type: 'checkbox', label: 'Existen signos de daño en módulos, cableado o techo' },
        { id: 'damage-description', type: 'textarea', label: 'En dado caso, indicar el daño y adjuntar fotos' },
        { id: 'damage-photos', type: 'photo', label: 'Daño en módulos, estructura o cableado' },
        { id: 'module-mobility', type: 'checkbox', label: 'Existe movilidad en los módulos o estructura' },
        { id: 'screw-tightening', type: 'checkbox', label: 'Los tornillos han sido ajustados con el par correcto, usando el medidor de par' },
        { id: 'moisture-penetration', type: 'checkbox', label: 'Peligro de penetración de humedad o agua en orificios del techo' },
        { id: 'moisture-penetration-description', type: 'textarea', label: 'De ser así, indicar el punto y adjuntar fotos' },
        { id: 'moisture-penetration-photos', type: 'photo', label: 'Fotos peligro de penetración de humedad' },
        { id: 'water-filtration-fix-photos', type: 'photo', label: 'Fotos corrección de filtraciones de agua' },
        { id: 'abrasive-contact', type: 'checkbox', label: 'Conductores en contacto con superficies abrasivas (Adjuntar fotos)' },
        { id: 'junction-box-connections', type: 'checkbox', label: 'Conexiones de conductores están en cajas de conexión (Adjuntar fotos)' },
        { id: 'degraded-parts-replacement', type: 'checkbox', label: 'Sustitución de piezas degradadas' },
        { id: 'degraded-parts-photos', type: 'photo', label: 'Fotos sustitución de piezas degradadas' },
        { id: 'oxidation-signs', type: 'checkbox', label: 'Señales de oxidación y estrés sobre la estructura de fijación' },
        { id: 'oxidation-description', type: 'textarea', label: 'De ser así, indicar en qué punto y adjuntar fotos' },
        { id: 'oxidation-photos', type: 'photo', label: 'Fotos señales de oxidación o estrés sobre la estructura de fijación' },
        { id: 'junction-box-state', type: 'select', label: 'Estado de cajas de registro, conduletas bota agua, LB, entre otras estructuras', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'junction-box-photos', type: 'photo', label: 'Fotos estado de cajas de registro, conduletas, LB, LL, LR, bota agua', validation: { required: true, min: 3 } },
      ],
    },
    {
      id: 'connections-and-protection',
      title: '5. Conexiones y elementos de protección',
      components: [
        { id: 'initial-panel-photos', type: 'photo', label: 'Foto inicial del tablero de distribución (interior y exterior)', validation: { required: true, min: 2 } },
        { id: 'terminal-tightening', type: 'checkbox', label: 'Apriete de bornes y conexiones' },
        { id: 'panel-cleaning', type: 'checkbox', label: 'Limpieza interior y exterior' },
        { id: 'connection-points-state', type: 'select', label: 'Estado de los puntos de conexión', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'polyurethane-foam-filling', type: 'checkbox', label: 'Se rellenaron las tuberías con espuma de poliuretano' },
        { id: 'final-panel-photos', type: 'photo', label: 'Foto final del tablero de distribución (interior y exterior)', validation: { required: true, min: 3 } },
        { id: 'initial-meter-photos', type: 'photo', label: 'Medidor de generación antes del mantenimiento', validation: { required: true, min: 3 } },
        { id: 'meter-state', type: 'select', label: 'Estado del medidor de generación', options: ['Excelente', 'Intermedio', 'Malo'], validation: { required: true } },
        { id: 'meter-terminal-tightening', type: 'checkbox', label: 'Ajuste de bornes del medidor de generación' },
        { id: 'final-meter-photos', type: 'photo', label: 'Medidor de generación después del mantenimiento', validation: { required: true, min: 3 } },
        { id: 'interconnection-point-tightening', type: 'checkbox', label: 'Apriete del punto de interconexión' },
        { id: 'labeling-review', type: 'checkbox', label: 'Revisión de etiquetado' },
        { id: 'labeling-description', type: 'text', label: 'Si hiciera falta, etiquetar' },
        { id: 'system-labeling-photos', type: 'photo', label: 'Etiquetado del sistema', validation: { required: true, min: 2 } },
        { id: 'protection-elements-photos', type: 'photo', label: 'Fotos de elementos de protección', validation: { required: true, min: 5 } },
      ],
    },
    {
      id: 'general-rating',
      title: 'Calificación general',
      description: 'En esta sección se debe calificar del 0 al 10 cada uno de los siguientes aspectos, donde 0 es malo y 10 es excelente.',
      components: [
        { id: 'wiring-rating', type: 'number', label: 'Cableado', validation: { required: true, min: 0, max: 10 } },
        { id: 'mounting-structure-rating', type: 'number', label: 'Estructura de montaje', validation: { required: true, min: 0, max: 10 } },
        { id: 'module-fastening-rating', type: 'number', label: 'Sujeción de módulos', validation: { required: true, min: 0, max: 10 } },
        { id: 'inverter-rating', type: 'number', label: 'Inversor(es)', validation: { required: true, min: 0, max: 10 } },
        { id: 'pv-modules-rating', type: 'number', label: 'Módulos FV', validation: { required: true, min: 0, max: 10 } },
        { id: 'grounding-rating', type: 'number', label: 'Puesta a tierra', validation: { required: true, min: 0, max: 10 } },
        { id: 'switches-rating', type: 'number', label: 'Interruptores AC y DC', validation: { required: true, min: 0, max: 10 } },
        { id: 'observations', type: 'textarea', label: 'Observaciones' },
        { id: 'observation-photos', type: 'photo', label: 'Fotos de Observaciones' },
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
      id: 'technician-signature',
      title: 'Firma del técnico responsable',
      components: [
        { id: 'technician-signature', type: 'signature', label: 'Firma del técnico responsable', validation: { required: true } },
      ],
    },
  ],
};
