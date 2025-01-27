"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/utils/theme"
import { createClient } from "@/lib/supabase-browser"
import { useAuth } from "@/components/auth/AuthContext"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const { primaryColor, textColor } = useTheme()
  const router = useRouter()
  const { user, loading } = useAuth()
  const supabase = createClient()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
    } else {
      router.push("/login")
    }
  }

  if (loading) {
    return null // Or a loading indicator
  }

  return (
    <nav className="border-b" style={{ backgroundColor: primaryColor }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <img src="/greenenergy-logo.svg" alt="GreenEnergy Logo" className="h-8 mr-2" />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
             
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                 
                >
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <Link href="/login" passHref>
                <Button variant="outline" className="border-white hover:bg-white hover:text-black">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              className="text-black bg-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2">
            {user && (
              <>
               
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full mt-2"
                >
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <Link href="/login" passHref>
                <Button variant="outline" className="w-full border-white hover:bg-white hover:text-black">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
