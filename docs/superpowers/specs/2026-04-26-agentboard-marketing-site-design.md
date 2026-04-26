# AgentBoard Marketing Site Design

**Date**: 2026-04-26
**Project**: AgentBoard Next.js Marketing Site
**Ticket**: DEY-04

## Overview

Create a Next.js marketing site frontend for AgentBoard, a terminal-based Kanban board CLI tool that orchestrates AI coding agents.

## Visual Design

### Color Palette (AgentBoard Theme)

Uses the AgentBoard theme JSON specification with dark/light mode support.

**Dark Mode**:
- Background: `#0a0a0a` (primary), `#141414` (panel), `#1e1e1e` (element)
- Text: `#eeeeee` (primary), `#808080` (muted)
- Primary accent: `#fab283` (warm peach)
- Secondary: `#5c9cf5` (blue)
- Accent: `#9d7cd8` (purple)

**Light Mode**:
- Background: `#ffffff` (primary), `#fafafa` (panel), `#f5f5f5` (element)
- Text: `#1a1a1a` (primary), `#8a8a8a` (muted)
- Primary accent: `#3b7dd8` (blue)
- Accent: `#d68c27` (orange)

### Typography

- Headings: Inter (Google Fonts) - bold weights
- Body: Inter - regular weight
- Code/terminal: JetBrains Mono - monospace for code blocks and terminal elements

### Styling Approach

- **Framework**: Tailwind CSS v3
- **Theme Integration**: CSS variables via Tailwind config extending the theme palette
- **Dark/Light Mode**: `next-themes` for theme switching with system preference detection

## Site Sections

### 1. Hero Section
- Main headline: "Orchestrate Your AI Agents"
- Subheadline: Brief value proposition
- CTA buttons: "Get Started" and "View on GitHub"
- Terminal mockup screenshot (static image from README)

### 2. Features Section
6-column responsive grid showcasing key features:
- Modern Kanban TUI (Bubble Tea)
- Agent Orchestration (Claude Code, OpenCode, Cursor)
- tmux Integration
- MCP Native Support (ContextCarry, SessionCarry)
- Persistent Storage (SQLite)
- Dual Mode (TUI + API Server)

### 3. Themes Section
Visual showcase of available themes with color swatches:
- agentboard (default)
- catppuccin, dracula, gruvbox, matrix, nord, tokyonight

### 4. Installation Section
Quick install commands with copy-to-clipboard:
- Build from source
- Basic usage command

### 5. Documentation Links
Grid of documentation links:
- Getting Started
- Keybindings
- Themes
- Architecture
- Contributing

### 6. Footer
- GitHub link
- License info (MIT)
- Built with footer text

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page (all sections)
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── Features.tsx        # Features grid
│   ├── Themes.tsx          # Theme showcase
│   ├── Installation.tsx    # Installation instructions
│   ├── Documentation.tsx    # Docs links grid
│   ├── Footer.tsx          # Site footer
│   └── ui/                 # Reusable primitives
│       ├── Button.tsx      # Button component
│       ├── Container.tsx   # Max-width container
│       └── ThemeSwatch.tsx # Theme color swatch
├── lib/
│   └── themes.ts           # Theme definitions
└── types/
    └── index.ts            # TypeScript types
```

## Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Theme**: next-themes
- **Language**: TypeScript

## SEO & Performance

- Semantic HTML structure
- OpenGraph meta tags
- Responsive images with next/image
- Static generation for all pages
- Accessible color contrast ratios

## Implementation Order

1. Initialize Next.js project with Tailwind
2. Configure Tailwind with AgentBoard theme
3. Set up next-themes for dark/light mode
4. Create base UI components (Container, Button)
5. Build Hero section
6. Build Features section
7. Build Themes section
8. Build Installation section
9. Build Documentation section
10. Build Footer
11. Add SEO metadata
12. Test responsive layout
