import React from 'react';
import { FormComponent } from '../../types/form';

interface SeparatorProps {
  component: FormComponent;
}

export function Separator({ component }: SeparatorProps) {
  return (
    <div className="my-4">
      <hr className="border-t border-gray-300" />
      {component.label && (
        <div className="text-center -mt-3">
          <span className="bg-white px-2 text-sm text-gray-500">{component.label}</span>
        </div>
      )}
    </div>
  );
}
