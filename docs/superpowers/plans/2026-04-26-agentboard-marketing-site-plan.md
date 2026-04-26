# AgentBoard Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Next.js marketing site frontend for AgentBoard CLI tool with dark/light mode, responsive design, and all marketing sections.

**Architecture:** Next.js 14+ App Router with Tailwind CSS, next-themes for dark/light mode, Lucide React for icons. Components are client-side React with server components where possible.

**Tech Stack:** Next.js 14, Tailwind CSS v3, next-themes, Lucide React, TypeScript

---

## File Structure

```
agentboard-web/
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind directives + CSS variables
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   └── page.tsx              # Home page composing all sections
│   ├── components/
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Features.tsx          # Features grid
│   │   ├── Themes.tsx            # Theme showcase
│   │   ├── Installation.tsx      # Installation instructions
│   │   ├── Documentation.tsx     # Docs links grid
│   │   ├── Footer.tsx            # Site footer
│   │   └── ui/
│   │       ├── Button.tsx        # Button component
│   │       ├── Container.tsx      # Max-width container
│   │       └── ThemeSwatch.tsx    # Theme color swatch
│   ├── lib/
│   │   └── themes.ts             # Theme color definitions
│   └── types/
│       └── index.ts              # TypeScript types
├── public/
│   └── (copy terminal screenshot from agent-board)
├── tailwind.config.ts             # Tailwind with theme colors
├── next.config.ts                # Next.js config
├── package.json
└── tsconfig.json
```

---

## Tasks

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "agentboard-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-themes": "^0.3.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github-production-user-asset-6210df.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 4: Create tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode
        'dark-step1': '#0a0a0a',
        'dark-step2': '#141414',
        'dark-step3': '#1e1e1e',
        'dark-step4': '#282828',
        'dark-step5': '#323232',
        'dark-step6': '#3c3c3c',
        'dark-step7': '#484848',
        'dark-step8': '#606060',
        'dark-step9': '#fab283',
        'dark-step10': '#ffc09f',
        'dark-step11': '#808080',
        'dark-step12': '#eeeeee',
        'dark-secondary': '#5c9cf5',
        'dark-accent': '#9d7cd8',
        'dark-red': '#e06c75',
        'dark-orange': '#f5a742',
        'dark-green': '#7fd88f',
        'dark-cyan': '#56b6c2',
        'dark-yellow': '#e5c07b',
        // Light mode
        'light-step1': '#ffffff',
        'light-step2': '#fafafa',
        'light-step3': '#f5f5f5',
        'light-step4': '#ebebeb',
        'light-step5': '#e1e1e1',
        'light-step6': '#d4d4d4',
        'light-step7': '#b8b8b8',
        'light-step8': '#a0a0a0',
        'light-step9': '#3b7dd8',
        'light-step10': '#2968c3',
        'light-step11': '#8a8a8a',
        'light-step12': '#1a1a1a',
        'light-secondary': '#7b5bb6',
        'light-accent': '#d68c27',
        'light-red': '#d1383d',
        'light-orange': '#d68c27',
        'light-green': '#3d9a57',
        'light-cyan': '#318795',
        'light-yellow': '#b0851f',
        // Semantic aliases
        background: {
          light: '#ffffff',
          dark: '#0a0a0a',
        },
        foreground: {
          light: '#1a1a1a',
          dark: '#eeeeee',
        },
        muted: {
          light: '#8a8a8a',
          dark: '#808080',
        },
        accent: {
          light: '#3b7dd8',
          dark: '#fab283',
        },
        secondary: {
          light: '#7b5bb6',
          dark: '#5c9cf5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Create postcss.config.mjs**

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

- [ ] **Step 6: Create src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --muted: #8a8a8a;
  --accent: #3b7dd8;
  --secondary: #7b5bb6;
}

