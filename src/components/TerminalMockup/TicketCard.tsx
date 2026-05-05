import { ReactNode } from 'react'
import type { Ticket, Priority } from './types'

interface TagChipProps {
  children: ReactNode
  colorClass: string
}

function TagChip({ children, colorClass }: TagChipProps) {
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

interface PriorityDotProps {
  priority: Priority
}

function PriorityDot({ priority }: PriorityDotProps) {
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

interface TagListProps {
  tags: string[]
}

function TagList({ tags }: TagListProps) {
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

interface TicketCardProps {
  ticket: Ticket
}

function TicketCard({ ticket }: TicketCardProps) {
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

export { TagChip, TagList, PriorityDot, TicketCard }
export type { TagChipProps, TagListProps, PriorityDotProps, TicketCardProps }
