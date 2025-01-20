import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Section } from "../Section"
import { ScrollArea } from "../../utils/imports"
import type { FormSection } from "../../types"
import { useFormContext } from "../../context/FormContext"

interface FormBuilderContentProps {
  sections: FormSection[]
}

export function FormBuilderContent({ sections }: FormBuilderContentProps) {
  const { setActivePropertiesTab } = useFormContext()

  return (
    <ScrollArea className="h-[calc(100vh-40px)]">
      <Droppable droppableId="form-sections" type="section">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-4 ${snapshot.isDraggingOver ? "bg-blue-100" : ""}`}
          >
            {sections.map((section, index) => (
              <Section
                key={section.id}
                section={section}
                index={index}
                setActivePropertiesTab={setActivePropertiesTab}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ScrollArea>
  )
}

