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

export function EditEntryModal({ isOpen, onClose, form, entry }) {
  const [formData, setFormData] = useState(entry?.data || {})
  const { toast } = useToast()

  useEffect(() => {
    if (entry) {
      setFormData(entry.data || {})
    }
  }, [entry])

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

    const { data, error } = await supabase
      .from("form_entries")
      .update({
        data: formData,
        is_draft: isDraft,
      })
      .eq("id", entry.id)

    if (error) {
      console.error("Error updating entry:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar la entrada. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } else {
      console.log("Entry updated successfully:", data)
      toast({
        title: isDraft ? "Borrador actualizado" : "Entrada actualizada",
        description: isDraft
          ? "Su borrador ha sido actualizado exitosamente."
          : "Su entrada ha sido actualizada exitosamente.",
      })
      onClose()
    }
  }

  const handleInputChange = (id, value) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }

  const renderComponent = (component) => {
    // ... (mismo código que en CreateEntryModal)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background z-10">
          <DialogTitle>Editar entrada para: {form?.name}</DialogTitle>
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

