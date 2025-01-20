import React from 'react';
import { FormComponent } from '../../types/form';
import { Star } from 'lucide-react';

interface RatingProps extends FormComponent {
  value: number;
  onChange: (value: number) => void;
}

export function Rating({ label, value, onChange, validation }: RatingProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    </div>
  );
}

