'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ThemeInfo } from '@/types'

interface ThemeContextValue {
  colors: ThemeInfo
  setColors: (colors: ThemeInfo) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const defaultColors = {
  name: 'default',
  primary: '#ffffff',
  secondary: '#888888',
  accent: '#ffffff',
  error: '#ffffff',
  warning: '#ffffff',
  success: '#ffffff',
  info: '#888888',
  text: '#ffffff',
  textMuted: '#888888',
  background: '#131010',
  backgroundPanel: '#111111',
  backgroundElement: '#333333',
  border: '#333333',
  borderActive: '#ffffff',
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
