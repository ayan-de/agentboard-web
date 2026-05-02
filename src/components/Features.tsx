import {
  LayoutGrid,
  Bot,
  Layers,
  Plug,
  Database,
  Globe,
  Check,
} from 'lucide-react'
import Container from '@/components/ui/Container'

const features = [
  { text: 'Modern Kanban TUI built with Bubble Tea' },
  { text: 'Spawn Claude Code, OpenCode, Cursor from one place' },
  { text: 'Agents run in isolated tmux panes' },
  { text: 'MCP support for ContextCarry and SessionCarry' },
  { text: 'SQLite backend — zero configuration' },
  { text: 'Headless API mode for frontend integrations' },
]

const featureGrid = [
  {
    icon: LayoutGrid,
    title: 'Kanban Board',
    description: 'Visual workflow management in the terminal.',
  },
  {
    icon: Bot,
    title: 'Multi-Agent',
    description: 'Orchestrate multiple AI coding agents simultaneously.',
  },
  {
    icon: Layers,
    title: 'tmux Integration',
    description: 'Agents survive terminal restarts and network drops.',
  },
  {
    icon: Plug,
    title: 'MCP Native',
    description: 'First-class support for Model Context Protocol.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-[var(--background)]/50">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage AI agents
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Built by developers, for developers.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {featureGrid.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-4 rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 shrink-0">
                <f.icon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto space-y-3">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 text-[var(--accent)] shrink-0" />
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}