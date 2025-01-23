import { Suspense } from "react"
import { DashboardHeader } from "@/components/DashboardHeader"
import { FormGridServer } from "@/components/server/FormGridServer"
import  {AuthWrapper}  from "@/components/auth/AuthWrapper"

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <Suspense fallback={<div>Cargando formularios...</div>}>
          <FormGridServer />
        </Suspense>
      </div>
    </AuthWrapper>
  )
}

