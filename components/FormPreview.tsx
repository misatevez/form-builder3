import React from 'react';
import { useFormContext } from '../context/FormContext';
import { FormComponent } from '../types/form';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TextInput from './form-elements/TextInput';
// Import other form elements as needed

const ComponentWrapper = React.memo(({ component, index }: { component: FormComponent; index: number }) => {
  const { removeComponent, updateComponent } = useFormContext();

  const handleRemove = () => {
    removeComponent(component.id);
  };

  const handleUpdate = (updates: Partial<FormComponent>) => {
    updateComponent(component.id, updates);
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'text':
        return <TextInput {...component} onChange={handleUpdate} />;
      // Add cases for other component types
      default:
        return null;
    }
  };

  return (
    <Draggable draggableId={component.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4 p-4 border rounded shadow-sm bg-white"
        >
          {renderComponent()}
          <button onClick={handleRemove} className="mt-2 px-2 py-1 bg-red-500 text-white rounded text-sm">Remove</button>
        </div>
      )}
    </Draggable>
  );
});

export const FormPreview = React.memo(() => {
  const { template } = useFormContext();

  return (
    <div className="space-y-8 border p-4 rounded-lg shadow bg-gray-50">
      <h2 className="text-2xl font-bold">{template.name || 'Untitled Form'}</h2>
      <Droppable droppableId="form-components">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {template.components.map((component, index) => (
              <ComponentWrapper key={component.id} component={component} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});

