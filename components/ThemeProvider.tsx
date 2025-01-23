"use client";

    import * as React from "react";
    import { ThemeContext, defaultTheme } from "@/utils/theme";

    interface ThemeProviderProps {
      children: React.ReactNode;
    }

    export function ThemeProvider({ children }: ThemeProviderProps) {
      return (
        <ThemeContext.Provider value={defaultTheme}>
          {children}
        </ThemeContext.Provider>
      );
    }
