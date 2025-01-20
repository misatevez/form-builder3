import { Suspense } from "react"
import { FormGrid } from "@/components/FormGrid"
import { DashboardHeader } from "@/components/DashboardHeader"

export const metadata = {
  title: "Dashboard | FormBuilder",
  description: "Manage your forms",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <Suspense fallback={<div>Loading forms...</div>}>
        <FormGrid />
      </Suspense>
    </div>
  )
}
