'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'

const faqs = [
  {
    question: 'What platforms does AgentBoard support?',
    answer:
      'AgentBoard runs on Linux, macOS, and Termux (Android). It requires tmux to be installed for session persistence.',
  },
  {
    question: 'How does tmux integration work?',
    answer:
      'AgentBoard spawns each AI agent in an isolated tmux pane. This means agents survive terminal restarts, network drops, and you can even attach to their sessions manually.',
  },
  {
    question: 'What AI agents are supported?',
    answer:
      'AgentBoard supports Claude Code, OpenCode, and Cursor. You can run multiple agents simultaneously and manage them from a unified Kanban-style interface.',
  },
  {
    question: 'Do I need to configure anything?',
    answer:
      'No configuration is needed. AgentBoard uses SQLite for local storage and automatically detects your installed tools.',
  },
  {
    question: 'Can I use AgentBoard as an API?',
    answer:
      'Yes, AgentBoard supports a headless API mode that makes it easy to integrate with other tools and frontend applications.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Everything you need to know about AgentBoard.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-sm border border-[var(--foreground)]/10 bg-[var(--background)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-xl text-[var(--foreground)]">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[var(--muted)] transition-transform ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-lg text-[var(--muted)]">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
