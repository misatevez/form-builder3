import React from 'react';
import { FormComponent } from '../../types/form';

interface EmailInputProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function EmailInput({ label, value, onChange, validation }: EmailInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={validation?.required}
      />
    </div>
  );
}
