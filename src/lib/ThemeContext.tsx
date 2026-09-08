'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ThemeInfo } from '@/types'

interface ThemeContextValue {
  colors: ThemeInfo
  setColors: (colors: ThemeInfo) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const defaultColors = {
  name: 'catppuccin',
  primary: '#cba6f7',
  secondary: '#89b4fa',
  accent: '#f38ba8',
  error: '#f38ba8',
  warning: '#fab387',
  success: '#a6e3a1',
  info: '#89dceb',
  text: '#cdd6f4',
  textMuted: '#6c7086',
  background: '#1e1e2e',
  backgroundPanel: '#181825',
  backgroundElement: '#313244',
  border: '#45475a',
  borderActive: '#cba6f7',
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState(defaultColors)

  return (
    <ThemeContext.Provider value={{ colors, setColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeColors() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeColors must be used within ThemeContextProvider')
  return context
}
