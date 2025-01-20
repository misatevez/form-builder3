import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/utils/theme"

export function Header() {
  const { primaryColor, textColor } = useTheme()
  return (
    <header className="border-b" style={{ backgroundColor: primaryColor }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center" />
    </header>
  )
}
