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
import TextArea from "./form-elements/TextArea"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "@/utils/theme"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useAuth } from "./auth/AuthContext"

interface EntryFormModalProps {
  isOpen: boolean
  onClose: () => void
  form: any
  existingEntry?: any
  fileName?: string
}

export function EntryFormModal({ isOpen, onClose, form, existingEntry = null, fileName = "" }: EntryFormModalProps) {
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState(() => {
    if (existingEntry && existingEntry.data) {
      return existingEntry.data
    }
    return {}
  })
  const { toast } = useToast()
  const { primaryColor } = useTheme()
  const [localFileName, setLocalFileName] = useState(fileName)
  const [html2pdf, setHtml2pdf] = useState<any>(null)

  useEffect(() => {
    const loadHtml2pdf = async () => {
      const html2pdfModule = await import("html2pdf.js")
      setHtml2pdf(() => html2pdfModule.default)
    }
    loadHtml2pdf()
  }, [])

  useEffect(() => {
    if (existingEntry && existingEntry.data) {
      setFormData(existingEntry.data)
      setLocalFileName(existingEntry.file_name || "")
    }
  }, [existingEntry])

  const exportToPDF = () => {
    if (!html2pdf) {
      console.warn("PDF export is not available yet. Please try again in a moment.")
      return
    }

    const content = document.createElement("div")
    content.innerHTML = `
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        line-height: 1.3;
        color: #333;
        font-size: 8px;
      }
      .container {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
      }
      .header {
        
        color: black;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        width: 180px;
        height: auto;
      }
      .header-text {
        text-align: right;
      }
      h1 {
        color: black;
        margin: 0;
        font-size: 16px;
      }
      .file-name {
        font-size: 12px;
        color: black;
        margin-top: 5px;
      }
      h2 {
        color: #2F4858;
        margin-top: 15px;
        margin-bottom: 10px;
        font-size: 12px;
        border-bottom: 1px solid #2F4858;
        padding-bottom: 5px;
      }
      .section {
        margin-bottom: 15px;
      }
      .field {
        margin-bottom: 10px;
      }
      .field-label {
        font-weight: bold;
        margin-bottom: 3px;
        color: #2F4858;
        font-size: 9px;
      }
      .field-value {
        background-color: #f9f9f9;
        padding: 4px;
        border-radius: 3px;
        font-size: 8px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 7px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 4px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
        color: #2F4858;
      }
      .table-title {
        font-weight: bold;
        margin-bottom: 3px;
        color: #2F4858;
        font-size: 9px;
      }
      img {
        max-width: 100%;
        height: auto;
        margin-top: 3px;
        border: 1px solid #ddd;
        border-radius: 2px;
      }
    </style>
    <div class="container">
      <div class="header">
        <img src="/greenenergy-logo2.png" alt="GreenEnergy Logo" class="logo" />
        <div class="header-text">
          <h1>${form.name}</h1>
          <div class="file-name">${localFileName}</div>
        </div>
      </div>
      ${form.data.sections
        .map(
          (section) => `
        <div class="section">
          <h2>${section.title}</h2>
          ${section.components
            .map((component) => {
              const value = formData[component.id]
              switch (component.type) {
                case "dynamicTable":
                  return `
                  <div class="field">
                    <div class="table-title">${component.label}</div>
                    <table>
                      <thead>
                        <tr>
                          ${component.columns.map((col) => `<th>${col.label}</th>`).join("")}
                        </tr>
                      </thead>
                      <tbody>
                        ${(value || [])
                          .map(
                            (row) => `
                          <tr>
                            ${row.map((cell) => `<td>${cell}</td>`).join("")}
                          </tr>
                        `,
                          )
                          .join("")}
                      </tbody>
                    </table>
                  </div>
                `
                case "photo":
                  return `
                    <div class="field">
                      <div class="field-label">${component.label}</div>
                      <div class="field-value">
                        ${
                          Array.isArray(value)
                            ? value
                                .map((photo: any) => {
                                  if (typeof photo === "string") {
                                    return `<img src="${photo}" alt="Uploaded photo" />`
                                  } else if (photo && photo.url) {
                                    return `<img src="${photo.url}" alt="Uploaded photo (${photo.category})" />`
                                  }
                                  return ""
                                })
                                .join("")
                            : ""
                        }
                      </div>
                    </div>
                  `
                case "signature":
                  return `
                  <div class="field">
                    <div class="field-label">${component.label}</div>
                    <div class="field-value">
                      <img src="${value}" alt="Signature" />
                    </div>
                  </div>
                `
                default:
                  return `
                  <div class="field">
                    <div class="field-label">${component.label}</div>
                    <div class="field-value">${value || ""}</div>
                  </div>
                `
              }
            })
            .join("")}
        </div>
      `,
        )
        .join("")}
    </div>
    `

    const opt = {
      margin: 5,
      filename: `${form.name} - ${localFileName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { avoid: ["div", "tr"] },
    }

    html2pdf().from(content).set(opt).save()
  }

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
    const entryData = {
      data: formData,
      is_draft: isDraft,
      file_name: localFileName,
    }
    if (existingEntry) {
      result = await supabase.from("form_entries").update(entryData).eq("id", existingEntry.id)
    } else {
      result = await supabase.from("form_entries").insert({
        form_id: form.id,
        user_id: user?.id,
        ...entryData,
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
        title: isDraft ? "Borrador guardado" : "Entrada guardada",
        description: isDraft
          ? "Su borrador ha sido guardado exitosamente."
          : "Su entrada ha sido guardada exitosamente.",
        duration: 3000,
      })

      if (!isDraft) {
        exportToPDF()
      }

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
          </div>
        )
      case "textarea":
        return (
          <TextArea
            id={component.id}
            label={component.label}
            value={formData[component.id] || ""}
            onChange={(value) => handleInputChange(component.id, value)}
            placeholder={component.placeholder}
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
      <DialogContent className="max-w-[80rem] p-0 h-[85vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle>
            {existingEntry ? "Editar entrada para: " : "Crear entrada para: "}
            {form?.name} : {fileName}
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
            <Button type="submit" className="text-white">
              Guardar y exportar
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                exportToPDF()
              }}
              className="text-white w-full sm:w-auto"
            >
              Export PDF
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

