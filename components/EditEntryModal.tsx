"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { TextInput } from "./form-elements/TextInput";
import { Select } from "./form-elements/Select";
import Checkbox from "./form-elements/Checkbox";
import DatePicker from "./form-elements/DatePicker";
import TimePicker from "./form-elements/TimePicker";
import Slider from "./form-elements/Slider";
import Rating from "./form-elements/Rating";
import ColorPicker from "./form-elements/ColorPicker";
import RichTextEditor from "./form-elements/RichTextEditor";
import Autocomplete from "./form-elements/Autocomplete";
import Signature from "./form-elements/Signature";
import PhotoUpload from "./form-elements/PhotoUpload";
import DynamicTable from "./form-elements/DynamicTable";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/utils/theme";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface EntryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: any;
  existingEntry?: any;
  fileName?: string;
}

export function EditEntryModal({ isOpen, onClose, form, entry, fileName = "" }: EntryFormModalProps) {
  const [formData, setFormData] = useState(entry?.data || {});
  const { toast } = useToast();
  const { primaryColor } = useTheme();
  const [localFileName, setLocalFileName] = useState(fileName);
 const [html2pdf, setHtml2pdf] = useState<any>(null)

	useEffect(() => {
    const loadHtml2pdf = async () => {
      const html2pdfModule = await import("html2pdf.js")
      setHtml2pdf(() => html2pdfModule.default)
    }
    loadHtml2pdf()
  }, [])
	
  useEffect(() => {
    if (entry) {
      setFormData(entry.data || {});
      setLocalFileName(entry.file_name || "");
    }
  }, [entry]);

	
	
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
        file_name: localFileName,
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

      if (!isDraft) {
        exportToPDF()
      }

      onClose()
    }
  }

  const handleInputChange = (id: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

	const exportToPDF = () => {
    if (!html2pdf) {
      console.warn("PDF export is not available yet. Please try again in a moment.")
      return
    }

    const content = document.createElement("div")
    content.innerHTML = `
    <style>
      @page {
        size: auto;
        margin: 0mm;
      }
      @media print {
        html, body {
          width: 210mm;
          height: auto !important;
          page-break-after: avoid !important;
          page-break-before: avoid !important;
        }
        * {
          page-break-inside: avoid !important;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
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
      }
    </style>
    <div class="container">
      <div class="header">
        <h1>${form.name}</h1>
        <div class="file-name">${localFileName}</div>
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
                      ${(value || []).map((photo) => `<img src="${photo}" alt="Uploaded photo" />`).join("")}
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
      margin: 0,
      filename: `${form.name} - ${localFileName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: -window.scrollY,
        windowHeight: document.documentElement.scrollHeight,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compress: true,
        precision: 16,
        userUnit: 1.0,
        hotfixes: ["px_scaling"],
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      },
    }

    html2pdf().from(content).set(opt).save()
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
        );
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
        );
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
        );
      case "checkbox":
        return (
          <Checkbox
            id={component.id}
            label={component.label}
            checked={formData[component.id] || false}
            onChange={(value) => handleInputChange(component.id, value)}
          />
        );
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
        );
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
        );
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
        );
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
        );
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
        );
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
        );
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
        );
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
        );
      case "photo":
        return (
          <div className="mb-4">
            <PhotoUpload
              id={component.id}
              label={component.label}
              value={formData[component.id] || []}
              onChange={(value) => handleInputChange(component.id, value)}
              validation={component.validation}
            />
          </div>
        );
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
        );
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
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[60rem] p-0 h-[85vh] flex flex-col overflow-auto">
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle>Editar entrada para: {form?.name} : {fileName} </DialogTitle>
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
            <Button type="button" variant="secondary" onClick={(e) => handleSubmit(e, true)} className="w-full sm:w-auto">
              Guardar como borrador
            </Button>
            <Button type="submit" className="text-white w-full sm:w-auto">
              Guardar y publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
