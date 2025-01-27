import type React from "react"
import { useCallback, useRef, useState, useEffect } from "react"

interface SignatureProps {
  value: string
  onChange: (value: string) => void
}

const Signature: React.FC<SignatureProps> = ({ value, onChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [strokes, setStrokes] = useState<Array<{ x: number; y: number }[]>>([[]])
  const currentStrokeRef = useRef<Array<{ x: number; y: number }>>([])

  const startDrawing = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const y = e.touches[0].clientY - rect.top
      currentStrokeRef.current = [{ x, y }]
    }
  }, [])

  const draw = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      if (!isDrawing) return
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx && canvas) {
        const rect = canvas.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top

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

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    setStrokes([...strokes, currentStrokeRef.current])
    currentStrokeRef.current = []
    onChange(JSON.stringify([...strokes, currentStrokeRef.current]))
  }, [strokes, onChange])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  const drawStrokes = useCallback((strokesToDraw: Array<{ x: number; y: number }[]>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx && canvas) {
      strokesToDraw.forEach((stroke) => {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.strokeStyle = "#000"
        ctx.moveTo(stroke[0].x, stroke[0].y)
        stroke.forEach((point, index) => {
          if (index > 0) {
            ctx.lineTo(point.x, point.y)
            ctx.stroke()
          }
        })
      })
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
        }
      } catch (error) {
        console.error("Error parsing signature value:", error)
      }
    } else {
      clearCanvas()
      setStrokes([])
    }
  }, [value, clearCanvas, drawStrokes])

  const clearSignature = useCallback(() => {
    clearCanvas()
    setStrokes([])
    onChange("")
  }, [onChange, clearCanvas])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="border rounded touch-none w-full"
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-transparent" />
    </div>
  )
}

export default Signature

