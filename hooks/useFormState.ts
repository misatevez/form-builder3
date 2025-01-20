import { useReducer } from 'react';
import { FormTemplate, FormData, FormComponent } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

export interface FormState {
  template: FormTemplate;
  data: FormData;
  ui: {
    selectedComponentId: string | null;
    isDragging: boolean;
  };
}

type FormAction =
  | { type: 'UPDATE_TEMPLATE'; payload: Partial<FormTemplate> }
  | { type: 'UPDATE_DATA'; payload: Partial<FormData> }
  | { type: 'SELECT_COMPONENT'; payload: string }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'ADD_COMPONENT'; payload: FormComponent }
  | { type: 'REMOVE_COMPONENT'; payload: string }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<FormComponent> } }
  | { type: 'MOVE_COMPONENT'; payload: { fromIndex: number; toIndex: number } };

const initialState: FormState = {
  template: {
    id: uuidv4(),
    name: 'New Form',
    components: [],
    theme: {}
  },
  data: {},
  ui: {
    selectedComponentId: null,
    isDragging: false,
  },
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_TEMPLATE':
      return { ...state, template: { ...state.template, ...action.payload } };
    case 'UPDATE_DATA':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SELECT_COMPONENT':
      return { ...state, ui: { ...state.ui, selectedComponentId: action.payload } };
    case 'SET_DRAGGING':
      return { ...state, ui: { ...state.ui, isDragging: action.payload } };
    case 'ADD_COMPONENT':
      return {
        ...state,
        template: {
          ...state.template,
          components: [...state.template.components, action.payload]
        }
      };
    case 'REMOVE_COMPONENT':
      return {
        ...state,
        template: {
          ...state.template,
          components: state.template.components.filter(c => c.id !== action.payload)
        }
      };
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        template: {
          ...state.template,
          components: state.template.components.map(c =>
            c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
          )
        }
      };
    case 'MOVE_COMPONENT':
      const { fromIndex, toIndex } = action.payload;
      const newComponents = [...state.template.components];
      const [movedComponent] = newComponents.splice(fromIndex, 1);
      newComponents.splice(toIndex, 0, movedComponent);
      return {
        ...state,
        template: {
          ...state.template,
          components: newComponents
        }
      };
    default:
      return state;
  }
}

export function useFormState(): [FormState, React.Dispatch<FormAction>] {
  return useReducer(formReducer, initialState);
}
