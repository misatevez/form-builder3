"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormTemplate } from "./types"
import { Edit, RefreshCw, Search, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

interface TemplateSelectorProps {
  templates: FormTemplate[]
  isLoading: boolean
  onSelect: (template: FormTemplate) => void
  onRefresh: () => void
}

export function TemplateSelector({ templates, isLoading, onSelect, onRefresh }: TemplateSelectorProps) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<FormTemplate | null>(null)
  
  const filteredTemplates = templates.filter(template => 
    template.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const handleDeleteClick = (template: FormTemplate, e: React.MouseEvent) => {
    e.stopPropagation()
    setTemplateToDelete(template)
    setDeleteDialogOpen(true)
  }
  
  const confirmDelete = async () => {
    if (!templateToDelete) return
    
    try {
      const { error } = await supabase
        .from('forms')
        .delete()
        .eq('id', templateToDelete.id)
      
      if (error) throw error
      
      toast({
        title: "Plantilla eliminada",
        description: `Se ha eliminado la plantilla "${templateToDelete.name}"`,
      })
      
      onRefresh()
    } catch (error) {
      console.error('Error al eliminar:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la plantilla",
        variant: "destructive"
      })
    } finally {
      setDeleteDialogOpen(false)
      setTemplateToDelete(null)
    }
  }
  
  // Función para extraer la información relevante de la estructura JSON
  const getTemplateInfo = (template: any) => {
    // Si el template tiene la estructura directa
    if (template.sections) {
      return {
        name: template.name,
        sectionsCount: template.sections?.length || 0,
        componentsCount: template.sections?.reduce((acc: number, section: any) => 
          acc + (section.components?.length || 0), 0) || 0
      }
    }
    
    // Si el template tiene la estructura dentro de data
    if (template.data) {
      return {
        name: template.data.name || template.name,
        sectionsCount: template.data.sections?.length || 0,
        componentsCount: template.data.sections?.reduce((acc: number, section: any) => 
          acc + (section.components?.length || 0), 0) || 0
      }
    }
    
    // Estructura desconocida
    return {
      name: template.name || "Sin nombre",
      sectionsCount: 0,
      componentsCount: 0
    }
  }
  
  // Función para preparar el template para el editor
  const prepareTemplateForEditor = (template: any) => {
    // Si ya tiene la estructura esperada
    if (template.sections) {
      return template;
    }
    
    // Si la estructura está dentro de data
    if (template.data) {
      return {
        id: template.id,
        name: template.data.name || template.name,
        sections: template.data.sections || [],
        theme: template.data.theme || {}
      };
    }
    
    // Estructura desconocida, devolver un objeto básico
    return {
      id: template.id,
      name: template.name || "Sin nombre",
      sections: [],
      theme: {}
    };
  }
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Plantillas de Formularios</CardTitle>
          <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar plantillas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                {searchTerm ? "No se encontraron plantillas" : "No hay plantillas disponibles"}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredTemplates.map(template => {
                  const info = getTemplateInfo(template);
                  return (
                    <div 
                      key={template.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => onSelect(prepareTemplateForEditor(template))}
                    >
                      <div>
                        <h3 className="font-medium">{info.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {info.sectionsCount} secciones, {info.componentsCount} componentes
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={(e) => {
                          e.stopPropagation()
                          onSelect(prepareTemplateForEditor(template))
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => handleDeleteClick(template, e)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la plantilla "{templateToDelete?.name || templateToDelete?.data?.name}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 