import type React from "react"
import { useRef, useState, useEffect, useCallback } from "react"
import type { FormComponent } from "../../types/form"
import { Button } from "@/components/ui/button"
import SignatureCanvas from "react-signature-canvas"

interface SignatureProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const Signature: React.FC<SignatureProps> = ({ id, label, value, onChange, validation }) => {
  const signatureRef = useRef<SignatureCanvas>(null)

  useEffect(() => {
    if (value && signatureRef.current) {
      signatureRef.current.fromDataURL(value)
    }
  }, [value])

  const clearSignature = useCallback(() => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      onChange("")
    }
  }, [onChange])

  const handleDrawEnd = useCallback(() => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureData = signatureRef.current.toDataURL()
      onChange(signatureData)
    }
  }, [onChange])

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="border rounded">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            width: 300,
            height: 150,
            className: "w-full h-full cursor-crosshair",
          }}
          onEnd={handleDrawEnd}
        />
      </div>
      <div className="mt-2">
        <Button onClick={clearSignature} variant="outline" type="button">
          Limpiar firma
        </Button>
      </div>
    </div>
  )
}

export default Signature

