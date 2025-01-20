import type React from "react"
import { useRef, useState, useEffect } from "react"
import type { FormComponent } from "../../types/form"
import { Button } from "@/components/ui/button"

interface SignatureProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const Signature: React.FC<SignatureProps> = ({ id, label, value, onChange, validation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (value && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
        }
        img.src = value
      }
    }
  }, [value])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      onChange(canvas.toDataURL())
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx && canvas) {
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.strokeStyle = "#000"
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    onChange("")
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="border rounded cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
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
