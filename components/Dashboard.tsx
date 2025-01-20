import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function Dashboard() {
  const recentForms = [
    { id: 1, name: "Customer Feedback", lastEdited: "2023-05-15" },
    { id: 2, name: "Event Registration", lastEdited: "2023-05-14" },
    { id: 3, name: "Employee Survey", lastEdited: "2023-05-13" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Form
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentForms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <CardTitle>{form.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Last edited: {form.lastEdited}</p>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  View Responses
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
