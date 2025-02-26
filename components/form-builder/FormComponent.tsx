"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, Settings, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormComponent as FormComponentType } from "./types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface FormComponentProps {
  component: FormComponentType;
  index: number;
  sectionId: string;
  updateComponent: (sectionId: string, componentId: string, updates: Partial<FormComponentType>) => void;
  removeComponent: (sectionId: string, componentId: string) => void;
}

export function FormComponent({ 
  component, 
  index, 
  sectionId, 
  updateComponent, 
  removeComponent 
}: FormComponentProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [componentSettings, setComponentSettings] = useState({ ...component })

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: component.id,
    data: {
      type: "component",
      component,
      sectionId
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const handleSettingsChange = (field: string, value: any) => {
    setComponentSettings({
      ...componentSettings,
      [field]: value,
    })
  }

  const handleValidationChange = (field: string, value: any) => {
    setComponentSettings({
      ...componentSettings,
      validation: {
        ...componentSettings.validation,
        [field]: value,
      },
    })
  }

  const saveSettings = () => {
    updateComponent(sectionId, component.id, componentSettings)
    setIsSettingsOpen(false)
  }

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "text":
        return "Aa"
      case "textarea":
        return "¶"
      case "select":
        return "▼"
      case "checkbox":
        return "☑"
      case "radio":
        return "◉"
      case "date":
        return "📅"
      case "time":
        return "🕒"
      case "dynamicTable":
        return "🗃️"
      case "photo":
        return "📷"
      case "signature":
        return "✍️"
      case "slider":
        return "⟷"
      case "number":
        return "#"
      case "email":
        return "✉️"
      case "phone":
        return "📞"
      case "url":
        return "🔗"
      case "file":
        return "📎"
      case "toggle":
        return "⇄"
      case "rating":
        return "★"
      case "autocomplete":
        return "🔍"
      case "address":
        return "📍"
      case "client":
        return "👤"
      case "company":
        return "🏢"
      case "project":
        return "📋"
      default:
        return "⬚"
    }
  }

  const getComponentLabel = (type: string) => {
    switch (type) {
      case "text":
        return "Campo de texto"
      case "textarea":
        return "Área de texto"
      case "select":
        return "Selector"
      case "checkbox":
        return "Casilla de verificación"
      case "radio":
        return "Botones de radio"
      case "date":
        return "Fecha"
      case "time":
        return "Hora"
      case "dynamicTable":
        return "Tabla dinámica"
      case "photo":
        return "Foto"
      case "signature":
        return "Firma"
      case "slider":
        return "Deslizador"
      case "number":
        return "Número"
      case "email":
        return "Correo electrónico"
      case "phone":
        return "Teléfono"
      case "url":
        return "URL"
      case "file":
        return "Archivo"
      case "toggle":
        return "Interruptor"
      case "rating":
        return "Valoración"
      case "autocomplete":
        return "Autocompletar"
      case "address":
        return "Dirección"
      case "client":
        return "Cliente"
      case "company":
        return "Empresa"
      case "project":
        return "Proyecto"
      default:
        return type
    }
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`border rounded-md p-3 bg-card ${isDragging ? "opacity-50" : ""}`}
        {...attributes}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div {...listeners} className="cursor-grab">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-medium">{component.label}</div>
              <div className="text-sm text-muted-foreground">
                {getComponentLabel(component.type)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeComponent(sectionId, component.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configuración del componente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tipo</Label>
              <div className="col-span-3">
                <div className="text-sm font-medium">
                  {getComponentLabel(component.type)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Etiqueta
              </Label>
              <div className="col-span-3">
                <Input
                  id="label"
                  value={componentSettings.label}
                  onChange={(e) => handleSettingsChange("label", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="placeholder" className="text-right">
                Placeholder
              </Label>
              <div className="col-span-3">
                <Input
                  id="placeholder"
                  value={componentSettings.placeholder || ""}
                  onChange={(e) => handleSettingsChange("placeholder", e.target.value)}
                />
              </div>
            </div>
            
            {component.type === "select" && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Opciones</Label>
                <div className="col-span-3 space-y-3">
                  {componentSettings.options?.map((option, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(componentSettings.options || [])]
                          newOptions[i] = e.target.value
                          handleSettingsChange("options", newOptions)
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newOptions = componentSettings.options?.filter((_, index) => index !== i)
                          handleSettingsChange("options", newOptions)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newOptions = [...(componentSettings.options || []), "Nueva opción"]
                      handleSettingsChange("options", newOptions)
                    }}
                  >
                    Añadir opción
                  </Button>
                </div>
              </div>
            )}
            
            {component.type === "dynamicTable" && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Columnas</Label>
                <div className="col-span-3 space-y-3">
                  {componentSettings.columns?.map((column, i) => (
                    <div key={i} className="border p-3 rounded-md">
                      <div className="flex justify-end mb-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newColumns = componentSettings.columns?.filter((_, index) => index !== i)
                            handleSettingsChange("columns", newColumns)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`column-label-${i}`}>Etiqueta</Label>
                        <Input
                          id={`column-label-${i}`}
                          value={column.label}
                          onChange={(e) => {
                            const newColumns = [...(componentSettings.columns || [])]
                            newColumns[i] = { ...newColumns[i], label: e.target.value }
                            handleSettingsChange("columns", newColumns)
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Checkbox
                          id={`column-required-${i}`}
                          checked={column.validation?.required || false}
                          onCheckedChange={(checked) => {
                            const newColumns = [...(componentSettings.columns || [])]
                            newColumns[i] = { 
                              ...newColumns[i], 
                              validation: { 
                                ...newColumns[i].validation,
                                required: checked === true
                              } 
                            }
                            handleSettingsChange("columns", newColumns)
                          }}
                        />
                        <Label htmlFor={`column-required-${i}`}>Requerido</Label>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newColumns = [
                        ...(componentSettings.columns || []),
                        {
                          id: Math.random().toString(36).substring(2, 9),
                          type: "text",
                          label: "Nueva columna",
                          validation: { required: false }
                        }
                      ]
                      handleSettingsChange("columns", newColumns)
                    }}
                  >
                    Añadir columna
                  </Button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Validación</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="required"
                    checked={componentSettings.validation?.required || false}
                    onCheckedChange={(checked) => handleValidationChange("required", checked)}
                  />
                  <Label htmlFor="required">Requerido</Label>
                </div>
                
                {(component.type === "text" || component.type === "textarea") && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="minLength">Longitud mínima</Label>
                        <Input
                          id="minLength"
                          type="number"
                          value={componentSettings.validation?.minLength || ""}
                          onChange={(e) => handleValidationChange("minLength", parseInt(e.target.value) || "")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxLength">Longitud máxima</Label>
                        <Input
                          id="maxLength"
                          type="number"
                          value={componentSettings.validation?.maxLength || ""}
                          onChange={(e) => handleValidationChange("maxLength", parseInt(e.target.value) || "")}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="pattern">Patrón (regex)</Label>
                      <Input
                        id="pattern"
                        value={componentSettings.validation?.pattern || ""}
                        onChange={(e) => handleValidationChange("pattern", e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                {component.type === "photo" && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="min">Mínimo de fotos</Label>
                        <Input
                          id="min"
                          type="number"
                          value={componentSettings.validation?.min || ""}
                          onChange={(e) => handleValidationChange("min", parseInt(e.target.value) || "")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="max">Máximo de fotos</Label>
                        <Input
                          id="max"
                          type="number"
                          value={componentSettings.validation?.max || ""}
                          onChange={(e) => handleValidationChange("max", parseInt(e.target.value) || "")}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveSettings}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 