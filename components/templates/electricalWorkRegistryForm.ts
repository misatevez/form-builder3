import { FormTemplate } from '../../types/form';

export const electricalWorkRegistryForm: FormTemplate = {
  id: 'electrical-work-registry-form',
  name: 'Registro de trabajos eléctricos (energías peligrosas)',
  sections: [
    {
      id: 'project-info',
      title: 'Información del proyecto',
      components: [
        { id: 'personCompletingForm', type: 'text', label: 'Nombre de persona que completa formulario', validation: { required: true } },
        { id: 'workDates', type: 'date', label: 'Fechas en que se harán los trabajos', validation: { required: true } },
        { id: 'clientOrProject', type: 'text', label: 'Cliente o proyecto', validation: { required: true }, placeholder: 'Ej. Planta Auto Deli, Auto Mercado. Ej. Casa Verde, Señor Max Hamilton' },
        { id: 'location', type: 'text', label: 'Dirección del lugar', validation: { required: true }, placeholder: 'Provincia, Cantón, Distrito y detalles adicionales' },
        { id: 'workArea', type: 'text', label: 'Área donde se van a realizar los trabajos', validation: { required: true }, placeholder: 'techos, cuarto eléctrico, etc' },
      ],
    },
    {
      id: 'work-purpose',
      title: 'Propósito del trabajo',
      components: [
        { id: 'newInstallation', type: 'checkbox', label: 'Nueva instalación' },
        { id: 'maintenance', type: 'checkbox', label: 'Mantenimiento' },
        { id: 'troubleshooting', type: 'checkbox', label: 'Reporte de Avería' },
      ],
    },
    {
      id: 'procedure-check',
      title: '¿Se cuenta con procedimiento específico y claro para ejecutar la labor?',
      components: [
        { id: 'hasProcedure', type: 'radio', label: '¿Se cuenta con procedimiento?', options: ['Sí', 'No'], validation: { required: true } },
      ],
    },
    {
      id: 'tools-check',
      title: '¿Se cuenta con herramientas para ejecutar la labor?',
      components: [
        { id: 'hasTools', type: 'radio', label: '¿Se cuenta con herramientas?', options: ['Sí', 'No'], validation: { required: true } },
      ],
    },
    {
      id: 'personnel-check',
      title: '¿El personal está calificado para realizar la labor?',
      components: [
        { id: 'isPersonnelQualified', type: 'radio', label: '¿Personal calificado?', options: ['Sí', 'No'], validation: { required: true } },
      ],
    },
    {
      id: 'area-check',
      title: '¿El área se encuentra limpia, ordenada, aislada y es óptima para realizar el trabajo?',
      components: [
        { id: 'isAreaSuitable', type: 'radio', label: '¿Área adecuada?', options: ['Sí', 'No'], validation: { required: true } },
      ],
    },
    {
      id: 'safety-measures',
      title: '¿Se señalizó y delimitó el área de trabajo con conos, tomando en cuenta la zona de potenciales peligros?',
      components: [
        { id: 'isAreaMarked', type: 'radio', label: '¿Área señalizada?', options: ['Sí', 'No'], validation: { required: true } },
      ],
    },
    {
      id: 'pre-work-meeting',
      title: '¿Se ha hecho una reunión previa con todos los implicados en la tarea?',
      components: [
        { id: 'hadPreWorkMeeting', type: 'radio', label: '¿Reunión previa?', options: ['Sí', 'No'], validation: { required: true } },
      ],
    },
    {
      id: 'personal-protective-equipment',
      title: '¿Todo el personal que va a realizar los trabajos cuenta con el Equipo de Protección Personal?',
      components: [
        { id: 'helmet', type: 'select', label: 'Casco', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'glasses', type: 'select', label: 'Lentes', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'dielectricGloves', type: 'select', label: 'Guantes dieléctricos', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'safetyShoes', type: 'select', label: 'Zapatos de Seguridad', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'faceMask', type: 'select', label: 'Careta', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'leatherApron', type: 'select', label: 'Delantal de carnaza', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'leggings', type: 'select', label: 'Polainas', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'hearingProtection', type: 'select', label: 'Protección auditiva', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'mechanicalResistanceGloves', type: 'select', label: 'Guantes resistencia mecánica', options: ['Sí', 'No', 'N/A'] },
      ],
    },
    {
      id: 'safety-checks',
      title: 'Verifique los siguientes puntos',
      components: [
        { id: 'workInterference', type: 'select', label: '¿Se ha revisado que el trabajo no va a interferir con otro trabajo eléctrico?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'dangerousEnergySources', type: 'select', label: '¿Se ha identificado las fuentes de energía peligrosas?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'energyBlocking', type: 'select', label: '¿Se bloquearon todas las energías peligrosas identificadas?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'lockoutTagout', type: 'select', label: '¿Se colocaron bloqueos y tarjetas de peligro en los puntos de aislamiento de energía?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'gravitationalEnergy', type: 'select', label: '¿Las energías secundarias gravitacionales han sido bloqueadas?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'energyAbsenceVerification', type: 'select', label: '¿Se verificó la ausencia y bloqueo de energía?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'dangerTagsCompleted', type: 'select', label: '¿Las tarjetas de peligro estan completamente diligenciadas?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'emergencyPlanVerified', type: 'select', label: '¿Se verifico el plan de acción en caso de una emergencia?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
      ],
    },
    {
      id: 'additional-checks',
      title: 'Verifique los siguientes puntos',
      components: [
        { id: 'equipmentIsolation', type: 'select', label: '¿El equipo y tuberías están aislados, drenados y desconectados?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'flammableGasPrecautions', type: 'select', label: '¿Se tomaron las precauciones para la liberiación accidental de vapor o gases inflamables?', options: ['Sí', 'No', 'N/A'] },
        { id: 'flammableGasMeasurements', type: 'select', label: '¿Se realizaron mediciones de gases inflamables en tanques, manholes, líneas, cajas y canaletas?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'flameArrestorMarking', type: 'select', label: '¿La válvula corta-llamas y la línea de la maguera próxima se marcaron en las salidas del cilindro?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'temporaryElectricalCables', type: 'select', label: '¿Los cables eléctricos temporales están en buen estado sobre zonas secas, aéreos en zonas de circulación y están encauchetados?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'emergencyPlanKnowledge', type: 'select', label: '¿Se conoce el plan de emergencia del área?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
        { id: 'workObservation', type: 'select', label: '¿Alguien observará su trabajo?', options: ['Sí', 'No', 'N/A'], validation: { required: true } },
      ],
    },
  ],
};

