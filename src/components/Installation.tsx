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
        <div className="mt-12 max-w-xl mx-auto">
          <div className="rounded-xl border border-[var(--foreground)]/10 bg-[#1a1a1a] p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-xs text-[#656363]">
              <span>bash</span>
            </div>
            <div className="flex items-center justify-between">
              <code className="text-white">
                $ curl -sSL https://agentboard.ayande.xyz/install.sh | bash
              </code>
              <button
                onClick={copyToClipboard}
                className="ml-4 text-[#656363] hover:text-white transition-colors"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-[var(--muted)]">
            <div className="rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)] p-4">
              <div className="text-lg font-semibold text-[var(--foreground)]">5</div>
              <div>Platforms</div>
            </div>
            <div className="rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)] p-4">
              <div className="text-lg font-semibold text-[var(--foreground)]">0</div>
              <div>Config needed</div>
            </div>
            <div className="rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)] p-4">
              <div className="text-lg font-semibold text-[var(--foreground)]">~30s</div>
              <div>Install time</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}