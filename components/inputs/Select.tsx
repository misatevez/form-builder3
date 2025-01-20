import React from 'react';
import { FormComponent } from '../../types/form';

interface SelectProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function Select({ label, value, onChange, validation, options = [] }: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={validation?.required}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
