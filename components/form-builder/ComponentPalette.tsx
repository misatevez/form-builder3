"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"
import { 
  TextIcon, 
  AlignLeft, 
  ListFilter, 
  CheckSquare, 
  Calendar, 
  Table2, 
  Camera, 
  PenTool,
  Sliders,
  Hash,
  Mail,
  Phone,
  Link,
  FileText,
  Radio,
  Search,
  MapPin,
  Clock,
  FileUp,
  ToggleLeft,
  Star,
  Users,
  Building,
  Briefcase
} from "lucide-react"

const componentTypes = [
  { id: "text", label: "Campo de texto", icon: TextIcon },
  { id: "textarea", label: "Área de texto", icon: AlignLeft },
  { id: "select", label: "Selector", icon: ListFilter },
  { id: "checkbox", label: "Casilla de verificación", icon: CheckSquare },
  { id: "radio", label: "Botones de radio", icon: Radio },
  { id: "date", label: "Fecha", icon: Calendar },
  { id: "time", label: "Hora", icon: Clock },
  { id: "number", label: "Número", icon: Hash },
  { id: "email", label: "Correo electrónico", icon: Mail },
  { id: "phone", label: "Teléfono", icon: Phone },
  { id: "url", label: "URL", icon: Link },
  { id: "file", label: "Archivo", icon: FileUp },
  { id: "dynamicTable", label: "Tabla dinámica", icon: Table2 },
  { id: "photo", label: "Foto", icon: Camera },
  { id: "signature", label: "Firma", icon: PenTool },
  { id: "slider", label: "Deslizador", icon: Sliders },
  { id: "toggle", label: "Interruptor", icon: ToggleLeft },
  { id: "rating", label: "Valoración", icon: Star },
  { id: "autocomplete", label: "Autocompletar", icon: Search },
  { id: "address", label: "Dirección", icon: MapPin },
  { id: "client", label: "Cliente", icon: Users },
  { id: "company", label: "Empresa", icon: Building },
  { id: "project", label: "Proyecto", icon: Briefcase }
]

export function ComponentPalette({ onAddComponent }) {
  const createNewComponent = (type) => {
    return {
      id: uuidv4(),
      type: type,
      label: `Nuevo ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeholder: `Ingrese ${type}`,
      validation: {},
      ...(type === "select" && { options: ["Opción 1", "Opción 2", "Opción 3"] }),
      ...(type === "radio" && { options: ["Opción 1", "Opción 2", "Opción 3"] }),
      ...(type === "dynamicTable" && { 
        columns: [
          {
            id: uuidv4(),
            type: "text",
            label: "Columna 1",
            validation: { required: true }
          },
          {
            id: uuidv4(),
            type: "text",
            label: "Columna 2",
            validation: { required: false }
          }
        ] 
      }),
      ...(type === "rating" && { max: 5 }),
      ...(type === "slider" && { min: 0, max: 100, step: 1 }),
      ...(type === "client" && { 
        fields: ["nombre", "apellido", "email", "teléfono", "dirección"] 
      }),
      ...(type === "company" && { 
        fields: ["nombre", "rut", "dirección", "teléfono", "email"] 
      }),
      ...(type === "project" && { 
        fields: ["nombre", "código", "ubicación", "fecha_inicio", "fecha_fin"] 
      })
    }
  }

  const handleClick = (type) => {
    const newComponent = createNewComponent(type)
    onAddComponent(newComponent)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Componentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {componentTypes.map((type) => (
            <div
              key={type.id}
              className="p-2 border rounded-md bg-card hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => handleClick(type.id)}
            >
              <Button
                variant="ghost"
                className="w-full justify-start"
                type="button"
              >
                {type.icon && <type.icon className="mr-2 h-4 w-4" />}
                <span className="text-xs">{type.label}</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 