"use client"

// Este archivo simplemente re-exporta el ThemeProvider desde context/ThemeContext.tsx
import { ThemeProvider } from '@/context/ThemeContext';
export { ThemeProvider };

import React from 'react';
import { ThemeContext, type ThemeContextType } from '@/context/ThemeContext';

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

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeValue: ThemeContextType = {
    buttonBackgroundColor: 'bg-primary',
    buttonTextColor: 'text-primary-foreground',
    primaryColor: defaultThemeValues.primaryColor,
    secondaryColor: defaultThemeValues.secondaryColor,
    textColor: defaultThemeValues.textColor,
    backgroundColor: defaultThemeValues.backgroundColor,
    inputBorderColor: defaultThemeValues.inputBorderColor,
    inputBackgroundColor: defaultThemeValues.inputBackgroundColor,
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
