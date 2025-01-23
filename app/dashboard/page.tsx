"use client"
import { Suspense } from "react"
import { FormGrid } from "@/components/FormGrid"
import { DashboardHeader } from "@/components/DashboardHeader"
import AuthWrapper from "@/components/auth/AuthWrapper"
import { useAuth } from "@/components/auth/AuthContext"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return null // or a loading indicator
  }

  return (
    <AuthWrapper>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <Suspense fallback={<div>Cargando formularios...</div>}>
          <FormGrid />
        </Suspense>
      </div>
    </AuthWrapper>
  )
}

