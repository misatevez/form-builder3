import React from 'react';
import { FormComponent, FormAction } from '../../types/form';
import { RenderComponent } from '../RenderComponent';

interface GridProps {
  component: FormComponent;
  data: { [key: string]: any };
  dispatch: React.Dispatch<FormAction>;
  sectionId: string;
}

export function Grid({ component, data, dispatch, sectionId }: GridProps) {
  const columns = component.layout?.columns || 1;

  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
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

