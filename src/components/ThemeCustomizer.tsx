'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import ThemeCustomizerPanel from '@/components/ThemeCustomizerPanel'

const defaultColors = {
  name: 'custom',
  primary: '#fab283',
  secondary: '#5c9cf5',
  accent: '#9d7cd8',
  background: '#0a0a0a',
}

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [colors, setColors] = useState(defaultColors)

  const handleColorsChange = (newColors: typeof defaultColors) => {
    setColors(newColors)
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.style.setProperty('--primary', newColors.primary)
      root.style.setProperty('--secondary', newColors.secondary)
      root.style.setProperty('--accent', newColors.accent)
      root.style.setProperty('--background', newColors.background)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg hover:opacity-90"
        aria-label="Open theme customizer"
      >
        <Plus className="h-6 w-6" />
      </button>

      <ThemeCustomizerPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        colors={colors}
        onColorsChange={handleColorsChange}
      />
    </>
  )
}
