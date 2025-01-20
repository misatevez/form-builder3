import { useTheme } from "@/utils/theme"

export function Footer() {
  const { primaryColor, textColor } = useTheme()
  return (
    <footer className="border-t" style={{ backgroundColor: primaryColor }}>
      <div className="container mx-auto px-4 py-4">
        <p className="text-center" style={{ color: '#ffffff' }}>© {new Date().getFullYear()} greenenergy. All rights reserved.</p>
      </div>
    </footer>
  )
}
