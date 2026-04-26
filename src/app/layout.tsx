import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'AgentBoard - AI Agent Kanban Board',
  description:
    'A premium, terminal-based Kanban board for orchestrating and managing AI coding agents. Built with Bubble Tea, tmux integration, and MCP support.',
  openGraph: {
    title: 'AgentBoard - AI Agent Kanban Board',
    description:
      'A premium, terminal-based Kanban board for orchestrating and managing AI coding agents.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}