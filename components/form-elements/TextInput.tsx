import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  validation?: { required?: boolean }
  placeholder?: string
  type?: string
  multiline?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  validation,
  placeholder,
  type = "text",
  multiline = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {validation?.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required={validation?.required}
        />
      ) : (
        <Input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={validation?.required}
        />
      )}
    </div>
  )
}

export default TextInput

