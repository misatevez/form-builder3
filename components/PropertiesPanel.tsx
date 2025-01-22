import React from "react"
import { useFormContext } from "../context/FormContext"
import { FormProperties } from "./FormProperties"
import { ComponentProperties } from "./ComponentProperties"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PropertiesPanel() {
  const { selectedElementId } = useFormContext()

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <Tabs defaultValue={selectedElementId === "form" ? "form" : "element"}>
        <TabsList className="w-full">
          <TabsTrigger value="element" className="flex-1">
            Element
          </TabsTrigger>
          <TabsTrigger value="form" className="flex-1">
            Form
          </TabsTrigger>
        </TabsList>
        <TabsContent value="element">
          <ComponentProperties />
        </TabsContent>
        <TabsContent value="form">
          <FormProperties />
        </TabsContent>
      </Tabs>
    </div>
  )
}
