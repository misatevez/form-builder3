// Tipos para el constructor de formularios
export type ComponentType = 
  | "text" 
  | "textarea" 
  | "select" 
  | "checkbox" 
  | "date" 
  | "time"
  | "dynamicTable" 
  | "photo" 
  | "signature"
  | "slider"
  | "number"
  | "email"
  | "phone"
  | "url"
  | "file"
  | "radio"
  | "autocomplete"
  | "toggle"
  | "rating"
  | "address"
  | "client"
  | "company"
  | "project";

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  [key: string]: any;
}

export interface TableColumn {
  id: string;
  type: string;
  label: string;
  validation: {
    required?: boolean;
    [key: string]: any;
  };
}

export interface FormComponent {
  id: string;
  type: ComponentType | string;
  label: string;
  placeholder?: string;
  validation: ValidationRules;
  options?: string[];
  columns?: TableColumn[];
  min?: number;
  max?: number;
  step?: number;
  fields?: string[];
  [key: string]: any;
}

export interface FormSection {
  id: string;
  title: string;
  components: FormComponent[];
}

export interface FormTemplate {
  id: string;
  name: string;
  theme?: Record<string, any>;
  sections: FormSection[];
}

export interface DragEndResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
  reason: 'DROP' | 'CANCEL';
} 