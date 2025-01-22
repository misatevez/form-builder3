import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import type { ComponentType } from "../types/form"
import { Button } from "@/components/ui/button"
import { componentIcons } from "../utils/componentIcons"

const components: ComponentType[] = [
  "text",
  "number",
  "email",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "switch",
  "date",
  "time",
  "slider",
  "progress",
  "rating",
  "color",
  "richtext",
  "autocomplete",
  "signature",
  "photo",
  "dynamicTable",
]

export function ComponentPalette() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <Droppable droppableId="componentPalette" type="component" isDropDisabled={true}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {components.map((type, index) => (
              <Draggable key={`palette-${type}`} draggableId={`palette-${type}`} index={index}>
                {(provided, snapshot) => {
                  const Icon = componentIcons[type]
                  return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Button
                        variant="outline"
                        className={`w-full justify-start ${snapshot.isDragging ? "ring-2 ring-primary" : ""}`}
                      >
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    </div>
                  )
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
