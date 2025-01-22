"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormEntriesModal } from "./FormEntriesModal"
import { useTheme } from "@/utils/theme"
import { FileText } from "lucide-react"

export function FormGridClient({ forms }) {
  const [selectedForm, setSelectedForm] = useState(null)
  const [isEntriesModalOpen, setIsEntriesModalOpen] = useState(false)
  const { textColor, primaryColor } = useTheme()

  return (
    <div className="space-y-4">
      {forms.map((form) => (
        <Card key={form.id} className="border">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <CardTitle style={{ color: textColor }} className="text-sm font-medium">
                {form.name}
              </CardTitle>
            </div>
            <Button
              onClick={() => {
                setSelectedForm(form)
                setIsEntriesModalOpen(true)
              }}
              size="sm"
              style={{ backgroundColor: primaryColor, color: '#ffffff' }}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Ver Formularios
            </Button>
          </CardContent>
        </Card>
      ))}

      {selectedForm && (
        <FormEntriesModal
          isOpen={isEntriesModalOpen}
          onClose={() => setIsEntriesModalOpen(false)}
          form={selectedForm}
        />
      )}
    </div>
  )
}
