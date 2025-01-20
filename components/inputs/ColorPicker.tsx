import React from 'react';
import { FormComponent } from '../../types/form';

interface ColorPickerProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange, validation }: ColorPickerProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-1 rounded"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ml-2 p-2 border rounded"
        />
      </div>
    </div>
  );
}

