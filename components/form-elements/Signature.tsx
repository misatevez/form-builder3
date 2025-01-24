"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import type { FormComponent } from "../../types/form"
import { Button } from "@/components/ui/button"
import SignatureCanvas from "react-signature-canvas"

interface SignatureProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const Signature: React.FC<SignatureProps> = ({ id, label, value, onChange, validation }) => {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [imageURL, setImageURL] = useState<string | null>(null)

  useEffect(() => {
    if (value) {
      setImageURL(value)
    }
  }, [value])

  const clear = () => {
    sigCanvas.current?.clear()
    setImageURL(null)
    onChange("")
  }

  const save = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL("image/png")
      setImageURL(dataURL)
      onChange(dataURL)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageURL(event.target.result as string)
          onChange(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        style={{
          touchAction: "none",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            style: {
              width: "100%",
              height: "150px",
            },
            width: 300,
            height: 150,
          }}
        />
      </div>
      <div className="mt-2 space-x-2">
        <Button onClick={clear} variant="outline">
          Limpiar firma
        </Button>
        <Button onClick={save} variant="outline">
          Guardar firma
        </Button>
      </div>
      <div className="mt-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {imageURL && (
        <div className="mt-2">
          <img
            src={imageURL || "/placeholder.svg"}
            alt="Firma"
            className="border rounded"
            style={{ maxWidth: "300px", maxHeight: "150px" }}
          />
        </div>
      )}
    </div>
  )
}

export default Signature

