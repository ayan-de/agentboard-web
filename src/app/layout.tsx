import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { ThemeContextProvider } from '@/lib/ThemeContext'
import Nav from '@/components/Nav'

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
  icons: {
    icon: '/logo.svg',
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
        <ThemeProvider>
          <ThemeContextProvider>
            <Nav />
            {children}
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}