import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/utils/theme"


export function Navbar() {
  const { primaryColor, textColor } = useTheme()


  return (
    <nav className="border-b" style={{ backgroundColor: primaryColor }}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl font-bold">
          <img src="/greenenergy-logo.svg" alt="GreenEnergy Logo" className="h-8 mr-2" />
        </Link>
        
      </div>
    </nav>
  )
}
