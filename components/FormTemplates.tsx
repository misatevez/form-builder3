import React from "react"
import { useFormContext } from "../context/FormContext"
import type { FormTemplate } from "../types/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { templateExamples } from "./templates"

export function FormTemplates() {
  const { updateTemplate, setActiveTab } = useFormContext()

  const handleTemplateSelect = (template: FormTemplate) => {
    updateTemplate(template)
    setActiveTab("constructor")
  }

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Form Templates</h2>
      {templateExamples.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              {template.sections.length} section(s),{" "}
              {template.sections.reduce((acc, section) => acc + section.components.length, 0)} component(s)
            </p>
            <Button onClick={() => handleTemplateSelect(template)} className="w-full">
              Load Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

