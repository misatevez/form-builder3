import React, { useState } from 'react';
import TextInput from './form-elements/TextInput';
import { DateTimePicker } from './form-elements/DateTimePicker';
import Checkbox from './form-elements/Checkbox';
import { Select } from './form-elements/Select';
import { DynamicTable } from './form-elements/DynamicTable';
import { PhotoUpload } from './form-elements/PhotoUpload';
import { TextArea } from './form-elements/TextArea';

export const PVCommissioningForm: React.FC = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    commissioningDate: new Date(),
    inverterBrand: 'Fronius',
    systemType: [],
    comments: '',
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Puesta de servicio FV</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Detalle de Proyecto</h2>
        <TextInput
          id="projectName"
          label="Nombre de Proyecto"
          value={formData.projectName}
          onChange={(value) => handleInputChange('projectName', value)}
          validation={{ required: true }}
        />
        <TextInput
          id="location"
          label="Ubicación"
          value={formData.location}
          onChange={(value) => handleInputChange('location', value)}
          placeholder="Provincia, Cantón"
        />
        <DateTimePicker
          id="commissioningDate"
          label="Fecha y hora de puesta en servicio"
          value={formData.commissioningDate}
          onChange={(value) => handleInputChange('commissioningDate', value)}
          validation={{ required: true }}
        />
        <Select
          id="inverterBrand"
          label="Marca de inversores"
          value={formData.inverterBrand}
          onChange={(value) => handleInputChange('inverterBrand', value)}
          options={['Fronius', 'SMA', 'Huawei', 'SolarEdge']}
          validation={{ required: true }}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tipo de sistema</h2>
        <p className="mb-4 text-sm text-gray-600">Marque la casilla que indica el tipo de sistema instalado</p>
        <Checkbox
          id="gridConnected"
          label="Generación distribuida (interconectado a la red eléctrica)"
          checked={formData.systemType.includes('gridConnected')}
          onChange={(checked) => {
            const newSystemType = checked
              ? [...formData.systemType, 'gridConnected']
              : formData.systemType.filter(type => type !== 'gridConnected');
            handleInputChange('systemType', newSystemType);
          }}
        />
        {/* Add more checkboxes for other system types */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Lista de chequeo</h2>
        <Checkbox
          id="invertersInstalled"
          label="Inversores firmemente instalados"
          checked={false}
          onChange={() => {}}
        />
        {/* Add more checkboxes for other checklist items */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calibre cables AC de inversores</h2>
        <DynamicTable
          columns={[
            { id: 'inverterNumber', label: '# de Inversor', type: 'number' },
            { id: 'calibreF1', label: 'Calibre F1', type: 'text' },
            { id: 'calibreF2', label: 'Calibre F2', type: 'text' },
            { id: 'calibreF3', label: 'Calibre F3', type: 'text' },
            { id: 'calibreNeutro', label: 'Calibre Neutro', type: 'text' },
            { id: 'calibreTierra', label: 'Calibre Tierra', type: 'text' },
          ]}
          data={[]}
          onDataChange={() => {}}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Fotos observaciones</h2>
        <PhotoUpload
          id="observationPhotos"
          label="Adjunte fotos de las observaciones realizadas"
          onUpload={() => {}}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
        <TextArea
          id="comments"
          label="Comentarios generales de la puesta en marcha"
          value={formData.comments}
          onChange={(value) => handleInputChange('comments', value)}
        />
      </section>
    </div>
  );
};
