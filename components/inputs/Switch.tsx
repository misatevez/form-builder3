import React from 'react';
import { FormComponent } from '../../types/form';

interface SwitchProps extends FormComponent {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function Switch({ label, value, onChange, validation }: SwitchProps) {
  return (
    <div className="mb-4">
      <label className="flex items-center">
        <span className="mr-2">{label}</span>
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            value ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onClick={() => onChange(!value)}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
              value ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
}
