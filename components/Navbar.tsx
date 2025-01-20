import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/utils/theme"

export function Navbar() {
  const { primaryColor, textColor, backgroundColor } = useTheme()

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl font-bold">
          <img src="/greenenergy-logo.svg" alt="GreenEnergy Logo" className="h-8 mr-2" />
          <span style={{ color: textColor }}>FormBuilder</span>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="px-4 py-2 rounded hover:bg-gray-100" style={{ color: textColor }}>
            Dashboard
          </Link>
          <Link href="/form-builder" className="px-4 py-2 rounded hover:bg-gray-100" style={{ color: textColor }}>
            Form Builder
          </Link>
        </div>
      </div>
    </nav>
  )
}
