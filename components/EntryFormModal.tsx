"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { TextInput } from "./form-elements/TextInput"
import { Select } from "./form-elements/Select"
import Checkbox from "./form-elements/Checkbox"
import DatePicker from "./form-elements/DatePicker"
import TimePicker from "./form-elements/TimePicker"
import Slider from "./form-elements/Slider"
import Rating from "./form-elements/Rating"
import ColorPicker from "./form-elements/ColorPicker"
import RichTextEditor from "./form-elements/RichTextEditor"
import Autocomplete from "./form-elements/Autocomplete"
import Signature from "./form-elements/Signature"
import PhotoUpload from "./form-elements/PhotoUpload"
import DynamicTable from "./form-elements/DynamicTable"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "@/utils/theme"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function EntryFormModal({ isOpen, onClose, form, existingEntry = null }) {
  const [formData, setFormData] = useState(() => {
    if (existingEntry && existingEntry.data) {
      return existingEntry.data
    }
    return {}
  })
  const { toast } = useToast()
  const { primaryColor } = useTheme()

  useEffect(() => {
    if (existingEntry && existingEntry.data) {
      setFormData(existingEntry.data)
    }
  }, [existingEntry])

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault()

    if (!isDraft) {
      const missingRequiredFields = form.data.sections
        .flatMap((section) => section.components)
        .filter((component) => component.validation?.required && !formData[component.id])
        .map((component) => component.label)

      if (missingRequiredFields.length > 0) {
        toast({
          title: "Campos requeridos faltantes",
          description: `Por favor, complete los siguientes campos: ${missingRequiredFields.join(", ")}`,
          variant: "destructive",
        })
        return
      }
    }

    let result
    if (existingEntry) {
      result = await supabase
        .from("form_entries")
        .update({
          data: formData,
          is_draft: isDraft,
        })
        .eq("id", existingEntry.id)
    } else {
      result = await supabase.from("form_entries").insert({
        form_id: form.id,
        data: formData,
        is_draft: isDraft,
      })
    }

    const { data, error } = result

    if (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your entry. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } else {
      toast({
        title: isDraft ? "Draft saved" : "Entry saved",
        description: isDraft ? "Your draft has been saved successfully." : "Your entry has been saved successfully.",
        duration: 3000,
      })
      onClose()
    }
  }

  const handleInputChange = (id, value) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }

  const renderComponent = (component) => {
    switch (component.type) {
      case "text":
      case "email":
        return (
          <TextInput
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "number":
        return (
          <TextInput
            id={component.id}
            label={component.label}
            type="number"
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, Number(value))}
            validation={component.validation}
          />
        )
      case "select":
        return (
          <Select
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            options={component.options || []}
            validation={component.validation}
          />
        )
      case "checkbox":
        return (
          <Checkbox
            id={component.id}
            label={component.label}
            checked={formData[component.id] || false}
            onChange={(value) => handleInputChange(component.id, value)}
          />
        )
      case "date":
        return (
          <DatePicker
            id={component.id}
            label={component.label}
            value={formData[component.id] || undefined}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "time":
        return (
          <TimePicker
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "slider":
        return (
          <Slider
            id={component.id}
            label={component.label}
            value={formData[component.id] || 0}
            onChange={(value) => handleInputChange(component.id, value)}
            min={component.min}
            max={component.max}
            step={component.step}
            validation={component.validation}
          />
        )
      case "rating":
        return (
          <Rating
            id={component.id}
            label={component.label}
            value={formData[component.id] || 0}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "color":
        return (
          <ColorPicker
            id={component.id}
            label={component.label}
            value={formData[component.id] || "#000000"}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "richtext":
        return (
          <RichTextEditor
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "autocomplete":
        return (
          <Autocomplete
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            options={component.options || []}
            validation={component.validation}
          />
        )
      case "signature":
        return (
          <Signature
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "photo":
        return (
          <PhotoUpload
            id={component.id}
            label={component.label}
            value={formData[component.id] || []}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
      case "dynamicTable":
        return (
          <div className="space-y-4">
            <DynamicTable
              id={component.id}
              label={component.label}
              value={formData[component.id] || []}
              onChange={(value) => handleInputChange(component.id, value)}
              columns={component.columns}
              validation={component.validation}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const newRow = component.columns?.map(() => "") || []
                  handleInputChange(component.id, [...(formData[component.id] || []), newRow])
                }}
              >
                Añadir entrada
              </Button>
            </div>
          </div>
        )
      default:
        return (
          <TextInput
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            validation={component.validation}
          />
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[60rem] p-0 h-[85vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle>
            {existingEntry ? "Editar entrada para: " : "Crear entrada para: "}
            {form?.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => handleSubmit(e, false)} className="flex flex-col min-h-0 flex-1">
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="px-6">
                <div className="py-6 space-y-8">
                  {form?.data?.sections?.map((section) => (
                    <div key={section.id} className="space-y-4">
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <div className="grid gap-6">
                        {section.components.map((component) => (
                          <div key={component.id} className="w-full">
                            {renderComponent(component)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ScrollBar />
            </ScrollArea>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t bg-background shrink-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" variant="secondary" onClick={(e) => handleSubmit(e, true)}>
              Guardar como borrador
            </Button>
            <Button type="submit" className="bg-[#2F4858] hover:bg-[#2F4858]/90 text-white">
              Guardar entrada
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

