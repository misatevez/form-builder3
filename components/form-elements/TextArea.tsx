import type React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { FormComponent } from "../../types/form"

interface TextAreaProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const TextArea: React.FC<TextAreaProps> = ({ id, label, value, onChange, placeholder, validation }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1"
      />
    </div>
  )
}

export default TextArea

