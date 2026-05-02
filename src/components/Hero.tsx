import { Terminal } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            The terminal-based Kanban board for AI agents
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            AgentBoard orchestrate your AI coding agents — Claude Code, Cursor,
            OpenCode — from a beautiful terminal interface. Built for developers
            who want visual workflow management without leaving their terminal.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button variant="primary" href="#installation">
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
          <div className="relative rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)]/50 p-2 shadow-2xl max-w-3xl mx-auto">
            <div className="flex items-center gap-2 border-b border-[var(--foreground)]/10 px-4 py-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Terminal className="h-4 w-4" />
                agentboard
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--background)]">
              <div className="absolute inset-0 flex items-center justify-center text-[var(--muted)]">
                TUI preview placeholder
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}