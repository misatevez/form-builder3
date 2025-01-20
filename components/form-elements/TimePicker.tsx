import React from 'react';
import { FormComponent } from '../../types/form';

interface TimePickerProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ id, label, value, onChange, validation }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="time"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        required={validation?.required}
      />
    </div>
  );
};

export default TimePicker;

