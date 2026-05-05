'use client'

import { useState, ReactNode } from 'react'
import { Terminal } from 'lucide-react'
import type { Ticket, Column, Priority } from './types'

function TagChip({ children, colorClass }: { children: ReactNode; colorClass: string }) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${colorClass}`}>
      {children}
    </span>
  )
}

const priorityConfig = {
  low: { label: 'low', colorClass: 'text-[var(--muted)]' },
  medium: { label: 'medium', colorClass: 'text-[var(--foreground)]' },
  high: { label: 'high', colorClass: 'text-[var(--warning)]' },
  critical: { label: 'critical', colorClass: 'text-[var(--error)]' },
}

function PriorityDot({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority]
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${config.colorClass}`}>
      <span>⬥</span>
      <span>{config.label}</span>
    </span>
  )
}

const tagColorClasses = [
  'bg-[var(--primary)]/20 text-[var(--primary)]',
  'bg-[var(--secondary)]/20 text-[var(--secondary)]',
  'bg-[var(--accent)]/20 text-[var(--accent)]',
]

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {tags.map((tag, i) => (
        <TagChip key={i} colorClass={tagColorClasses[i % tagColorClasses.length]}>
          {tag}
        </TagChip>
      ))}
    </div>
  )
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="border border-[var(--border)] rounded p-2 space-y-1.5">
      <div className="flex items-start gap-2">
        <span className="text-xs font-bold text-[var(--primary)] shrink-0">
          {ticket.id}
        </span>
        <span className="text-sm text-[var(--foreground)] truncate">
          {ticket.title}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <PriorityDot priority={ticket.priority} />
        <TagList tags={ticket.tags} />
      </div>
    </div>
  )
}

function KanbanColumn({ column, isSelected, onClick, className = '' }: { column: Column; isSelected: boolean; onClick: () => void; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 min-w-0 border border-[var(--border)] rounded p-2 ${className}`}>
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

function HelpBar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 px-1 text-xs text-[var(--muted)]">
        <div className="flex items-center gap-3">
          <span>a: add ticket</span>
          <span className="text-[var(--border)]">│</span>
          <span>d: delete ticket</span>
        </div>
        <div className="flex-1 text-center text-sm text-[var(--muted)]"><span className="text-[var(--primary)]">Project:</span> agent-board</div>
        <div className="flex items-center gap-3">
          <span>?: help</span>
          <span className="text-[var(--border)]">│</span>
          <span>r: refresh</span>
        </div>
      </div>
      <div className="border-b border-[var(--border)]" />
    </div>
  )
}

function BoardHeader({ title }: { title: string }) {
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

function KanbanBoard({ columns, selectedIndex, onColumnClick }: { columns: Column[]; selectedIndex: number; onColumnClick: (index: number) => void }) {
  return (
    <div className="flex flex-col h-full">
      <BoardHeader title="Board" />
      <div className="flex gap-3 flex-1">
        {columns.map((column, i) => (
          <KanbanColumn key={column.id} column={column} isSelected={i === selectedIndex} onClick={() => onColumnClick(i)} className="flex-1" />
        ))}
      </div>
    </div>
  )
}

function TerminalHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Terminal className="h-4 w-4" />
        <span>agentboard</span>
      </div>
    </div>
  )
}

interface TerminalWindowProps {
  columns: Column[]
  className?: string
}

function TerminalWindow({ columns, className = '' }: TerminalWindowProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div className={`relative border border-[var(--border)] bg-[var(--background)] shadow-2xl ${className}`}>
      <TerminalHeader />
      <div className="relative aspect-video overflow-hidden p-3 bg-[var(--background)]">
        <KanbanBoard columns={columns} selectedIndex={selectedIndex} onColumnClick={setSelectedIndex} />
      </div>
    </div>
  )
}

export type { Ticket, Column, Priority }

export { TagChip, TagList, PriorityDot, TicketCard, KanbanColumn, KanbanBoard, TerminalHeader, TerminalWindow }
export default TerminalWindow
