import React from 'react';

interface DateTimePickerProps {
  id: string;
  label: string;
  value: Date;
  onChange: (value: Date) => void;
  validation?: { required?: boolean };
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ id, label, value, onChange, validation }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="datetime-local"
        id={id}
        value={value.toISOString().slice(0, 16)}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="w-full p-2 border rounded"
        required={validation?.required}
      />
    </div>
  );
};

