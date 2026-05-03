'use client'

import { useState, useEffect } from 'react'
import ColorInput from '@/components/ui/ColorInput'

interface ThemeColors {
  name: string
  primary: string
  secondary: string
  accent: string
  error: string
  warning: string
  success: string
  info: string
  text: string
  textMuted: string
  background: string
  backgroundPanel: string
  backgroundElement: string
  border: string
  borderActive: string
}

interface ColorPaletteProps {
  initialColors: ThemeColors
  onColorsChange: (colors: ThemeColors) => void
}

export default function ColorPalette({ initialColors, onColorsChange }: ColorPaletteProps) {
  const [colors, setColors] = useState<ThemeColors>(initialColors)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setColors(initialColors)
  }, [initialColors])

  const handleChange = (key: keyof ThemeColors, value: string) => {
    const updated = { ...colors, [key]: value }
    setColors(updated)
    onColorsChange(updated)
  }

  const generateJSON = () => {
    return JSON.stringify({
      $schema: "https://agentboard.dev/theme.json",
      name: colors.name,
      defs: {
        background: colors.background,
        foreground: colors.text,
      },
      theme: {
        primary: { dark: colors.primary, light: colors.primary },
        secondary: { dark: colors.secondary, light: colors.secondary },
        accent: { dark: colors.accent, light: colors.accent },
        error: { dark: colors.error, light: colors.error },
        warning: { dark: colors.warning, light: colors.warning },
        success: { dark: colors.success, light: colors.success },
        info: { dark: colors.info, light: colors.info },
        text: { dark: "foreground", light: "background" },
        textMuted: { dark: colors.textMuted, light: colors.textMuted },
        background: { dark: "background", light: "foreground" },
        backgroundPanel: { dark: colors.backgroundPanel, light: colors.backgroundElement },
        backgroundElement: { dark: colors.backgroundElement, light: colors.textMuted },
        border: { dark: colors.border, light: colors.border },
        borderActive: { dark: colors.borderActive, light: colors.textMuted },
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
          label="Error"
          value={colors.error}
          onChange={(v) => handleChange('error', v)}
        />
        <ColorInput
          label="Warning"
          value={colors.warning}
          onChange={(v) => handleChange('warning', v)}
        />
        <ColorInput
          label="Success"
          value={colors.success}
          onChange={(v) => handleChange('success', v)}
        />
        <ColorInput
          label="Info"
          value={colors.info}
          onChange={(v) => handleChange('info', v)}
        />
        <ColorInput
          label="Text"
          value={colors.text}
          onChange={(v) => handleChange('text', v)}
        />
        <ColorInput
          label="Text Muted"
          value={colors.textMuted}
          onChange={(v) => handleChange('textMuted', v)}
        />
        <ColorInput
          label="Background"
          value={colors.background}
          onChange={(v) => handleChange('background', v)}
        />
        <ColorInput
          label="Background Panel"
          value={colors.backgroundPanel}
          onChange={(v) => handleChange('backgroundPanel', v)}
        />
        <ColorInput
          label="Background Element"
          value={colors.backgroundElement}
          onChange={(v) => handleChange('backgroundElement', v)}
        />
        <ColorInput
          label="Border"
          value={colors.border}
          onChange={(v) => handleChange('border', v)}
        />
        <ColorInput
          label="Border Active"
          value={colors.borderActive}
          onChange={(v) => handleChange('borderActive', v)}
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
