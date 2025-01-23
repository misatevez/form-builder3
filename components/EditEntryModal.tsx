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
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"
import { useAuth } from "./auth/AuthContext"
interface EntryFormModalProps {
  isOpen: boolean
  onClose: () => void
  form: any
  entry?: any
  fileName?: string
}

export function EditEntryModal({ isOpen, onClose, form, entry, fileName = "" }: EntryFormModalProps) {
  const [formData, setFormData] = useState(entry?.data || {})
  const { toast } = useToast()
  const { primaryColor } = useTheme()
  const [localFileName, setLocalFileName] = useState(fileName)
  const [html2pdf, setHtml2pdf] = useState<any>(null)
  const [uploading, setUploading] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    const loadHtml2pdf = async () => {
      const html2pdfModule = await import("html2pdf.js")
      setHtml2pdf(() => html2pdfModule.default)
    }
    loadHtml2pdf()
  }, [])

  useEffect(() => {
    if (entry) {
      setFormData(entry.data || {})
      setLocalFileName(entry.file_name || "")
    }
  }, [entry])

  useEffect(() => {
    console.log("formData updated:", formData)
  }, [formData])

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    console.log("handleSubmit called", { isDraft, formData })
    e.preventDefault()

    if (!isDraft) {
      const missingRequiredFields = form.data.sections
        .flatMap((section: any) => section.components)
        .filter((component: any) => component.validation?.required && !formData[component.id])
        .map((component: any) => component.label)

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
        file_name: localFileName,
        user_id: user?.id
      })
      .eq("id", entry.id)

    console.log("Supabase update result:", { data, error })

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

      if (!isDraft) {
        try {
          await exportToPDF()
        } catch (pdfError) {
          console.error("Error exporting PDF:", pdfError)
          toast({
            title: "Error",
            description: "La entrada se actualizó, pero hubo un problema al generar el PDF.",
            variant: "warning",
          })
        }
      }

      onClose()
    }
  }

  const handleInputChange = async (id: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }))

    if (typeof value === "object" && value !== null && Array.isArray(value) && value.length > 0) {
      const component = form.data.sections
        .flatMap((section: any) => section.components)
        .find((comp: any) => comp.id === id)

      if (component?.type === "photo") {
        setUploading(true)
        try {
          const uploadPromises = value.map(async (file: any) => {
            if (typeof file === "string") {
              return file // If it's already a URL, don't upload
            }
            const fileName = `${uuidv4()}-${file.name}`

            // Convert File to Blob
            const blob = new Blob([file], { type: file.type })

            const { data, error } = await supabase.storage.from("fsp-files").upload(fileName, blob)

            if (error) {
              console.error("Error uploading file:", error)
              throw error
            }

            const {
              data: { publicUrl },
            } = supabase.storage.from("fsp-files").getPublicUrl(fileName)

            return { publicUrl }
          })

          const uploadedUrls = await Promise.all(uploadPromises)
          setFormData((prevData) => ({ ...prevData, [id]: uploadedUrls }))
        } catch (error) {
          console.error("Error during file upload:", error)
          // Handle errors (e.g., show a toast)
        } finally {
          setUploading(false)
        }
      }
    } else if (typeof value === "string" && value.startsWith("data:image")) {
      const component = form.data.sections
        .flatMap((section: any) => section.components)
        .find((comp: any) => comp.id === id)

      if (component?.type === "signature") {
        setUploading(true)
        try {
          const fileName = `${uuidv4()}-signature.png`
          const byteString = atob(value.split(",")[1])
          const mimeString = value.split(",")[0].split(":")[1].split(";")[0]
          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }
          const blob = new Blob([ab], { type: mimeString })

          const { data, error } = await supabase.storage.from("fsp-files").upload(fileName, blob)

          if (error) {
            console.error("Error uploading signature:", error)
          }

          const publicUrl = supabase.storage.from("fsp-files").getPublicUrl(fileName).data.publicUrl

          setFormData((prevData) => ({ ...prevData, [id]: publicUrl }))
        } catch (error) {
          console.error("Error during signature upload:", error)
        } finally {
          setUploading(false)
        }
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }))
    }
  }

  const exportToPDF = async () => {
    if (!html2pdf) {
      console.warn("PDF export is not available yet. Please try again in a moment.")
      return
    }

    console.log("FormData before PDF generation:", JSON.stringify(formData, null, 2))
    const content = document.createElement("div")
    content.innerHTML = `
      <style>
        @page {
          size: auto;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #2F4858;
          padding-bottom: 10px;
        }
        h1 {
          color: #2F4858;
          margin: 0;
          font-size: 24px;
        }
        .file-name {
          font-size: 1.2em;
          color: #666;
        }
        h2 {
          color: #2F4858;
          margin-top: 30px;
          margin-bottom: 20px;
          font-size: 20px;
          border-bottom: 1px solid #2F4858;
          padding-bottom: 5px;
        }
        .section {
          margin-bottom: 40px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: bold;
          margin-bottom: 5px;
          color: #2F4858;
        }
        .field-value {
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 4px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
          color: #2F4858;
        }
        .table-title {
          font-weight: bold;
          margin-bottom: 10px;
          color: #2F4858;
        }
        img {
          max-width: 100%;
          height: auto;
          margin-top: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          page-break-inside: avoid;
        }
      </style>
      <div class="container">
        <div class="header">
          <h1>${form.name}</h1>
          <div class="file-name">${localFileName}</div>
        </div>
        ${form.data.sections
          .map(
            (section: any) => `
          <div class="section">
            <h2>${section.title}</h2>
            ${section.components
              .map((component: any) => {
                const value = formData[component.id]
                switch (component.type) {
                  case "dynamicTable":
                    return `
                    <div class="field">
                      <div class="table-title">${component.label}</div>
                      <table>
                        <thead>
                          <tr>
                            ${component.columns.map((col: any) => `<th>${col.label}</th>`).join("")}
                          </tr>
                        </thead>
                        <tbody>
                          ${(value || [])
                            .map(
                              (row: any) => `
                            <tr>
                              ${row.map((cell: any) => `<td>${cell}</td>`).join("")}
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

    document.body.appendChild(content)

    try {
      // Wait for images to load
      await Promise.all(
        Array.from(content.getElementsByTagName("img")).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve(null)
              } else {
                img.onload = () => resolve(null)
                img.onerror = () => {
                  console.error(`Failed to load image: ${img.src}`)
                  img.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // 1x1 transparent PNG
                  resolve(null)
                }
              }
            }),
        ),
      )

      // Añadir un pequeño retraso para asegurar que las imágenes se hayan renderizado completamente
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const opt = {
        margin: 10,
        filename: `${form.name} - ${localFileName}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }

      await html2pdf().from(content).set(opt).save()
      console.log("PDF generated successfully")
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar el PDF. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      document.body.removeChild(content)
    }
  }

  const renderComponent = (component: any) => {
    switch (component.type) {
      case "text":
      case "email":
        return (
          <div className="mb-4">
            <TextInput
              id={component.id}
              label={component.label}
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
      case "number":
        return (
          <div className="mb-4">
            <TextInput
              id={component.id}
              label={component.label}
              type="number"
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, Number(value))}
              validation={component.validation}
            />
          </div>
        )
      case "select":
        return (
          <div className="mb-4">
            <Select
              id={component.id}
              label={component.label}
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, value)}
              options={component.options || []}
              validation={component.validation}
            />
          </div>
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
          <div className="mb-4">
            <DatePicker
              id={component.id}
              label={component.label}
              value={formData[component.id] || undefined}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
      case "time":
        return (
          <div className="mb-4">
            <TimePicker
              id={component.id}
              label={component.label}
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
      case "slider":
        return (
          <div className="mb-4">
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
          </div>
        )
      case "rating":
        return (
          <div className="mb-4">
            <Rating
              id={component.id}
              label={component.label}
              value={formData[component.id] || 0}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
      case "color":
        return (
          <div className="mb-4">
            <ColorPicker
              id={component.id}
              label={component.label}
              value={formData[component.id] || "#000000"}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
      case "richtext":
        return (
          <div className="mb-4">
            <RichTextEditor
              id={component.id}
              label={component.label}
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
      case "autocomplete":
        return (
          <div className="mb-4">
            <Autocomplete
              id={component.id}
              label={component.label}
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, value)}
              options={component.options || []}
              validation={component.validation}
            />
          </div>
        )
      case "signature":
        return (
          <div className="mb-4">
            <Signature
              id={component.id}
              label={component.label}
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
      case "photo":
        return (
          <div className="mb-4">
            <PhotoUpload
              id={component.id}
              label={component.label}
              value={formData[component.id] || []}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
              uploading={uploading}
            />
          </div>
        )
      case "dynamicTable":
        return (
          <div className="mb-4">
            <DynamicTable
              id={component.id}
              label={component.label}
              value={formData[component.id] || []}
              onChange={(value) => handleInputChange(component.id, value)}
              columns={component.columns}
              validation={component.validation}
              isPreview={false}
            />
          </div>
        )
      default:
        return (
          <div className="mb-4">
            <TextInput
              id={component.id}
              label={component.label}
              value={formData[component.id] || ""}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[60rem] p-0 h-[85vh] flex flex-col overflow-auto">
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle>
            Editar entrada para: {form?.name} : {fileName}{" "}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e, false)} className="flex flex-col min-h-0 flex-1">
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="px-6">
                <div className="py-6 space-y-8">
                  {form?.data?.sections?.map((section: any) => (
                    <div key={section.id} className="space-y-4">
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <div className="space-y-4">
                        {section.components.map((component: any) => (
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
          <div className="flex flex-wrap items-center justify-end gap-2 p-6 border-t bg-background shrink-0">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => handleSubmit(e, true)}
              className="w-full sm:w-auto"
            >
              Guardar como borrador
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                console.log("Guardar y publicar")
                handleSubmit(e, false)
              }}
              className="text-white w-full sm:w-auto"
            >
              Guardar
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
