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

export function EntryFormModal({ isOpen, onClose, form, existingEntry = null }) {
  const [formData, setFormData] = useState(() => {
    if (existingEntry && existingEntry.data) {
      console.log("Cargando datos existentes:", existingEntry.data)
      return existingEntry.data
    }
    return {}
  })
  const { toast } = useToast()

  useEffect(() => {
    if (existingEntry && existingEntry.data) {
      console.log("Actualizando datos existentes:", existingEntry.data)
      setFormData(existingEntry.data)
    }
  }, [existingEntry])

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault()

    // Si no es un borrador, validamos los campos requeridos
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
      console.error("Error saving entry:", error)
      toast({
        title: "Error",
        description: "There was a problem saving your entry. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } else {
      console.log("Entry saved successfully:", data)
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
    console.log(`Renderizando componente ${component.id}:`, formData[component.id])
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
          <DynamicTable
            id={component.id}
            label={component.label}
            value={formData[component.id] || []}
            onChange={(value) => handleInputChange(component.id, value)}
            columns={component.columns}
            validation={component.validation}
          />
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
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background z-10">
          <DialogTitle>
            {existingEntry ? "Editar entrada para: " : "Crear entrada para: "}
            {form?.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
          <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto pr-4">
            {form?.data?.sections?.map((section) => (
              <div key={section.id} className="space-y-2">
                <h3 className="font-bold">{section.title}</h3>
                {section.components.map((component) => (
                  <div key={component.id}>{renderComponent(component)}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 bg-background pt-2 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" variant="secondary" onClick={(e) => handleSubmit(e, true)}>
              Guardar como borrador
            </Button>
            <Button type="submit">Guardar entrada</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
