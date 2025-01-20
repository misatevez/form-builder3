import React from 'react';
import { FormComponent } from '../../types/form';

interface ColorPickerProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ id, label, value, onChange, validation }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center">
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-1 rounded"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ml-2 p-2 border rounded"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
