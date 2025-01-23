"use client"

    import Link from "next/link"
    import { useRouter } from "next/navigation"
    import { Button } from "@/components/ui/button"
    import { useTheme } from "@/utils/theme"
    import { createClient } from "@/lib/supabase-browser"
    import { useAuth } from "@/components/auth/AuthContext"

    export function Navbar() {
      const { primaryColor, textColor } = useTheme()
      const router = useRouter()
      const { user, loading } = useAuth()
      const supabase = createClient()

      const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error("Error signing out:", error)
        } else {
          router.push("/login")
        }
      }

      if (loading) {
        return null; // Or a loading indicator
      }

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
