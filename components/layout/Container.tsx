import React from 'react';
import { FormComponent, FormAction } from '../../types/form';
import { RenderComponent } from '../RenderComponent';

interface ContainerProps {
  component: FormComponent;
  data: { [key: string]: any };
  dispatch: React.Dispatch<FormAction>;
  sectionId: string;
}

export function Container({ component, data, dispatch, sectionId }: ContainerProps) {
  return (
    <div className="border p-4 rounded-lg shadow mb-4">
      {component.label && <h4 className="text-lg font-semibold mb-2">{component.label}</h4>}
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
