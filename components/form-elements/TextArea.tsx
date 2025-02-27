"use client"

import React, { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { FormComponent } from "../../types/form"
import { cn } from "@/lib/utils"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TextAreaProps extends FormComponent {
  value: string
  onChange: (value: string) => void
}

const TextArea: React.FC<TextAreaProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  validation,
  className,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Detectar si estamos en un dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  // Altura predeterminada según el dispositivo
  const defaultHeight = isMobile ? "120px" : "100px"
  const expandedHeight = isMobile ? "300px" : "400px"
  
  return (
    <div className={cn("space-y-2 relative", className)}>
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {validation?.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "Minimizar" : "Expandir"}
        >
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
      
      <Textarea
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "resize-none transition-all duration-200 ease-in-out",
          expanded ? "min-h-[300px]" : "min-h-[120px]"
        )}
        style={{ 
          height: expanded ? expandedHeight : defaultHeight,
          overflowY: "auto"
        }}
        required={validation?.required}
        {...props}
      />
      
      {isMobile && (
        <div className="text-xs text-muted-foreground mt-1">
          {expanded ? 
            "Toca el botón para minimizar" : 
            "Toca el botón para expandir y ver más contenido"
          }
        </div>
      )}
    </div>
  )
}

export default TextArea
