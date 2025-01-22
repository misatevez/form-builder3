import React from "react"
import { Button } from "@/components/ui/button"
import { Settings, Save, Database } from "lucide-react"

interface FormBuilderHeaderProps {
  title: string
  onConfigClick: () => void
  onSave: () => Promise<void>
  onDirectSave: () => Promise<void>
  setSelectedElementId: (id: string | null) => void
  setActivePropertiesTab: (tab: "element" | "form") => void
}

export function FormBuilderHeader({
  title,
  onConfigClick,
  onSave,
  onDirectSave,
  setSelectedElementId,
  setActivePropertiesTab,
}: FormBuilderHeaderProps) {
  const handleSaveClick = async () => {
    console.log("Save button clicked in FormBuilderHeader")
    try {
      await onSave()
      console.log("Save operation completed")
    } catch (error) {
      console.error("Error during save operation:", error)
    }
  }

  const handleDirectSaveClick = async () => {
    console.log("Direct Save button clicked in FormBuilderHeader")
    try {
      if (typeof onDirectSave === "function") {
        await onDirectSave()
        console.log("Direct Save operation completed")
      } else {
        console.error("onDirectSave is not a function")
      }
    } catch (error) {
      console.error("Error during Direct Save operation:", error)
    }
  }

  return (
    <div className="bg-background border-b border-border px-4 py-3 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-foreground">{title || "Untitled Form"}</h2>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            console.log("Configure button clicked")
            setSelectedElementId("form")
            setActivePropertiesTab("form")
            onConfigClick()
          }}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Configure
        </Button>
        <Button onClick={handleSaveClick} variant="default" size="sm" className="flex items-center gap-2">
          <Save size={16} />
          Save
        </Button>
        <Button onClick={handleDirectSaveClick} variant="secondary" size="sm" className="flex items-center gap-2">
          <Database size={16} />
          Direct Save to Supabase
        </Button>
      </div>
    </div>
  )
}
