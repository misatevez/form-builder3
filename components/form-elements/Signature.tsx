import type React from "react"
import { useRef, useState, useEffect, useCallback } from "react"
import type { FormComponent } from "../../types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import SignatureCanvas from "react-signature-canvas"

interface SignatureProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const Signature: React.FC<SignatureProps> = ({ id, label, value, onChange, validation }) => {
  const signatureRef = useRef<SignatureCanvas>(null)
  const [isTextMode, setIsTextMode] = useState(false)
  const [textSignature, setTextSignature] = useState("")

  useEffect(() => {
    if (value) {
      try {
        const parsedValue = JSON.parse(value)
        if (typeof parsedValue === "object" && parsedValue.text) {
          setTextSignature(parsedValue.text)
          setIsTextMode(true)
        } else if (signatureRef.current) {
          signatureRef.current.fromDataURL(value)
        }
      } catch (error) {
        console.error("Error parsing signature value:", error)
      }
    } else {
      clearSignature()
    }
  }, [value])

  const clearSignature = useCallback(() => {
    if (signatureRef.current) {
      signatureRef.current.clear()
    }
    setTextSignature("")
    onChange("")
  }, [onChange])

  const handleDrawEnd = useCallback(() => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      onChange(signatureRef.current.toDataURL())
    }
  }, [onChange])

  const renderTextSignature = useCallback((text: string) => {
    if (signatureRef.current) {
      const canvas = signatureRef.current.getCanvas()
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = "italic 48px 'Brush Script MT', cursive"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, canvas.width / 2, canvas.height / 2)
      }
    }
  }, [])

  const handleTextSignatureChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value
      setTextSignature(newText)
      renderTextSignature(newText)
      onChange(JSON.stringify({ text: newText }))
    },
    [onChange, renderTextSignature],
  )

  const handleModeChange = useCallback(
    (checked: boolean) => {
      setIsTextMode(checked)
      if (checked) {
        if (textSignature) {
          renderTextSignature(textSignature)
        } else {
          clearSignature()
        }
      } else {
        clearSignature()
      }
    },
    [clearSignature, renderTextSignature, textSignature],
  )

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center space-x-2 mb-2">
        <Switch id={`${id}-mode-switch`} checked={isTextMode} onCheckedChange={handleModeChange} />
        <label htmlFor={`${id}-mode-switch`} className="text-sm text-gray-600">
          {isTextMode ? "Modo texto" : "Modo dibujo"}
        </label>
      </div>
      {isTextMode && (
        <Input
          type="text"
          value={textSignature}
          onChange={handleTextSignatureChange}
          placeholder="Escribe tu firma aquí"
          className="mb-2"
        />
      )}
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{
          width: 300,
          height: 150,
          className: "border rounded cursor-crosshair",
        }}
        onEnd={handleDrawEnd}
      />
      <div className="mt-2">
        <Button onClick={clearSignature} variant="outline">
          Limpiar firma
        </Button>
      </div>
    </div>
  )
}

export default Signature

