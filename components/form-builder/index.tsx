"use client"
import React, { useState, useCallback } from "react"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import { FormBuilderHeader } from "./FormBuilderHeader"
import { FormBuilderContent } from "./FormBuilderContent"
import { ComponentPalette } from "../ComponentPalette"
import { PropertiesPanel } from "../PropertiesPanel"
import { FormProvider, useFormContext } from "../../context/FormContext"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "../layout/Header"
import { Footer } from "../layout/Footer"
import { INITIAL_TEMPLATE } from "../../types/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LivePreview } from "../LivePreview"
import { FormTemplates } from "../FormTemplates"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function FormBuilderInner() {
  const { template, updateTemplate, moveComponentBetweenSections, setSelectedElementId, setActivePropertiesTab } =
    useFormContext()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("constructor")

  const handleSave = useCallback(async () => {
    console.log("Iniciando guardado del formulario:", template)
    try {
      let result

      const formData = {
        name: template.name,
        version: 1,
        is_draft: true,
        data: template,
      }

      // Siempre creamos un nuevo registro
      result = await supabase
        .from("forms")
        .insert({
          ...formData,
        })
        .select()

      const { data, error } = result

      if (error) throw error

      console.log("Formulario guardado exitosamente:", data)
      if (data && data[0]) {
        // Actualizamos el template con los datos devueltos por Supabase
        updateTemplate({
          ...template,
          id: data[0].id, // Actualizamos con el ID generado por Supabase
        })
      }

      toast({
        title: "Formulario guardado exitosamente",
        description: "Tu formulario ha sido guardado y puede ser accedido más tarde.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error al guardar el formulario:", error)
      toast({
        title: "Error al guardar el formulario",
        description: "Hubo un problema al guardar tu formulario. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }, [template, updateTemplate, toast])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId, type } = result

      if (!destination) {
        return
      }

      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return
      }

      if (type === "section") {
        const newSections = Array.from(template.sections)
        const [reorderedSection] = newSections.splice(source.index, 1)
        newSections.splice(destination.index, 0, reorderedSection)

        updateTemplate({
          ...template,
          sections: newSections,
        })
      } else if (type === "component") {
        moveComponentBetweenSections(source.droppableId, destination.droppableId, source.index, destination.index)
      }
    },
    [template, updateTemplate, moveComponentBetweenSections],
  )

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
            <TabsList className="justify-start px-4 border-b">
              <TabsTrigger value="constructor">Constructor</TabsTrigger>
              <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
            </TabsList>
            <div className="flex-grow flex overflow-hidden">
              <TabsContent value="constructor" className="flex-grow flex m-0 p-0">
                <aside className="w-64 bg-background border-r border-border">
                  <ScrollArea className="h-[calc(100vh-theme(spacing.16))]">
                    <ComponentPalette />
                  </ScrollArea>
                </aside>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[calc(100vh-theme(spacing.16))]">
                    <FormBuilderContent sections={template.sections} />
                  </ScrollArea>
                </div>
                <aside className="w-80 bg-background border-l border-border">
                  <ScrollArea className="h-[calc(100vh-theme(spacing.16))]">
                    <PropertiesPanel />
                  </ScrollArea>
                </aside>
              </TabsContent>
              <TabsContent value="preview" className="flex-grow m-0 p-4">
                <ScrollArea className="h-[calc(100vh-theme(spacing.16))]">
                  <LivePreview />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="templates" className="flex-grow m-0 p-4">
                <ScrollArea className="h-[calc(100vh-theme(spacing.16))]">
                  <FormTemplates />
                </ScrollArea>
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

