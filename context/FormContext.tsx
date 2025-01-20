import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useFormLogic } from "../hooks/useFormLogic"
import { type FormTemplate, type FormData, type FormComponent, type FormSection, INITIAL_TEMPLATE } from "../types/form"

interface FormContextType {
  template: FormTemplate
  data: FormData
  selectedElementId: string | null
  activeTab: "constructor" | "vista_previa" | "plantillas"
  updateTemplate: (updates: Partial<FormTemplate>) => void
  updateData: (updates: Partial<FormData>) => void
  addComponent: (component: FormComponent, sectionId: string) => void
  removeComponent: (sectionId: string, componentId: string) => void
  updateComponent: (sectionId: string, componentId: string, updates: Partial<FormComponent>) => void
  addSection: (section: FormSection) => void
  removeSection: (sectionId: string) => void
  updateSection: (sectionId: string, updates: Partial<FormSection>) => void
  setSelectedElementId: (id: string | null) => void
  updateFormProperties: (updates: Partial<FormTemplate>) => void
  moveComponentBetweenSections: (
    sourceSectionId: string,
    destinationSectionId: string,
    sourceIndex: number,
    destinationIndex: number,
  ) => void
  setActiveTab: (tab: "constructor" | "vista_previa" | "plantillas") => void
  isLoading: boolean
  activePropertiesTab: "element" | "form"
  setActivePropertiesTab: (tab: "element" | "form") => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

interface FormProviderProps {
  children: React.ReactNode
  initialTemplate?: FormTemplate
}

export function FormProvider({ children, initialTemplate = INITIAL_TEMPLATE }: FormProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const formLogic = useFormLogic(initialTemplate)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"constructor" | "vista_previa" | "plantillas">("constructor")
  const [activePropertiesTab, setActivePropertiesTab] = useState<"element" | "form">("element")

  useEffect(() => {
    console.log("FormContext - Initial template:", initialTemplate)
    if (!initialTemplate || !initialTemplate.sections) {
      console.error("FormContext - Invalid initial template:", initialTemplate)
      setIsLoading(false)
      return
    }
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [initialTemplate])

  useEffect(() => {
    console.log("FormContext - Current template:", formLogic.template)
  }, [formLogic.template])

  const updateFormProperties = (updates: Partial<FormTemplate>) => {
    formLogic.updateTemplate(updates)
  }

  const contextValue: FormContextType = {
    ...formLogic,
    selectedElementId,
    setSelectedElementId,
    updateFormProperties,
    isLoading,
    activeTab,
    setActiveTab,
    activePropertiesTab,
    setActivePropertiesTab,
  }

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

