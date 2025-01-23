"use client"

import { useAuth } from "@/components/auth/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? <>{children}</> : null
}

