import React from "react"
import { Button } from "@/components/ui/button"
import { Settings, Save } from "lucide-react"

interface FormBuilderHeaderProps {
  title: string
  onConfigClick: () => void
  onSave: () => void
  setSelectedElementId: (id: string | null) => void
  setActivePropertiesTab: (tab: "element" | "form") => void
}

export function FormBuilderHeader({
  title,
  onConfigClick,
  onSave,
  setSelectedElementId,
  setActivePropertiesTab,
}: FormBuilderHeaderProps) {
  return (
    <div className="bg-background border-b border-border px-4 py-3 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-foreground">{title || "Untitled Form"}</h2>
      <div className="flex gap-2">
        <Button
          onClick={() => {
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
        <Button onClick={onSave} variant="default" size="sm" className="flex items-center gap-2">
          <Save size={16} />
          Save
        </Button>
      </div>
    </div>
  )
}
