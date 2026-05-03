import { Github, Twitter } from 'lucide-react'
import Container from '@/components/ui/Container'
import Separator from './ui/Separator'

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="px-4">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <span className="text-lg font-bold">AgentBoard</span>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Terminal-based Kanban for AI coding agents.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                <li><a href="#features" className="hover:text-[var(--foreground)]">Features</a></li>
                <li><a href="#installation" className="hover:text-[var(--foreground)]">Install</a></li>
                <li><a href="https://github.com/ayan-de/agent-board" className="hover:text-[var(--foreground)]">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                <li><a href="#" className="hover:text-[var(--foreground)]">Documentation</a></li>
                <li><a href="https://github.com/ayan-de/agent-board/issues" className="hover:text-[var(--foreground)]">Support</a></li>
                <li><a href="https://github.com/ayan-de/agent-board/blob/main/LICENSE" className="hover:text-[var(--foreground)]">License</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Social</h4>
              <div className="mt-3 flex gap-4">
                <a
                  href="https://github.com/ayan-de/agent-board"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] hover:text-[var(--foreground)]"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}