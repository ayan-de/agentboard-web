# Theme Customizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a floating button (bottom-right) that opens a slide-out panel where users can customize theme colors, preview changes live on the website, and copy the theme as JSON for use in agent-board config files.

**Architecture:**
- Floating `ThemeCustomizer` button fixed to bottom-right corner
- `ThemeCustomizerPanel` slides out from right when button clicked
- `ColorPalette` form inside panel with color inputs for primary, secondary, accent, background
- Live preview: CSS variables update in real-time as user edits colors
- Copy button generates JSON in agent-board's theme format

**Tech Stack:** Next.js, Tailwind CSS, React hooks, native color input, navigator.clipboard API

---

## File Structure

```
src/components/
├── ThemeCustomizer.tsx          # Floating button (NEW)
├── ThemeCustomizerPanel.tsx    # Slide-out panel (NEW)
├── ColorPalette.tsx            # Form with color inputs (NEW)
└── ui/
    └── ColorInput.tsx          # Individual color picker (NEW)

src/app/globals.css             # Add dynamic CSS variable support
src/app/page.tsx                # Add ThemeCustomizer to page
```

---

## Task 1: Create ColorInput Component

**Files:**
- Create: `src/components/ui/ColorInput.tsx`
- Test: None (UI component)

- [ ] **Step 1: Create ColorInput component**

```tsx
'use client'

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-10 cursor-pointer rounded-lg border border-[var(--foreground)]/20 p-1"
      />
      <div className="flex flex-col">
        <label className="text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 rounded border border-[var(--foreground)]/20 bg-transparent px-2 py-1 text-sm font-mono uppercase"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ColorInput.tsx
git commit -m "feat: add ColorInput component"
```

---

## Task 2: Create ColorPalette Component

**Files:**
- Create: `src/components/ColorPalette.tsx`
- Test: None (UI component)

- [ ] **Step 1: Create ColorPalette component**

```tsx
'use client'

import { useState } from 'react'
import ColorInput from '@/components/ui/ColorInput'

interface ThemeColors {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
}

interface ColorPaletteProps {
  initialColors: ThemeColors
  onColorsChange: (colors: ThemeColors) => void
}

export default function ColorPalette({ initialColors, onColorsChange }: ColorPaletteProps) {
  const [colors, setColors] = useState<ThemeColors>(initialColors)
  const [copied, setCopied] = useState(false)

  const handleChange = (key: keyof ThemeColors, value: string) => {
    const updated = { ...colors, [key]: value }
    setColors(updated)
    onColorsChange(updated)
  }

  const generateJSON = () => {
    return JSON.stringify({
      name: colors.name,
      defs: {},
      theme: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        background: colors.background,
      },
    }, null, 2)
  }

  const handleCopy = async () => {
    const json = generateJSON()
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <ColorInput
          label="Primary"
          value={colors.primary}
          onChange={(v) => handleChange('primary', v)}
        />
        <ColorInput
          label="Secondary"
          value={colors.secondary}
          onChange={(v) => handleChange('secondary', v)}
        />
        <ColorInput
          label="Accent"
          value={colors.accent}
          onChange={(v) => handleChange('accent', v)}
        />
        <ColorInput
          label="Background"
          value={colors.background}
          onChange={(v) => handleChange('background', v)}
        />
      </div>

      <button
        onClick={handleCopy}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        {copied ? 'Copied!' : 'Copy JSON'}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ColorPalette.tsx
git commit -m "feat: add ColorPalette component with copy functionality"
```

---

## Task 3: Create ThemeCustomizerPanel Component

**Files:**
- Create: `src/components/ThemeCustomizerPanel.tsx`
- Test: None (UI component)

- [ ] **Step 1: Create ThemeCustomizerPanel component**

```tsx
'use client'

import { X } from 'lucide-react'
import ColorPalette from '@/components/ColorPalette'

interface ThemeCustomizerPanelProps {
  isOpen: boolean
  onClose: () => void
  colors: {
    name: string
    primary: string
    secondary: string
    accent: string
    background: string
  }
  onColorsChange: (colors: typeof initialColors) => void
}

const initialColors = {
  name: 'custom',
  primary: '#fab283',
  secondary: '#5c9cf5',
  accent: '#9d7cd8',
  background: '#0a0a0a',
}

export default function ThemeCustomizerPanel({
  isOpen,
  onClose,
  colors,
  onColorsChange,
}: ThemeCustomizerPanelProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 transform overflow-y-auto bg-[var(--background)] shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--foreground)]/10 p-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Theme Customizer
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--foreground)]/10"
            aria-label="Close panel"
          >
            <X className="h-5 w-5 text-[var(--foreground)]" />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-4 text-sm text-[var(--muted)]">
            Customize your theme colors. Changes apply live to this website.
            Copy the JSON to use in your agent-board config.
          </p>
          <ColorPalette
            initialColors={colors}
            onColorsChange={onColorsChange}
          />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ThemeCustomizerPanel.tsx
git commit -m "feat: add ThemeCustomizerPanel slide-out component"
```

