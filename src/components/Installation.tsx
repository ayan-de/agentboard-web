'use client'

import { Copy, Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { useState } from 'react'

const installCommands = [
  {
    label: 'Download & Install',
    command: 'curl -sSL https://agentboard.ayande.xyz/install.sh | bash',
  },
  {
    label: 'Add to PATH',
    command: 'export PATH="$HOME/.local/bin:$PATH"',
  },
  {
    label: 'Initialize & Run',
    command: 'agentboard init && agentboard',
  },
]

export default function Installation() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = async (command: string) => {
    await navigator.clipboard.writeText(command)
    setCopied(command)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="py-20 sm:py-32 bg-[var(--background)]/50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Requires Go 1.21+. Everything else is optional.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl space-y-4">
          {installCommands.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm font-medium text-[var(--muted)]">
                {item.label}
              </span>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-[var(--background)] px-3 py-2 font-mono text-sm">
                  {item.command}
                </code>
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(item.command)}
                  className="gap-1"
                >
                  {copied === item.command ? (
                    <Check className="h-4 w-4 text-[var(--accent)]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
