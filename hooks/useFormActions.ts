import { useCallback } from 'react';
import { FormComponent } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

export function useFormActions(dispatch: React.Dispatch<any>) {
  const addComponent = useCallback((type: string) => {
    const newComponent: FormComponent = {
      id: uuidv4(),
      type,
      label: `New ${type} Component`,
    };
    dispatch({ type: 'ADD_COMPONENT', payload: newComponent });
  }, [dispatch]);

  const removeComponent = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: id });
  }, [dispatch]);

  const updateComponent = useCallback((id: string, updates: Partial<FormComponent>) => {
    dispatch({ type: 'UPDATE_COMPONENT', payload: { id, updates } });
  }, [dispatch]);

  const moveComponent = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'MOVE_COMPONENT', payload: { fromIndex, toIndex } });
  }, [dispatch]);

  return {
    addComponent,
    removeComponent,
    updateComponent,
    moveComponent,
  };
}

