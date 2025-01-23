"use client"

import { useAuth } from "./AuthContext"

export function AuthWrapper({ children }) {
  const { user } = useAuth()

  if (!user) {
    return null // or a loading indicator
  }

  return <>{children}</>
}