---

## Task 4: Create ThemeCustomizer Component (Floating Button)

**Files:**
- Create: `src/components/ThemeCustomizer.tsx`
- Test: None (UI component)

- [ ] **Step 1: Create ThemeCustomizer component**

```tsx
'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import ThemeCustomizerPanel from '@/components/ThemeCustomizerPanel'
import { applyThemeColors } from '@/lib/theme'

const defaultColors = {
  name: 'custom',
  primary: '#fab283',
  secondary: '#5c9cf5',
  accent: '#9d7cd8',
  background: '#0a0a0a',
}

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [colors, setColors] = useState(defaultColors)

  const handleColorsChange = (newColors: typeof defaultColors) => {
    setColors(newColors)
    applyThemeColors(newColors)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg hover:opacity-90"
        aria-label="Open theme customizer"
      >
        <Plus className="h-6 w-6" />
      </button>

      <ThemeCustomizerPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        colors={colors}
        onColorsChange={handleColorsChange}
      />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ThemeCustomizer.tsx
git commit -m "feat: add ThemeCustomizer floating button"
```

---

## Task 5: Create Theme Utility (apply CSS variables)

**Files:**
- Create: `src/lib/theme.ts`
- Test: None (utility function)

- [ ] **Step 1: Create theme utility**

```ts
interface ThemeColors {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
}

export function applyThemeColors(colors: ThemeColors) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.style.setProperty('--primary', colors.primary)
  root.style.setProperty('--secondary', colors.secondary)
  root.style.setProperty('--accent', colors.accent)
  root.style.setProperty('--background', colors.background)
}

export function getCurrentThemeColors(): ThemeColors {
  if (typeof document === 'undefined') {
    return {
      name: 'custom',
      primary: '#fab283',
      secondary: '#5c9cf5',
      accent: '#9d7cd8',
      background: '#0a0a0a',
    }
  }

  const root = document.documentElement
  return {
    name: 'custom',
    primary: getComputedStyle(root).getPropertyValue('--primary').trim() || '#fab283',
    secondary: getComputedStyle(root).getPropertyValue('--secondary').trim() || '#5c9cf5',
    accent: getComputedStyle(root).getPropertyValue('--accent').trim() || '#9d7cd8',
    background: getComputedStyle(root).getPropertyValue('--background').trim() || '#0a0a0a',
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/theme.ts
git commit -m "feat: add theme utility for applying CSS variables"
```

---

## Task 6: Update globals.css for Theme Variables

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add theme variable support**

Replace the existing `:root` and `.dark` with a system that supports both light/dark mode AND custom theme colors:

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
  --primary: #fab283;
}

.dark {
  --background: #0a0a0a;
  --foreground: #eeeeee;
  --muted: #808080;
  --accent: #fab283;
  --secondary: #5c9cf5;
  --primary: #fab283;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add primary CSS variable for theme customization"
```

---

## Task 7: Add ThemeCustomizer to Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add ThemeCustomizer to page**

Add import and render `<ThemeCustomizer />` at the end of the component.

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add ThemeCustomizer to main page"
```

---

## Task 8: TypeScript Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Run TypeScript check**

```bash
cd /home/ayan-de/Projects/agentboard-web && npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No errors

---

## Summary

| Task | Action |
|------|--------|
| 1 | Create ColorInput component |
| 2 | Create ColorPalette component |
| 3 | Create ThemeCustomizerPanel component |
| 4 | Create ThemeCustomizer floating button |
| 5 | Create theme utility for applying CSS |
| 6 | Update globals.css |
| 7 | Add to page |
| 8 | Verify with TypeScript |

---

**Plan complete.** Two execution options:

**1. Subagent-Driven (recommended)** - Dispatch fresh subagent per task, review between tasks

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?
