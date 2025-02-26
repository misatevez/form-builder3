import React, { createContext, useContext } from "react"
import { useFormLogic } from "../hooks/useFormLogic"
import type { FormTemplate, FormData, FormComponent, FormSection } from "../types/form"

interface FormContextType {
  template: FormTemplate
  data: FormData
  selectedElementId: string | null
  activePropertiesTab: "form" | "element"
  updateTemplate: (updates: Partial<FormTemplate>) => void
  updateData: (updates: Partial<FormData>) => void
  addComponent: (component: FormComponent, sectionId: string) => void
  removeComponent: (sectionId: string, componentId: string) => void
  updateComponent: (sectionId: string, componentId: string, updates: Partial<FormComponent>) => void
  addSection: (section: FormSection) => void
  removeSection: (sectionId: string) => void
  updateSection: (sectionId: string, updates: Partial<FormSection>) => void
  moveComponentBetweenSections: (
    sourceSectionId: string,
    destinationSectionId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void
  setSelectedElementId: (id: string | null) => void
  setActivePropertiesTab: (tab: "form" | "element") => void
  setActiveTab?: (tab: string) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({
  children,
  initialTemplate,
}: {
  children: React.ReactNode
  initialTemplate: FormTemplate
}) {
  const formLogic = useFormLogic(initialTemplate)

  return <FormContext.Provider value={formLogic}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