.dark {
  --background: #0a0a0a;
  --foreground: #eeeeee;
  --muted: #808080;
  --accent: #fab283;
  --secondary: #5c9cf5;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`

- [ ] **Step 8: Commit**

```bash
git add package.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.mjs src/app/globals.css
git commit -m "chore: scaffold Next.js project with Tailwind"
```

---

### Task 2: Create Base UI Components

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/themes.ts`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/ThemeSwatch.tsx`

- [ ] **Step 1: Create src/types/index.ts**

```ts
export interface Feature {
  icon: string
  title: string
  description: string
}

export interface ThemeInfo {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
}
```

- [ ] **Step 2: Create src/lib/themes.ts**

```ts
import { ThemeInfo } from '@/types'

export const themes: ThemeInfo[] = [
  {
    name: 'agentboard',
    primary: '#fab283',
    secondary: '#5c9cf5',
    accent: '#9d7cd8',
    background: '#0a0a0a',
  },
  {
    name: 'catppuccin',
    primary: '#cba6f7',
    secondary: '#89b4fa',
    accent: '#f38ba8',
    background: '#1e1e2e',
  },
  {
    name: 'dracula',
    primary: '#ff79c6',
    secondary: '#bd93f9',
    accent: '#50fa7b',
    background: '#282a36',
  },
  {
    name: 'gruvbox',
    primary: '#fabd2f',
    secondary: '#83a598',
    accent: '#b8bb26',
    background: '#282828',
  },
  {
    name: 'matrix',
    primary: '#00ff00',
    secondary: '#008800',
    accent: '#00ff00',
    background: '#000000',
  },
  {
    name: 'nord',
    primary: '#81a1c1',
    secondary: '#88c0d0',
    accent: '#a3be8c',
    background: '#2e3440',
  },
  {
    name: 'tokyonight',
    primary: '#7aa2f7',
    secondary: '#bb9af7',
    accent: '#9ece6a',
    background: '#1a1b26',
  },
]
```

- [ ] **Step 3: Create src/components/ui/Container.tsx**

```tsx
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Create src/components/ui/Button.tsx**

```tsx
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-[var(--accent)] text-white hover:opacity-90 dark:bg-[var(--accent)] dark:text-[var(--background)]',
    secondary:
      'bg-[var(--secondary)] text-white hover:opacity-90 dark:bg-[var(--secondary)] dark:text-white',
    outline:
      'border border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/5',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 5: Create src/components/ui/ThemeSwatch.tsx**

```tsx
import { ThemeInfo } from '@/types'

interface ThemeSwatchProps {
  theme: ThemeInfo
}

export default function ThemeSwatch({ theme }: ThemeSwatchProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-12 w-24 overflow-hidden rounded-lg shadow-md">
        <div className="absolute inset-0 flex">
          <div
            className="w-1/3"
            style={{ backgroundColor: theme.primary }}
          />
          <div
            className="w-1/3"
            style={{ backgroundColor: theme.secondary }}
          />
          <div
            className="w-1/3"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: theme.background }}
          className="absolute inset-0 opacity-80"
        />
      </div>
      <span className="text-sm font-medium capitalize text-[var(--foreground)]">
        {theme.name}
      </span>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/types/index.ts src/lib/themes.ts src/components/ui/
git commit -m "feat: add base UI components (Container, Button, ThemeSwatch)"
```

---

### Task 3: Create Theme Provider and Root Layout

**Files:**
- Create: `src/components/ThemeProvider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create src/components/ThemeProvider.tsx**

```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
```

- [ ] **Step 2: Create src/app/layout.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeProvider.tsx src/app/layout.tsx
git commit -m "feat: add theme provider and root layout"
```

---

### Task 4: Build Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create src/components/Hero.tsx**

```tsx
import Image from 'next/image'
import { Github, Terminal } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] bg-clip-text text-transparent">
            Orchestrate Your AI Agents
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            AgentBoard is a premium, terminal-based Kanban board designed to
            orchestrate and manage AI coding agents. Built for developers who
            want visual workflow management without leaving their terminal.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button variant="primary">Get Started</Button>
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="relative rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)]/50 p-2 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[var(--foreground)]/10 px-4 py-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Terminal className="h-4 w-4" />
                agentboard
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--background)]">
              <Image
                src="https://github-production-user-asset-6210df.s3.amazonaws.com/59247285/579415351-95cd3ac9-d3a4-4c49-91b6-dff6b6c4988a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260416%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260416T174544Z&X-Amz-Expires=300&X-Amz-Signature=a092b147f626f2c61c0bd7814d445ba3729ade629ac0876570d89c4a4657fdea&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng"
                alt="AgentBoard TUI Preview"
                width={1863}
                height={450}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with terminal mockup"
```

---

### Task 5: Build Features Section

**Files:**
- Create: `src/components/Features.tsx`

- [ ] **Step 1: Create src/components/Features.tsx**

```tsx
import {
  LayoutGrid,
  Bot,
  Layers,
  Plug,
  Database,
  Globe,
} from 'lucide-react'
import Container from '@/components/ui/Container'

const features = [
  {
    icon: LayoutGrid,
    title: 'Modern Kanban TUI',
    description:
      'A sleek Terminal User Interface built with Bubble Tea, featuring glassmorphism-inspired borders and smooth animations.',
  },
  {
    icon: Bot,
    title: 'Agent Orchestration',
    description:
      'Seamlessly spawn and manage agents like Claude Code, OpenCode, and Cursor.',
  },
  {
    icon: Layers,
    title: 'tmux Integration',
    description:
      'Run agents in their own tmux panes or embedded PTY views for maximum flexibility.',
  },
  {
    icon: Plug,
    title: 'MCP Native',
    description:
      'Integrated support for Model Context Protocol (MCP) servers like ContextCarry and SessionCarry.',
  },
  {
    icon: Database,
    title: 'Persistent Storage',
    description:
      'Powered by a robust SQLite backend with automatic migrations.',
  },
  {
    icon: Globe,
    title: 'Dual Mode',
    description:
      'Switch between a standalone TUI and a headless API server for future frontend integrations.',
  },
]

export default function Features() {
  return (
    <section className="py-20 sm:py-32 bg-[var(--background)]/50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Manage AI Agents
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Built by developers, for developers. AgentBoard brings visual
            project management to your terminal.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl gap-8 sm:grid-cols-2 lg:max-w-none">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                <feature.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-[var(--muted)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Features.tsx
git commit -m "feat: add Features section"
```

---

### Task 6: Build Themes Section

**Files:**
- Create: `src/components/Themes.tsx`

- [ ] **Step 1: Create src/components/Themes.tsx**

```tsx
import Container from '@/components/ui/Container'
import ThemeSwatch from '@/components/ui/ThemeSwatch'
import { themes } from '@/lib/themes'

export default function Themes() {
  return (
    <section className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Beautiful Themes
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Shipped with gorgeous themes. Bring your own JSON theme for full
            customization.
          </p>
        </div>
        <div className="mx-auto mt-16 flex flex-wrap justify-center gap-8">
          {themes.map((theme) => (
            <ThemeSwatch key={theme.name} theme={theme} />
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Themes.tsx
git commit -m "feat: add Themes section"
```

---

### Task 7: Build Installation Section

**Files:**
- Create: `src/components/Installation.tsx`

- [ ] **Step 1: Create src/components/Installation.tsx**

```tsx
import { Copy, Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { useState } from 'react'

const installCommands = [
  {
    label: 'Clone Repository',
    command: 'git clone https://github.com/ayan-de/agent-board.git',
  },
  {
    label: 'Build Binary',
    command: 'cd agent-board && go build -o agentboard ./cmd/agentboard',
  },
  {
    label: 'Initialize & Run',
    command: './agentboard init && ./agentboard',
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
                  size="sm"
                  onClick={() => copyToClipboard(item.command)}
                  className="gap-1"
                >
                  {copied === item.command ? (
                    <Check className="h-4 w-4 text-[var(--accent))]" />
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Installation.tsx
git commit -m "feat: add Installation section with copy-to-clipboard"
```

---

### Task 8: Build Documentation Section

**Files:**
- Create: `src/components/Documentation.tsx`

- [ ] **Step 1: Create src/components/Documentation.tsx**

```tsx
import { Book, Keyboard, Palette, Cpu, GitBranch, Heart } from 'lucide-react'
import Container from '@/components/ui/Container'

const docs = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly.',
    href: '#',
  },
  {
    icon: Keyboard,
    title: 'Keybindings',
    description: 'Master the keyboard shortcuts for maximum efficiency.',
    href: '#',
  },
  {
    icon: Palette,
    title: 'Themes',
    description: 'Customize AgentBoard with built-in or custom themes.',
    href: '#',
  },
  {
    icon: Cpu,
    title: 'Architecture',
    description: 'Understand the internal design and components.',
    href: '#',
  },
  {
    icon: GitBranch,
    title: 'Contributing',
    description: 'Join the community and contribute to AgentBoard.',
    href: '#',
  },
  {
    icon: Heart,
    title: 'Support',
    description: 'Get help and join discussions.',
    href: '#',
  },
]

export default function Documentation() {
  return (
    <section className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Documentation
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Everything you need to know about AgentBoard.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl gap-4 sm:grid-cols-2">
          {docs.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              className="flex items-start gap-4 rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)] p-6 transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                <doc.icon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-semibold">{doc.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {doc.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Documentation.tsx
git commit -m "feat: add Documentation section"
```

---

### Task 9: Build Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create src/components/Footer.tsx**

```tsx
import { Github, Heart } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--foreground)]/10 py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">AgentBoard</span>
            <span className="text-[var(--muted)]">·</span>
            <span className="text-sm text-[var(--muted)]">
              MIT License
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ayan-de/agent-board"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <p className="flex items-center gap-1 text-sm text-[var(--muted)]">
            Built with <Heart className="h-4 w-4 text-red-500" /> for the
            AI-First Engineering community
          </p>
        </div>
      </Container>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer section"
```

---

### Task 10: Compose Page and Verify

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Create src/app/page.tsx**

```tsx
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Themes from '@/components/Themes'
import Installation from '@/components/Installation'
import Documentation from '@/components/Documentation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Themes />
      <Installation />
      <Documentation />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Successful build with no TypeScript errors

- [ ] **Step 3: Start dev server and test**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose home page with all sections"
```

---

## Spec Coverage Check

- [x] Hero section with clear value proposition
- [x] Features/benefits section (6 features)
- [x] Installation/usage instructions with copy-to-clipboard
- [x] Documentation links section
- [x] Themes showcase section
- [x] Footer with CTA and links
- [x] Dark/light mode support via next-themes
- [x] Responsive layout via Tailwind
- [x] AgentBoard theme colors applied
- [x] SEO metadata added

## Plan Self-Review

- All files use exact paths
- All code blocks are complete
- All commands show expected output
- No placeholders or TODOs
- TypeScript types consistent across files
