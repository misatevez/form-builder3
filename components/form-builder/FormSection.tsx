"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormComponent } from "./FormComponent"
import { Pencil, Trash2, GripVertical, CheckCircle } from "lucide-react"
import { FormSection as FormSectionType } from "./types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

interface FormSectionProps {
  section: FormSectionType;
  index: number;
  updateSection: (sectionId: string, updates: Partial<FormSectionType>) => void;
  removeSection: (sectionId: string) => void;
  updateComponent: (sectionId: string, componentId: string, updates: any) => void;
  removeComponent: (sectionId: string, componentId: string) => void;
  isActive: boolean;
  onActivate: () => void;
  isDragging?: boolean;
}

export function FormSection({ 
  section, 
  index, 
  updateSection, 
  removeSection, 
  updateComponent, 
  removeComponent,
  isActive,
  onActivate,
  isDragging
}: FormSectionProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [title, setTitle] = React.useState(section.title)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: section.id,
    data: {
      type: "section",
      section
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTitleSave = () => {
    updateSection(section.id, { title })
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${
        isActive ? "ring-2 ring-primary" : ""
      } ${isDragging ? "opacity-50" : ""}`}
      onClick={() => !isActive && onActivate()}
      {...attributes}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={title}
                onChange={handleTitleChange}
                className="h-8 w-[200px]"
                autoFocus
              />
              <Button size="sm" onClick={handleTitleSave}>
                Guardar
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              {isActive && (
                <CheckCircle className="h-4 w-4 text-primary" />
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              removeSection(section.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div
        className={`p-4 min-h-[100px]`}
        data-section-id={section.id}
      >
        <SortableContext
          items={section.components.map(component => component.id)}
          strategy={verticalListSortingStrategy}
        >
          {section.components.length === 0 ? (
            <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">
                {isActive 
                  ? "Haz clic en un componente para añadirlo aquí" 
                  : "Haz clic para activar esta sección"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {section.components.map((component, index) => (
                <FormComponent
                  key={component.id}
                  component={component}
                  index={index}
                  sectionId={section.id}
                  updateComponent={updateComponent}
                  removeComponent={removeComponent}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  )
} 