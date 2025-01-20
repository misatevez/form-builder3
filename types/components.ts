// Tipos específicos para componentes
import { FormComponent, FormSection } from './form';

export interface ComponentPaletteProps {
  isDisabled?: boolean;
}

export interface SectionProps {
  section: FormSection;
  index: number;
}

export interface RenderComponentProps {
  component: FormComponent;
  index: number;
  id: string;
  sectionId: string;
}

export interface FormBuilderProps {
  initialTemplate?: FormTemplate;
}

export interface LivePreviewProps {
  isReadOnly?: boolean;
}

