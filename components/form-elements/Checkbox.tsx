import React from "react"
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <ShadcnCheckbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
