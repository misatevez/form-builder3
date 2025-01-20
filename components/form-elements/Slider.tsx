import React from 'react';
import { FormComponent } from '../../types/form';
import { Slider as SliderPrimitive } from "@/components/ui/slider"

interface SliderProps extends FormComponent {
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ id, label, value, onChange, validation, min = 0, max = 100, step = 1 }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <SliderPrimitive
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default Slider;
