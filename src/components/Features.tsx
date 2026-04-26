import {
  LayoutGrid,
  Bot,
  Layers,
  Plug,
  Database,
  Globe,
} from 'lucide-react'
import Container from '@/components/ui/Container'

const features = [
  {
    icon: LayoutGrid,
    title: 'Modern Kanban TUI',
    description:
      'A sleek Terminal User Interface built with Bubble Tea, featuring glassmorphism-inspired borders and smooth animations.',
  },
  {
    icon: Bot,
    title: 'Agent Orchestration',
    description:
      'Seamlessly spawn and manage agents like Claude Code, OpenCode, and Cursor.',
  },
  {
    icon: Layers,
    title: 'tmux Integration',
    description:
      'Run agents in their own tmux panes or embedded PTY views for maximum flexibility.',
  },
  {
    icon: Plug,
    title: 'MCP Native',
    description:
      'Integrated support for Model Context Protocol (MCP) servers like ContextCarry and SessionCarry.',
  },
  {
    icon: Database,
    title: 'Persistent Storage',
    description:
      'Powered by a robust SQLite backend with automatic migrations.',
  },
  {
    icon: Globe,
    title: 'Dual Mode',
    description:
      'Switch between a standalone TUI and a headless API server for future frontend integrations.',
  },
]

export default function Features() {
  return (
    <section className="py-20 sm:py-32 bg-[var(--background)]/50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Manage AI Agents
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Built by developers, for developers. AgentBoard brings visual
            project management to your terminal.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl gap-8 sm:grid-cols-2 lg:max-w-none">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                <feature.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-[var(--muted)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}