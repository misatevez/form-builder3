import React from 'react';
import { FormComponent } from '../../types/form';

interface SliderProps extends FormComponent {
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ label, value, onChange, validation, min = 0, max = 100, step = 1 }: SliderProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

