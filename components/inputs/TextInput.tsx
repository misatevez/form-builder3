import React from 'react';
import { FormComponent } from '../../types/form';

interface TextInputProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ label, value, onChange, validation }: TextInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={validation?.required}
        minLength={validation?.minLength}
        maxLength={validation?.maxLength}
      />
    </div>
  );
}

