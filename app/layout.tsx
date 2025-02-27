import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"
import { AuthProvider } from "@/components/auth/AuthContext"
import { createServerSupabaseClient } from "@/lib/supabase-auth"
import { ThemeProvider } from '@/context/ThemeContext'
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("RootLayout - Server Session:", session);

  const metadata: Metadata = {
    title: "GreenEnergy Form Builder",
    description: "Crea y administra formularios de manera fácil y eficiente",
  }


  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider initialSession={session ? JSON.stringify(session) : null}>
            <Navbar />
            <main className="min-h-screen bg-background">{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
