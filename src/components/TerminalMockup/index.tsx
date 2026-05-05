'use client'

import { useState } from 'react'
import { Terminal } from 'lucide-react'
import type { Column } from './types'
import TerminalModal from '@/components/ui/TerminalModal'
import { KanbanBoard } from './KanbanBoard'
import { TabBar } from './TabBar'
import { AgentSessionView } from './AgentSessionView'

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
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const tabs = [
    { id: 'agentboard', label: 'agentBoard' },
    { id: 'agent-ses-01', label: 'agent-SES-01' },
  ]

  return (
    <div className={`relative border border-[var(--border)] bg-[var(--background)] shadow-2xl ${className}`}>
      <TerminalHeader />
      <div className="relative aspect-video overflow-hidden p-3 bg-[var(--background)]">
        <TabBar tabs={tabs} selectedIndex={selectedTabIndex} onTabClick={setSelectedTabIndex} />
        {selectedTabIndex === 0 ? (
          <KanbanBoard columns={columns} selectedIndex={selectedIndex} onColumnClick={setSelectedIndex} />
        ) : (
          <AgentSessionView />
        )}
      </div>
      <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
        <TerminalModal isOpen={true} title="Error" message="Failed to connect to server" variant="error" />
        <TerminalModal isOpen={true} title="Warning" message="Low disk space" variant="warning" />
        <TerminalModal isOpen={true} title="Success" message="Your changes have been saved" variant="success" />
        <TerminalModal isOpen={true} title="Info" message="2 updates available" variant="info" />
      </div>
    </div>
  )
}

export default TerminalWindow
export { KanbanBoard, TabBar, AgentSessionView, TerminalHeader }
export type { TerminalWindowProps }
