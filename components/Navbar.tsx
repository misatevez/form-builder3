"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/utils/theme"
import { createClient } from "@/lib/supabase-browser"
import { useAuth } from "@/components/auth/AuthContext"
import { Menu, X, LayoutDashboard, FileEdit } from "lucide-react"

// Correo electrónico con permisos de administrador
const ADMIN_EMAIL = "apps@greenenergy.cr"

export function Navbar() {
  const { primaryColor, textColor } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const supabase = createClient()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  
  // Verificar si el usuario actual es administrador
  const isAdmin = userEmail === ADMIN_EMAIL
  
  // Obtener el correo electrónico del usuario cuando se carga el componente
  useEffect(() => {
    if (user) {
      setUserEmail(user.email || "")
    }
  }, [user])
  
  // Verificar permisos para acceder a rutas protegidas
  useEffect(() => {
    // Si el usuario no es administrador y está intentando acceder a form-builder, redirigir al dashboard
    if (user && !isAdmin && pathname === "/form-builder") {
      router.push("/dashboard")
    }
  }, [pathname, isAdmin, user, router])

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
                  variant="secondary"
                  onClick={() => router.push('/dashboard')}
                  className={`flex items-center gap-2 ${pathname === "/dashboard" ? "bg-opacity-80" : ""}`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
                
                {/* Solo mostrar el botón de Constructor de Formularios si es admin */}
                {isAdmin && (
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/form-builder')}
                    className={`flex items-center gap-2 ${pathname === "/form-builder" ? "bg-opacity-80" : ""}`}
                  >
                    <FileEdit className="h-4 w-4" />
                    Constructor de Formularios
                  </Button>
                )}
                
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
                  variant="secondary"
                  onClick={() => {
                    router.push('/dashboard')
                    setIsMenuOpen(false)
                  }}
                  className="w-full mb-2 justify-start"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                
                {/* Solo mostrar el botón de Constructor de Formularios si es admin */}
                {isAdmin && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      router.push('/form-builder')
                      setIsMenuOpen(false)
                    }}
                    className="w-full mb-2 justify-start"
                  >
                    <FileEdit className="mr-2 h-4 w-4" />
                    Constructor de Formularios
                  </Button>
                )}
                
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  className="w-full"
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
