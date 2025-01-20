import React from 'react';
import { FormComponent } from '../../types/form';

interface CheckboxProps extends FormComponent {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ label, value, onChange, validation }: CheckboxProps) {
  return (
    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="mr-2"
          required={validation?.required}
        />
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
}

