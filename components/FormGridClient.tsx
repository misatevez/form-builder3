"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormEntriesModal } from "./FormEntriesModal"
import { useToast } from "@/components/ui/use-toast"

export function FormGridClient({ forms }) {
  const { toast } = useToast()
  const [selectedForm, setSelectedForm] = useState(null)
  const [isEntriesModalOpen, setIsEntriesModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {forms.map((form) => (
        <Card key={form.id}>
          <CardHeader>
            <CardTitle>{form.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Created: {new Date(form.created_at).toLocaleDateString()}
            </p>
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  setSelectedForm(form)
                  setIsEntriesModalOpen(true)
                }}
              >
                Ver entradas
              </Button>
            </div>
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
