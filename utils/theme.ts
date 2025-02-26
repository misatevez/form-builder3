"use client"
import { useContext } from 'react';
import { ThemeContext, type ThemeContextType } from '@/context/ThemeContext';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  inputBorderColor: string;
  inputBackgroundColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
}

export const defaultTheme: Theme = {
  primaryColor: '#003937',
  secondaryColor: '#ffffff',
  textColor: '#37352f',
  backgroundColor: '#f3f4f6',
  inputBorderColor: '#d1d5db',
  inputBackgroundColor: '#e5e7eb',
  buttonBackgroundColor: '#315755',
  buttonTextColor: '#ffffff',
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return {
      buttonBackgroundColor: 'bg-primary',
      buttonTextColor: 'text-primary-foreground'
    } as ThemeContextType;
  }
  return context;
}
