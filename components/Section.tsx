import React, { useCallback } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import type { FormSection, FormComponent } from "../types/form"
import { RenderComponent } from "./RenderComponent"
import { useFormContext } from "../context/FormContext"
import { Trash2, GripVertical, ChevronDown, ChevronUp, Settings } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SectionProps {
  section: FormSection
  index: number
  setActivePropertiesTab: (tab: "element" | "form") => void
}

export const Section = React.memo(function Section({ section, index, setActivePropertiesTab }: SectionProps) {
  const { removeSection, updateSection, setSelectedElementId } = useFormContext()
  const [isOpen, setIsOpen] = React.useState(true)

  const handleDeleteSection = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      removeSection(section.id)
    },
    [removeSection, section.id],
  )

  const handleUpdateSection = React.useCallback(
    (updates: Partial<FormSection>) => {
      updateSection(section.id, updates)
    },
    [updateSection, section.id],
  )

  const handleTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      handleUpdateSection({ title: e.target.value })
    },
    [handleUpdateSection],
  )

  const handleDescriptionChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleUpdateSection({ description: e.target.value })
    },
    [handleUpdateSection],
  )

  const handleSectionClick = React.useCallback(() => {
    setSelectedElementId(section.id)
  }, [setSelectedElementId, section.id])

  const renderComponents = useCallback(() => {
    return (section.components || []).map((component: FormComponent, index: number) => (
      <RenderComponent
        key={component.id}
        component={component}
        index={index}
        id={component.id}
        sectionId={section.id}
        setActivePropertiesTab={setActivePropertiesTab}
      />
    ))
  }, [section.components, section.id, setActivePropertiesTab])

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided, snapshot) => (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className={`mb-4 bg-white rounded-lg shadow ${snapshot.isDragging ? "border-2 border-primary" : ""}`}
        >
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <CollapsibleTrigger asChild>
              <div className="flex justify-between items-center w-full p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center flex-grow">
                  <div {...provided.dragHandleProps} className="cursor-move mr-2" aria-label="Drag to reorder section">
                    <GripVertical size={20} />
                  </div>
                  <Input
                    type="text"
                    value={section.title}
                    onChange={handleTitleChange}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded flex-grow"
                    aria-label="Section title"
                  />
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSectionClick}
                    className="mr-2"
                    aria-label="Configure section"
                  >
                    <Settings size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDeleteSection}
                    className="mr-2 text-destructive"
                    aria-label="Delete section"
                  >
                    <Trash2 size={16} />
                  </Button>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4">
                <Textarea
                  value={section.description || ""}
                  onChange={handleDescriptionChange}
                  className="w-full mb-4"
                  placeholder="Add a description for this section"
                  aria-label="Section description"
                />
                <Droppable droppableId={section.id} type="component">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[50px] p-2 border-2 border-dashed rounded-md ${
                        snapshot.isDraggingOver ? "border-primary bg-primary/10" : "border-gray-300"
                      }`}
                    >
                      {renderComponents()}
                      {provided.placeholder}
                      {section.components.length === 0 && !snapshot.isDraggingOver && (
                        <div className="text-center py-4 text-gray-500">Drag and drop components here</div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}
    </Draggable>
  )
})

