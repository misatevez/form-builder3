import React from 'react';
import { FormComponent } from '../../types/form';

interface RadioGroupProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ label, value, onChange, validation, options = [] }: RadioGroupProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {options.map((option, index) => (
        <label key={index} className="flex items-center mb-1">
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="mr-2"
            required={validation?.required}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
