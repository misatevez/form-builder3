import type React from "react"
import { useRef, useEffect, useCallback } from "react"
import SignaturePad from "signature_pad"

interface SignatureProps {
  value: string
  onChange: (value: string) => void
}

const Signature: React.FC<SignatureProps> = ({ value, onChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signaturePadRef = useRef<SignaturePad | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgb(255, 255, 255)",
        penColor: "rgb(0, 0, 0)",
      })

      const resizeCanvas = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1)
        canvasRef.current.width = canvasRef.current.offsetWidth * ratio
        canvasRef.current.height = canvasRef.current.offsetHeight * ratio
        canvasRef.current.getContext("2d").scale(ratio, ratio)
        signaturePadRef.current.clear() // Otherwise isEmpty() might return incorrect value
      }

      window.addEventListener("resize", resizeCanvas)
      resizeCanvas()

      return () => {
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [])

  useEffect(() => {
    if (signaturePadRef.current && value) {
      signaturePadRef.current.fromDataURL(value)
    }
  }, [value])

  const handleEnd = useCallback(() => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      onChange(signaturePadRef.current.toDataURL())
    }
  }, [onChange])

  const clearSignature = useCallback(() => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear()
      onChange("")
    }
  }, [onChange])

  return (
    <div className="relative w-full h-48">
      <canvas
        ref={canvasRef}
        className="border rounded touch-action-none w-full h-full"
        onTouchEnd={handleEnd}
        onMouseUp={handleEnd}
      />
      <button
        onClick={clearSignature}
        className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded px-2 py-1 text-sm"
      >
        Limpiar
      </button>
    </div>
  )
}

export default Signature

