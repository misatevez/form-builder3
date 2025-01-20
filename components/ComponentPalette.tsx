import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import type { ComponentType } from "../types/form"
import { useFormContext } from "../context/FormContext"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  TextIcon,
  HashIcon,
  MailIcon,
  AlignLeftIcon,
  ListIcon,
  ToggleLeftIcon,
  CalendarIcon,
  ClockIcon,
  FileSlidersIcon as SliderIcon,
  BarChartIcon,
  StarIcon,
  PaletteIcon,
  TypeIcon,
  SearchIcon,
  PenToolIcon,
  ImageIcon,
  TableIcon,
} from "lucide-react"

const componentIcons = {
  text: TextIcon,
  number: HashIcon,
  email: MailIcon,
  textarea: AlignLeftIcon,
  select: ListIcon,
  checkbox: ToggleLeftIcon,
  radio: ToggleLeftIcon,
  switch: ToggleLeftIcon,
  date: CalendarIcon,
  time: ClockIcon,
  slider: SliderIcon,
  progress: BarChartIcon,
  rating: StarIcon,
  color: PaletteIcon,
  richtext: TypeIcon,
  autocomplete: SearchIcon,
  signature: PenToolIcon,
  photo: ImageIcon,
  dynamicTable: TableIcon,
}

export function ComponentPalette() {
  const { activeTab } = useFormContext()

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

  const isDisabled = activeTab === "vista_previa"

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <Droppable droppableId="componentPalette" type="component" isDropDisabled={isDisabled}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {components.map((type, index) => (
                <Draggable
                  key={`palette-${type}`}
                  draggableId={`palette-${type}`}
                  index={index}
                  isDragDisabled={isDisabled}
                >
                  {(provided, snapshot) => {
                    const Icon = componentIcons[type] || TextIcon
                    return (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Button
                          variant="outline"
                          className={`w-full justify-start ${snapshot.isDragging ? "ring-2 ring-primary" : ""} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={isDisabled}
                        >
                          <Icon className="mr-2 h-4 w-4" />
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
      </ScrollArea>
    </div>
  )
}

