import type React from "react"
import { useState } from "react"
import type { FormComponent } from "../../types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PhotoUploadProps extends FormComponent {
  value: string[] | undefined
  onChange: (value: string[]) => void
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ id, label, value = [], onChange, validation }) => {
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const newPhotos = files.map((file) => URL.createObjectURL(file))
    onChange([...(value || []), ...newPhotos])
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <p className="mb-2">Arrastra y suelta fotos aquí, o haz clic para seleccionar</p>
        <Input type="file" id={id} multiple accept="image/*" onChange={handleFileInput} className="hidden" />
        <Button type="button" onClick={() => document.getElementById(id)?.click()}>
          Seleccionar Fotos
        </Button>
      </div>
      {value && value.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {value.map((photo, index) => (
            <img
              key={index}
              src={photo || "/placeholder.svg"}
              alt={`Uploaded photo ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotoUpload

