import React, { useState } from 'react';
import { FormComponent, FormAction } from '../../types/form';
import { RenderComponent } from '../RenderComponent';

interface AccordionProps {
  component: FormComponent;
  data: { [key: string]: any };
  dispatch: React.Dispatch<FormAction>;
  sectionId: string;
}

export function Accordion({ component, data, dispatch, sectionId }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mb-4">
      {component.layout?.items?.map((item, index) => (
        <div key={item.id} className="border rounded-lg mb-2">
          <button
            className="w-full text-left p-4 font-semibold focus:outline-none"
            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
          >
            {item.label}
          </button>
          {index === openIndex && (
            <div className="p-4 border-t">
              <RenderComponent
                component={item}
                data={data}
                dispatch={dispatch}
                sectionId={sectionId}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
