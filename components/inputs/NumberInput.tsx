import React from 'react';
import { FormComponent } from '../../types/form';

interface NumberInputProps extends FormComponent {
  value: number;
  onChange: (value: number) => void;
}

export function NumberInput({ label, value, onChange, validation }: NumberInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={validation?.required}
        min={validation?.min}
        max={validation?.max}
      />
    </div>
  );
}
