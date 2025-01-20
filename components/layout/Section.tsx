import React from 'react';
import { FormComponent, FormAction } from '../../types/form';
import { RenderComponent } from '../RenderComponent';

interface SectionProps {
  component: FormComponent;
  data: { [key: string]: any };
  dispatch: React.Dispatch<FormAction>;
  sectionId: string;
}

export function Section({ component, data, dispatch, sectionId }: SectionProps) {
  return (
    <div className="border p-4 rounded-lg shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">{component.label}</h3>
      {component.layout?.items?.map(item => (
        <RenderComponent
          key={item.id}
          component={item}
          data={data}
          dispatch={dispatch}
          sectionId={sectionId}
        />
      ))}
    </div>
  );
}

