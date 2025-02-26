import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"
import { AuthProvider } from "@/components/auth/AuthContext"
import { createServerSupabaseClient } from "@/lib/supabase-auth"
import { ThemeProvider } from '@/context/ThemeContext'

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
