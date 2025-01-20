"use client"

import React, { useCallback, useState, useEffect } from "react"
import { DragDropContext, Droppable, type DropResult } from "react-beautiful-dnd"
import { FormProvider, useFormContext } from "../context/FormContext"
import { ComponentPalette } from "./ComponentPalette"
import { Section } from "./Section"
import { LivePreview } from "./LivePreview"
import { AddSectionButton } from "./AddSectionButton"
import { v4 as uuidv4 } from "uuid"
import { type FormComponent, type FormSection, type ComponentType, INITIAL_TEMPLATE } from "../types/form"
import { useAutoSave } from "../hooks/useAutoSave"
import { ComponentProperties } from "./ComponentProperties"
import { FormProperties } from "./FormProperties"
import { JsonResultModal } from "./JsonResultModal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Settings, FileJson } from "lucide-react"
import "../styles/globals.css"
import { FormTemplates } from "./FormTemplates"
import { saveFormToSupabase } from "../utils/formUtils"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

function isUUID(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

function FormBuilderContent() {
  const {
    template,
    data,
    isLoading,
    addComponent,
    updateTemplate,
    moveComponentBetweenSections,
    selectedElementId,
    setSelectedElementId,
    activeTab,
    setActiveTab,
  } = useFormContext()
  const { toast } = useToast()
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false)

  useAutoSave(template, data)

  useEffect(() => {
    console.log("FormBuilder - Current template:", template)
    console.log("FormBuilder - Current data:", data)
  }, [template, data])

  const handleAddComponent = useCallback(
    (type: ComponentType, sectionId: string) => {
      console.log("handleAddComponent called", { type, sectionId })
      const newComponent: FormComponent = {
        id: uuidv4(),
        type,
        label: `Nuevo Componente ${type}`,
      }
      console.log("New component created", newComponent)
      addComponent(newComponent, sectionId)
      console.log("addComponent called with", { newComponent, sectionId })
    },
    [addComponent],
  )

  const handleFormConfigClick = useCallback(() => {
    setSelectedElementId("form")
  }, [setSelectedElementId])

  const handleShowJsonResult = useCallback(() => {
    setIsJsonModalOpen(true)
  }, [])

  const handleCloseJsonModal = useCallback(() => {
    setIsJsonModalOpen(false)
  }, [])

  const handleSaveForm = useCallback(async () => {
    try {
      const formToSave = { ...template }
      if (!formToSave.id || typeof formToSave.id !== "string" || !isUUID(formToSave.id)) {
        formToSave.id = uuidv4()
      }
      if (!formToSave.name) {
        formToSave.name = "Formulario sin título"
      }
      await saveFormToSupabase(formToSave)
      toast({
        title: "Formulario guardado",
        description: "Tu formulario ha sido guardado exitosamente en Supabase.",
      })
    } catch (error) {
      console.error("Error al guardar el formulario:", error)
      toast({
        title: "Error al guardar",
        description: "Hubo un problema al guardar tu formulario. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    }
  }, [template, toast])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId, type } = result

      console.log("onDragEnd - Start", { source, destination, draggableId, type })

      if (!destination) {
        console.error("Error en onDragEnd: No hay destino válido")
        return
      }

      if (!["section", "component"].includes(type)) {
        console.error(`Error en onDragEnd: Tipo de arrastre no reconocido: ${type}`)
        return
      }

      if (type === "component" && source.droppableId === "componentPalette" && !destination.droppableId) {
        console.error("Error en onDragEnd: Intento de soltar un componente de la paleta en un destino no válido")
        return
      }

      try {
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
          console.log("onDragEnd - Dropped in same position, no action needed")
          return
        }

        if (type === "section") {
          console.log("onDragEnd - Handling section drag")
          const newSections = Array.from(template.sections)
          const [reorderedSection] = newSections.splice(source.index, 1)
          newSections.splice(destination.index, 0, reorderedSection)
          updateTemplate({ ...template, sections: newSections })
          console.log("onDragEnd - Sections reordered", { newSections })
        } else if (type === "component") {
          console.log("onDragEnd - Handling component drag", {
            fromPalette: source.droppableId === "componentPalette",
            sourceSectionId: source.droppableId,
            destinationSectionId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })

          if (source.droppableId === "componentPalette") {
            console.log("onDragEnd - Attempting to add new component from palette")
            const componentType = draggableId.split("-")[1] as ComponentType
            console.log("onDragEnd - New component type:", componentType)
            console.log("onDragEnd - Destination section ID:", destination.droppableId)
            handleAddComponent(componentType, destination.droppableId)
            console.log("onDragEnd - handleAddComponent called")
          } else if (source.droppableId !== destination.droppableId) {
            console.log("onDragEnd - Moving component between sections")
            moveComponentBetweenSections(source.droppableId, destination.droppableId, source.index, destination.index)
          } else {
            console.log("onDragEnd - Reordering component within section")
            const sectionId = source.droppableId
            moveComponentBetweenSections(sectionId, sectionId, source.index, destination.index)
          }
        }

        console.log("onDragEnd - Finished", { updatedTemplate: template })
      } catch (error) {
        console.error("Error inesperado en onDragEnd:", error)
      }
    },
    [template, updateTemplate, handleAddComponent, moveComponentBetweenSections],
  )

  if (isLoading) {
    return <div className="notion-text">Cargando...</div>
  }

  if (!template || !template.sections) {
    return <div className="notion-text">Error: No se pudo cargar la plantilla del formulario.</div>
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-[calc(100vh-theme(spacing.16))] bg-gray-100">
        {/* Left Column: Component Palette and Form Actions */}
        <div className="w-1/6 p-4 bg-white notion-like">
          <ScrollArea className="h-full">
            <ComponentPalette />
            <Separator className="my-4 notion-divider" />
            <div className="space-y-2">
              <AddSectionButton />
              <button
                onClick={handleSaveForm}
                className="w-full p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
              >
                Guardar Formulario
              </button>
            </div>
            <Separator className="my-4 notion-divider" />
          </ScrollArea>
        </div>

        {/* Middle Column: Form Builder, Preview, and Templates */}
        <div className="w-2/3 border-l border-r border-gray-200 bg-white">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "constructor" | "vista_previa" | "plantillas")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="constructor" className="w-1/3 notion-button">
                Constructor de Formularios
              </TabsTrigger>
              <TabsTrigger value="vista_previa" className="w-1/3 notion-button">
                Vista Previa
              </TabsTrigger>
              <TabsTrigger value="plantillas" className="w-1/3 notion-button">
                Plantillas de Formulario
              </TabsTrigger>
            </TabsList>
            <TabsContent value="constructor" className="h-[calc(100vh-40px)]">
              <ScrollArea className="h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-2xl font-bold">{template.name || "Formulario sin título"}</h2>
                  <button
                    onClick={handleFormConfigClick}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    aria-label="Configurar formulario"
                  >
                    <Settings size={20} />
                  </button>
                </div>
                <Droppable droppableId="form-sections" type="section">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-4 ${snapshot.isDraggingOver ? "bg-blue-100" : ""}`}
                    >
                      {template.sections && template.sections.length > 0 ? (
                        template.sections.map((section: FormSection, index: number) => (
                          <Section key={section.id} section={section} index={index} />
                        ))
                      ) : (
                        <div className="text-center py-4 notion-text">
                          No hay secciones disponibles. Utiliza el botón "Añadir Nueva Sección" para comenzar a
                          construir tu formulario.
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="vista_previa" className="h-[calc(100vh-40px)]">
              <ScrollArea className="h-full">
                <div className="flex justify-end p-4">
                  <button
                    onClick={handleShowJsonResult}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                    aria-label="Ver resultado JSON"
                  >
                    <FileJson size={20} className="mr-2" />
                    Ver resultado JSON
                  </button>
                </div>
                <LivePreview />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="plantillas" className="h-[calc(100vh-40px)]">
              <ScrollArea className="h-full">
                <FormTemplates />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Properties Panel */}
        <div className="w-1/6 p-4 bg-white notion-like">
          <ScrollArea className="h-full">
            <Tabs value={selectedElementId === "form" ? "form" : "element"}>
              <TabsList>
                <TabsTrigger value="element" className="notion-button">
                  Elemento
                </TabsTrigger>
                <TabsTrigger value="form" className="notion-button">
                  Formulario
                </TabsTrigger>
              </TabsList>
              <TabsContent value="element">
                <ComponentProperties />
              </TabsContent>
              <TabsContent value="form">
                <FormProperties />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </div>
      <JsonResultModal isOpen={isJsonModalOpen} onClose={handleCloseJsonModal} />
      <Toaster />
    </DragDropContext>
  )
}

export function FormBuilder() {
  return (
    <FormProvider initialTemplate={INITIAL_TEMPLATE}>
      <FormBuilderContent />
    </FormProvider>
  )
}

