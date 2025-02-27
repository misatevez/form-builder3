"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormEntriesModal } from "./FormEntriesModal"
import { useTheme } from "@/utils/theme"
import { FileText, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-browser"
import { useToast } from "@/components/ui/use-toast"

export function FormGridClient({ forms: initialForms }) {
  const [forms, setForms] = useState(initialForms || [])
  const [selectedForm, setSelectedForm] = useState(null)
  const [isEntriesModalOpen, setIsEntriesModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { textColor, primaryColor } = useTheme()
  const router = useRouter()
  const { toast } = useToast()

  // Función para cargar los formularios directamente desde el cliente
  const loadForms = async () => {
    setIsRefreshing(true)
    try {
      const { data, error } = await supabase
        .from("forms")
        .select("id, name, data, created_at")
        .order("created_at", { ascending: false })

      if (error) throw error
      
      setForms(data || [])
      
      toast({
        title: "Lista actualizada",
        description: "La lista de formularios se ha actualizado correctamente",
      })
    } catch (error) {
      console.error("Error al cargar formularios:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los formularios",
        variant: "destructive"
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Actualizar los formularios cuando cambia initialForms
  useEffect(() => {
    setForms(initialForms || [])
  }, [initialForms])

  // Función para actualizar la lista de formularios
  const refreshForms = async () => {
    // Intentamos primero con router.refresh() para actualizar el componente del servidor
    router.refresh()
    
    // Y también cargamos los datos directamente desde el cliente
    await loadForms()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Formularios disponibles</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshForms}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>
      
      {forms.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">No hay formularios disponibles</p>
        </div>
      ) : (
        forms.map((form) => (
          <Card key={form.id} className="border">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <CardTitle style={{ color: textColor }} className="text-sm font-medium">
                  {form.name}
                </CardTitle>
              </div>
              <Button
                onClick={() => {
                  setSelectedForm(form)
                  setIsEntriesModalOpen(true)
                }}
                size="sm"
                style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Ver Formularios
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {selectedForm && (
        <FormEntriesModal
          isOpen={isEntriesModalOpen}
          onClose={() => setIsEntriesModalOpen(false)}
          form={selectedForm}
        />
      )}
    </div>
  )
}
