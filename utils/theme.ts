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
  primaryColor: '#003937',
  secondaryColor: '#ffffff',
  textColor: '#37352f',
  backgroundColor: '#f3f4f6',
  inputBorderColor: '#d1d5db',
  inputBackgroundColor: '#e5e7eb',
  buttonBackgroundColor: '#315755',
  buttonTextColor: '#ffffff',
};

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);
