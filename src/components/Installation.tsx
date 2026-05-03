'use client'

import { Copy, Check, Terminal } from 'lucide-react'
import Container from '@/components/ui/Container'
import LineBorder from '@/components/ui/LineBorder'
import { useState } from 'react'

const installCommands = [
  { id: 'curl', label: 'curl', command: 'curl -sSL https://agentboard.ayande.xyz/install.sh | bash' },
  { id: 'npm', label: 'npm', command: 'npm install -g agentboard' },
  { id: 'bun', label: 'bun', command: 'bun install -g agentboard' },
  { id: 'brew', label: 'brew', command: 'brew install ayan-de/tap/agentboard' },
  { id: 'paru', label: 'paru', command: 'paru -S agentboard' },
]

export default function Installation() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('curl')

  const activeCommand = installCommands.find((t) => t.id === activeTab)?.command || ''

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(activeCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <LineBorder>
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
          <div className="rounded-sm border border-[var(--foreground)]/10 bg-[var(--background)] overflow-hidden">
            <div className="flex items-center border-b border-[var(--foreground)]/10">
              <div className="flex items-center px-4 py-3 border-r border-[var(--foreground)]/10">
                <Terminal className="h-4 w-4 text-[var(--muted)]" />
              </div>
              <div className="flex flex-1">
                {installCommands.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id
                      ? 'text-[var(--foreground)] border-[var(--foreground)]'
                      : 'text-[var(--muted)] border-transparent hover:text-[var(--foreground)]'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors border-l border-[var(--foreground)]/10"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="p-4 font-mono text-sm">
              <code className="text-[var(--foreground)]">
                $ {activeCommand}
              </code>
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
    </LineBorder>
  )
}