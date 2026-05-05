'use client'

import { useThemeColors } from '@/lib/ThemeContext'

interface TerminalModalProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
  message?: string
  variant?: 'success' | 'error' | 'warning' | 'info'
}

export default function TerminalModal({
  isOpen,
  onClose,
  title = 'Success',
  message,
  variant = 'success',
}: TerminalModalProps) {
  const { colors } = useThemeColors()

  if (!isOpen) return null

  const borderColor = {
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
  }[variant]

  return (
    <div className="absolute bottom-4 right-4 z-50">
      <div
        className="w-64 rounded-sm border-2 bg-[var(--background)] p-2 text-xs"
        style={{ borderColor, color: borderColor }}
      >
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        {message && (
          <p className="mt-0.5 text-xs text-[var(--muted)] leading-tight">{message}</p>
        )}
      </div>
    </div>
  )
}
