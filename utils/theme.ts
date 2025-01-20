import { createContext, useContext } from 'react';

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
  primaryColor: '#3b82f6',
  secondaryColor: '#10b981',
  textColor: '#1f2937',
  backgroundColor: '#ffffff',
  inputBorderColor: '#d1d5db',
  inputBackgroundColor: '#f3f4f6',
  buttonBackgroundColor: '#3b82f6',
  buttonTextColor: '#ffffff',
};

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

