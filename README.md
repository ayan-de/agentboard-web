# AgentBoard

> **Visual project management for AI-first engineering teams.**

AgentBoard is a premium, terminal-based Kanban board that brings visual orchestration to AI coding agents. Manage Claude Code, Cursor, OpenCode and other AI assistants from a beautiful terminal interface — while a modern web dashboard keeps your whole team in sync.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Go Version](https://img.shields.io/github/go-mod/go-version/ayan-de/agent-board)](https://go.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Why AgentBoard?

AI coding agents are powerful — but managing them across multiple terminals, tmux panes, and terminal windows creates chaos. AgentBoard gives you a single control center:

- **One dashboard** to spawn, monitor, and coordinate all your AI agents
- **Visual Kanban workflow** so the whole team sees what's in progress
- **Terminal-native interface** that developers actually want to use
- **Web dashboard** for stakeholders who prefer browsers over terminals

---

## Features

### Terminal UI
Beautiful glassmorphic Kanban board built with Bubble Tea. Smooth animations, vim-style navigation, and seven built-in themes.

### Multi-Agent Orchestration
Spawn Claude Code, OpenCode, Cursor and other agents from the same interface. Each agent runs in its own isolated pane.

### tmux Integration
Agents run in dedicated tmux panes — they survive terminal restarts and network drops without losing context.

### Model Context Protocol (MCP)
Native MCP support for ContextCarry and SessionCarry lets agents maintain memory across complex multi-step tasks.

### Persistent SQLite Backend
Zero-configuration state persistence. Your Kanban board survives crashes and restarts.

### Headless API Mode
Switch to headless mode for custom frontend integrations. Control AgentBoard programmatically via REST API.

---

## Quick Start

```bash
# Install the Go binary
git clone https://github.com/ayan-de/agent-board.git
cd agent-board
go build -o agentboard ./cmd/agentboard

# Initialize and launch
./agentboard init
./agentboard
```

Press `i` to open the Agent Dashboard and spawn your first AI coding agent.

---

## Architecture

This repository contains the web dashboard for AgentBoard, built with Next.js 16 and Tailwind CSS 4.

- `app/` — Next.js App Router pages and components
- `docs/` — Project documentation

The core Kanban logic and agent orchestration lives in the [agent-board](https://github.com/ayan-de/agent-board) Go repository.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Package Manager**: pnpm

---

## Learn More

- [AgentBoard Go Package](https://github.com/ayan-de/agent-board) — Core Kanban and agent orchestration
- [Next.js Documentation](https://nextjs.org/docs) — Framework docs
- [Bubble Tea](https://github.com/charmbracelet/bubbletea) — TUI framework

---

## License

MIT License
