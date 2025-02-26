"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormSection as FormSectionType } from "./types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Printer, Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface FormPreviewProps {
  formName: string
  sections: FormSectionType[]
}

export function FormPreview({ formName, sections }: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [activeTab, setActiveTab] = useState("form")
  
  const handleInputChange = (id: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos del formulario:", formData)
    // Aquí se podría implementar la lógica para enviar los datos
  }
  
  const handlePrint = () => {
    window.print()
  }
  
  const handleExportPDF = () => {
    // Implementación de exportación a PDF
    alert("Función de exportación a PDF no implementada")
  }
  
  const handleSave = () => {
    // Implementación para guardar el borrador
    alert("Función de guardar borrador no implementada")
  }
  
  const renderComponent = (component: any, sectionId: string) => {
    switch (component.type) {
      case "text":
      case "email":
      case "phone":
      case "url":
      case "number":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <Input
              id={component.id}
              type={component.type === "number" ? "number" : "text"}
              placeholder={component.placeholder || `Ingrese ${component.label}`}
              value={formData[component.id] || ""}
              onChange={(e) => handleInputChange(component.id, e.target.value)}
              required={component.validation?.required}
            />
          </div>
        )
      
      case "textarea":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <Textarea
              id={component.id}
              placeholder={component.placeholder || `Ingrese ${component.label}`}
              value={formData[component.id] || ""}
              onChange={(e) => handleInputChange(component.id, e.target.value)}
              required={component.validation?.required}
            />
          </div>
        )
      
      case "select":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <Select
              value={formData[component.id] || ""}
              onValueChange={(value) => handleInputChange(component.id, value)}
            >
              <SelectTrigger id={component.id}>
                <SelectValue placeholder={component.placeholder || "Seleccione una opción"} />
              </SelectTrigger>
              <SelectContent>
                {component.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      
      case "checkbox":
        return (
          <div className="mb-4 flex items-center space-x-2">
            <Checkbox
              id={component.id}
              checked={formData[component.id] || false}
              onCheckedChange={(checked) => handleInputChange(component.id, checked)}
            />
            <Label htmlFor={component.id}>{component.label}</Label>
          </div>
        )
      
      case "radio":
        return (
          <div className="mb-4">
            <Label className="mb-2 block">{component.label}</Label>
            <div className="space-y-2">
              {component.options?.map((option: string) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${component.id}-${option}`}
                    name={component.id}
                    value={option}
                    checked={formData[component.id] === option}
                    onChange={(e) => handleInputChange(component.id, e.target.value)}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor={`${component.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>
        )
      
      case "date":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={component.id}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData[component.id] && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData[component.id] ? (
                    format(new Date(formData[component.id]), "PPP", { locale: es })
                  ) : (
                    <span>Seleccione una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData[component.id] ? new Date(formData[component.id]) : undefined}
                  onSelect={(date) => handleInputChange(component.id, date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )
      
      case "time":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <Input
              id={component.id}
              type="time"
              value={formData[component.id] || ""}
              onChange={(e) => handleInputChange(component.id, e.target.value)}
              required={component.validation?.required}
            />
          </div>
        )
      
      case "dynamicTable":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <div className="border rounded-md p-4 mt-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {component.columns?.map((column: any) => (
                      <th key={column.id} className="border p-2 text-left">
                        {column.label}
                      </th>
                    ))}
                    <th className="border p-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {(formData[component.id] || [[]]).map((row: any[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {component.columns?.map((column: any, colIndex: number) => (
                        <td key={column.id} className="border p-2">
                          <Input
                            value={row[colIndex] || ""}
                            onChange={(e) => {
                              const newRows = [...(formData[component.id] || [[]])];
                              newRows[rowIndex][colIndex] = e.target.value;
                              handleInputChange(component.id, newRows);
                            }}
                            placeholder={`Ingrese ${column.label}`}
                          />
                        </td>
                      ))}
                      <td className="border p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newRows = [...(formData[component.id] || [[]])];
                            newRows.splice(rowIndex, 1);
                            handleInputChange(component.id, newRows);
                          }}
                        >
                          ×
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const newRows = [...(formData[component.id] || [[]])];
                  newRows.push(Array(component.columns?.length || 0).fill(""));
                  handleInputChange(component.id, newRows);
                }}
              >
                Añadir fila
              </Button>
            </div>
          </div>
        )
      
      case "photo":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <div className="mt-2 p-4 border-2 border-dashed rounded-md text-center">
              <p className="text-muted-foreground">
                Haga clic para cargar fotos o arrastre y suelte
              </p>
              <input
                type="file"
                id={component.id}
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  // Simulación de carga de imágenes
                  console.log("Archivos seleccionados:", e.target.files);
                  alert("Funcionalidad de carga de imágenes no implementada en la vista previa");
                }}
              />
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  document.getElementById(component.id)?.click();
                }}
              >
                Seleccionar fotos
              </Button>
            </div>
          </div>
        )
      
      case "signature":
        return (
          <div className="mb-4">
            <Label htmlFor={component.id}>{component.label}</Label>
            <div className="mt-2 p-4 border rounded-md text-center bg-muted/30 h-40 flex items-center justify-center">
              <p className="text-muted-foreground">
                Área para firma (no disponible en vista previa)
              </p>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="mb-4 p-4 border border-dashed rounded-md">
            <p className="text-muted-foreground">
              Componente de tipo "{component.type}" no soportado en la vista previa
            </p>
          </div>
        )
    }
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{formName}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar borrador
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="form">Formulario</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                {sections.map((section) => (
                  <div key={section.id} className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                    <div className="space-y-4">
                      {section.components.map((component) => (
                        <div key={component.id}>
                          {renderComponent(component, section.id)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <Button type="submit">Enviar formulario</Button>
                </div>
              </form>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="data">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 