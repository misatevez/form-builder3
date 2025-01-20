import type React from "react"
import { memo, useCallback } from "react"
import type { FormComponent } from "../types/form"
import { useFormContext } from "../context/FormContext"
import TextInput from "./form-elements/TextInput"
import Select from "./form-elements/Select"
import Checkbox from "./form-elements/Checkbox"
import { Trash2, GripVertical, Settings } from "lucide-react"
import { Draggable } from "react-beautiful-dnd"
import DatePicker from "@/components/form-elements/DatePicker"
import TimePicker from "@/components/form-elements/TimePicker"
import Slider from "@/components/form-elements/Slider"
import ProgressBar from "@/components/form-elements/ProgressBar"
import Rating from "@/components/form-elements/Rating"
import ColorPicker from "@/components/form-elements/ColorPicker"
import RichTextEditor from "@/components/form-elements/RichTextEditor"
import Autocomplete from "@/components/form-elements/Autocomplete"
import Signature from "@/components/form-elements/Signature"
import PhotoUpload from "@/components/form-elements/PhotoUpload"
import DynamicTable from "@/components/form-elements/DynamicTable"
import { Button } from "@/components/ui/button"

interface RenderComponentProps {
  component: FormComponent
  index: number
  id: string
  sectionId: string
  setActivePropertiesTab: (tab: "element" | "form") => void
}

export const RenderComponent = memo(
  ({ component, index, id, sectionId, setActivePropertiesTab }: RenderComponentProps) => {
    const { removeComponent, updateComponent, setSelectedElementId } = useFormContext()

    const handleRemove = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        removeComponent(sectionId, id)
      },
      [removeComponent, sectionId, id],
    )

    const handleUpdate = useCallback(
      (updates: Partial<FormComponent>) => {
        updateComponent(sectionId, id, updates)
      },
      [updateComponent, sectionId, id],
    )

    const handleSelectComponent = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedElementId(id)
        setActivePropertiesTab("element")
      },
      [setSelectedElementId, setActivePropertiesTab, id],
    )

    const renderComponentByType = useCallback(() => {
      switch (component.type) {
        case "text":
        case "email":
          return <TextInput {...component} onChange={(value) => handleUpdate({ value })} />
        case "number":
          return (
            <TextInput
              {...component}
              type="number"
              onChange={(value) => handleUpdate({ value: Number.parseFloat(value) })}
            />
          )
        case "textarea":
          return <TextInput {...component} multiline onChange={(value) => handleUpdate({ value })} />
        case "select":
          return <Select {...component} onChange={(value) => handleUpdate({ value })} />
        case "checkbox":
          return <Checkbox {...component} onChange={(value) => handleUpdate({ value })} />
        case "date":
          return <DatePicker {...component} onChange={(value) => handleUpdate({ value: value?.toISOString() })} />
        case "time":
          return <TimePicker {...component} onChange={(value) => handleUpdate({ value })} />
        case "slider":
          return <Slider {...component} onChange={(value) => handleUpdate({ value })} />
        case "progress":
          return <ProgressBar {...component} />
        case "rating":
          return <Rating {...component} onChange={(value) => handleUpdate({ value })} />
        case "color":
          return <ColorPicker {...component} onChange={(value) => handleUpdate({ value })} />
        case "richtext":
          return <RichTextEditor {...component} onChange={(value) => handleUpdate({ value })} />
        case "autocomplete":
          return <Autocomplete {...component} onChange={(value) => handleUpdate({ value })} />
        case "signature":
          return <Signature {...component} onChange={(value) => handleUpdate({ value })} />
        case "photo":
          return <PhotoUpload {...component} onChange={(value) => handleUpdate({ value })} />
        case "dynamicTable":
          return <DynamicTable {...component} onChange={(value) => handleUpdate({ value })} />
        default:
          return null
      }
    }, [component, handleUpdate])

    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`mb-4 p-4 bg-white rounded-lg shadow-sm border ${snapshot.isDragging ? "border-primary" : "border-gray-200"}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div {...provided.dragHandleProps} className="cursor-move">
                <GripVertical size={20} />
              </div>
              <div>
                <Button onClick={handleSelectComponent} variant="ghost" size="sm" className="mr-2">
                  <Settings size={16} />
                </Button>
                <Button onClick={handleRemove} variant="ghost" size="sm" className="text-destructive">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            {renderComponentByType()}
          </div>
        )}
      </Draggable>
    )
  },
)

export default RenderComponent

