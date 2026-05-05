# TerminalMockup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A themeable React Kanban board component that live-previews AgentBoard theme colors, used in the website hero section. Mirrors the TUI's compact Kanban view at full fidelity.

**Architecture:** Single-file component approach with sub-components as named exports, reading theme colors from `useThemeColors()` context. Uses CSS custom properties (`var(--primary)`, etc.) mapped from the `ThemeInfo` type, not inline style objects. Data-driven via props.

**Tech Stack:** React (Next.js), TypeScript, Tailwind CSS with CSS custom properties, `useThemeColors()` hook

---

## File Structure

```
src/components/TerminalMockup/
├── index.tsx        # all components + re-export types
├── types.ts        # TerminalMockup types (Column, Ticket)
```

**New dependency:** `TagList` and `TagChip` are internal to `index.tsx`.

**`src/components/Hero.tsx`** will be updated to replace the static `<Image src="/image.png" />` with the new `<TerminalMockup />` component.

---

## Types to Create

**`src/components/TerminalMockup/types.ts`**

```ts
export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'backlog' | 'in_progress' | 'review' | 'done'

export interface Ticket {
  id: string
  title: string
  status: Status
  priority: Priority
  tags: string[]
  agent?: string
  agentActive?: boolean
  branch?: string
}

export interface Column {
  id: string
  title: string
  tickets: Ticket[]
}
```

---

## Task 1: Create types file

**Files:**
- Create: `src/components/TerminalMockup/types.ts`

- [ ] **Step 1: Create the file**

```ts
export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'backlog' | 'in_progress' | 'review' | 'done'

export interface Ticket {
  id: string
  title: string
  status: Status
  priority: Priority
  tags: string[]
  agent?: string
  agentActive?: boolean
  branch?: string
}

export interface Column {
  id: string
  title: string
  tickets: Ticket[]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/types.ts
git commit -m "feat(terminal-mockup): add types for Ticket and Column"
```

---

## Task 2: Create TagChip component

**Files:**
- Create: `src/components/TerminalMockup/index.tsx` (add TagChip named export first)

- [ ] **Step 1: Add TagChip to index.tsx**

```tsx
function TagChip({ children, colorClass }: { children: ReactNode; colorClass: string }) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${colorClass}`}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add TagChip component"
```

---

## Task 3: Create PriorityDot component

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx` (add PriorityDot named export)

- [ ] **Step 1: Add PriorityDot to index.tsx**

```tsx
const priorityConfig = {
  low:      { label: 'low',      colorClass: 'text-[var(--muted)]' },
  medium:   { label: 'medium',   colorClass: 'text-[var(--foreground)]' },
  high:     { label: 'high',    colorClass: 'text-[var(--warning)]' },
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add PriorityDot component"
```

---

## Task 4: Create TagList component

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx` (add TagList named export)

- [ ] **Step 1: Add TagList to index.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add TagList component"
```

---

## Task 5: Create TicketCard component (compact)

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx` (add TicketCard named export)

- [ ] **Step 1: Add TicketCard to index.tsx**

```tsx
function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="border border-[var(--border)] rounded p-2 space-y-1.5">
      {/* ID + Title row */}
      <div className="flex items-start gap-2">
        <span className="text-xs font-bold text-[var(--primary)] shrink-0">
          {ticket.id}
        </span>
        <span className="text-sm text-[var(--foreground)] truncate">
          {ticket.title}
        </span>
      </div>

      {/* Footer: priority (left) + tags (right) */}
      <div className="flex items-center justify-between gap-2">
        <PriorityDot priority={ticket.priority} />
        <TagList tags={ticket.tags} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add TicketCard component (compact)"
```

---

## Task 6: Create KanbanColumn component

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx` (add KanbanColumn named export)

- [ ] **Step 1: Add KanbanColumn to index.tsx**

```tsx
function KanbanColumn({ column }: { column: Column }) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      {/* Column header */}
      <div className="px-3 py-1.5 bg-[var(--background-panel)] rounded-t text-sm font-bold text-[var(--foreground)] border border-[var(--border)] border-b-0">
        {column.title}
      </div>

      {/* Tickets */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add KanbanColumn component"
```

