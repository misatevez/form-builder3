import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          FormBuilder
        </Link>
        <div className="space-x-4">
          <Link href="/" className="px-4 py-2 rounded hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/form-builder" className="px-4 py-2 rounded hover:bg-gray-100">
            Form Builder
          </Link>
        </div>
      </div>
    </nav>
  )
}

