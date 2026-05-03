import { Github } from 'lucide-react'
import Container from '@/components/ui/Container'

const links = [
  { label: 'GitHub', sublabel: '1K', href: 'https://github.com/ayan-de/agent-board' },
  { label: 'Docs', sublabel: '', href: '#' },
  { label: 'Changelog', sublabel: '', href: '#' },
  { label: 'Discord', sublabel: '', href: '#' },
  { label: 'X', sublabel: '', href: '#' },
]

export default function SocialLinks() {
  return (
    <section className="py-8">
      <Container>
        <div className="flex items-center justify-center h-12 gap-16">
          {links.map((link, index) => (
            <>
              <div key={link.label} className="flex items-center gap-2">
                {link.label === 'GitHub' ? (
                  <Github className="h-4 w-4 text-[var(--muted)]" />
                ) : null}
                <a
                  href={link.href}
                  className="text-xl text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  {link.label}
                </a>
                {link.sublabel && (
                  <span className="text-xs text-[var(--muted)]/60">[{link.sublabel}]</span>
                )}
              </div>
              {index < links.length - 1 && (
                <span className="h-full w-px bg-[var(--muted)]" />
              )}
            </>
          ))}
        </div>
      </Container>
    </section>
  )
}