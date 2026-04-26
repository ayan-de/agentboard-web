import { ThemeInfo } from '@/types'

interface ThemeSwatchProps {
  theme: ThemeInfo
}

export default function ThemeSwatch({ theme }: ThemeSwatchProps) {
  return (
    <div className="flex flex-col items-center gap-2">
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
    </div>
  )
}