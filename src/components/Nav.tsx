import { Github, Download, Palette } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import LineBorder from '@/components/ui/LineBorder'

export default function Nav() {
  return (
    <LineBorder>
    <nav className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md">
      <div className="relative">
        <Container>
          <div className="border-b border-[var(--foreground)]/10">
            <div className="flex h-16 items-center justify-end px-4">
              <div className="flex items-center gap-3">
                <a
                  href="#themes"
                  aria-label="Browse the built-in themes"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                >
                  <Palette className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/ayan-de/agent-board"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AgentBoard on GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
                >
                  <Github className="h-5 w-5" fill="currentColor" strokeWidth={0} />
                </a>
                <Button variant="primary" href="#installation">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </nav>
    </LineBorder>
  )
}
