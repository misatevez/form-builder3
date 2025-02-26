"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



export default function FormBuilderPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Form Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">El constructor de formularios ha sido eliminado.</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
