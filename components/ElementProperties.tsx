import React from 'react';
import { useFormContext } from '../context/FormContext';
import { FormComponent, FormSection } from '../types/form';

export function ElementProperties() {
  const { template, selectedElementId, updateComponent, updateSection } = useFormContext();

  if (!selectedElementId) {
    return <div>No element selected</div>;
  }

  const selectedElement = template.sections.flatMap(section => 
    [section, ...section.components]
  ).find(element => element.id === selectedElementId);

  if (!selectedElement) {
    return <div>Selected element not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if ('components' in selectedElement) {
      updateSection(selectedElement.id, { [name]: value });
    } else {
      const section = template.sections.find(s => s.components.some(c => c.id === selectedElement.id));
      if (section) {
        updateComponent(section.id, selectedElement.id, { [name]: value });
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Element Properties</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          name="label"
          value={(selectedElement as FormComponent).label || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {(selectedElement as FormSection).description !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={(selectedElement as FormSection).description || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      {/* Add more properties here as needed */}
    </div>
  );
}
