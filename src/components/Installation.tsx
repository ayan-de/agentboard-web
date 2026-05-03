'use client'

import { Copy, Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import { useState } from 'react'

const installCommands = [
  {
    label: 'Linux / macOS / Termux',
    command: 'curl -sSL https://agentboard.ayande.xyz/install.sh | bash',
  },
]

export default function Installation() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      'curl -sSL https://agentboard.ayande.xyz/install.sh | bash'
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="installation" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get started in seconds
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            One command to install everything — tmux, Go, npm, and AgentBoard.
          </p>
        </div>
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="rounded-md border border-[var(--foreground)]/10 bg-[var(--foreground)] p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-xs text-[var(--muted)]">
              <span>bash</span>
            </div>
            <div className="flex items-center justify-between">
              <code className="text-[var(--background)]">
                $ curl -sSL https://agentboard.ayande.xyz/install.sh | bash
              </code>
              <button
                onClick={copyToClipboard}
                className="ml-4 text-[var(--muted)] hover:text-[var(--background)] transition-colors"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--muted)]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="text-5xl font-bold text-[var(--foreground)]">150K+</div>
              <div className="mt-1 text-sm text-[var(--muted)]">Downloads</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[var(--foreground)]">5</div>
              <div className="mt-1 text-sm text-[var(--muted)]">Platforms</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[var(--foreground)]">~30s</div>
              <div className="mt-1 text-sm text-[var(--muted)]">Install Time</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}