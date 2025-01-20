export type ComponentType =
  | "text"
  | "number"
  | "email"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "date"
  | "time"
  | "slider"
  | "progress"
  | "rating"
  | "color"
  | "richtext"
  | "autocomplete"
  | "signature"
  | "photo"
  | "dynamicTable"

export interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  custom?: (value: any) => boolean | string
}

export interface ConditionalRules {
  show?: { [key: string]: any }
  enable?: { [key: string]: any }
}

export interface StyleProps {
  className?: string
  style?: React.CSSProperties
}

export interface PermissionRules {
  read?: string[]
  write?: string[]
}

export interface TableColumn {
  id: string
  type: ComponentType
  label: string
  validation?: ValidationRules
}

export interface FormComponent {
  id: string
  type: ComponentType
  label: string
  validation?: ValidationRules
  conditional?: ConditionalRules
  style?: StyleProps
  permissions?: PermissionRules
  options?: string[]
  min?: number
  max?: number
  step?: number
  placeholder?: string
  columns?: TableColumn[]
}

export interface FormSection {
  id: string
  title: string
  description?: string
  components: FormComponent[]
}

export interface FormTemplate {
  id: string
  name: string
  sections: FormSection[]
  theme?: { [key: string]: string }
}

export interface FormData {
  [key: string]: any
}

export interface FormActions {
  onSubmit?: (data: FormData) => void
  onSave?: (data: FormData) => void
  customActions?: { [key: string]: (data: FormData) => void }
}

export interface FormPermissions {
  read?: string[]
  write?: string[]
  admin?: string[]
}

export const INITIAL_TEMPLATE: FormTemplate = {
  id: "initial-template",
  name: "Formulario sin título",
  sections: [
    {
      id: "default-section",
      title: "Sección predeterminada",
      description: "Esta es una sección predeterminada para comenzar tu formulario.",
      components: [
        {
          id: "default-text-component",
          type: "text",
          label: "Campo de texto predeterminado",
        },
      ],
    },
  ],
  theme: {},
}

