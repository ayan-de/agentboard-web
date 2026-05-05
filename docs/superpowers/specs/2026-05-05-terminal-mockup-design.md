# TerminalMockup — Live Theme Preview Component

## Overview

A themeable React Kanban board component that live-previews AgentBoard theme colors, used in the website hero section. It mirrors the TUI's compact Kanban view at full fidelity.

---

## Design

### Structure

```
TerminalWindow
└── TerminalHeader (dots, title bar with "agentboard")
└── KanbanBoard
    └── KanbanColumn[] (TODO, in progress, done)
        └── TicketCard[] (compact only)
```

### Components

#### `TerminalWindow`
macOS-style window chrome:
- Red/yellow/green dots (top-left)
- Terminal title bar: `agentboard` with Terminal icon
- Border and background from theme (`Border` color)

#### `KanbanBoard`
- Horizontal layout of columns
- No tab bar (not shown in image)

#### `KanbanColumn`
- Column header: title text, blurred background (theme `BackgroundPanel`), highlighted when focused
- 3 columns: `TODO`, `in progress`, `done`
- Cards stacked vertically with gap

#### `TicketCard` (compact only)
- Left: `ID` (bold, primary color) + space + truncated title
- Footer left: priority dot (⬥) + priority text
- Footer right: tag chips (cycling through `Primary`, `Secondary`, `Accent`)
- Rounded border, theme colors

#### `PriorityDot`
- Small diamond symbol (⬥) + label
- Color mapping from theme: `low`→`TextMuted`, `medium`→`Text`, `high`→`Warning`, `critical`→`Error`

#### `TagChip`
- Small rounded pill
- Colors cycle by index: `Primary` (idx 0), `Secondary` (idx 1), `Accent` (idx 2, wraps)

---

## Data Model

```ts
interface Ticket {
  id: string
  title: string
  status: 'backlog' | 'in_progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'critical'
  tags: string[]
  agent?: string
  agentActive?: boolean
  branch?: string
}

interface Column {
  id: string
  title: string
  tickets: Ticket[]
}
```

---

## Props

```ts
interface TerminalMockupProps {
  columns: Column[]
  className?: string
}
```

`columns` is a required prop — the component does not hardcode any tickets. This makes it reusable and data-driven.

---

## Theme Integration

The component reads from `useThemeColors()` context and applies theme colors in real-time as themes switch:

| Element | Theme Color Used |
|---------|-----------------|
| Window border | `Border` |
| Terminal header bg | `Background` |
| Window dots | red/yellow/green (fixed) |
| Terminal title text | `TextMuted` |
| Column header bg (focused) | `Primary` |
| Column header text (focused) | `Text` on `Primary` |
| Column header bg (blurred) | `BackgroundPanel` |
| Column header text (blurred) | `Text` on `BackgroundPanel` |
| Ticket card border | `Border` |
| Ticket ID | `Primary` (bold) |
| Ticket title | `Text` |
| Priority low | `TextMuted` |
| Priority medium | `Text` |
| Priority high | `Warning` |
| Priority critical | `Error` |
| Tag chips (idx 0,3,6…) | `Primary` |
| Tag chips (idx 1,4,7…) | `Secondary` |
| Tag chips (idx 2,5,8…) | `Accent` |

---

## Component Inventory

### `TerminalWindow`
- **Default:** macOS chrome, theme border, theme background
- **States:** none (static chrome)

### `TerminalHeader`
- **Default:** dots + title bar, theme `TextMuted`

### `KanbanBoard`
- **Default:** horizontal flex, equal column widths, gap

### `KanbanColumn`
- **Default:** header + stacked cards
- **States:** `focused` (all columns always blurred in preview — no cursor concept)

### `TicketCard`
- **Default:** compact card with ID, title, priority footer, tags
- **States:** single state (no selected/expanded in this view)

### `PriorityDot`
- **Default:** diamond + label, color from theme priority map

### `TagChip`
- **Default:** small pill, color from theme cycle by index

---

## File Structure

```
src/components/TerminalMockup/
├── TerminalWindow.tsx       # macOS chrome + layout wrapper
├── KanbanBoard.tsx         # columns container
├── KanbanColumn.tsx        # single column
├── TicketCard.tsx          # compact ticket card
├── PriorityDot.tsx         # priority indicator
├── TagChip.tsx             # single tag pill
├── TagList.tsx             # tag list renderer
└── index.ts               # exports
```

---

## Placeholders

- All ticket data comes from props — no hardcoded tickets
- Column titles are controlled by the parent (passed via column objects)
