import type { Column } from './types'
import { TicketCard } from './TicketCard'

interface KanbanColumnProps {
  column: Column
  isSelected: boolean
  onClick: () => void
  className?: string
}

function KanbanColumn({ column, isSelected, onClick, className = '' }: KanbanColumnProps) {
  return (
    <div className={`flex flex-col gap-2 min-w-0 border rounded p-2 ${isSelected ? 'border-[var(--borderActive)]' : 'border-[var(--border)]'} ${className}`}>
      <button
        onClick={onClick}
        className={`w-full px-3 py-1.5 rounded text-sm font-bold border border-[var(--border)] text-left transition-colors ${isSelected
          ? 'bg-[var(--primary)] text-[var(--background)]'
          : 'bg-[var(--background-panel)] text-[var(--foreground)]'
        }`}
      >
        {column.title}
      </button>
      <div className="flex flex-col gap-2">
        {column.tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
        {column.tickets.length === 0 && (
          <div className="text-xs text-[var(--muted)] italic px-3 py-2">(empty)</div>
        )}
      </div>
    </div>
  )
}

export { KanbanColumn }
export type { KanbanColumnProps }
