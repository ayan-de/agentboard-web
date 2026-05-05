import type { Column } from './types'
import { KanbanColumn } from './KanbanColumn'
import { BoardHeader } from './BoardHeader'

interface KanbanBoardProps {
  columns: Column[]
  selectedIndex: number
  onColumnClick: (index: number) => void
}

function KanbanBoard({ columns, selectedIndex, onColumnClick }: KanbanBoardProps) {
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

export { KanbanBoard }
export type { KanbanBoardProps }
