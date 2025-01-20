import type React from "react"
import { useFormContext } from "../context/FormContext"
import type { FormComponent, FormSection } from "../types/form"
import TextInput from "./form-elements/TextInput"
import Select from "./form-elements/Select"
import Checkbox from "./form-elements/Checkbox"
import DatePicker from "./form-elements/DatePicker"
import DynamicTable from "./form-elements/DynamicTable"
import PhotoUpload from "./form-elements/PhotoUpload"
import Signature from "./form-elements/Signature"
import TimePicker from "./form-elements/TimePicker"
import Slider from "./form-elements/Slider"
import Rating from "./form-elements/Rating"
import ColorPicker from "./form-elements/ColorPicker"
import RichTextEditor from "./form-elements/RichTextEditor"
import Autocomplete from "./form-elements/Autocomplete"

export const LivePreview: React.FC = () => {
  const { template, data, updateData } = useFormContext()

  const renderComponent = (component: FormComponent) => {
    switch (component.type) {
      case "text":
      case "email":
        return (
          <TextInput
            {...component}
            value={data[component.id] || ""}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "select":
        return (
          <Select
            {...component}
            value={data[component.id] || ""}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "checkbox":
        return (
          <Checkbox
            {...component}
            checked={data[component.id] || false}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "date":
        return (
          <DatePicker
            {...component}
            value={data[component.id] || undefined}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "time":
        return (
          <TimePicker
            {...component}
            value={data[component.id] || ""}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "slider":
        return (
          <Slider
            {...component}
            value={data[component.id] || 0}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "rating":
        return (
          <Rating
            {...component}
            value={data[component.id] || 0}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "color":
        return (
          <ColorPicker
            {...component}
            value={data[component.id] || "#000000"}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "richtext":
        return (
          <RichTextEditor
            {...component}
            value={data[component.id] || ""}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "autocomplete":
        return (
          <Autocomplete
            {...component}
            value={data[component.id] || ""}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "signature":
        return (
          <Signature
            {...component}
            value={data[component.id] || ""}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "photo":
        return (
          <PhotoUpload
            {...component}
            value={data[component.id] || []}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      case "dynamicTable":
        return (
          <DynamicTable
            {...component}
            value={data[component.id] || []}
            onChange={(value) => updateData({ [component.id]: value })}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="p-4 space-y-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">{template.name || "Untitled Form"}</h2>
      {template.sections.map((section: FormSection) => (
        <div key={section.id} className="space-y-4">
          <h3 className="text-xl font-semibold">{section.title}</h3>
          {section.components.map((component: FormComponent) => (
            <div key={component.id}>{renderComponent(component)}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

