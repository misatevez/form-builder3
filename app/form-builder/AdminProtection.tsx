"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/AuthContext"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Correo electrónico con permisos de administrador
const ADMIN_EMAIL = "apps@greenenergy.cr"

export function AdminProtection({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!loading) {
      // Verificar si el usuario está autenticado y es administrador
      if (user && user.email === ADMIN_EMAIL) {
        setIsAuthorized(true)
      } else {
        // Redirigir después de un breve retraso para mostrar el mensaje
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
      setIsChecking(false)
    }
  }, [user, loading, router])

  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Acceso denegado</AlertTitle>
          <AlertDescription>
            No tienes permisos para acceder a esta página. Serás redirigido al dashboard.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return <>{children}</>
} 