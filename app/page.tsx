"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-6">FormBuilder</h1>

        <div className="space-x-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </main>
      <footer className="mt-8 text-sm text-gray-500">© 2025 greenenergy. All rights reserved.</footer>
    </div>
  )
}

