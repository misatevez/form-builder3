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
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    if (value && signatureRef.current) {
      signatureRef.current.fromDataURL(value)
      setIsEmpty(false)
    }
  }, [value])

  const clearSignature = useCallback(() => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setIsEmpty(true)
      onChange("")
    }
  }, [onChange])

  const handleDrawEnd = useCallback(() => {
    if (signatureRef.current) {
      setIsEmpty(signatureRef.current.isEmpty())
    }
  }, [])

  const handleDrawStart = useCallback(() => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      signatureRef.current.clear()
    }
  }, [])

  const saveSignature = useCallback(() => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.isEmpty() ? "" : signatureRef.current.toDataURL()
      console.log("Saving signature data:", signatureData ? signatureData.substring(0, 50) + "..." : "empty")
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
          onBegin={handleDrawStart}
          onEnd={handleDrawEnd}
          dotSize={1}
          throttle={16}
          minWidth={1}
          maxWidth={2}
          penColor="black"
          backgroundColor="rgba(255,255,255,0)"
        />
      </div>
      <div className="mt-2 flex space-x-2">
        <Button onClick={clearSignature} variant="outline" type="button">
          Limpiar firma
        </Button>
        <Button onClick={saveSignature} variant="primary" type="button">
          Guardar firma
        </Button>
      </div>
    </div>
  )
}

export default Signature

