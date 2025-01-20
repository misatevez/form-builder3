import React from 'react';
import { useFormContext } from '../context/FormContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';

export function AddSectionButton() {
  const { addSection } = useFormContext();

  const handleAddSection = () => {
    const newSection = {
      id: uuidv4(),
      title: 'Nueva Sección',
      description: '',
      components: []
    };
    addSection(newSection);
  };

  return (
    <button
      onClick={handleAddSection}
      className="w-full p-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
    >
      <Plus size={20} className="mr-2" />
      Añadir Nueva Sección
    </button>
  );
}
