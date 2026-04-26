'use client'

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-10 cursor-pointer rounded-lg border border-[var(--foreground)]/20 p-1"
      />
      <div className="flex flex-col">
        <label className="text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 rounded border border-[var(--foreground)]/20 bg-transparent px-2 py-1 text-sm font-mono uppercase"
        />
      </div>
    </div>
  )
}
