import type React from "react"
import { useRef, useState, useEffect, useCallback } from "react"
import type { FormComponent } from "../../types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

interface SignatureProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

interface Point {
  x: number
  y: number
}

interface Stroke {
  points: Point[]
}

const Signature: React.FC<SignatureProps> = ({ id, label, value, onChange, validation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isTextMode, setIsTextMode] = useState(false)
  const [textSignature, setTextSignature] = useState("")
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const currentStrokeRef = useRef<Point[]>([])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const drawStrokes = useCallback((strokesToDraw: Stroke[]) => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.strokeStyle = "#000"

        strokesToDraw.forEach((stroke) => {
          if (stroke.points.length > 0) {
            ctx.beginPath()
            ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
            stroke.points.forEach((point, index) => {
              if (index > 0) {
                ctx.lineTo(point.x, point.y)
              }
            })
            ctx.stroke()
          }
        })
      }
    }
  }, [])

  useEffect(() => {
    if (value) {
      try {
        const parsedValue = JSON.parse(value)
        if (Array.isArray(parsedValue)) {
          setStrokes(parsedValue)
          clearCanvas()
          drawStrokes(parsedValue)
        } else if (typeof parsedValue === "object" && parsedValue.text) {
          setTextSignature(parsedValue.text)
          setIsTextMode(true)
          renderTextSignature(parsedValue.text)
        }
      } catch (error) {
        console.error("Error parsing signature value:", error)
      }
    } else {
      clearCanvas()
      setStrokes([])
      setTextSignature("")
    }
  }, [value, clearCanvas, drawStrokes])

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
      const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
      currentStrokeRef.current = [{ x, y }]
    }
  }, [])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    if (currentStrokeRef.current.length > 0) {
      setStrokes((prevStrokes) => [...prevStrokes, { points: currentStrokeRef.current }])
      onChange(JSON.stringify([...strokes, { points: currentStrokeRef.current }]))
    }
    currentStrokeRef.current = []
  }, [onChange, strokes])

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx && canvas) {
        const rect = canvas.getBoundingClientRect()
        const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
        const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

        currentStrokeRef.current.push({ x, y })

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

  const clearSignature = useCallback(() => {
    clearCanvas()
    setStrokes([])
    setTextSignature("")
    onChange("")
  }, [onChange, clearCanvas])

  const renderTextSignature = useCallback(
    (text: string) => {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          clearCanvas()
          ctx.font = "italic 48px 'Brush Script MT', cursive"
          ctx.fillStyle = "#000"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(text, canvas.width / 2, canvas.height / 2)
        }
      }
    },
    [clearCanvas],
  )

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
      clearCanvas()
      if (checked) {
        setStrokes([])
        if (textSignature) {
          renderTextSignature(textSignature)
        }
      } else {
        setTextSignature("")
        drawStrokes(strokes)
      }
    },
    [clearCanvas, drawStrokes, renderTextSignature, strokes, textSignature],
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
      <div className="mt-2">
        <Button onClick={clearSignature} variant="outline">
          Limpiar firma
        </Button>
      </div>
    </div>
  )
}

export default Signature

