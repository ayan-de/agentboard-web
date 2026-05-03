'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import ThemeCustomizerPanel from '@/components/ThemeCustomizerPanel'
import { useThemeColors } from '@/lib/ThemeContext'

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const { colors, setColors } = useThemeColors()

  const handleColorsChange = (newColors: typeof colors) => {
    setColors(newColors)
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.style.setProperty('--foreground', newColors.primary)
      root.style.setProperty('--muted', newColors.secondary)
      root.style.setProperty('--accent', newColors.accent)
      root.style.setProperty('--background', newColors.background)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)] shadow-lg hover:opacity-80"
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
