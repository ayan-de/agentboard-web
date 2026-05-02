'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ThemeInfo } from '@/types'

interface ThemeContextValue {
  colors: {
    name: string
    primary: string
    secondary: string
    accent: string
    background: string
  }
  setColors: (colors: ThemeContextValue['colors']) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const defaultColors = {
  name: 'custom',
  primary: '#fab283',
  secondary: '#5c9cf5',
  accent: '#9d7cd8',
  background: '#0a0a0a',
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
