import type React from "react"
import { useRef, useState, useEffect, useCallback } from "react"
import type { FormComponent } from "../../types/form"
import { Button } from "@/components/ui/button"
import { isMobile } from "react-device-detect"

interface SignatureProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const Signature: React.FC<SignatureProps> = ({ id, label, value, onChange, validation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [useImageUpload, setUseImageUpload] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }, [])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    saveSignature()
  }, [])

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx && canvas) {
        const rect = canvas.getBoundingClientRect()
        let x, y
        if ("touches" in e) {
          x = e.touches[0].clientX - rect.left
          y = e.touches[0].clientY - rect.top
        } else {
          x = e.clientX - rect.left
          y = e.clientY - rect.top
        }
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.strokeStyle = "#000"
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
    },
    [isDrawing],
  )

  const saveSignature = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL()
        onChange(dataUrl)
      } catch (error) {
        console.error("Failed to save signature:", error)
      }
    }
  }, [onChange])

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    onChange("")
  }, [onChange])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
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
      {isMobile ? (
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Para firmar en dispositivos móviles, por favor suba una imagen de su firma.
          </p>
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
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="border rounded cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
          />
          <div className="mt-2 space-x-2">
            <Button onClick={clearSignature} variant="outline">
              Limpiar firma
            </Button>
            <Button onClick={() => setUseImageUpload(!useImageUpload)} variant="outline">
              {useImageUpload ? "Usar canvas" : "Subir imagen"}
            </Button>
          </div>
          {useImageUpload && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          )}
        </>
      )}
      {value && (
        <div className="mt-2">
          <img
            src={value || "/placeholder.svg"}
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

