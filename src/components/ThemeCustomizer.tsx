'use client'

import { Plus, ArrowLeft } from 'lucide-react'
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
      root.style.setProperty('--primary', newColors.primary)
      root.style.setProperty('--secondary', newColors.secondary)
      root.style.setProperty('--background-panel', newColors.backgroundPanel)
      root.style.setProperty('--background-element', newColors.backgroundElement)
      root.style.setProperty('--border', newColors.border)
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-24 z-30 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-sm border border-[var(--foreground)]/10 bg-[var(--background)] px-3 py-1.5 shadow-md">
          <span className="text-sm text-[var(--muted)]">Create your theme</span>
          <ArrowLeft className="h-4 w-4 rotate-180 text-[var(--muted)]" />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-sm bg-[var(--foreground)] text-[var(--background)] shadow-lg hover:opacity-80"
          aria-label="Open theme customizer"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <ThemeCustomizerPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        colors={colors}
        onColorsChange={handleColorsChange}
      />
    </>
  )
}