---

## Task 7: Create KanbanBoard component

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx` (add KanbanBoard named export)

- [ ] **Step 1: Add KanbanBoard to index.tsx**

```tsx
function KanbanBoard({ columns }: { columns: Column[] }) {
  return (
    <div className="flex gap-3 h-full">
      {columns.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add KanbanBoard component"
```

---

## Task 8: Create TerminalHeader component

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx` (add TerminalHeader named export)

- [ ] **Step 1: Add TerminalHeader to index.tsx**

```tsx
import { Terminal } from 'lucide-react'

function TerminalHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2">
      {/* macOS dots */}
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>

      {/* Terminal title */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Terminal className="h-4 w-4" />
        <span>agentboard</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add TerminalHeader component"
```

---

## Task 9: Create TerminalWindow component

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx` (add TerminalWindow named export)

- [ ] **Step 1: Add TerminalWindow to index.tsx**

```tsx
function TerminalWindow({ columns, className = '' }: TerminalWindowProps) {
  return (
    <div
      className={`relative border border-[var(--border)] bg-[var(--background)] shadow-2xl ${className}`}
    >
      <TerminalHeader />
      <div className="relative aspect-video overflow-hidden p-3 bg-[var(--background)]">
        <KanbanBoard columns={columns} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add TerminalWindow component"
```

---

## Task 10: Add default export and type exports

**Files:**
- Modify: `src/components/TerminalMockup/index.tsx`

- [ ] **Step 1: Add prop types and re-export types at the bottom**

```tsx
export type { Ticket, Column, Priority, Status }

interface TerminalWindowProps {
  columns: Column[]
  className?: string
}

export { TagChip, TagList, PriorityDot, TicketCard, KanbanColumn, KanbanBoard, TerminalHeader, TerminalWindow }
export default TerminalWindow
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalMockup/index.tsx
git commit -m "feat(terminal-mockup): add default export and type exports"
```

---

## Task 11: Update Hero.tsx to use TerminalMockup

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Read current Hero.tsx to understand imports**

- [ ] **Step 2: Replace Image with TerminalMockup**

Import at top:
```tsx
import TerminalMockup from '@/components/TerminalMockup'
```

Replace the `<div className="relative aspect-video...">` block containing `<Image src="/image.png" .../>` with:

```tsx
<div className="mt-16 relative">
  <TerminalMockup columns={[
    {
      id: 'todo',
      title: 'TODO',
      tickets: [
        { id: 'AB-01', title: 'Implement context carry', status: 'backlog', priority: 'high', tags: ['feature', 'mcp'] },
        { id: 'AB-02', title: 'Add Claude Code detection', status: 'backlog', priority: 'medium', tags: ['detection'] },
        { id: 'AB-03', title: 'Write tests for orchestrator', status: 'backlog', priority: 'high', tags: ['testing'] },
      ],
    },
    {
      id: 'in_progress',
      title: 'in progress',
      tickets: [
        { id: 'AB-04', title: 'Build theme registry', status: 'in_progress', priority: 'critical', tags: ['core', 'feature'] },
        { id: 'AB-05', title: 'Design proposal flow', status: 'in_progress', priority: 'medium', tags: ['orchestration'] },
      ],
    },
    {
      id: 'done',
      title: 'done',
      tickets: [
        { id: 'AB-06', title: 'Set up SQLite persistence', status: 'done', priority: 'high', tags: ['storage'] },
      ],
    },
  ]} />
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): replace static image with live TerminalMockup component"
```

---

## Verification

After all tasks, run:

```bash
npm run build
```

Expected: Build succeeds with no type errors or missing imports.

---

## Spec Coverage Check

| Spec Requirement | Task |
|----------------|------|
| macOS chrome (dots, title bar) | Task 8 |
| 3 columns (TODO, in progress, done) | Task 11 |
| Compact ticket cards | Task 5 |
| ID + title on card | Task 5 |
| Priority indicator | Task 3, Task 5 |
| Tags with cycling colors | Task 2, Task 4, Task 5 |
| Theme colors from useThemeColors() | All tasks use CSS vars |
| Props-driven data | Task 11 |
| Full fidelity | All tasks |
