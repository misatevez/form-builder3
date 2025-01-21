import { Suspense, useEffect } from "react"
import { FormGrid } from "@/components/FormGrid"
import { DashboardHeader } from "@/components/DashboardHeader"


export default function HomePage() {


  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />

      <Suspense fallback={<div>Cargando formularios...</div>}>
        <FormGrid />
      </Suspense>
    </div>
  )
}
