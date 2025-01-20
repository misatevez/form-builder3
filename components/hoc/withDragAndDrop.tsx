import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export interface DraggableItemProps {
  id: string;
  index: number;
}

export function withDragAndDrop<P extends DraggableItemProps>(WrappedComponent: React.ComponentType<P>) {
  return function DraggableComponent(props: P) {
    const { id, index } = props;

    return (
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <WrappedComponent {...props} />
          </div>
        )}
      </Draggable>
    );
  };
}

