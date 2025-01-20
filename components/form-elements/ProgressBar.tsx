import React from 'react';
import { FormComponent } from '../../types/form';
import { Progress } from "@/components/ui/progress"

interface ProgressBarProps extends FormComponent {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ id, label, value, min = 0, max = 100 }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Progress value={percentage} className="w-full" />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
