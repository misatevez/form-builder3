import React from 'react';
import { useFormContext } from '../context/FormContext';
import { FormComponent } from '../types/form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Plus, X } from 'lucide-react'

export const ComponentProperties: React.FC = () => {
  const { template, selectedElementId, updateComponent } = useFormContext();

  if (!selectedElementId) {
    return <div className="text-gray-500">Seleccione un componente para editar sus propiedades.</div>;
  }

  const selectedComponent = template.sections
    .flatMap(section => section.components)
    .find(component => component.id === selectedElementId);

  if (!selectedComponent) {
    return <div className="text-gray-500">Componente no encontrado.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const sectionId = template.sections.find(section => 
      section.components.some(comp => comp.id === selectedElementId)
    )?.id;

    if (sectionId) {
      updateComponent(sectionId, selectedElementId, {
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleRequiredChange = (checked: boolean) => {
    const sectionId = template.sections.find(section => 
      section.components.some(comp => comp.id === selectedElementId)
    )?.id;

    if (sectionId) {
      updateComponent(sectionId, selectedElementId, {
        validation: { ...selectedComponent.validation, required: checked }
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Propiedades del Componente</h3>
      
      <div>
        <Label htmlFor="label">Etiqueta</Label>
        <Input
          id="label"
          name="label"
          value={selectedComponent.label}
          onChange={handleChange}
        />
      </div>

      {selectedComponent.type === 'text' && (
        <>
          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              name="placeholder"
              value={selectedComponent.placeholder || ''}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              checked={selectedComponent.validation?.required || false}
              onCheckedChange={handleRequiredChange}
            />
            <Label htmlFor="required">Requerido</Label>
          </div>
        </>
      )}

      {selectedComponent.type === 'select' && (
  <div className="mt-4">
    <Label htmlFor="options">Opciones del Select</Label>
    <div className="space-y-2">
      {selectedComponent.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={option}
            onChange={(e) => {
              const newOptions = [...(selectedComponent.options || [])];
              newOptions[index] = e.target.value;
              updateComponent(sectionId, selectedElementId, { options: newOptions });
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const newOptions = selectedComponent.options?.filter((_, i) => i !== index) || [];
              updateComponent(sectionId, selectedElementId, { options: newOptions });
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => {
          const newOptions = [...(selectedComponent.options || []), ''];
          updateComponent(sectionId, selectedElementId, { options: newOptions });
        }}
      >
        <Plus className="h-4 w-4 mr-2" /> Añadir opción
      </Button>
    </div>
  </div>
)}

      {/* Agregar más campos de configuración según el tipo de componente */}
    </div>
  );
};

