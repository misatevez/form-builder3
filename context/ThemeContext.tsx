"use client"

import React, { createContext, useState } from 'react'

// Definir los valores por defecto directamente aquí
const defaultThemeValues = {
  primaryColor: '#003937',
  secondaryColor: '#ffffff',
  textColor: '#37352f',
  backgroundColor: '#f3f4f6',
  inputBorderColor: '#d1d5db',
  inputBackgroundColor: '#e5e7eb',
  buttonBackgroundColor: '#315755',
  buttonTextColor: '#ffffff',
};

export interface ThemeContextType {
  buttonBackgroundColor: string
  buttonTextColor: string
  primaryColor?: string
  secondaryColor?: string
  textColor?: string
  backgroundColor?: string
  inputBorderColor?: string
  inputBackgroundColor?: string
}

export const ThemeContext = createContext<ThemeContextType>({
  buttonBackgroundColor: 'bg-primary',
  buttonTextColor: 'text-primary-foreground',
  primaryColor: defaultThemeValues.primaryColor,
  secondaryColor: defaultThemeValues.secondaryColor,
  textColor: defaultThemeValues.textColor,
  backgroundColor: defaultThemeValues.backgroundColor,
  inputBorderColor: defaultThemeValues.inputBorderColor,
  inputBackgroundColor: defaultThemeValues.inputBackgroundColor,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<ThemeContextType>({
    buttonBackgroundColor: 'bg-primary',
    buttonTextColor: 'text-primary-foreground',
    primaryColor: defaultThemeValues.primaryColor,
    secondaryColor: defaultThemeValues.secondaryColor,
    textColor: defaultThemeValues.textColor,
    backgroundColor: defaultThemeValues.backgroundColor,
    inputBorderColor: defaultThemeValues.inputBorderColor,
    inputBackgroundColor: defaultThemeValues.inputBackgroundColor,
  });

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
} 