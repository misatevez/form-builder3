import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FormBuilderLayoutProps {
  leftSidebar: React.ReactNode
  mainContent: React.ReactNode
  rightSidebar: React.ReactNode
}

export function FormBuilderLayout({ leftSidebar, mainContent, rightSidebar }: FormBuilderLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-border">
        <ScrollArea className="h-full">{leftSidebar}</ScrollArea>
      </aside>
      <main className="flex-1 overflow-hidden">{mainContent}</main>
      <aside className="w-80 border-l border-border">
        <ScrollArea className="h-full">{rightSidebar}</ScrollArea>
      </aside>
    </div>
  )
}
