import { Github, Heart } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--foreground)]/10 py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">AgentBoard</span>
            <span className="text-[var(--muted)]">·</span>
            <span className="text-sm text-[var(--muted)]">
              MIT License
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ayan-de/agent-board"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <p className="flex items-center gap-1 text-sm text-[var(--muted)]">
            Built with <Heart className="h-4 w-4 text-red-500" /> for the
            AI-First Engineering community
          </p>
        </div>
      </Container>
    </footer>
  )
}