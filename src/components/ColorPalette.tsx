'use client'

import { useState } from 'react'
import ColorInput from '@/components/ui/ColorInput'

interface ThemeColors {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
}

interface ColorPaletteProps {
  initialColors: ThemeColors
  onColorsChange: (colors: ThemeColors) => void
}

export default function ColorPalette({ initialColors, onColorsChange }: ColorPaletteProps) {
  const [colors, setColors] = useState<ThemeColors>(initialColors)
  const [copied, setCopied] = useState(false)

  const handleChange = (key: keyof ThemeColors, value: string) => {
    const updated = { ...colors, [key]: value }
    setColors(updated)
    onColorsChange(updated)
  }

  const generateJSON = () => {
    return JSON.stringify({
      name: colors.name,
      defs: {},
      theme: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        background: colors.background,
      },
    }, null, 2)
  }

  const handleCopy = async () => {
    const json = generateJSON()
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <ColorInput
          label="Primary"
          value={colors.primary}
          onChange={(v) => handleChange('primary', v)}
        />
        <ColorInput
          label="Secondary"
          value={colors.secondary}
          onChange={(v) => handleChange('secondary', v)}
        />
        <ColorInput
          label="Accent"
          value={colors.accent}
          onChange={(v) => handleChange('accent', v)}
        />
        <ColorInput
          label="Background"
          value={colors.background}
          onChange={(v) => handleChange('background', v)}
        />
      </div>

      <button
        onClick={handleCopy}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        {copied ? 'Copied!' : 'Copy JSON'}
      </button>
    </div>
  )
}
