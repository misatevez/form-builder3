import React from 'react';
import { FormComponent } from '../../types/form';

interface ProgressBarProps extends FormComponent {
  value: number;
}

export function ProgressBar({ label, value, min = 0, max = 100 }: ProgressBarProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">{label}</label>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
