import React from 'react';
import { FormComponent } from '../../types/form';
import { Star } from 'lucide-react';

interface RatingProps extends FormComponent {
  value: number;
  onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ id, label, value, onChange, validation, max = 5 }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex">
        {[...Array(max)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={starValue}
              className={`w-6 h-6 cursor-pointer ${
                starValue <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              onClick={() => onChange(starValue)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
