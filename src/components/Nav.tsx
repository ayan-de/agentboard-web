'use client'

import { Github, Menu, X, Download } from 'lucide-react'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import LineBorder from '@/components/ui/LineBorder'
import { logo } from './logo'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Docs', href: '#' },
  { label: 'GitHub', href: 'https://github.com/ayan-de/agent-board' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <LineBorder>
    <nav className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md">
      <div className="relative">
        <Container>
          <div className="border-b border-[var(--foreground)]/10">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-8">
                <a href="/" className="flex flex-col font-mono text-[10px] leading-none select-none group transition-all duration-300 hover:opacity-80">
                  {logo.left.map((line, i) => (
                    <div key={i} className="flex whitespace-pre">
                      <span className="text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">{line}</span>
                      <span className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-300">{logo.right[i]}</span>
                    </div>
                  ))}
                </a>
                <div className="hidden md:flex items-center gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/ayan-de/agent-board"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
                <Button variant="primary" href="#installation">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <button
                  className="md:hidden"
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle menu"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {open && (
              <div className="border-t border-[var(--foreground)]/10 px-4 py-4 md:hidden">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </nav>
    </LineBorder>
  )
}