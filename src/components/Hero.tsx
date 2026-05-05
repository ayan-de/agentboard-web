import { Download } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Announcement from '@/components/ui/Announcement'
import LineBorder from '@/components/ui/LineBorder'
import TerminalMockup from '@/components/TerminalMockup'

export default function Hero() {
  return (
    <LineBorder>
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Announcement />
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            The terminal-based Kanban board for AI agents
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            AgentBoard orchestrate your AI coding agents — Claude Code, Cursor,
            OpenCode — from a beautiful terminal interface. Built for developers
            who want visual workflow management without leaving their terminal.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button variant="primary" href="#installation">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              href="https://github.com/ayan-de/agent-board"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </div>
        </div>

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
      </Container>
    </section>
    </LineBorder>
  )
}