import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Section } from "../Section"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FormSection } from "../types/form"
import { useFormContext } from "../../context/FormContext"

interface FormBuilderContentProps {
  sections: FormSection[]
}

export function FormBuilderContent({ sections }: FormBuilderContentProps) {
  const { setActivePropertiesTab } = useFormContext();
  
  return (
    <ScrollArea className="h-full">
      <Droppable droppableId="form-sections" type="section">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-4 ${snapshot.isDraggingOver ? "bg-secondary/50" : ""}`}
          >
            {sections.map((section, index) => (
              <Section key={section.id} section={section} index={index} setActivePropertiesTab={setActivePropertiesTab} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ScrollArea>
  )
}
