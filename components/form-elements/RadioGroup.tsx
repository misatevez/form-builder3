import type React from "react"
import type { FormComponent } from "../../types/form"
import { Label } from "@/components/ui/label"
import { RadioGroup as RadioGroupPrimitive, RadioGroupItem } from "@/components/ui/radio-group"

interface RadioGroupProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({ id, label, value, onChange, validation, options = [] }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 ">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <RadioGroupPrimitive value={value} onValueChange={onChange} className="space-y-2 mt-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${id}-${option}`} />
            <Label htmlFor={`${id}-${option}`} className="text-sm text-gray-900">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroupPrimitive>
    </div>
  )
}

export default RadioGroup

