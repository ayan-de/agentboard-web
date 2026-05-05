import { HelpBar } from './HelpBar'

interface BoardHeaderProps {
  title: string
}

function BoardHeader({ title }: BoardHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <HelpBar />
      <div className="flex items-center gap-3 px-1">
        <div className="px-3 py-1 rounded-sm text-sm font-bold bg-[var(--primary)] text-[var(--background)]">
          {title}
        </div>
        <div className="text-sm text-[var(--muted)]">Search:</div>
        <div className="ml-auto text-sm text-[var(--muted)]">Apr 27 - May 26 2026 (2 cards)</div>
      </div>
    </div>
  )
}

export { BoardHeader }
export type { BoardHeaderProps }
