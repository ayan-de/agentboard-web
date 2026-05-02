import { ThemeInfo } from '@/types'

interface ThemeSwatchProps {
  theme: ThemeInfo
  onSelect?: (theme: ThemeInfo) => void
}

export default function ThemeSwatch({ theme, onSelect }: ThemeSwatchProps) {
  return (
    <button
      onClick={() => onSelect?.(theme)}
      className="flex flex-col items-center gap-2 text-left hover:opacity-80 transition-opacity"
    >
      <div className="relative h-12 w-24 overflow-hidden rounded-lg shadow-md">
        <div className="absolute inset-0 flex">
          <div
            className="w-1/3"
            style={{ backgroundColor: theme.primary }}
          />
          <div
            className="w-1/3"
            style={{ backgroundColor: theme.secondary }}
          />
          <div
            className="w-1/3"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-80"
          style={{ backgroundColor: theme.background }}
        />
      </div>
      <span className="text-sm font-medium capitalize text-[var(--foreground)]">
        {theme.name}
      </span>
    </button>
  )
}