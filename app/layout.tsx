"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeContext, defaultTheme } from "@/utils/theme";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContext.Provider value={defaultTheme}>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
          <Toaster />
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
