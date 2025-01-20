import React, { useState } from 'react';
import { FormComponent } from '../../types/form';

interface AutocompleteProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function Autocomplete({ label, value, onChange, validation, options }: AutocompleteProps) {
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="mb-4 relative">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
        className="w-full p-2 border rounded"
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
