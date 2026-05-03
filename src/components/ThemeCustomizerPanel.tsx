'use client'

import { X } from 'lucide-react'
import ColorPalette from '@/components/ColorPalette'
import { ThemeInfo } from '@/types'

interface ThemeCustomizerPanelProps {
  isOpen: boolean
  onClose: () => void
  colors: ThemeInfo
  onColorsChange: (colors: ThemeInfo) => void
}

export default function ThemeCustomizerPanel({
  isOpen,
  onClose,
  colors,
  onColorsChange,
}: ThemeCustomizerPanelProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 transform overflow-y-auto bg-[var(--background)] shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--foreground)]/10 p-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Theme Customizer
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--foreground)]/10"
            aria-label="Close panel"
          >
            <X className="h-5 w-5 text-[var(--foreground)]" />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-4 text-sm text-[var(--muted)]">
            Customize your theme colors. Changes apply live to this website.
            Copy the JSON to use in your agent-board config.
          </p>
          <ColorPalette
            initialColors={colors}
            onColorsChange={onColorsChange}
          />
        </div>
      </div>
    </>
  )
}