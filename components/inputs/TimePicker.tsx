import React from 'react';
import { FormComponent } from '../../types/form';

interface TimePickerProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function TimePicker({ label, value, onChange, validation }: TimePickerProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={validation?.required}
      />
    </div>
  );
}

