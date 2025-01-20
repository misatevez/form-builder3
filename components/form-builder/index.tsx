"use client"
import React, { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { FormBuilderHeader } from "./FormBuilderHeader"
import { FormBuilderContent } from "./FormBuilderContent"
import { ComponentPalette } from "../ComponentPalette"
import { PropertiesPanel } from "../PropertiesPanel"
import { FormProvider, useFormContext } from "../../context/FormContext"
import { api } from "../../services/api"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "../layout/Header"
import { Footer } from "../layout/Footer"
import { INITIAL_TEMPLATE } from "../../types/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LivePreview } from "../LivePreview"
import { FormTemplates } from "../FormTemplates"

function FormBuilderInner() {
  const { template, updateTemplate, moveComponentBetweenSections, setSelectedElementId, setActivePropertiesTab } =
    useFormContext()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("constructor")

  const handleSave = async () => {
    try {
      await api.saveForm(template, {})
      toast({
        title: "Form saved successfully",
        description: "Your form has been saved and can be accessed later.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error saving form:", error)
      toast({
        title: "Error saving form",
        description: "There was a problem saving your form. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const handleDragEnd = (result) => {
    // Implement drag and drop logic here
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex flex-col">
          <FormBuilderHeader
            title={template.name}
            onConfigClick={() => setSelectedElementId("form")}
            onSave={handleSave}
            setSelectedElementId={setSelectedElementId}
            setActivePropertiesTab={setActivePropertiesTab}
          />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
            <TabsList className="justify-start">
              <TabsTrigger value="constructor">Constructor</TabsTrigger>
              <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
            </TabsList>
            <div className="flex-grow flex overflow-hidden">
              <TabsContent value="constructor" className="flex-grow flex m-0">
                <aside className="w-64 bg-background border-r border-border overflow-y-auto">
                  <ComponentPalette />
                </aside>
                <div className="flex-1 overflow-hidden">
                  <FormBuilderContent sections={template.sections} />
                </div>
                <aside className="w-80 bg-background border-l border-border overflow-y-auto">
                  <PropertiesPanel />
                </aside>
              </TabsContent>
              <TabsContent value="preview" className="flex-grow m-0">
                <LivePreview />
              </TabsContent>
              <TabsContent value="templates" className="flex-grow m-0">
                <FormTemplates />
              </TabsContent>
            </div>
          </Tabs>
        </main>
        <Footer />
      </div>
      <Toaster />
    </DragDropContext>
  )
}

export function FormBuilder() {
  return (
    <FormProvider initialTemplate={INITIAL_TEMPLATE}>
      <FormBuilderInner />
    </FormProvider>
  )
}

