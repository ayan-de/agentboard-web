import { Github } from 'lucide-react'
import Container from '@/components/ui/Container'
import LineBorder from '@/components/ui/LineBorder'

const links = [
  { label: 'GitHub', sublabel: '1K', href: 'https://github.com/ayan-de/agent-board' },
  { label: 'Docs', sublabel: '', href: '#' },
  { label: 'Changelog', sublabel: '', href: '#' },
  { label: 'Discord', sublabel: '', href: '#' },
  { label: 'X', sublabel: '', href: '#' },
]

export default function SocialLinks() {
  return (
    <LineBorder>
      <section>
        <Container>
          <div className="flex items-stretch h-20">
            {links.map((link, index) => (
              <div 
                key={link.label} 
                className={`flex-1 flex items-center justify-center gap-2 ${
                  index < links.length - 1 ? 'border-r border-[var(--foreground)]/40' : ''
                }`}
              >
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
            ))}
          </div>
        </Container>
      </section>
    </LineBorder>
  )
}