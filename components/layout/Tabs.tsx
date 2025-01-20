import React, { useState } from 'react';
import { FormComponent, FormAction } from '../../types/form';
import { RenderComponent } from '../RenderComponent';

interface TabsProps {
  component: FormComponent;
  data: { [key: string]: any };
  dispatch: React.Dispatch<FormAction>;
  sectionId: string;
}

export function Tabs({ component, data, dispatch, sectionId }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-4">
      <div className="flex border-b">
        {component.layout?.items?.map((item, index) => (
          <button
            key={item.id}
            className={`py-2 px-4 font-semibold focus:outline-none ${
              index === activeTab ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {component.layout?.items && (
          <RenderComponent
            component={component.layout.items[activeTab]}
            data={data}
            dispatch={dispatch}
            sectionId={sectionId}
          />
        )}
      </div>
    </div>
  );
}

