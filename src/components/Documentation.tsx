import { Book, Keyboard, Palette, Cpu, GitBranch, Heart } from 'lucide-react'
import Container from '@/components/ui/Container'
import LineBorder from '@/components/ui/LineBorder'

const docs = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly.',
    href: '#',
  },
  {
    icon: Keyboard,
    title: 'Keybindings',
    description: 'Master the keyboard shortcuts for maximum efficiency.',
    href: '#',
  },
  {
    icon: Palette,
    title: 'Themes',
    description: 'Customize AgentBoard with built-in or custom themes.',
    href: '#',
  },
  {
    icon: Cpu,
    title: 'Architecture',
    description: 'Understand the internal design and components.',
    href: '#',
  },
  {
    icon: GitBranch,
    title: 'Contributing',
    description: 'Join the community and contribute to AgentBoard.',
    href: '#',
  },
  {
    icon: Heart,
    title: 'Support',
    description: 'Get help and join discussions.',
    href: '#',
  },
]

export default function Documentation() {
  return (
    <LineBorder>
    <section className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Documentation
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Everything you need to know about AgentBoard.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl gap-4 sm:grid-cols-2">
          {docs.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              className="flex items-start gap-4 rounded-sm border border-[var(--foreground)]/10 bg-[var(--background)] p-6 transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                <doc.icon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">{doc.title}</h3>
                <p className="mt-1 text-lg text-[var(--muted)]">
                  {doc.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
    </LineBorder>
  )
}
