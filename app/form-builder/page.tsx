"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/ui/use-toast"
import { FormSection } from "@/components/form-builder/FormSection"
import { ComponentPalette } from "@/components/form-builder/ComponentPalette"
import { FormPreview } from "@/components/form-builder/FormPreview"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormComponent, FormSection as FormSectionType, FormTemplate } from "@/components/form-builder/types"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { TemplateSelector } from "@/components/form-builder/TemplateSelector"

export default function FormBuilderPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("editor")
  const [formName, setFormName] = useState("Nuevo Formulario")
  const [formId, setFormId] = useState<string | null>(null)
  const [sections, setSections] = useState<FormSectionType[]>([
    {
      id: uuidv4(),
      title: "Nueva Sección",
      components: []
    }
  ])
  const [activeSection, setActiveSection] = useState<string | null>(sections[0]?.id || null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [templates, setTemplates] = useState<FormTemplate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Cargar plantillas al iniciar
  useEffect(() => {
    fetchTemplates()
  }, [])
  
  // Función para cargar plantillas
  const fetchTemplates = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) throw error
      
      setTemplates(data || [])
    } catch (error) {
      console.error('Error al cargar plantillas:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las plantillas",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para cargar una plantilla
  const loadTemplate = (template: FormTemplate) => {
    setFormId(template.id)
    setFormName(template.name)
    
    // Asegurarse de que estamos usando la estructura correcta
    const sections = template.sections || (template.data?.sections || [])
    setSections(sections)
    setActiveSection(sections[0]?.id || null)
    setActiveTab("editor")
    
    toast({
      title: "Plantilla cargada",
      description: `Se ha cargado la plantilla "${template.name}"`,
    })
  }
  
  // Función para guardar el formulario
  const saveForm = async () => {
    setIsLoading(true)
    
    const formData = {
      name: formName,
      data: {
        id: formId || uuidv4(),
        name: formName,
        theme: {},
        sections: sections
      }
    }
    
    try {
      let response
      
      if (formId) {
        // Actualizar formulario existente
        response = await supabase
          .from('forms')
          .update(formData)
          .eq('id', formId)
      } else {
        // Crear nuevo formulario
        response = await supabase
          .from('forms')
          .insert([formData])
          .select()
      }
      
      if (response.error) throw response.error
      
      if (!formId && response.data?.[0]?.id) {
        setFormId(response.data[0].id)
      }
      
      toast({
        title: "Guardado exitoso",
        description: "El formulario se ha guardado correctamente",
      })
      
      // Actualizar la lista de plantillas
      fetchTemplates()
    } catch (error) {
      console.error('Error al guardar:', error)
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar el formulario",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para crear un nuevo formulario
  const createNewForm = () => {
    setFormId(null)
    setFormName("Nuevo Formulario")
    setSections([
      {
        id: uuidv4(),
        title: "Nueva Sección",
        components: []
      }
    ])
    setActiveSection(null)
    setActiveTab("editor")
  }
  
  // Configurar sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) return
    
    // Si estamos arrastrando secciones
    if (active.data.current?.type === "section" && over.data.current?.type === "section") {
      if (active.id !== over.id) {
        setSections((sections) => {
          const oldIndex = sections.findIndex((section) => section.id === active.id)
          const newIndex = sections.findIndex((section) => section.id === over.id)
          
          return arrayMove(sections, oldIndex, newIndex)
        })
      }
    }
    
    setActiveId(null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    
    if (!over) return
    
    // Si estamos arrastrando un componente sobre una sección
    if (active.data.current?.type === "component" && over.data.current?.type === "section") {
      // Mover el componente a la sección
      const componentId = active.id as string
      const sourceSection = sections.find(section => 
        section.components.some(component => component.id === componentId)
      )
      const destinationSection = sections.find(section => section.id === over.id)
      
      if (sourceSection && destinationSection && sourceSection.id !== destinationSection.id) {
        const component = sourceSection.components.find(c => c.id === componentId)
        
        if (component) {
          setSections(sections.map(section => {
            if (section.id === sourceSection.id) {
              return {
                ...section,
                components: section.components.filter(c => c.id !== componentId)
              }
            }
            if (section.id === destinationSection.id) {
              return {
                ...section,
                components: [...section.components, component]
              }
            }
            return section
          }))
        }
      }
    }
  }

  const addSection = () => {
    const newSection: FormSectionType = {
      id: uuidv4(),
      title: "Nueva Sección",
      components: []
    }
    
    setSections([...sections, newSection])
    setActiveSection(newSection.id)
  }

  const updateSection = (sectionId: string, updates: Partial<FormSectionType>) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ))
  }

  const removeSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId))
    if (activeSection === sectionId) {
      setActiveSection(sections[0]?.id || null)
    }
  }

  const updateComponent = (sectionId: string, componentId: string, updates: Partial<FormComponent>) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          components: section.components.map(component => 
            component.id === componentId ? { ...component, ...updates } : component
          )
        }
      }
      return section
    }))
  }

  const removeComponent = (sectionId: string, componentId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          components: section.components.filter(component => component.id !== componentId)
        }
      }
      return section
    }))
  }

  // Función para añadir un componente haciendo clic
  const handleAddComponent = (newComponent: FormComponent) => {
    if (!activeSection) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una sección primero",
        variant: "destructive"
      })
      return
    }
    
    setSections(sections.map(section => {
      if (section.id === activeSection) {
        return {
          ...section,
          components: [...section.components, newComponent]
        }
      }
      return section
    }))
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Constructor de Formularios</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={createNewForm}>
              Nuevo
            </Button>
            <Button onClick={saveForm} disabled={isLoading}>
              {isLoading ? "Guardando..." : formId ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="form-name">Nombre del Formulario</Label>
              <Input 
                id="form-name" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)} 
                placeholder="Ingrese el nombre del formulario" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Vista Previa</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <TemplateSelector 
            templates={templates} 
            isLoading={isLoading} 
            onSelect={loadTemplate} 
            onRefresh={fetchTemplates}
          />
        </TabsContent>
        
        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ComponentPalette onAddComponent={handleAddComponent} />
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Sección activa para añadir componentes:
                </p>
                <Select 
                  value={activeSection || ""} 
                  onValueChange={setActiveSection}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una sección" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map(section => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Estructura del Formulario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SortableContext
                      items={sections.map(section => section.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {sections.map((section, index) => (
                          <FormSection
                            key={section.id}
                            section={section}
                            index={index}
                            updateSection={updateSection}
                            removeSection={removeSection}
                            updateComponent={updateComponent}
                            removeComponent={removeComponent}
                            isActive={section.id === activeSection}
                            onActivate={() => setActiveSection(section.id)}
                            isDragging={activeId === section.id}
                          />
                        ))}
                      </div>
                    </SortableContext>
                    
                    <Button 
                      onClick={addSection} 
                      variant="outline" 
                      className="mt-4 w-full"
                    >
                      Añadir Sección
                    </Button>
                  </CardContent>
                </Card>
              </DndContext>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <FormPreview 
            formName={formName}
            sections={sections}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
